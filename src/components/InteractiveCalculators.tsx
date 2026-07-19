import React, { useState, useMemo } from 'react';
import { 
  Scale, Flame, HeartPulse, Droplet, User, Plus, Trash, Check, 
  Sparkles, Info, HelpCircle, ChevronRight, Activity, ArrowRight, Save
} from 'lucide-react';

interface InteractiveCalculatorsProps {
  selectedCalculatorId: string;
  userWeight: number;
  userGoalWeight: number;
  userHeight: number;
  userAge: number;
  userGender: 'male' | 'female';
  userActivity: string;
  userDietPreference: string;
  onSyncWithAI: (data: {
    weight?: number;
    goalWeight?: number;
    height?: number;
    age?: number;
    gender?: 'male' | 'female';
    activity?: string;
  }) => void;
  onSelectTab: (tabId: string) => void;
}

export default function InteractiveCalculators({
  selectedCalculatorId,
  userWeight,
  userGoalWeight,
  userHeight,
  userAge,
  userGender,
  userActivity,
  userDietPreference,
  onSyncWithAI,
  onSelectTab
}: InteractiveCalculatorsProps) {
  const [activeCalc, setActiveCalc] = useState<string>(selectedCalculatorId || 'bmi');

  // Interactive local states, initialized with user's current profile values
  const [calcWeight, setCalcWeight] = useState<number>(userWeight);
  const [calcHeight, setCalcHeight] = useState<number>(userHeight);
  const [calcAge, setCalcAge] = useState<number>(userAge);
  const [calcGender, setCalcGender] = useState<'male' | 'female'>(userGender);
  const [calcActivity, setCalcActivity] = useState<string>(userActivity);
  const [calcGoal, setCalcGoal] = useState<'maintain' | 'gain_slow' | 'gain_fast'>('gain_slow');
  const [bodyFatPercent, setBodyFatPercent] = useState<number>(18);
  const [climate, setClimate] = useState<string>('temperate');
  const [exerciseMins, setExerciseMins] = useState<number>(45);

  const [syncSuccess, setSyncSuccess] = useState(false);

  // Synchronize local calc state with profile if requested
  const handleApplyToProfile = () => {
    onSyncWithAI({
      weight: calcWeight,
      height: calcHeight,
      age: calcAge,
      gender: calcGender,
      activity: calcActivity
    });
    setSyncSuccess(true);
    setTimeout(() => setSyncSuccess(false), 2000);
  };

  // 1. BMI Calculation
  const bmiData = useMemo(() => {
    const hM = calcHeight / 100;
    const bmi = calcWeight / (hM * hM);
    let status = 'Normal Weight';
    let color = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    let percent = 50; // Pointer position

    if (bmi < 16) {
      status = 'Severe Thinness';
      color = 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      percent = 10;
    } else if (bmi < 18.5) {
      status = 'Underweight';
      color = 'text-sky-400 bg-sky-500/10 border-sky-500/20';
      percent = 25;
    } else if (bmi < 25) {
      status = 'Normal';
      color = 'text-mint bg-mint/10 border-mint/20';
      percent = 45;
    } else if (bmi < 30) {
      status = 'Overweight';
      color = 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      percent = 65;
    } else {
      status = 'Obese';
      color = 'text-rose-400 bg-rose-500/10 border-rose-500/20';
      percent = 85;
    }

    const minHealthyWeight = Math.round(18.5 * (hM * hM));
    const maxHealthyWeight = Math.round(25.0 * (hM * hM));

    return { bmi: parseFloat(bmi.toFixed(1)), status, color, percent, minHealthyWeight, maxHealthyWeight };
  }, [calcWeight, calcHeight]);

  // 2. BMR & TDEE Calculation (Mifflin-St Jeor)
  const energyData = useMemo(() => {
    let bmr = 10 * calcWeight + 6.25 * calcHeight - 5 * calcAge;
    if (calcGender === 'male') bmr += 5;
    else bmr -= 161;

    let multiplier = 1.2;
    if (calcActivity === 'light') multiplier = 1.375;
    else if (calcActivity === 'moderate') multiplier = 1.55;
    else if (calcActivity === 'active') multiplier = 1.725;
    else if (calcActivity === 'extreme') multiplier = 1.9;

    const tdee = Math.round(bmr * multiplier);

    // Goal Surplus
    const surplus = calcGoal === 'gain_fast' ? 600 : calcGoal === 'gain_slow' ? 350 : 0;
    const targetCalories = tdee + surplus;

    // Macro Split
    const proteinG = Math.round(calcWeight * 2.2); // ~1g per lb / 2.2g per kg
    const fatG = Math.round((targetCalories * 0.25) / 9);
    const carbsG = Math.round((targetCalories - (proteinG * 4 + fatG * 9)) / 4);

    return { bmr: Math.round(bmr), tdee, targetCalories, proteinG, carbsG, fatG };
  }, [calcWeight, calcHeight, calcAge, calcGender, calcActivity, calcGoal]);

  // 3. Water Target Calculation
  const waterTargetMl = useMemo(() => {
    let target = calcWeight * 35; // 35ml per kg of bodyweight
    if (climate === 'hot') target += 600;
    if (climate === 'cold') target -= 300;
    target += (exerciseMins / 30) * 350; // extra water for exercise
    return Math.round(target);
  }, [calcWeight, climate, exerciseMins]);

  // 4. Body Fat Estimate
  const bodyFatEstimate = useMemo(() => {
    // Estimating using standard BMI equation for adults
    const hM = calcHeight / 100;
    const bmi = calcWeight / (hM * hM);
    const genderFactor = calcGender === 'male' ? 1 : 0;
    // Deurenberg formula
    const bf = (1.20 * bmi) + (0.23 * calcAge) - (10.8 * genderFactor) - 5.4;
    return Math.max(2, Math.min(60, parseFloat(bf.toFixed(1))));
  }, [calcWeight, calcHeight, calcAge, calcGender]);

  const calculators = [
    { id: 'bmi', name: 'BMI Calculator', icon: Scale, desc: 'Calculate Body Mass Index proportion' },
    { id: 'bmr', name: 'BMR Calculator', icon: Flame, desc: 'Determine Basal Metabolic Rate' },
    { id: 'tdee', name: 'TDEE Calculator', icon: Activity, desc: 'Calculate Total Daily Energy Expenditure' },
    { id: 'calories', name: 'Calorie Surplus', icon: Flame, desc: 'Estimate weight gain calorie thresholds' },
    { id: 'protein', name: 'Protein Intake', icon: User, desc: 'Protein target for muscle synthesis' },
    { id: 'macros', name: 'Macronutrients', icon: Info, desc: 'Protein, fat, and carb splits' },
    { id: 'water', name: 'Water Intake', icon: Droplet, desc: 'Calculate hydration needs for bulk' },
    { id: 'body_fat', name: 'Body Fat %', icon: HeartPulse, desc: 'Formulate body fat estimation' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* HEADER */}
      <div className="bg-slate-card border border-zinc-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-mint/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            📊 Biometric & Health Calculators
          </h1>
          <p className="text-xs text-zinc-400">
            Use specialized scientific formulas to calculate your optimal weights, metabolic rates, hydration caps, and macro thresholds.
          </p>
        </div>
      </div>

      {/* TWO COLUMN WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT NAV PANEL (Span 4) */}
        <div className="lg:col-span-4 bg-slate-card border border-zinc-800/80 rounded-2xl p-4 shadow-lg space-y-3">
          <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase block px-2">Select Calculator</span>
          <div className="space-y-1">
            {calculators.map((calc) => {
              const Icon = calc.icon;
              const isSelected = activeCalc === calc.id;
              return (
                <button
                  key={calc.id}
                  onClick={() => {
                    setActiveCalc(calc.id);
                    setSyncSuccess(false);
                  }}
                  className={`w-full text-left p-3 text-xs rounded-xl border font-bold flex items-center gap-3 transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-mint text-zinc-950 border-mint shadow-md' 
                      : 'bg-zinc-950/20 border-zinc-900/60 text-zinc-300 hover:text-white hover:bg-zinc-950/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-zinc-950' : 'text-mint'}`} />
                  <div>
                    <div className="font-extrabold">{calc.name}</div>
                    <div className={`text-[10px] font-medium mt-0.5 ${isSelected ? 'text-zinc-800' : 'text-zinc-500'}`}>
                      {calc.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT CALCULATOR PANEL (Span 8) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* COMMON BIOMETRIC INPUT CONTROL CARD */}
          <div className="bg-slate-card border border-[#1E2E44]/50 rounded-2xl p-6 shadow-xl space-y-6">
            <h3 className="text-xs font-black text-zinc-300 uppercase tracking-widest border-b border-zinc-800 pb-3 flex items-center justify-between">
              <span>🧬 Physiological Variables</span>
              <span className="text-[10px] font-bold uppercase text-mint bg-mint/10 px-2.5 py-0.5 rounded-full">
                Active Settings
              </span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Weight input slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-zinc-400">Current Weight (kg)</span>
                  <input
                    type="number"
                    value={calcWeight === 0 ? '' : calcWeight}
                    onChange={(e) => {
                      const val = e.target.value === '' ? 0 : Number(e.target.value);
                      setCalcWeight(val);
                    }}
                    className="w-16 bg-zinc-950 border border-zinc-800 rounded px-1.5 py-0.5 text-right font-black text-white"
                  />
                </div>
                <input
                  type="range"
                  min="40"
                  max="150"
                  value={calcWeight || 40}
                  onChange={(e) => setCalcWeight(Number(e.target.value))}
                  className="w-full accent-mint h-1"
                />
              </div>

              {/* Height input slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-zinc-400">Current Height (cm)</span>
                  <input
                    type="number"
                    value={calcHeight === 0 ? '' : calcHeight}
                    onChange={(e) => {
                      const val = e.target.value === '' ? 0 : Number(e.target.value);
                      setCalcHeight(val);
                    }}
                    className="w-16 bg-zinc-950 border border-zinc-800 rounded px-1.5 py-0.5 text-right font-black text-white"
                  />
                </div>
                <input
                  type="range"
                  min="120"
                  max="220"
                  value={calcHeight || 120}
                  onChange={(e) => setCalcHeight(Number(e.target.value))}
                  className="w-full accent-mint h-1"
                />
              </div>

              {/* Age input slider */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-zinc-400">Your Age (Years)</span>
                  <input
                    type="number"
                    value={calcAge === 0 ? '' : calcAge}
                    onChange={(e) => {
                      const val = e.target.value === '' ? 0 : Number(e.target.value);
                      setCalcAge(val);
                    }}
                    className="w-16 bg-zinc-950 border border-zinc-800 rounded px-1.5 py-0.5 text-right font-black text-white"
                  />
                </div>
                <input
                  type="range"
                  min="14"
                  max="80"
                  value={calcAge || 14}
                  onChange={(e) => setCalcAge(Number(e.target.value))}
                  className="w-full accent-mint h-1"
                />
              </div>

              {/* Gender Radio */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-zinc-400 block">Gender</span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setCalcGender('male')}
                    className={`py-2 rounded-xl border font-bold transition-all ${
                      calcGender === 'male' 
                        ? 'bg-zinc-900 border-mint text-white' 
                        : 'bg-zinc-950/20 border-zinc-900 text-zinc-400'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setCalcGender('female')}
                    className={`py-2 rounded-xl border font-bold transition-all ${
                      calcGender === 'female' 
                        ? 'bg-zinc-900 border-mint text-white' 
                        : 'bg-zinc-950/20 border-zinc-900 text-zinc-400'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

            </div>

            {/* SYNC WITH AI COACH */}
            <div className="flex justify-between items-center pt-4 border-t border-zinc-800/80 gap-3 flex-wrap">
              <span className="text-[10px] text-zinc-400 max-w-md font-medium leading-relaxed">
                Changes made here can be pushed to sync globally across your visual AI nutrition plan and timeline charts.
              </span>
              <button
                onClick={handleApplyToProfile}
                className="px-4 py-2 bg-mint hover:bg-mint/90 text-zinc-950 text-xs font-black rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                {syncSuccess ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> SYNCED TO PROFILE!
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" /> SYNC TO AI COACH
                  </>
                )}
              </button>
            </div>
          </div>

          {/* DYNAMIC CALCULATOR RESULTS SPACE */}
          <div className="bg-slate-card border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-6">
            
            {/* 1. BMI RESULT CARD */}
            {activeCalc === 'bmi' && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Your Calculated BMI</span>
                  <div className="text-5xl font-black text-white">{bmiData.bmi} <span className="text-xs text-zinc-500">kg/m²</span></div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold ${bmiData.color}`}>
                    {bmiData.status}
                  </span>
                </div>

                {/* Progress Visualizer */}
                <div className="space-y-1">
                  <div className="relative h-2.5 w-full bg-zinc-900 rounded-full overflow-hidden flex">
                    <div className="h-full bg-sky-500 w-[18.5%]" />
                    <div className="h-full bg-mint w-[25%]" />
                    <div className="h-full bg-amber-500 w-[25%]" />
                    <div className="h-full bg-rose-500 w-[31.5%]" />
                  </div>
                  <div className="flex justify-between text-[9px] font-mono font-bold text-zinc-500 px-1">
                    <span>16.0 Under</span>
                    <span>18.5 Normal</span>
                    <span>25.0 Over</span>
                    <span>30.0+ Obese</span>
                  </div>
                </div>

                {/* Physical guidelines */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-zinc-950/40 p-4 rounded-xl border border-zinc-900 text-xs font-medium">
                  <div className="space-y-1">
                    <span className="text-zinc-500">Healthy Weight Range for Height</span>
                    <span className="text-white block font-extrabold">{bmiData.minHealthyWeight} kg to {bmiData.maxHealthyWeight} kg</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-zinc-500">Guideline</span>
                    <p className="text-zinc-400 text-[11px] leading-relaxed">
                      For optimal health and muscle bulk, aim to maintain a BMI in the upper tier of the healthy range (22.5 - 24.9) to allow substantial muscular building frame.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. BMR RESULT CARD */}
            {activeCalc === 'bmr' && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Basal Metabolic Rate</span>
                  <div className="text-5xl font-black text-white">{energyData.bmr} <span className="text-xs text-zinc-500">kcal/day</span></div>
                  <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                    This represents the exact number of calories your body burns at complete physical rest to maintain core metabolic life functions.
                  </p>
                </div>

                <div className="p-4 bg-zinc-950/40 rounded-xl border border-zinc-900 text-xs font-medium space-y-2">
                  <span className="text-mint font-bold block">🧮 Mifflin-St Jeor Equation</span>
                  <p className="text-zinc-400 text-[11px] leading-relaxed">
                    Men: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in yrs) + 5<br/>
                    Women: BMR = (10 × weight in kg) + (6.25 × height in cm) - (5 × age in yrs) - 161
                  </p>
                </div>
              </div>
            )}

            {/* 3. TDEE RESULT CARD */}
            {activeCalc === 'tdee' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="text-center space-y-2">
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Total Daily Energy Expenditure</span>
                    <div className="text-5xl font-black text-white">{energyData.tdee} <span className="text-xs text-zinc-500">kcal/day</span></div>
                    <span className="text-xs font-extrabold text-mint uppercase bg-mint/10 px-3 py-1 rounded-full inline-block">
                      Maintenance Baseline
                    </span>
                  </div>

                  {/* Activity Dropdown inside view */}
                  <div className="space-y-2 max-w-sm mx-auto">
                    <label className="text-xs text-zinc-400 block font-bold">Adjust Activity Multiplier</label>
                    <select
                      value={calcActivity}
                      onChange={(e) => setCalcActivity(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none"
                    >
                      <option value="sedentary">Sedentary (Office job, little exercise) — x1.2</option>
                      <option value="light">Lightly Active (Light exercise 1-3 days) — x1.375</option>
                      <option value="moderate">Moderately Active (Moderate exercise 3-5 days) — x1.55</option>
                      <option value="active">Very Active (Hard exercise 6-7 days) — x1.725</option>
                      <option value="extreme">Athlete / Physical Labor (Heavy training daily) — x1.9</option>
                    </select>
                  </div>
                </div>

                <p className="text-center text-xs text-zinc-500 leading-relaxed max-w-md mx-auto">
                  TDEE sums your base BMR with daily physical motion burns. To gain weight, you **MUST** consume calories *above* this TDEE limit.
                </p>
              </div>
            )}

            {/* 4. CALORIE SURPLUS RESULT CARD */}
            {activeCalc === 'calories' && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Caloric Bulk Targets</span>
                  <div className="text-5xl font-black text-white">{energyData.targetCalories} <span className="text-xs text-zinc-500">kcal/day</span></div>
                  
                  <div className="flex justify-center gap-2 pt-2">
                    <button 
                      onClick={() => setCalcGoal('maintain')}
                      className={`px-3 py-1.5 text-[10px] font-bold rounded-lg border transition-all ${
                        calcGoal === 'maintain' ? 'bg-zinc-900 border-zinc-700 text-white' : 'bg-zinc-950/25 text-zinc-500 border-transparent'
                      }`}
                    >
                      Maintenance ({energyData.tdee} kcal)
                    </button>
                    <button 
                      onClick={() => setCalcGoal('gain_slow')}
                      className={`px-3 py-1.5 text-[10px] font-bold rounded-lg border transition-all ${
                        calcGoal === 'gain_slow' ? 'bg-mint/15 border-mint text-mint' : 'bg-zinc-950/25 text-zinc-500 border-transparent'
                      }`}
                    >
                      Clean Bulk (+350 kcal)
                    </button>
                    <button 
                      onClick={() => setCalcGoal('gain_fast')}
                      className={`px-3 py-1.5 text-[10px] font-bold rounded-lg border transition-all ${
                        calcGoal === 'gain_fast' ? 'bg-orange-500/10 border-orange-500 text-orange-400' : 'bg-zinc-950/25 text-zinc-500 border-transparent'
                      }`}
                    >
                      Hyper Bulk (+600 kcal)
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-zinc-950/40 rounded-xl border border-zinc-900 text-xs font-medium text-zinc-400 leading-relaxed">
                  <span className="text-white font-bold block mb-1">⚖️ Bulking Velocity Guidelines:</span>
                  - **Clean Bulking** (+350 surplus) limits body fat accumulation while facilitating high-quality muscular development.<br/>
                  - **Hyper Bulking** (+600 surplus) accelerates overall mass gains, optimal for physical hardgainers, but incurs a higher ratio of lipid accumulation.
                </div>
              </div>
            )}

            {/* 5. PROTEIN RESULT CARD */}
            {activeCalc === 'protein' && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Target Daily Protein Needs</span>
                  <div className="text-5xl font-black text-white">{energyData.proteinG} <span className="text-xs text-zinc-500">g/day</span></div>
                  <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                    Evaluated at **2.2g of protein per kg of bodyweight**, standard golden-ratio threshold to maximize muscle tissue repair and hypertrophy.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
                  <div className="p-4 bg-zinc-950/40 rounded-xl border border-zinc-900 space-y-1">
                    <span className="text-mint font-bold block">🥚 High-quality sources</span>
                    <p className="text-zinc-500 text-[11px] leading-relaxed">
                      Chicken breast, turkey, beef, salmon, eggs, egg whites, whey isolate.
                    </p>
                  </div>
                  <div className="p-4 bg-zinc-950/40 rounded-xl border border-zinc-900 space-y-1">
                    <span className="text-mint font-bold block">🌱 Veg-friendly sources</span>
                    <p className="text-zinc-500 text-[11px] leading-relaxed">
                      Paneer, tofu, tempeh, Greek yogurt, green lentils, chickpeas, soy chunks.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 6. MACRONUTRIENT SPLITS */}
            {activeCalc === 'macros' && (
              <div className="space-y-6">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider text-center">Daily Macro Breakdown (g)</h4>

                {/* Macro visual columns */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  
                  {/* Protein */}
                  <div className="p-4 bg-[#142621]/40 border border-mint/20 rounded-xl">
                    <span className="text-[10px] font-extrabold text-mint uppercase tracking-wider block">Protein</span>
                    <span className="text-2xl font-black text-white">{energyData.proteinG}g</span>
                    <span className="text-[9px] text-zinc-500 block mt-1">({energyData.proteinG * 4} kcal)</span>
                  </div>

                  {/* Carbs */}
                  <div className="p-4 bg-zinc-950/40 border border-zinc-900 rounded-xl">
                    <span className="text-[10px] font-extrabold text-blue-400 uppercase tracking-wider block">Carbs</span>
                    <span className="text-2xl font-black text-white">{energyData.carbsG}g</span>
                    <span className="text-[9px] text-zinc-500 block mt-1">({energyData.carbsG * 4} kcal)</span>
                  </div>

                  {/* Fats */}
                  <div className="p-4 bg-zinc-950/40 border border-zinc-900 rounded-xl">
                    <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block">Fats</span>
                    <span className="text-2xl font-black text-white">{energyData.fatG}g</span>
                    <span className="text-[9px] text-zinc-500 block mt-1">({energyData.fatG * 9} kcal)</span>
                  </div>

                </div>

                <p className="text-center text-[10px] text-zinc-500 leading-relaxed font-medium">
                  Splits represent an ideal **45% Carbohydrates, 25% Protein, and 30% Healthy Fats** athletic profile.
                </p>
              </div>
            )}

            {/* 7. WATER TARGETS */}
            {activeCalc === 'water' && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Hydration Target</span>
                  <div className="text-5xl font-black text-white">{waterTargetMl} <span className="text-xs text-zinc-500">ml/day</span></div>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                    Equivalent to **~{(waterTargetMl / 250).toFixed(1)} cups (250ml each)** of water per day.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-bold max-w-md mx-auto">
                  <div>
                    <label className="text-zinc-500 text-[10px] uppercase block mb-1">Climate</label>
                    <select
                      value={climate}
                      onChange={(e) => setClimate(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-2.5 py-1.5 text-xs text-white"
                    >
                      <option value="temperate">Temperate (Mild)</option>
                      <option value="hot">Hot (Increases sweating / +600ml)</option>
                      <option value="cold">Cold (Reduces sweating / -300ml)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-zinc-500 text-[10px] uppercase block mb-1">Exercise Time (Min)</label>
                    <input
                      type="number"
                      value={exerciseMins}
                      onChange={(e) => setExerciseMins(Math.max(0, Number(e.target.value)))}
                      className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-2.5 py-1.5 text-xs text-white font-extrabold"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 8. BODY FAT PERCENTAGE */}
            {activeCalc === 'body_fat' && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block">Estimated Body Fat %</span>
                  <div className="text-5xl font-black text-white">{bodyFatEstimate}%</div>
                  <span className="text-[10px] font-mono font-bold text-zinc-500 block">
                    Calculated via Deurenberg Body Composition Index
                  </span>
                </div>

                <div className="p-4 bg-zinc-950/40 rounded-xl border border-zinc-900 text-xs font-medium text-zinc-400 leading-relaxed">
                  <span className="text-white font-bold block mb-1">💡 Body Composition Notes:</span>
                  - Optimal body fat percentages for clean muscle building are **10% to 15% for men** and **18% to 23% for women**.<br/>
                  - If starting above these limits, consider recomposition before entering a heavy caloric bulking phase.
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
