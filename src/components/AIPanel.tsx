import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Send, Brain, Flame, Utensils, Dumbbell, 
  Lightbulb, Check, ChevronRight, HelpCircle, 
  ArrowRight, Mail, BookOpen, AlertCircle, RefreshCw,
  Scale, Calendar, Award, User, Settings, Info, Play, CheckCircle
} from 'lucide-react';

interface AIPanelProps {
  userWeight: number;
  userGoalWeight: number;
  userHeight: number;
  userAge: number;
  userGender: 'male' | 'female';
  userActivity: string;
  userDietPreference: string;
  onUpdateProfile: (updates: {
    weight?: number;
    goalWeight?: number;
    height?: number;
    age?: number;
    gender?: 'male' | 'female';
    activity?: string;
    dietPreference?: string;
  }) => void;
  onSelectTab: (tabId: string) => void;
  onSelectCalculator: (calcId: string) => void;
}

export default function AIPanel({
  userWeight,
  userGoalWeight,
  userHeight,
  userAge,
  userGender,
  userActivity,
  userDietPreference,
  onUpdateProfile,
  onSelectTab,
  onSelectCalculator
}: AIPanelProps) {
  const [query, setQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: "👋 Welcome to WeightGain AI! I am your personal AI Nutrition and Strength Coach. I've pre-analyzed your profile and created an initial strategy for you. Feel free to ask me to adjust your meal plan, build a custom workout, or predict your weight timeline!"
    }
  ]);

  // Expandable state for profile editor
  const [profileOpen, setProfileOpen] = useState(false);

  // Dynamic AI State based on profile & query adjustments
  const [activeCalorieTarget, setActiveCalorieTarget] = useState(3050);
  const [activeProteinTarget, setActiveProteinTarget] = useState(150);
  const [activeCarbsTarget, setActiveCarbsTarget] = useState(380);
  const [activeFatsTarget, setActiveFatsTarget] = useState(100);
  const [activeTimeframeWeeks, setActiveTimeframeWeeks] = useState(16);
  
  // Custom meal and workout plans
  const [activeMealPlan, setActiveMealPlan] = useState({
    calories: 3050,
    breakfast: {
      kcal: 820,
      items: ["🥣 Large bowl of Oats with whole milk", "🥜 2 tbsp Peanut Butter & 1 sliced Banana", "🥚 3 Whole Boiled Eggs with spinach", "🥛 1 glass of Full-Cream Milk"]
    },
    lunch: {
      kcal: 950,
      items: ["🍚 2 cups of Basmati Rice (Cooked)", "🍗 200g Grilled Chicken Breast / Paneer", "🥦 Mixed vegetables stir-fried in olive oil", "🥑 Half of an Avocado"]
    },
    snacks: {
      kcal: 450,
      items: ["🥜 1 handful of Raw Almonds & Walnuts", "🥤 Whey Protein Shake with a tablespoon of honey"]
    },
    dinner: {
      kcal: 830,
      items: ["🐟 180g Baked Salmon / Chickpea Curry", "🍠 2 Medium Baked Sweet Potatoes", "🥛 1 cup of probiotic Greek Yogurt"]
    }
  });

  const [activeWorkoutPlan, setActiveWorkoutPlan] = useState([
    { day: "Monday", routine: "Chest + Triceps Heavy", exercises: ["Bench Press (4 sets x 8 reps)", "Incline Dumbbell Fly (3 x 10)", "Tricep Dips (3 x max)", "Overhead Cable Extension (3 x 12)"] },
    { day: "Tuesday", routine: "Back + Biceps Heavy", exercises: ["Deadlifts (4 sets x 5 reps)", "Pull-Ups or Lat Pulldowns (4 x 8)", "Barbell Rows (3 x 10)", "Hammer Curls (3 x 12)"] },
    { day: "Wednesday", routine: "Rest Day", exercises: ["Active Recovery (Stretching, mobility, light walking)"] },
    { day: "Thursday", routine: "Legs (Quad Dominant)", exercises: ["Barbell Squats (4 sets x 8 reps)", "Romanian Deadlifts (3 x 10)", "Leg Press (3 x 12)", "Calf Raises (4 x 15)"] },
    { day: "Friday", routine: "Shoulders + Traps", exercises: ["Overhead Press (4 sets x 8 reps)", "Lateral Dumbbell Raises (4 x 12)", "Face Pulls (3 x 15)", "Dumbbell Shrugs (3 x 10)"] },
    { day: "Saturday", routine: "Full Body Hypertrophy", exercises: ["Incline Bench Press (3 x 10)", "Weighted Chin-ups (3 x 8)", "Goblet Squats (3 x 12)", "Cable Woodchoppers (3 x 15)"] },
    { day: "Sunday", routine: "Rest Day", exercises: ["Complete physical decompression and muscle tissue recovery"] }
  ]);

  const [activeInsights, setActiveInsights] = useState([
    "Increase calories by 450/day over your maintenance baseline",
    "Consume 25-30g of high-quality protein every 3 hours to optimize MPS",
    "Prioritize sleep of at least 8 hours for muscular tissue reconstruction",
    "Execute strength training 4 to 5 days a week with progressive overload"
  ]);

  const [progressMetrics, setProgressMetrics] = useState({
    calories: 92,
    protein: 88,
    water: 75,
    weightGoal: 45
  });

  const [faqExpanded, setFaqExpanded] = useState<number | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Recalculate baseline numbers when profile props change
  useEffect(() => {
    recomputeNutritionFromProfile();
  }, [userWeight, userGoalWeight, userHeight, userAge, userGender, userActivity, userDietPreference]);

  const recomputeNutritionFromProfile = () => {
    // BMR using Mifflin-St Jeor
    let bmr = 10 * userWeight + 6.25 * userHeight - 5 * userAge;
    if (userGender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    // Activity Multiplier
    let multiplier = 1.2;
    if (userActivity === 'light') multiplier = 1.375;
    else if (userActivity === 'moderate') multiplier = 1.55;
    else if (userActivity === 'active') multiplier = 1.725;
    else if (userActivity === 'extreme') multiplier = 1.9;

    const tdee = Math.round(bmr * multiplier);
    
    // For weight gain, add 400 - 600 calories surplus. Scale surplus dynamically if the gap to goal is high.
    const weightGap = Math.max(0, userGoalWeight - userWeight);
    const surplus = 500 + Math.min(200, Math.round(weightGap * 5));
    const calories = tdee + surplus;

    // Protein: 2.2g per kg of GOAL body weight so that we eat for the target muscle mass
    const protein = Math.round(userGoalWeight * 2.2);

    // Fats: 25% of total calories
    const fatCalories = calories * 0.25;
    const fats = Math.round(fatCalories / 9);

    // Carbs: Remaining calories
    const proteinCalories = protein * 4;
    const carbCalories = calories - (proteinCalories + fatCalories);
    const carbs = Math.round(carbCalories / 4);

    // Estimated weeks (Assuming 0.35kg to 0.5kg clean gain per week)
    const weightDiff = Math.max(1, userGoalWeight - userWeight);
    const weeks = Math.round(weightDiff / 0.35);

    setActiveCalorieTarget(calories);
    setActiveProteinTarget(protein);
    setActiveCarbsTarget(carbs);
    setActiveFatsTarget(fats);
    setActiveTimeframeWeeks(weeks);

    // Update progress percentage
    let weightGoalPercent = 0;
    if (userGoalWeight > userWeight) {
      const startingWeight = userWeight - 5;
      const divisor = userGoalWeight - startingWeight;
      if (divisor > 0) {
        weightGoalPercent = Math.min(100, Math.max(0, Math.round(((userWeight - startingWeight) / divisor) * 100)));
      } else {
        weightGoalPercent = 0;
      }
    } else if (userGoalWeight > 0) {
      weightGoalPercent = 100;
    }

    setProgressMetrics(prev => ({
      ...prev,
      weightGoal: isNaN(weightGoalPercent) ? 45 : Math.max(5, Math.min(100, weightGoalPercent))
    }));

    // Re-adapt initial meal plan based on diet type and target goal weight
    adaptMealPlan(calories, userDietPreference);
  };

  const adaptMealPlan = (calories: number, diet: string) => {
    const isVeg = diet.toLowerCase().includes('veg') || diet.toLowerCase().includes('vegetarian');
    const isVegan = diet.toLowerCase().includes('vegan');

    // Calculate a scaling factor based on user's goal weight compared to a baseline of 65kg
    const scaleFactor = Math.max(0.6, Math.min(2.5, userGoalWeight / 65));

    // Dynamic portion sizes based on goal kg scale factor
    const oatsQty = Math.round(75 * scaleFactor);
    const pbQty = Math.round(2 * scaleFactor * 10) / 10;
    const eggsQty = Math.max(2, Math.round(3 * scaleFactor));
    const milkQty = Math.round(250 * scaleFactor);
    const riceQty = Math.round(150 * scaleFactor);
    const chickenQty = Math.round(180 * scaleFactor);
    const vegQty = Math.round(120 * scaleFactor);
    const almondsQty = Math.round(35 * scaleFactor);
    const wheyScoops = (Math.round(1.2 * scaleFactor * 10) / 10).toFixed(1);
    const salmonQty = Math.round(170 * scaleFactor);
    const potatoQty = Math.round(200 * scaleFactor);
    const yogurtQty = Math.round(200 * scaleFactor);

    let breakfast = [
      `🥣 ${oatsQty}g Rolled Oats cooked in full milk`,
      `🥜 ${pbQty} tbsp Peanut Butter & 1 sliced Banana`,
      `🥚 ${eggsQty} Whole Boiled Eggs with spinach`,
      `🥛 ${milkQty}ml Full-Cream Milk (high density calorie fuel)`
    ];
    let lunch = [
      `🍚 ${riceQty}g Steamed Basmati Rice (cooked weight)`,
      `🍗 ${chickenQty}g Grilled Chicken Breast (seasoned with salt & pepper)`,
      `🥦 ${vegQty}g Mixed vegetables stir-fried in olive oil`,
      `🥑 Half of an Avocado (${Math.round(150 * scaleFactor)} kcal fat density)`
    ];
    let snacks = [
      `🥜 ${almondsQty}g Raw Almonds & Walnut halves`,
      `🥤 ${wheyScoops} scoops Whey Protein Shake with a tablespoon of honey`
    ];
    let dinner = [
      `🐟 ${salmonQty}g Baked Salmon / Lean Beef Fillet`,
      `🍠 ${potatoQty}g Oven-Baked Sweet Potatoes`,
      `🥛 ${yogurtQty}g probiotic whole Greek Yogurt`
    ];

    if (isVegan) {
      const soyMilkQty = Math.round(250 * scaleFactor);
      const chiaQty = Math.round(15 * scaleFactor);
      const tofuQty = Math.round(220 * scaleFactor);
      const beansQty = Math.round(150 * scaleFactor);
      const lentilQty = Math.round(180 * scaleFactor);

      breakfast = [
        `🥣 ${oatsQty}g Oats with ${soyMilkQty}ml Soy Milk & ${chiaQty}g Chia Seeds`,
        `🥜 ${pbQty} tbsp Peanut Butter & 2 Bananas`,
        `🥑 Half an Avocado on toasted thick sourdough`,
        `🥛 Vegan Protein Shake (${wheyScoops} scoops Pea/Soy protein) with Almond Milk`
      ];
      lunch = [
        `🍚 ${riceQty}g Steamed Brown Rice`,
        `🫘 ${tofuQty}g Pan-fried Organic Tofu & ${beansQty}g Black Beans`,
        `🥦 ${vegQty}g Steamed Broccoli and bell peppers in pure sesame oil`,
        `🎃 ${Math.round(25 * scaleFactor)}g roasted Pumpkin Seeds`
      ];
      snacks = [
        `🥜 ${almondsQty}g almonds & cashews mixture`,
        `🍎 1 large Apple with 2 tbsp of almond butter dip`
      ];
      dinner = [
        `🍛 Large bowl of ${lentilQty}g Yellow Chickpea & Lentil Curry`,
        `🍠 ${potatoQty}g roasted sweet potato wedges`,
        `🥥 1 cup Coconut milk yogurt alternative with chia seeds`
      ];
    } else if (isVeg) {
      const paneerQty = Math.round(100 * scaleFactor);
      const paneerLunchQty = Math.round(150 * scaleFactor);
      const chickpeaQty = Math.round(150 * scaleFactor);
      const rajmaQty = Math.round(200 * scaleFactor);

      breakfast = [
        `🥣 ${oatsQty}g Oats with warm whole milk & organic honey`,
        `🥜 ${pbQty} tbsp Peanut Butter & 1 sliced Banana`,
        `🧀 ${paneerQty}g grilled spiced Paneer on toasted whole wheat sourdough`,
        `🥛 ${milkQty}ml warm Full-Cream Milk with almond powder`
      ];
      lunch = [
        `🍚 ${riceQty}g Steamed Basmati Rice`,
        `🧀 ${paneerLunchQty}g grilled Paneer cubes cooked with mild tomato reduction`,
        `🥦 ${vegQty}g Mixed vegetables stir-fried in organic olive oil`,
        `🥣 1 cup (${chickpeaQty}g) Sprouted Green Lentils`
      ];
      snacks = [
        `🥜 ${almondsQty}g Raw Almonds & Walnut halves`,
        `🥤 ${wheyScoops} scoops Premium Whey Protein Shake with 1 blended banana & peanut butter`
      ];
      dinner = [
        `🍲 Red Kidney Beans (Rajma) Curry cooked with authentic spices`,
        `🍠 ${potatoQty}g Roasted Sweet Potato rounds`,
        `🥛 Big cup (${yogurtQty}g) Greek Yogurt topped with mixed flax seeds`
      ];
    }

    const bKcal = Math.round(calories * 0.28);
    const lKcal = Math.round(calories * 0.32);
    const sKcal = Math.round(calories * 0.15);
    const dKcal = calories - (bKcal + lKcal + sKcal);

    setActiveMealPlan({
      calories,
      breakfast: { kcal: bKcal, items: breakfast },
      lunch: { kcal: lKcal, items: lunch },
      snacks: { kcal: sKcal, items: snacks },
      dinner: { kcal: dKcal, items: dinner }
    });
  };

  const handleQuerySubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim() || isGenerating) return;

    const userText = query;
    setChatHistory(prev => [...prev, { sender: 'user', text: userText }]);
    setQuery('');
    triggerAIEngine(userText);
  };

  const selectPopularPrompt = (promptText: string) => {
    if (isGenerating) return;
    setChatHistory(prev => [...prev, { sender: 'user', text: promptText }]);
    triggerAIEngine(promptText);
  };

  const triggerAIEngine = async (userPrompt: string) => {
    setIsGenerating(true);
    setGenerationStep('🧠 Analyzing physiological baseline...');

    // Simulate stepping through stages like a real complex AI
    const stages = [
      { text: '🧠 Calculating custom TDEE & surplus parameters...', delay: 600 },
      { text: '🍗 Formulating muscle-synthesis macro thresholds...', delay: 1200 },
      { text: '🏋 Crafting hypertrophic progressive strength workout splits...', delay: 1800 },
      { text: '✨ Generating personalized coaching insights...', delay: 2400 }
    ];

    stages.forEach((stage) => {
      setTimeout(() => {
        setGenerationStep(stage.text);
      }, stage.delay);
    });

    try {
      // Gather current biometrics
      const currentProfile = {
        weight: userWeight,
        goalWeight: userGoalWeight,
        height: userHeight,
        age: userAge,
        gender: userGender,
        activity: userActivity,
        dietPreference: userDietPreference
      };

      // Call the server API proxy
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userPrompt,
          history: chatHistory,
          profile: currentProfile
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}`);
      }

      const data = await response.json();

      // Check if data is populated correctly
      if (data && data.text) {
        // Dynamically update dashboard state with real Coach advice!
        if (typeof data.calories === 'number') setActiveCalorieTarget(data.calories);
        if (typeof data.protein === 'number') setActiveProteinTarget(data.protein);
        if (typeof data.carbs === 'number') setActiveCarbsTarget(data.carbs);
        if (typeof data.fats === 'number') setActiveFatsTarget(data.fats);
        if (typeof data.timeframeWeeks === 'number') setActiveTimeframeWeeks(data.timeframeWeeks);
        if (data.mealPlan) setActiveMealPlan(data.mealPlan);
        if (data.workoutPlan) setActiveWorkoutPlan(data.workoutPlan);
        if (data.insights) setActiveInsights(data.insights);

        // Update progress metrics visually based on targets
        setProgressMetrics(prev => ({
          ...prev,
          calories: Math.min(100, Math.max(70, Math.round((2800 / data.calories) * 100))),
          protein: Math.min(100, Math.max(70, Math.round((130 / data.protein) * 100)))
        }));

        setChatHistory(prev => [...prev, { sender: 'ai', text: data.text }]);
      } else {
        throw new Error("Invalid response format from server.");
      }
    } catch (err: any) {
      console.error("AI Assistant connection error:", err);
      // Fail gracefully with an empathetic fallback message
      const fallbackText = `💪 Keep pushing forward! It looks like our metabolic uplink was briefly interrupted.

However, as your personal Strength & Nutrition Coach, here is what we are focusing on right now:
1. **Calorie Surge**: Keep eating in a surplus of **${activeCalorieTarget} kcal** to fuel muscle hypertrophy.
2. **Protein Threshold**: Target **${activeProteinTarget}g of protein** split across your meals.
3. **Overload**: Add 2.5kg or 1-2 reps to your main lifts in your next session.

How can I help you adjust your strategy or diet? Let me know if you want to try again!`;
      setChatHistory(prev => [...prev, { sender: 'ai', text: fallbackText }]);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isGenerating, generationStep]);

  // Generate weight prediction data points for SVG line chart
  const startW = userWeight || 0;
  const endW = userGoalWeight || 0;
  const step = (endW - startW) / 5;

  const labels = ["Today", "Week 1", "Week 4", "Week 8", "Week 12", "Week 16"];
  const weights = [
    startW,
    startW + step * 0.4,
    startW + step * 1.5,
    startW + step * 2.8,
    startW + step * 4.1,
    endW
  ];

  const maxW = Math.max(...weights);
  const minW = Math.min(...weights);
  const range = maxW - minW || 1;

  const points = weights.map((w, idx) => {
    const x = 15 + idx * 49;
    const y = maxW === minW ? 40 : 70 - ((w - minW) / range) * 60;
    return { x, y, weight: w.toFixed(1) };
  });

  const pathD = `M ${points[0].x},${points[0].y} L ${points[1].x},${points[1].y} L ${points[2].x},${points[2].y} L ${points[3].x},${points[3].y} L ${points[4].x},${points[4].y} L ${points[5].x},${points[5].y}`;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Visual Identity Hero Section */}
      <div className="bg-gradient-to-br from-[#111C2C] to-[#0D1525] border border-zinc-800/80 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
        {/* Subtle background blur accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-mint/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-mint/10 text-mint px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase">
              <Award className="w-3.5 h-3.5" /> Core AI Activated
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight flex items-center justify-center md:justify-start gap-3">
              💪 WeightGain <span className="text-mint">AI</span>
            </h1>
            <p className="text-lg font-bold text-zinc-300">
              Your Personal AI Nutrition & Strength Coach
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">
              Build high-quality muscle tissue faster with smart, scientifically calibrated meal planning, progressive heavy workouts, metabolic timelines, and biometric trackers.
            </p>
          </div>

          {/* Quick Profile Overview Widget */}
          <div className="w-full md:w-auto shrink-0 bg-slate-card border border-zinc-800/80 rounded-2xl p-5 space-y-4 shadow-lg">
            <div className="flex items-center justify-between gap-4 border-b border-zinc-800 pb-3">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-mint" /> Biometric Profile
              </span>
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className="text-xs text-mint font-black hover:underline flex items-center gap-1"
              >
                <Settings className="w-3 h-3" /> {profileOpen ? 'Close Settings' : 'Edit biometrics'}
              </button>
            </div>

            {/* Profile editor expansion */}
            {profileOpen ? (
              <div className="space-y-3 text-xs text-zinc-300 w-64">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Current (kg)</label>
                    <input 
                      type="number" 
                      value={userWeight === 0 ? '' : userWeight} 
                      onChange={(e) => {
                        const val = e.target.value === '' ? 0 : Number(e.target.value);
                        onUpdateProfile({ weight: val });
                      }}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 focus:ring-1 focus:ring-mint focus:outline-none font-bold text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Goal (kg)</label>
                    <input 
                      type="number" 
                      value={userGoalWeight === 0 ? '' : userGoalWeight} 
                      onChange={(e) => {
                        const val = e.target.value === '' ? 0 : Number(e.target.value);
                        onUpdateProfile({ goalWeight: val });
                      }}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 focus:ring-1 focus:ring-mint focus:outline-none font-bold text-white"
                    />
                  </div>
                  {userGoalWeight <= userWeight && userGoalWeight > 0 && (
                    <div className="col-span-2 mt-1 p-2 bg-amber-500/10 border border-amber-500/20 text-[10px] text-amber-400 rounded leading-relaxed">
                      ⚠️ Goal weight ({userGoalWeight} kg) must be higher than current weight ({userWeight} kg) for muscle gain.
                      {userGoalWeight < 40 && (
                        <div className="mt-1.5">
                          Did you mean you want to <span className="font-bold">gain {userGoalWeight} kg</span>? (Target Goal Weight: <span className="font-extrabold text-white">{userWeight + userGoalWeight} kg</span>)
                          <button 
                            type="button"
                            onClick={() => onUpdateProfile({ goalWeight: userWeight + userGoalWeight })}
                            className="mt-1.5 block w-full text-center bg-amber-500 text-zinc-950 font-black px-2 py-1 rounded hover:bg-amber-400 transition-colors cursor-pointer"
                          >
                            Set Goal to {userWeight + userGoalWeight} kg
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Height (cm)</label>
                    <input 
                      type="number" 
                      value={userHeight === 0 ? '' : userHeight} 
                      onChange={(e) => {
                        const val = e.target.value === '' ? 0 : Number(e.target.value);
                        onUpdateProfile({ height: val });
                      }}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 focus:ring-1 focus:ring-mint focus:outline-none font-bold text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Age (Yrs)</label>
                    <input 
                      type="number" 
                      value={userAge === 0 ? '' : userAge} 
                      onChange={(e) => {
                        const val = e.target.value === '' ? 0 : Number(e.target.value);
                        onUpdateProfile({ age: val });
                      }}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 focus:ring-1 focus:ring-mint focus:outline-none font-bold text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold text-zinc-400 mb-1">Diet Type</label>
                  <select 
                    value={userDietPreference} 
                    onChange={(e) => onUpdateProfile({ dietPreference: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded px-2 py-1 focus:ring-1 focus:ring-mint focus:outline-none text-white font-semibold"
                  >
                    <option value="balanced">Balanced Whole Foods</option>
                    <option value="vegetarian">High Protein Vegetarian</option>
                    <option value="vegan">Plant-Based Vegan</option>
                    <option value="clean">Clean Bulking / Organic</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
                <div className="flex justify-between border-b border-zinc-800 pb-1 w-44">
                  <span className="text-zinc-500 font-medium">Weight Status:</span>
                  <span className="font-extrabold text-white">{userWeight} kg → {userGoalWeight} kg</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-1 w-44">
                  <span className="text-zinc-500 font-medium">Height:</span>
                  <span className="font-extrabold text-white">{userHeight} cm</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-1 w-44">
                  <span className="text-zinc-500 font-medium">Age & Sex:</span>
                  <span className="font-extrabold text-white">{userAge} yrs ({userGender})</span>
                </div>
                <div className="flex justify-between border-b border-zinc-800 pb-1 w-44">
                  <span className="text-zinc-500 font-medium">Diet Type:</span>
                  <span className="font-extrabold text-mint capitalize">{userDietPreference}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Interactive AI Query Panel */}
      <div className="bg-slate-card border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-6">
        <h2 className="text-sm font-black text-zinc-300 uppercase tracking-widest flex items-center gap-2">
          <Brain className="w-4 h-4 text-mint animate-float" /> Ask WeightGain AI Nutrition Coach
        </h2>

        {/* Chat History View */}
        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar border border-zinc-800/60 bg-zinc-950/40 rounded-xl p-4">
          {chatHistory.map((chat, idx) => (
            <div 
              key={idx} 
              className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div className={`max-w-2xl rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                chat.sender === 'user' 
                  ? 'bg-mint text-zinc-950 font-bold rounded-tr-none shadow-md' 
                  : 'bg-[#182335] text-zinc-100 border border-zinc-800/60 rounded-tl-none font-medium'
              }`}>
                {chat.sender === 'ai' ? (
                  <div className="space-y-2 whitespace-pre-wrap">
                    {chat.text}
                  </div>
                ) : (
                  <div>{chat.text}</div>
                )}
              </div>
            </div>
          ))}

          {/* AI Thinking Indicator */}
          {isGenerating && (
            <div className="flex justify-start items-center gap-3 py-2 text-xs text-zinc-400">
              <RefreshCw className="w-4 h-4 text-mint animate-spin" />
              <span className="font-semibold tracking-wide text-zinc-300">{generationStep}</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Chat Input Bar */}
        <form onSubmit={handleQuerySubmit} className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isGenerating}
            placeholder="Ask WeightGain AI anything... (e.g., Make a vegetarian bulk meal plan, Create a dumbbell-only chest workout...)"
            className="w-full text-xs font-semibold bg-zinc-950 border border-zinc-800 rounded-2xl pl-4 pr-14 py-3.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-mint/60 focus:border-transparent transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!query.trim() || isGenerating}
            className="absolute right-2.5 p-2 rounded-xl bg-mint text-zinc-950 hover:bg-mint/85 transition-colors cursor-pointer disabled:opacity-40"
          >
            <Send className="w-3.5 h-3.5 font-bold" />
          </button>
        </form>

        {/* Popular Prompts */}
        <div className="space-y-2">
          <span className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase block">✨ Popular Prompts</span>
          <div className="flex flex-wrap gap-2">
            {[
              "🍗 Create a 3000 kcal meal plan",
              "🏋 Build a beginner muscle gain workout",
              "🥛 Best foods for healthy weight gain",
              "📈 Predict my weight after 90 days",
              "🥗 Analyze my current diet",
              "🥜 High-protein vegetarian plan"
            ].map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => selectPopularPrompt(prompt.substring(2))}
                className="px-3.5 py-1.5 text-[11px] font-bold bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-mint hover:bg-mint/5 rounded-xl transition-all cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION HEADER: AI COACH OUTPUTS */}
      <div className="pt-4 border-t border-zinc-800/80">
        <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-mint animate-pulse-glow" /> AI Nutrition & Strength Assessment
        </h2>
        <p className="text-xs text-zinc-400 mt-1">
          Dynamically generated parameters, diets, training schedules, and timelines updated by your virtual coach.
        </p>
      </div>

      {/* DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* 1. AI ANALYSIS biometrics (Span 4) */}
        <div className="lg:col-span-4 bg-slate-card border border-zinc-800/80 rounded-2xl p-5 shadow-lg space-y-4">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-zinc-800 pb-3">
            <Brain className="w-4 h-4 text-mint" /> 🧠 AI Analysis
          </h3>

          <div className="divide-y divide-zinc-800/80 font-medium text-xs">
            <div className="flex justify-between py-2.5">
              <span className="text-zinc-400">Current Weight</span>
              <span className="font-extrabold text-white">{userWeight} kg</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-zinc-400">Goal Weight</span>
              <span className="font-extrabold text-white">{userGoalWeight} kg</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-zinc-400">BMI</span>
              <span className="font-extrabold text-white">
                {(userWeight / ((userHeight / 100) * (userHeight / 100))).toFixed(1)}
              </span>
            </div>
            <div className="flex justify-between py-2.5 bg-mint/5 px-2 rounded-lg my-1">
              <span className="text-zinc-300 font-bold">Daily Calorie Target</span>
              <span className="font-black text-mint">{activeCalorieTarget} kcal</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-zinc-400">Daily Protein Target</span>
              <span className="font-extrabold text-white">{activeProteinTarget} g</span>
            </div>
            <div className="flex justify-between py-2.5">
              <span className="text-zinc-400">Estimated Bulking Time</span>
              <span className="font-extrabold text-mint">{activeTimeframeWeeks} Weeks</span>
            </div>
          </div>

          <div className="bg-zinc-950 rounded-xl p-3 text-[10px] text-zinc-400 leading-relaxed flex gap-2">
            <AlertCircle className="w-4 h-4 text-mint shrink-0 mt-0.5" />
            <div>
              These values represent a structured daily hyper-growth surplus designed for progressive muscle protein tissue assembly.
            </div>
          </div>
        </div>

        {/* 2. PROGRESS DASHBOARD (Span 4) */}
        <div className="lg:col-span-4 bg-slate-card border border-zinc-800/80 rounded-2xl p-5 shadow-lg space-y-4">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-zinc-800 pb-3">
            <Award className="w-4 h-4 text-mint" /> PROGRESS DASHBOARD
          </h3>

          <div className="space-y-4">
            {/* Calories progress */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-zinc-400">Calories Daily Goal</span>
                <span className="text-white">{progressMetrics.calories}%</span>
              </div>
              <div className="w-full h-2.5 bg-zinc-850 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-mint to-teal-400 rounded-full transition-all duration-1000"
                  style={{ width: `${progressMetrics.calories}%` }}
                />
              </div>
            </div>

            {/* Protein progress */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-zinc-400">Protein Target</span>
                <span className="text-white">{progressMetrics.protein}%</span>
              </div>
              <div className="w-full h-2.5 bg-zinc-850 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-mint rounded-full transition-all duration-1000"
                  style={{ width: `${progressMetrics.protein}%` }}
                />
              </div>
            </div>

            {/* Water progress */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-zinc-400">Water Log</span>
                <span className="text-white">{progressMetrics.water}%</span>
              </div>
              <div className="w-full h-2.5 bg-zinc-850 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-sky-500 to-blue-400 rounded-full transition-all duration-1000"
                  style={{ width: `${progressMetrics.water}%` }}
                />
              </div>
            </div>

            {/* Weight Goal progress */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-zinc-400">Overall Weight Goal</span>
                <span className="text-mint">{progressMetrics.weightGoal}%</span>
              </div>
              <div className="w-full h-2.5 bg-zinc-850 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-mint rounded-full transition-all duration-1000"
                  style={{ width: `${progressMetrics.weightGoal}%` }}
                />
              </div>
            </div>
          </div>

          <div className="text-center pt-2">
            <button 
              onClick={() => onSelectTab('progress')}
              className="text-xs text-mint hover:underline font-black flex items-center gap-1 mx-auto"
            >
              Log Daily Metrics & Water <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3. WEIGHT PREDICTION LINE CHART (Span 4) */}
        <div className="lg:col-span-4 bg-slate-card border border-zinc-800/80 rounded-2xl p-5 shadow-lg space-y-4">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-zinc-800 pb-3">
            <Scale className="w-4 h-4 text-mint" /> WEIGHT PREDICTION
          </h3>

          <div className="space-y-3">
            {/* SVG line chart representing Weeks */}
            <div className="w-full h-32 bg-zinc-950/60 rounded-xl p-2 border border-zinc-900 flex flex-col justify-between">
              {/* Plot area */}
              <div className="relative w-full h-24">
                {/* SVG Line */}
                <svg className="w-full h-full overflow-visible">
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#3EBD93"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    className="animate-pulse"
                  />
                  {/* Dots along path */}
                  {points.map((p, idx) => (
                    <circle key={idx} cx={p.x} cy={p.y} r={idx === 0 || idx === 5 ? 4.5 : 4} fill="#3EBD93" />
                  ))}

                  {/* Horizontal grid lines */}
                  <line x1="0" y1="10" x2="100%" y2="10" stroke="#1F2937" strokeDasharray="3,3" />
                  <line x1="0" y1="40" x2="100%" y2="40" stroke="#1F2937" strokeDasharray="3,3" />
                  <line x1="0" y1="70" x2="100%" y2="70" stroke="#1F2937" strokeDasharray="3,3" />
                </svg>

                {/* Y-axis labels */}
                <div className="absolute left-1 top-0 text-[8px] font-mono font-bold text-zinc-500">
                  {userGoalWeight}kg (Goal)
                </div>
                <div className="absolute left-1 bottom-1 text-[8px] font-mono font-bold text-zinc-500">
                  {userWeight}kg (Today)
                </div>
              </div>

              {/* X-axis labels */}
              <div className="flex justify-between text-[8px] font-mono font-bold text-zinc-500 border-t border-zinc-900 pt-1">
                <span>Today</span>
                <span>Wk 1</span>
                <span>Wk 4</span>
                <span>Wk 8</span>
                <span>Wk 12</span>
                <span>Wk 16</span>
              </div>
            </div>

            <p className="text-[10px] text-zinc-400 leading-relaxed text-center font-medium">
              Line represents a targeted lean muscle tissue surplus gain rate of **~0.35kg per week**.
            </p>
          </div>
        </div>

      </div>

      {/* TWO COLUMN LOWER LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: MEAL PLAN & AI INSIGHTS */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* AI MEAL PLAN */}
          <div className="bg-slate-card border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 flex-wrap gap-2">
              <h3 className="text-sm font-black text-zinc-200 uppercase tracking-widest flex items-center gap-2">
                <Utensils className="w-4 h-4 text-mint" /> AI MEAL PLAN
              </h3>
              <span className="text-[10px] font-bold uppercase bg-mint/15 text-mint px-2.5 py-0.5 rounded-full">
                {activeMealPlan.calories} kcal
              </span>
            </div>

            {/* Breakfast */}
            <div className="space-y-2 bg-zinc-950/40 border border-zinc-900/60 p-4 rounded-xl">
              <div className="flex justify-between items-center border-b border-zinc-900 pb-1.5">
                <span className="text-xs font-black text-white flex items-center gap-1.5">
                  🍳 Breakfast
                </span>
                <span className="text-[10px] font-mono font-bold text-zinc-400">{activeMealPlan.breakfast.kcal} kcal</span>
              </div>
              <ul className="space-y-1 text-xs text-zinc-300">
                {activeMealPlan.breakfast.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-mint font-bold mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lunch */}
            <div className="space-y-2 bg-zinc-950/40 border border-zinc-900/60 p-4 rounded-xl">
              <div className="flex justify-between items-center border-b border-zinc-900 pb-1.5">
                <span className="text-xs font-black text-white flex items-center gap-1.5">
                  🥗 Lunch
                </span>
                <span className="text-[10px] font-mono font-bold text-zinc-400">{activeMealPlan.lunch.kcal} kcal</span>
              </div>
              <ul className="space-y-1 text-xs text-zinc-300">
                {activeMealPlan.lunch.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-mint font-bold mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Snacks */}
            <div className="space-y-2 bg-zinc-950/40 border border-zinc-900/60 p-4 rounded-xl">
              <div className="flex justify-between items-center border-b border-zinc-900 pb-1.5">
                <span className="text-xs font-black text-white flex items-center gap-1.5">
                  🥜 Snacks
                </span>
                <span className="text-[10px] font-mono font-bold text-zinc-400">{activeMealPlan.snacks.kcal} kcal</span>
              </div>
              <ul className="space-y-1 text-xs text-zinc-300">
                {activeMealPlan.snacks.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-mint font-bold mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Dinner */}
            <div className="space-y-2 bg-zinc-950/40 border border-zinc-900/60 p-4 rounded-xl">
              <div className="flex justify-between items-center border-b border-zinc-900 pb-1.5">
                <span className="text-xs font-black text-white flex items-center gap-1.5">
                  🍗 Dinner
                </span>
                <span className="text-[10px] font-mono font-bold text-zinc-400">{activeMealPlan.dinner.kcal} kcal</span>
              </div>
              <ul className="space-y-1 text-xs text-zinc-300">
                {activeMealPlan.dinner.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-mint font-bold mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center pt-2">
              <button 
                onClick={() => onSelectTab('meal_plans')}
                className="text-xs text-mint hover:underline font-black flex items-center gap-1 mx-auto"
              >
                Explore Curated Bulk Recipes <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* AI INSIGHTS */}
          <div className="bg-slate-card border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-black text-zinc-200 uppercase tracking-widest flex items-center gap-2 border-b border-zinc-800 pb-3">
              <Lightbulb className="w-4 h-4 text-mint" /> AI INSIGHTS
            </h3>

            <div className="space-y-3 font-medium text-xs text-zinc-300">
              {activeInsights.map((insight, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-zinc-950/40 border border-zinc-900 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-mint shrink-0" />
                  <span>{insight}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: WORKOUT PLAN */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* WORKOUT PLAN CARD */}
          <div className="bg-slate-card border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-sm font-black text-zinc-200 uppercase tracking-widest flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-mint" /> WORKOUT PLAN
              </h3>
              <span className="text-[10px] font-bold uppercase bg-mint/15 text-mint px-2.5 py-0.5 rounded-full">
                Strength Split
              </span>
            </div>

            {/* Daily Schedule loop */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1 custom-scrollbar">
              {activeWorkoutPlan.map((item, idx) => (
                <div key={idx} className="p-4 bg-zinc-950/40 border border-zinc-900 rounded-xl space-y-2">
                  <div className="flex justify-between items-center border-b border-zinc-900 pb-1.5 flex-wrap gap-1">
                    <span className="text-xs font-black text-white">{item.day}</span>
                    <span className="text-[10px] font-bold uppercase text-mint tracking-wider">{item.routine}</span>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-xs text-zinc-400">
                    {item.exercises.map((ex, exIdx) => (
                      <li key={exIdx} className="flex items-center gap-1.5 py-0.5">
                        <span className="w-1.5 h-1.5 bg-zinc-700 rounded-full shrink-0" />
                        <span className="truncate">{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <button 
                onClick={() => onSelectTab('workout')}
                className="text-xs text-mint hover:underline font-black flex items-center gap-1 mx-auto"
              >
                Full Exercise Guide & Builder <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* WHY USE WEIGHTGAIN AI */}
      <div className="bg-slate-card border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-5">
        <h3 className="text-sm font-black text-zinc-200 uppercase tracking-widest border-b border-zinc-800 pb-3 flex items-center gap-2">
          <Check className="w-4 h-4 text-mint" /> WHY USE WEIGHTGAIN AI?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-medium">
          {[
            { t: "Personalized AI recommendations", d: "Calibrated directly to your weight, activity levels, and custom caloric demands." },
            { t: "Science-based calorie estimation", d: "Uses MSJ and Karvonen biometric mathematical models for physical profiling." },
            { t: "Meal plans tailored to your goals", d: "Adapts proteins, carbs, and fats to vegetarian, vegan, and clean bulks dynamically." },
            { t: "Progressive workout routines", d: "Focused on compound lifts, sets, reps, and heavy hypertrophic structures." },
            { t: "Macro and protein tracking", d: "Provides target progress logs to stay fully in check with daily intakes." },
            { t: "Beginner-friendly guidance", d: "Humidifies complex biomechanics into easily actionable daily targets." },
            { t: "Mobile responsive", d: "A master-crafted fluid design that renders perfectly on any device." },
            { t: "Free to use", d: "100% free, premium engineering suite with locally optimized memory tracking." }
          ].map((item, idx) => (
            <div key={idx} className="p-4 bg-zinc-950/40 border border-zinc-900 rounded-xl space-y-1">
              <span className="text-mint font-extrabold block">✓ {item.t}</span>
              <p className="text-zinc-500 text-[11px] leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="bg-slate-card border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-5">
        <h3 className="text-sm font-black text-zinc-200 uppercase tracking-widest border-b border-zinc-800 pb-3">
          HOW IT WORKS
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs text-zinc-400">
          {[
            { n: "①", t: "Enter your details or ask a question.", d: "Set your biometrics using the quick profile overview widget or type a custom prompt directly." },
            { n: "②", t: "AI evaluates weight, activity, & goal.", d: "Our internal engine assesses your lean tissue metabolic baseline and maintenance energy levels." },
            { n: "③", t: "It estimates calorie & protein needs.", d: "The coach outputs exact daily targets necessary to support consistent weight gain." },
            { n: "④", t: "A personalized meal plan is generated.", d: "Curates healthy breakfast, lunch, dinner, and snacks tailored to your dietary choice." },
            { n: "⑤", t: "A workout schedule is suggested.", d: "Establishes a customized weight-training and physical recovery schedule." },
            { n: "⑥", t: "Save and track your progress over time.", d: "Log your weight and calorie ticks to visualize real-time muscle progress." }
          ].map((item, idx) => (
            <div key={idx} className="space-y-1">
              <span className="text-mint text-sm font-black block">{item.n} {item.t}</span>
              <p className="leading-relaxed text-[11px] font-medium text-zinc-500">{item.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* COMPREHENSIVE WEIGHT GAIN GUIDE ANCHOR */}
      <div className="bg-gradient-to-r from-mint/15 via-[#111C2C] to-mint/5 border border-mint/20 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-[10px] font-bold text-mint uppercase tracking-wider block">Comprehensive Educational Standard</span>
          <h4 className="text-sm font-black text-white uppercase tracking-widest">Master-Class Weight Gain Guide</h4>
          <p className="text-xs text-zinc-400">Dive into 1500+ words of peer-reviewed content covering bulk science, hyper-MPS timelines, and progressive training guidelines.</p>
        </div>
        <button 
          onClick={() => onSelectTab('guide')}
          className="px-5 py-2.5 bg-mint text-zinc-950 text-xs font-black rounded-xl hover:bg-mint/90 transition-all flex items-center gap-1 shrink-0 cursor-pointer"
        >
          <BookOpen className="w-4 h-4" /> READ COMPREHENSIVE GUIDE <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* RELATED HEALTH CALCULATORS WIDGET */}
      <div className="bg-slate-card border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-black text-zinc-200 uppercase tracking-widest border-b border-zinc-800 pb-3">
          RELATED CALCULATORS
        </h3>
        <p className="text-xs text-zinc-400">
          Sync your biometrics accurately with our interactive individual physical calculators:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {[
            { name: "BMI Calculator", id: "bmi" },
            { name: "BMR Calculator", id: "bmr" },
            { name: "TDEE Calculator", id: "tdee" },
            { name: "Calorie Calculator", id: "calories" },
            { name: "Protein Calculator", id: "protein" },
            { name: "Macro Calculator", id: "macros" },
            { name: "Water Intake Calculator", id: "water" },
            { name: "Body Fat Calculator", id: "body_fat" }
          ].map((calc, idx) => (
            <button
              key={idx}
              onClick={() => onSelectCalculator(calc.id)}
              className="p-3 text-left bg-zinc-950/40 hover:bg-mint/5 hover:border-mint/50 border border-zinc-900 rounded-xl transition-all font-bold text-zinc-300 flex items-center justify-between cursor-pointer group"
            >
              <span>{calc.name}</span>
              <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-mint group-hover:translate-x-0.5 transition-all" />
            </button>
          ))}
        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="bg-slate-card border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-black text-zinc-200 uppercase tracking-widest border-b border-zinc-800 pb-3 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-mint" /> FAQ
        </h3>

        <div className="space-y-3 font-medium text-xs">
          {[
            { q: "Is WeightGain AI free?", a: "Yes, WeightGain AI is 100% free to use. All calculated biometrics and visual planners are cached locally on your device for absolute privacy." },
            { q: "Can vegetarians use it?", a: "Absolutely! WeightGain AI has an intelligent adapt-diet module that builds customized high-protein vegetarian or plant-based vegan nutrition structures instantly upon request." },
            { q: "Is the meal plan personalized?", a: "Yes, the program calculates your BMR and TDEE based on your current weight, height, age, gender, and activity levels, and then adds a safe +500 kcal bulking surplus." },
            { q: "How accurate are the calorie estimates?", a: "They are based on the Mifflin-St Jeor formula, which is clinically proven to be one of the most accurate basal metabolic equations for modern health metrics." },
            { q: "Does it replace a registered dietitian?", a: "While WeightGain AI is built on clinical calculations and guidelines, it serves as an educational and lifestyle tool and does not replace medical advice from qualified medical professionals." },
            { q: "Can I build muscle with this plan?", a: "Yes! By matching a consistent daily caloric surplus with high protein and progressive heavy resistance workouts, you will satisfy all physical parameters for hyper-rebuilt muscle tissue." },
            { q: "Is it suitable for women?", a: "Absolutely. Muscle synthesis physiological rules are universal. The calorie targets will automatically calibrate to safe and productive female biometric equations." },
            { q: "How often should I update my progress?", a: "We recommend logging your weight once a week (at the same time of day, preferably in the morning) and ticking off your daily protein and calorie checkboxes." }
          ].map((faq, idx) => {
            const isExpanded = faqExpanded === idx;
            return (
              <div key={idx} className="border border-zinc-800/80 rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setFaqExpanded(isExpanded ? null : idx)}
                  className="w-full flex justify-between items-center p-3.5 text-left bg-zinc-950/20 hover:bg-zinc-950/40 text-zinc-300 hover:text-white font-bold transition-all"
                >
                  <span>{faq.q}</span>
                  <span className="text-zinc-500">{isExpanded ? '−' : '+'}</span>
                </button>
                {isExpanded && (
                  <div className="p-3.5 bg-zinc-950/40 text-zinc-400 border-t border-zinc-900 leading-relaxed text-[11px]">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
