import React, { useState, useMemo } from 'react';
import { Scale, Flame, Droplet, Baby, HeartPulse, User, Plus, Trash, Check, Sparkles, Info, HelpCircle } from 'lucide-react';

interface PercentileData {
  age: number;
  p5: number;
  p50: number;
  p85: number;
  p95: number;
}

const boysPercentiles: PercentileData[] = [
  { age: 2, p5: 14.5, p50: 16.3, p85: 18.0, p95: 19.3 },
  { age: 3, p5: 14.1, p50: 15.7, p85: 17.3, p95: 18.4 },
  { age: 4, p5: 13.8, p50: 15.3, p85: 16.9, p95: 17.9 },
  { age: 5, p5: 13.5, p50: 15.2, p85: 16.9, p95: 18.0 },
  { age: 6, p5: 13.5, p50: 15.2, p85: 17.0, p95: 18.4 },
  { age: 7, p5: 13.6, p50: 15.4, p85: 17.4, p95: 19.1 },
  { age: 8, p5: 13.7, p50: 15.7, p85: 17.9, p95: 20.0 },
  { age: 9, p5: 13.9, p50: 16.1, p85: 18.6, p95: 21.0 },
  { age: 10, p5: 14.2, p50: 16.6, p85: 19.3, p95: 22.1 },
  { age: 11, p5: 14.5, p50: 17.2, p85: 20.1, p95: 23.2 },
  { age: 12, p5: 14.9, p50: 17.8, p85: 21.0, p95: 24.2 },
  { age: 13, p5: 15.4, p50: 18.4, p85: 21.8, p95: 25.1 },
  { age: 14, p5: 15.8, p50: 19.0, p85: 22.6, p95: 26.0 },
  { age: 15, p5: 16.3, p50: 19.6, p85: 23.4, p95: 26.8 },
  { age: 16, p5: 16.8, p50: 20.3, p85: 24.2, p95: 27.6 },
  { age: 17, p5: 17.3, p50: 20.9, p85: 24.9, p95: 28.3 },
  { age: 18, p5: 17.8, p50: 21.4, p85: 25.6, p95: 29.0 },
  { age: 19, p5: 18.2, p50: 21.9, p85: 26.2, p95: 29.7 },
  { age: 20, p5: 18.5, p50: 22.4, p85: 26.8, p95: 30.0 }
];

const girlsPercentiles: PercentileData[] = [
  { age: 2, p5: 14.1, p50: 16.0, p85: 17.7, p95: 19.1 },
  { age: 3, p5: 13.8, p50: 15.4, p85: 17.1, p95: 18.3 },
  { age: 4, p5: 13.4, p50: 15.0, p85: 16.8, p95: 18.0 },
  { age: 5, p5: 13.1, p50: 14.8, p85: 16.8, p95: 18.1 },
  { age: 6, p5: 13.1, p50: 14.9, p85: 17.0, p95: 18.8 },
  { age: 7, p5: 13.1, p50: 15.2, p85: 17.6, p95: 19.6 },
  { age: 8, p5: 13.3, p50: 15.6, p85: 18.3, p95: 20.6 },
  { age: 9, p5: 13.6, p50: 16.1, p85: 19.1, p95: 21.7 },
  { age: 10, p5: 14.0, p50: 16.8, p85: 19.9, p95: 22.9 },
  { age: 11, p5: 14.4, p50: 17.4, p85: 20.8, p95: 24.1 },
  { age: 12, p5: 14.8, p50: 18.0, p85: 21.7, p95: 25.2 },
  { age: 13, p5: 15.3, p50: 18.7, p85: 22.5, p95: 26.3 },
  { age: 14, p5: 15.9, p50: 19.3, p85: 23.3, p95: 27.2 },
  { age: 15, p5: 16.3, p50: 19.9, p85: 24.0, p95: 28.1 },
  { age: 16, p5: 16.8, p50: 20.5, p85: 24.7, p95: 28.9 },
  { age: 17, p5: 17.1, p50: 21.0, p85: 25.2, p95: 29.6 },
  { age: 18, p5: 17.3, p50: 21.3, p85: 25.7, p95: 30.2 },
  { age: 19, p5: 17.6, p50: 21.6, p85: 26.1, p95: 30.6 },
  { age: 20, p5: 18.5, p50: 22.4, p85: 26.8, p95: 30.0 }
];

const getPercentilesForAge = (targetAge: number, gender: 'male' | 'female') => {
  const dataset = gender === 'male' ? boysPercentiles : girlsPercentiles;
  const clampedAge = Math.max(2, Math.min(20, targetAge));
  
  let low = dataset[0];
  let high = dataset[dataset.length - 1];
  for (let i = 0; i < dataset.length - 1; i++) {
    if (clampedAge >= dataset[i].age && clampedAge <= dataset[i+1].age) {
      low = dataset[i];
      high = dataset[i+1];
      break;
    }
  }
  
  if (low.age === high.age) {
    return { p5: low.p5, p50: low.p50, p85: low.p85, p95: low.p95 };
  }
  
  const fraction = (clampedAge - low.age) / (high.age - low.age);
  const interpolate = (start: number, end: number) => start + (end - start) * fraction;
  
  return {
    p5: interpolate(low.p5, high.p5),
    p50: interpolate(low.p50, high.p50),
    p85: interpolate(low.p85, high.p85),
    p95: interpolate(low.p95, high.p95)
  };
};

interface HealthCalculatorsProps {
  id: string;
}

export default function HealthCalculators({ id }: HealthCalculatorsProps) {
  // Common state variables
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [weightKg, setWeightKg] = useState<number>(70);
  const [weightLbs, setWeightLbs] = useState<number>(154);
  const [heightCm, setHeightCm] = useState<number>(175);
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(9);
  const [age, setAge] = useState<number>(28);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState<number>(1.2); // 1.2=sedentary, 1.375=lightly active, 1.55=moderately active, 1.725=very active
  const [goal, setGoal] = useState<'lose_fast' | 'lose_slow' | 'maintain' | 'gain_slow' | 'gain_fast'>('maintain');

  // Water tracker specific states
  const [waterLogged, setWaterLogged] = useState<number>(0);
  const [climate, setClimate] = useState<'cold' | 'temperate' | 'hot'>('temperate');
  const [exerciseMin, setExerciseMin] = useState<number>(30);

  // Pregnancy specific states
  const [lmpDate, setLmpDate] = useState<string>('2026-03-01');
  const [cycleLength, setCycleLength] = useState<number>(28);

  // BMI reference table state & FAQ state
  const [bmiRefTab, setBmiRefTab] = useState<'adult' | 'child'>('adult');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);

  // Synchronizers between metrics
  const handleWeightChange = (val: number, sys: 'metric' | 'imperial') => {
    if (sys === 'metric') {
      setWeightKg(val);
      setWeightLbs(Math.round(val * 2.20462));
    } else {
      setWeightLbs(val);
      setWeightKg(Math.round(val / 2.20462));
    }
  };

  const handleHeightChange = (val: number, sys: 'metric' | 'ft' | 'in') => {
    if (sys === 'metric') {
      setHeightCm(val);
      const totalInches = val / 2.54;
      setHeightFt(Math.floor(totalInches / 12));
      setHeightIn(Math.round(totalInches % 12));
    } else if (sys === 'ft') {
      setHeightFt(val);
      const totalInches = val * 12 + heightIn;
      setHeightCm(Math.round(totalInches * 2.54));
    } else {
      setHeightIn(val);
      const totalInches = heightFt * 12 + val;
      setHeightCm(Math.round(totalInches * 2.54));
    }
  };

  // 1. BMI CALCULATIONS
  const bmiData = useMemo(() => {
    const w = weightKg;
    const h = heightCm / 100;
    if (h <= 0) {
      return { 
        bmi: 0, 
        status: 'Invalid', 
        color: 'bg-zinc-300', 
        textClass: 'text-zinc-500', 
        percent: 0, 
        healthyMin: 0, 
        healthyMax: 0,
        prime: 0,
        ponderal: 0,
        diffText: '',
        diffVal: 0,
        isChild: false,
        percentile: 0,
        classificationDetails: ''
      };
    }

    const bmi = w / (h * h);
    const prime = bmi / 25;
    const ponderal = w / (h * h * h);
    const isChild = age < 20;

    let status = 'Normal Weight';
    let color = 'bg-emerald-500';
    let textClass = 'text-emerald-500 dark:text-emerald-400';
    let percent = 50;
    let healthyMin = 18.5 * (h * h);
    let healthyMax = 25.0 * (h * h);
    let percentile = 0;
    let classificationDetails = '';

    if (isChild) {
      // Child logic using CDC interpolation
      const percentiles = getPercentilesForAge(age, gender);
      healthyMin = percentiles.p5 * (h * h);
      healthyMax = percentiles.p85 * (h * h);

      if (bmi < percentiles.p5) {
        status = 'Underweight';
        color = 'bg-sky-400';
        textClass = 'text-sky-500';
        // Linear mapping from 0 to p5 -> 1% to 5% percentile
        percentile = Math.max(1, Math.round((bmi / percentiles.p5) * 5));
        percent = Math.min(20, Math.max(0, (bmi / percentiles.p5) * 20));
      } else if (bmi < percentiles.p50) {
        status = 'Healthy weight';
        color = 'bg-emerald-500';
        textClass = 'text-emerald-500';
        // Linear mapping from p5 to p50 -> 5% to 50% percentile
        const fraction = (bmi - percentiles.p5) / (percentiles.p50 - percentiles.p5);
        percentile = Math.round(5 + fraction * 45);
        percent = 20 + fraction * 30;
      } else if (bmi < percentiles.p85) {
        status = 'Healthy weight';
        color = 'bg-emerald-500';
        textClass = 'text-emerald-500';
        // Linear mapping from p50 to p85 -> 50% to 85% percentile
        const fraction = (bmi - percentiles.p50) / (percentiles.p85 - percentiles.p50);
        percentile = Math.round(50 + fraction * 35);
        percent = 50 + fraction * 20;
      } else if (bmi < percentiles.p95) {
        status = 'Overweight';
        color = 'bg-amber-500';
        textClass = 'text-amber-500';
        // Linear mapping from p85 to p95 -> 85% to 95% percentile
        const fraction = (bmi - percentiles.p85) / (percentiles.p95 - percentiles.p85);
        percentile = Math.round(85 + fraction * 10);
        percent = 70 + fraction * 15;
      } else {
        status = 'Obese';
        color = 'bg-rose-500';
        textClass = 'text-rose-500';
        // Linear mapping from p95 to 40 -> 95% to 99% percentile
        const fraction = Math.min(1, (bmi - percentiles.p95) / (40 - percentiles.p95));
        percentile = Math.round(95 + fraction * 4.9);
        percent = 85 + fraction * 15;
      }
      classificationDetails = `Percentile: ${percentile}th percentile. Healthy range: 5th to 85th percentile.`;
    } else {
      // Adult logic
      healthyMin = 18.5 * (h * h);
      healthyMax = 25.0 * (h * h);

      if (bmi < 16) {
        status = 'Severe Thinness';
        color = 'bg-blue-600';
        textClass = 'text-blue-600 dark:text-blue-400';
        percent = Math.min(12, Math.max(0, ((bmi - 10) / (16 - 10)) * 12));
      } else if (bmi >= 16 && bmi < 17) {
        status = 'Moderate Thinness';
        color = 'bg-blue-500';
        textClass = 'text-blue-500 dark:text-blue-400';
        percent = 12 + ((bmi - 16) / (17 - 16)) * 6;
      } else if (bmi >= 17 && bmi < 18.5) {
        status = 'Mild Thinness';
        color = 'bg-sky-450';
        textClass = 'text-sky-500';
        percent = 18 + ((bmi - 17) / (18.5 - 17)) * 7;
      } else if (bmi >= 18.5 && bmi < 25) {
        status = 'Normal';
        color = 'bg-emerald-500';
        textClass = 'text-emerald-500';
        percent = 25 + ((bmi - 18.5) / (25 - 18.5)) * 25;
      } else if (bmi >= 25 && bmi < 30) {
        status = 'Overweight';
        color = 'bg-amber-500';
        textClass = 'text-amber-500';
        percent = 50 + ((bmi - 25) / (30 - 25)) * 25;
      } else if (bmi >= 30 && bmi < 35) {
        status = 'Obese Class I';
        color = 'bg-orange-500';
        textClass = 'text-orange-500';
        percent = 75 + ((bmi - 30) / (35 - 30)) * 8;
      } else if (bmi >= 35 && bmi < 40) {
        status = 'Obese Class II';
        color = 'bg-rose-500';
        textClass = 'text-rose-500';
        percent = 83 + ((bmi - 35) / (40 - 35)) * 8;
      } else {
        status = 'Obese Class III';
        color = 'bg-rose-700';
        textClass = 'text-rose-700';
        percent = 91 + Math.min(9, ((bmi - 40) / (50 - 40)) * 9);
      }
    }

    // Recommended weight difference
    let diffText = '';
    let diffVal = 0;
    if (w < healthyMin) {
      diffVal = healthyMin - w;
      diffText = `gain ${unitSystem === 'metric' ? `${diffVal.toFixed(1)} kg` : `${(diffVal * 2.20462).toFixed(1)} lbs`}`;
    } else if (w > healthyMax) {
      diffVal = w - healthyMax;
      diffText = `lose ${unitSystem === 'metric' ? `${diffVal.toFixed(1)} kg` : `${(diffVal * 2.20462).toFixed(1)} lbs`}`;
    }

    return {
      bmi: isFinite(bmi) ? bmi : 0,
      status,
      color,
      textClass,
      percent: isFinite(percent) ? percent : 50,
      healthyMin: isFinite(healthyMin) ? healthyMin : 0,
      healthyMax: isFinite(healthyMax) ? healthyMax : 0,
      prime: isFinite(prime) ? prime : 0,
      ponderal: isFinite(ponderal) ? ponderal : 0,
      diffText,
      diffVal,
      isChild,
      percentile,
      classificationDetails
    };
  }, [weightKg, heightCm, age, gender, unitSystem]);

  // 2. CALORIES & TDEE / BMR CALCULATIONS
  const calorieData = useMemo(() => {
    // Mifflin-St Jeor Formula
    const w = weightKg;
    const h = heightCm;
    const a = age;
    let bmr = 0;

    if (gender === 'male') {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    const tdee = bmr * activity;

    // Weight goals calorie offsets
    let deficit = 0;
    if (goal === 'lose_fast') deficit = -1000;
    else if (goal === 'lose_slow') deficit = -500;
    else if (goal === 'gain_slow') deficit = 300;
    else if (goal === 'gain_fast') deficit = 600;

    const recommendedCalories = Math.max(1200, tdee + deficit);

    // Estimate daily macro split for average person (45% carbs, 30% protein, 25% fats)
    const totalGrams = recommendedCalories;
    const proteinGrams = Math.round((recommendedCalories * 0.30) / 4);
    const carbsGrams = Math.round((recommendedCalories * 0.45) / 4);
    const fatsGrams = Math.round((recommendedCalories * 0.25) / 9);

    return {
      bmr: isFinite(bmr) ? bmr : 0,
      tdee: isFinite(tdee) ? tdee : 0,
      recommended: isFinite(recommendedCalories) ? recommendedCalories : 0,
      proteinGrams,
      carbsGrams,
      fatsGrams
    };
  }, [weightKg, heightCm, age, gender, activity, goal]);

  // 3. WATER CALCULATIONS
  const waterTargetOunces = useMemo(() => {
    // Basic weight logic: 0.5 oz of water per pound of body weight
    let oz = weightLbs * 0.5;

    // Adjust for exercise: 12 oz for every 30 mins of exercise
    oz += (exerciseMin / 30) * 12;

    // Adjust for climate
    if (climate === 'hot') oz += 20;
    else if (climate === 'cold') oz -= 8;

    return Math.max(40, oz);
  }, [weightLbs, exerciseMin, climate]);

  const waterTargetMl = useMemo(() => {
    return Math.round(waterTargetOunces * 29.5735);
  }, [waterTargetOunces]);

  const waterLoggedPercent = useMemo(() => {
    const pct = (waterLogged / waterTargetMl) * 100;
    return isFinite(pct) ? Math.min(100, Math.round(pct)) : 0;
  }, [waterLogged, waterTargetMl]);

  // 4. PREGNANCY DUE DATE CALCULATIONS
  const pregnancyData = useMemo(() => {
    // Naegele's rule: LMP + 280 days
    const lmp = new Date(lmpDate);
    if (isNaN(lmp.getTime())) return null;

    // Due date
    const due = new Date(lmp.getTime());
    due.setDate(due.getDate() + 280);

    // Adjust for cycle length difference from average 28 days
    due.setDate(due.getDate() + (cycleLength - 28));

    // Today's date reference
    const today = new Date();
    const msDiff = today.getTime() - lmp.getTime();
    const daysPregnant = Math.max(0, Math.floor(msDiff / (1000 * 60 * 60 * 24)));
    const weeksPregnant = Math.floor(daysPregnant / 7);
    const remainingDays = daysPregnant % 7;

    const progressPercent = Math.min(100, Math.round((daysPregnant / 280) * 100));

    // Trimester
    let trimester = 'First Trimester';
    if (weeksPregnant >= 13 && weeksPregnant < 27) {
      trimester = 'Second Trimester';
    } else if (weeksPregnant >= 27) {
      trimester = 'Third Trimester';
    }

    // Countdown days
    const msToDue = due.getTime() - today.getTime();
    const daysToDue = Math.max(0, Math.ceil(msToDue / (1000 * 60 * 60 * 24)));

    return {
      dueDate: due.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      weeksPregnant,
      remainingDays,
      daysPregnant,
      progressPercent,
      trimester,
      daysToDue
    };
  }, [lmpDate, cycleLength]);

  // 5. CARDIOVASCULAR HEART RATE ZONES (Karvonen or Max HR)
  const heartRateData = useMemo(() => {
    // Fox Formula: Max HR = 220 - Age
    const maxHR = 220 - age;

    const zones = [
      { name: 'Warm Up / Health', range: '50% – 60%', min: Math.round(maxHR * 0.5), max: Math.round(maxHR * 0.6), desc: 'Promotes general metabolic recovery and cardiovascular stamina.', color: 'border-l-sky-500' },
      { name: 'Fat Burn / Fitness', range: '60% – 70%', min: Math.round(maxHR * 0.6), max: Math.round(maxHR * 0.7), desc: 'Ideal zone for energy burn, weight loss, and fundamental endurance.', color: 'border-l-emerald-500' },
      { name: 'Aerobic / Endurance', range: '70% – 80%', min: Math.round(maxHR * 0.7), max: Math.round(maxHR * 0.8), desc: 'Improves oxygen capacity, muscle performance, and cardiovascular stamina.', color: 'border-l-amber-500' },
      { name: 'Anaerobic / Performance', range: '80% – 90%', min: Math.round(maxHR * 0.8), max: Math.round(maxHR * 0.9), desc: 'Increases lactate threshold, short-burst speed, and athletic output.', color: 'border-l-rose-500' },
    ];

    return {
      maxHR,
      zones
    };
  }, [age]);

  return (
    <div className="space-y-6">
      {/* Dynamic Unit System Selector (used for BMI/Calories/Water) */}
      {(id === 'bmi' || id === 'calories' || id === 'bmr' || id === 'tdee' || id === 'ideal_weight' || id === 'body_fat') && (
        <div className="flex justify-end">
          <div className="inline-flex rounded-md shadow-xs bg-zinc-100 dark:bg-zinc-850 p-1" role="group">
            <button
              onClick={() => setUnitSystem('metric')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                unitSystem === 'metric' ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              Metric Units (cm/kg)
            </button>
            <button
              onClick={() => setUnitSystem('imperial')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                unitSystem === 'imperial' ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs' : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
              }`}
            >
              Imperial Units (ft/lbs)
            </button>
          </div>
        </div>
      )}

      {/* 1. BMI CALCULATOR PANEL */}
      {id === 'bmi' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Inputs Column */}
            <div className="lg:col-span-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm space-y-6">
              <div className="border-b border-zinc-100 dark:border-zinc-800 pb-4">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <Scale className="w-5 h-5 text-rose-500" />
                  Body Dimensions Input
                </h3>
                <p className="text-xs text-zinc-500 mt-1">
                  Adjust values to calculate your Body Mass Index instantly
                </p>
              </div>

              {/* Age Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                    <span>Age</span>
                    <span className="text-[10px] text-zinc-400 font-normal">(Ages 2 - 120)</span>
                  </label>
                  <input
                    type="number"
                    min="2"
                    max="120"
                    value={age}
                    onChange={(e) => setAge(Math.min(120, Math.max(2, Number(e.target.value))))}
                    className="w-20 rounded-md border border-zinc-200 dark:border-zinc-850 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-2 py-1 text-right text-sm font-medium"
                  />
                </div>
                <input
                  type="range"
                  min="2"
                  max="100"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full accent-rose-500 h-1"
                />
              </div>

              {/* Gender Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Gender</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setGender('male')}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-all flex items-center justify-center gap-2 ${
                      gender === 'male'
                        ? 'bg-zinc-900 border-zinc-900 dark:bg-zinc-100 dark:border-zinc-100 dark:text-zinc-900 text-white shadow-xs'
                        : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-850'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    Male
                  </button>
                  <button
                    onClick={() => setGender('female')}
                    className={`py-2 text-xs font-semibold rounded-lg border transition-all flex items-center justify-center gap-2 ${
                      gender === 'female'
                        ? 'bg-zinc-900 border-zinc-900 dark:bg-zinc-100 dark:border-zinc-100 dark:text-zinc-900 text-white shadow-xs'
                        : 'border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-850'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    Female
                  </button>
                </div>
              </div>

              {/* Height Input */}
              {unitSystem === 'metric' ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Height (cm)</label>
                    <input
                      type="number"
                      min="50"
                      max="260"
                      value={heightCm}
                      onChange={(e) => handleHeightChange(Math.max(1, Number(e.target.value)), 'metric')}
                      className="w-20 rounded-md border border-zinc-200 dark:border-zinc-850 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-2 py-1 text-right text-sm font-medium"
                    />
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="230"
                    value={heightCm}
                    onChange={(e) => handleHeightChange(Number(e.target.value), 'metric')}
                    className="w-full accent-rose-500 h-1"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Height (Feet & Inches)</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max="8"
                        value={heightFt}
                        onChange={(e) => handleHeightChange(Math.max(1, Number(e.target.value)), 'ft')}
                        className="w-full rounded-md border border-zinc-200 dark:border-zinc-850 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm text-right font-medium"
                      />
                      <span className="text-xs text-zinc-400 font-medium">ft</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="11"
                        value={heightIn}
                        onChange={(e) => handleHeightChange(Math.max(0, Number(e.target.value)), 'in')}
                        className="w-full rounded-md border border-zinc-200 dark:border-zinc-850 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm text-right font-medium"
                      />
                      <span className="text-xs text-zinc-400 font-medium">in</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Weight Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    Weight ({unitSystem === 'metric' ? 'kg' : 'lbs'})
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="500"
                    value={unitSystem === 'metric' ? weightKg : weightLbs}
                    onChange={(e) => handleWeightChange(Math.max(1, Number(e.target.value)), unitSystem)}
                    className="w-20 rounded-md border border-zinc-200 dark:border-zinc-850 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-2 py-1 text-right text-sm font-medium"
                  />
                </div>
                <input
                  type="range"
                  min={unitSystem === 'metric' ? 30 : 66}
                  max={unitSystem === 'metric' ? 180 : 396}
                  value={unitSystem === 'metric' ? weightKg : weightLbs}
                  onChange={(e) => handleWeightChange(Number(e.target.value), unitSystem)}
                  className="w-full accent-rose-500 h-1"
                />
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-7 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-6">
              <div className="text-center space-y-3">
                <h4 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                  {bmiData.isChild ? `Child/Teen Percentile (Age ${age})` : `Adult Body Mass Index (Age ${age})`}
                </h4>

                <div className="flex justify-center items-baseline gap-1 pt-1">
                  <span className="text-6xl font-black tracking-tight text-zinc-900 dark:text-zinc-100">
                    {bmiData.bmi.toFixed(1)}
                  </span>
                  <span className="text-sm font-semibold text-zinc-400">kg/m²</span>
                </div>

                <div>
                  <span className={`inline-block px-4 py-1.5 text-sm font-extrabold rounded-full ${bmiData.color} text-white shadow-xs`}>
                    {bmiData.status}
                  </span>
                </div>

                {bmiData.isChild && (
                  <p className="text-xs text-zinc-500 font-medium">
                    {bmiData.classificationDetails}
                  </p>
                )}
              </div>

              {/* Slider Scale Indicator */}
              <div className="space-y-2 pt-2">
                <div className="relative h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-visible flex">
                  {/* Underweight segments (25% total width) */}
                  <div className="h-full bg-blue-600 rounded-l-full w-[12%]" title="Severe Thinness (<16.0)" />
                  <div className="h-full bg-blue-500 w-[6%]" title="Moderate Thinness (16.0 - 17.0)" />
                  <div className="h-full bg-sky-400 w-[7%]" title="Mild Thinness (17.0 - 18.5)" />
                  
                  {/* Normal weight segment (25% total width) */}
                  <div className="h-full bg-emerald-500 w-[25%]" title="Normal Weight (18.5 - 25.0)" />
                  
                  {/* Overweight segment (25% total width) */}
                  <div className="h-full bg-amber-500 w-[25%]" title="Overweight (25.0 - 30.0)" />
                  
                  {/* Obese segments (25% total width) */}
                  <div className="h-full bg-orange-500 w-[8%]" title="Obese Class I (30.0 - 35.0)" />
                  <div className="h-full bg-rose-500 w-[8%]" title="Obese Class II (35.0 - 40.0)" />
                  <div className="h-full bg-rose-700 rounded-r-full w-[9%]" title="Obese Class III (≥40.0)" />

                  {/* Marker pointer */}
                  <div
                    className="absolute -top-1.5 w-4.5 h-7 bg-zinc-950 border-2 border-white dark:border-zinc-950 dark:bg-white rounded-full shadow-md transform -translate-x-1/2 transition-all duration-500 flex items-center justify-center"
                    style={{ left: `${bmiData.percent}%` }}
                  >
                    <div className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
                  </div>
                </div>

                {/* Scale Labels */}
                <div className="flex justify-between text-[10px] font-bold text-zinc-500 dark:text-zinc-400 px-1">
                  <span>10.0</span>
                  <span>16.0</span>
                  <span>18.5</span>
                  <span>25.0</span>
                  <span>30.0</span>
                  <span>35.0</span>
                  <span>40.0+</span>
                </div>
              </div>

              {/* Physical Guideline Details */}
              <div className="bg-white dark:bg-zinc-850 border border-zinc-150 dark:border-zinc-800 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center text-xs border-b border-zinc-100 dark:border-zinc-800 pb-2">
                  <span className="font-bold text-zinc-700 dark:text-zinc-300">Healthy Guidelines</span>
                  <span className="text-[10px] text-zinc-400 font-semibold">For your height</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="text-zinc-400 font-medium block">Healthy Range</span>
                    <span className="font-bold text-emerald-500 text-sm">
                      {unitSystem === 'metric'
                        ? `${bmiData.healthyMin.toFixed(1)} kg - ${bmiData.healthyMax.toFixed(1)} kg`
                        : `${(bmiData.healthyMin * 2.20462).toFixed(1)} lbs - ${(bmiData.healthyMax * 2.20462).toFixed(1)} lbs`}
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-zinc-400 font-medium block">Action Status</span>
                    <span className="font-bold text-zinc-700 dark:text-zinc-300 text-sm">
                      {bmiData.diffText ? (
                        <span className="text-rose-500">Need to {bmiData.diffText}</span>
                      ) : (
                        <span className="text-emerald-500">Optimal Weight!</span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Secondary indices */}
                <div className="grid grid-cols-2 gap-4 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-[11px]">
                  <div className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/40 px-2.5 py-1.5 rounded-lg">
                    <span className="text-zinc-400 font-medium" title="BMI Prime: Calculated relative to the upper limit of the healthy range (25.0). Optimal is 0.74 to 1.00">BMI Prime</span>
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">{bmiData.prime.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/40 px-2.5 py-1.5 rounded-lg">
                    <span className="text-zinc-400 font-medium" title="Ponderal Index: Calculated as mass divided by height cubed. Gives a highly accurate weight-to-height proportion.">Ponderal Index</span>
                    <span className="font-bold text-zinc-800 dark:text-zinc-200">{bmiData.ponderal.toFixed(1)} kg/m³</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reference Classification Tables Tab Panel */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-3 flex-wrap gap-2">
              <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
                <Info className="w-4 h-4 text-rose-500" />
                BMI Reference Standards
              </h3>
              <div className="inline-flex rounded-md bg-zinc-100 dark:bg-zinc-800 p-1 text-xs">
                <button
                  onClick={() => setBmiRefTab('adult')}
                  className={`px-3 py-1 font-semibold rounded-md transition-all ${
                    bmiRefTab === 'adult' ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs' : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  Adults (WHO)
                </button>
                <button
                  onClick={() => setBmiRefTab('child')}
                  className={`px-3 py-1 font-semibold rounded-md transition-all ${
                    bmiRefTab === 'child' ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-xs' : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  Children/Teens (CDC)
                </button>
              </div>
            </div>

            {bmiRefTab === 'adult' ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-zinc-100 dark:border-zinc-800 text-zinc-400 font-bold">
                      <th className="py-2">Category</th>
                      <th className="py-2">BMI Range (kg/m²)</th>
                      <th className="py-2">BMI Prime</th>
                      <th className="py-2">Risk of Comorbidities</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/60 text-zinc-600 dark:text-zinc-400">
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-850/40">
                      <td className="py-2.5 font-semibold text-blue-600 dark:text-blue-400">Severe Thinness</td>
                      <td className="py-2.5">&lt; 16.0</td>
                      <td className="py-2.5">&lt; 0.64</td>
                      <td className="py-2.5">High (Risk of malnutrition/deficiencies)</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-850/40">
                      <td className="py-2.5 font-semibold text-blue-500">Moderate Thinness</td>
                      <td className="py-2.5">16.0 – 17.0</td>
                      <td className="py-2.5">0.64 – 0.68</td>
                      <td className="py-2.5">Increased</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-850/40">
                      <td className="py-2.5 font-semibold text-sky-400">Mild Thinness</td>
                      <td className="py-2.5">17.0 – 18.5</td>
                      <td className="py-2.5">0.68 – 0.74</td>
                      <td className="py-2.5">Mildly Elevated</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-850/40 bg-emerald-50/20 dark:bg-emerald-950/10">
                      <td className="py-2.5 font-bold text-emerald-500">Normal Weight</td>
                      <td className="py-2.5 font-bold text-emerald-500">18.5 – 25.0</td>
                      <td className="py-2.5 font-bold text-emerald-500">0.74 – 1.00</td>
                      <td className="py-2.5 font-medium">Minimal (Healthy status)</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-850/40">
                      <td className="py-2.5 font-semibold text-amber-500">Overweight</td>
                      <td className="py-2.5">25.0 – 30.0</td>
                      <td className="py-2.5">1.00 – 1.20</td>
                      <td className="py-2.5">Increased</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-850/40">
                      <td className="py-2.5 font-semibold text-orange-500">Obese Class I</td>
                      <td className="py-2.5">30.0 – 35.0</td>
                      <td className="py-2.5">1.20 – 1.40</td>
                      <td className="py-2.5">High</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-850/40">
                      <td className="py-2.5 font-semibold text-rose-500">Obese Class II</td>
                      <td className="py-2.5">35.0 – 40.0</td>
                      <td className="py-2.5">1.40 – 1.60</td>
                      <td className="py-2.5">Very High</td>
                    </tr>
                    <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-850/40">
                      <td className="py-2.5 font-bold text-rose-700">Obese Class III</td>
                      <td className="py-2.5">≥ 40.0</td>
                      <td className="py-2.5">≥ 1.60</td>
                      <td className="py-2.5">Extremely High</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-zinc-500 leading-relaxed">
                  For children and teens aged 2 to 19 years, BMI is assessed using age-and-sex specific percentiles because boys and girls develop body fat at differing rates during growth.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-zinc-100 dark:border-zinc-800 text-zinc-400 font-bold">
                        <th className="py-2">Category</th>
                        <th className="py-2">Percentile Range</th>
                        <th className="py-2">CDC Interpretation</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800/60 text-zinc-600 dark:text-zinc-400">
                      <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-850/40">
                        <td className="py-2.5 font-semibold text-sky-500">Underweight</td>
                        <td className="py-2.5">Less than the 5th percentile</td>
                        <td className="py-2.5">BMI is low relative to peers of the same age and gender.</td>
                      </tr>
                      <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-850/40 bg-emerald-50/20 dark:bg-emerald-950/10">
                        <td className="py-2.5 font-bold text-emerald-500">Healthy Weight</td>
                        <td className="py-2.5 font-bold text-emerald-500">5th percentile to less than the 85th percentile</td>
                        <td className="py-2.5">A healthy body proportion relative to development peers.</td>
                      </tr>
                      <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-850/40">
                        <td className="py-2.5 font-semibold text-amber-500">Overweight</td>
                        <td className="py-2.5">85th percentile to less than the 95th percentile</td>
                        <td className="py-2.5">Increased body proportion relative to growth trajectory.</td>
                      </tr>
                      <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-850/40">
                        <td className="py-2.5 font-bold text-rose-500">Obese</td>
                        <td className="py-2.5">Equal to or greater than the 95th percentile</td>
                        <td className="py-2.5">Significantly elevated body proportion relative to developmental peers.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Interactive FAQs Accordion (Matches calculator.net comprehensive information sections) */}
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
              <HelpCircle className="w-4 h-4 text-rose-500" />
              Frequently Asked Questions (FAQ)
            </h3>

            <div className="space-y-2">
              {[
                {
                  q: "What is BMI (Body Mass Index)?",
                  a: "Body Mass Index (BMI) is a simple measurement of a person's weight relative to their height. It is widely used by clinicians and researchers as a quick indicator of healthy body composition and to screen for health risks associated with underweight, overweight, and obesity."
                },
                {
                  q: "How is BMI calculated? (Formulas)",
                  a: "The standard metric formula is: BMI = weight (kg) / [height (m)]². Under the US system, it is calculated as: BMI = 703 × weight (lbs) / [height (inches)]². This tool automatically handles conversion between units dynamically."
                },
                {
                  q: "What are the limitations of using BMI?",
                  a: "While BMI is a useful benchmark, it does not directly measure body fat. It cannot distinguish between muscle mass, bone density, and body fat. For example, athletes or bodybuilders with high muscle volume may have an 'overweight' BMI score while being completely healthy and lean. Conversely, older adults who have lost muscle mass may fall in the 'healthy' range despite carrying high fat deposits."
                },
                {
                  q: "What are the risks of a high BMI (Overweight/Obesity)?",
                  a: "A high BMI is statistically correlated with a higher risk of developing chronic conditions. These include Type 2 diabetes, high blood pressure, cardiovascular disease, coronary heart disease, stroke, sleep apnea, osteoarthritis, and certain types of cancers."
                },
                {
                  q: "What are the risks of a low BMI (Underweight)?",
                  a: "Being underweight can indicate a lack of nutrient intake or a metabolism issue. Risks include osteoporosis, weakened immune function, nutrient deficiencies, anemia, chronic fatigue, fertility issues, and developmental issues in children."
                }
              ].map((faq, index) => {
                const isOpen = expandedFaqIndex === index;
                return (
                  <div key={index} className="border border-zinc-100 dark:border-zinc-800/80 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedFaqIndex(isOpen ? null : index)}
                      className="w-full flex justify-between items-center p-3 text-left bg-zinc-50/50 dark:bg-zinc-900/20 hover:bg-zinc-50 dark:hover:bg-zinc-850/60 transition-colors text-xs font-bold text-zinc-700 dark:text-zinc-300"
                    >
                      <span>{faq.q}</span>
                      <span className="text-zinc-400 font-normal text-sm">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="p-3 text-xs text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 2. CALORIES & TDEE / BMR PANEL */}
      {(id === 'calories' || id === 'bmr' || id === 'tdee' || id === 'ideal_weight') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Inputs */}
          <div className="lg:col-span-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-6">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-500" />
              Metabolic Configuration
            </h3>

            {/* Height & Weight shared panels */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-500">Height (cm)</label>
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => handleHeightChange(Math.max(100, Number(e.target.value)), 'metric')}
                  className="w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1 text-sm text-center"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-500">Weight (kg)</label>
                <input
                  type="number"
                  value={weightKg}
                  onChange={(e) => handleWeightChange(Math.max(30, Number(e.target.value)), 'metric')}
                  className="w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1 text-sm text-center"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-500">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Math.max(1, Number(e.target.value)))}
                  className="w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1 text-sm text-center"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-zinc-500">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                  className="w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1 text-sm text-center"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            {/* Activity Level */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Activity Level</label>
              <select
                value={activity}
                onChange={(e) => setActivity(Number(e.target.value))}
                className="w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm"
              >
                <option value="1.2">Sedentary (No exercise, desk job)</option>
                <option value="1.375">Lightly Active (1-3 days exercise/week)</option>
                <option value="1.55">Moderately Active (3-5 days exercise/week)</option>
                <option value="1.725">Very Active (6-7 days intense sports/week)</option>
              </select>
            </div>

            {/* Goal */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Weight Goal</label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value as any)}
                className="w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm"
              >
                <option value="lose_fast">Extreme Weight Loss (1kg/week deficit)</option>
                <option value="lose_slow">Mild Weight Loss (0.5kg/week deficit)</option>
                <option value="maintain">Maintain Current Weight</option>
                <option value="gain_slow">Mild Muscle Gain (0.25kg/week surplus)</option>
                <option value="gain_fast">Extreme Bulk Weight Gain (0.5kg/week surplus)</option>
              </select>
            </div>
          </div>

          {/* Results Summary */}
          <div className="lg:col-span-6 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-6">
            <h4 className="text-sm font-semibold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase text-center">
              Daily Calorie & Metabolic Budget
            </h4>

            <div className="text-center p-5 bg-white dark:bg-zinc-850 border border-zinc-150 dark:border-zinc-800 rounded-xl space-y-2">
              <span className="text-xs text-zinc-500 block">Recommended Daily Calories</span>
              <span className="text-4xl font-extrabold text-rose-500">
                {Math.round(calorieData.recommended)} kcal/day
              </span>
              <p className="text-[11px] text-zinc-500">
                Adjusted budget to help you <span className="font-bold text-zinc-800 dark:text-zinc-200">{goal.replace('_', ' ')}</span> successfully.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-white dark:bg-zinc-850 rounded-lg">
                <span className="text-xs text-zinc-500 block">BMR (Basal Rate)</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{Math.round(calorieData.bmr)} kcal</span>
              </div>
              <div className="text-center p-3 bg-white dark:bg-zinc-850 rounded-lg">
                <span className="text-xs text-zinc-500 block">TDEE (Total Burn)</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">{Math.round(calorieData.tdee)} kcal</span>
              </div>
            </div>

            {/* Estimated Macro Split */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-zinc-500 block">Balanced Macro Target Estimates</span>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-sky-50 dark:bg-sky-950/20 text-center p-2 rounded-lg border border-sky-100 dark:border-sky-900/30">
                  <span className="text-[10px] text-sky-600 block">Carbs (45%)</span>
                  <span className="font-bold text-sky-800 dark:text-sky-300">{calorieData.carbsGrams}g</span>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-950/20 text-center p-2 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                  <span className="text-[10px] text-emerald-600 block">Protein (30%)</span>
                  <span className="font-bold text-emerald-800 dark:text-emerald-300">{calorieData.proteinGrams}g</span>
                </div>
                <div className="bg-amber-50 dark:bg-amber-950/20 text-center p-2 rounded-lg border border-amber-100 dark:border-amber-900/30">
                  <span className="text-[10px] text-amber-600 block">Fats (25%)</span>
                  <span className="font-bold text-amber-800 dark:text-amber-300">{calorieData.fatsGrams}g</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. WATER INTAKE CALCULATOR */}
      {id === 'water' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-6">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Droplet className="w-5 h-5 text-sky-500 animate-pulse" />
              Hydration Factors
            </h3>

            {/* Body weight */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Your Weight (lbs)</label>
                <input
                  type="number"
                  value={weightLbs}
                  onChange={(e) => handleWeightChange(Math.max(1, Number(e.target.value)), 'imperial')}
                  className="w-24 rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1 text-right text-sm"
                />
              </div>
              <input
                type="range"
                min="60"
                max="350"
                value={weightLbs}
                onChange={(e) => handleWeightChange(Number(e.target.value), 'imperial')}
                className="w-full accent-sky-500"
              />
            </div>

            {/* Daily Exercise */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Daily Exercise (Minutes)</label>
                <input
                  type="number"
                  value={exerciseMin}
                  onChange={(e) => setExerciseMin(Math.max(0, Number(e.target.value)))}
                  className="w-20 rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1 text-right text-sm"
                />
              </div>
              <input
                type="range"
                min="0"
                max="180"
                step="5"
                value={exerciseMin}
                onChange={(e) => setExerciseMin(Number(e.target.value))}
                className="w-full accent-sky-500"
              />
            </div>

            {/* Climate */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Local Climate / Temperature</label>
              <div className="grid grid-cols-3 gap-2">
                {(['cold', 'temperate', 'hot'] as const).map((c) => (
                  <button
                    key={c}
                    onClick={() => setClimate(c)}
                    className={`py-2 text-xs font-semibold capitalize rounded-md border ${
                      climate === c
                        ? 'bg-sky-500 border-sky-500 text-white'
                        : 'border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive hydration cup logger */}
          <div className="bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-6">
            <div className="text-center space-y-2">
              <span className="text-xs font-semibold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
                Hydration Tracker
              </span>

              <div className="p-4 bg-white dark:bg-zinc-850 rounded-xl border border-zinc-150 dark:border-zinc-800 flex justify-around items-center">
                <div>
                  <span className="text-xs text-zinc-400 block">Goal Target</span>
                  <span className="text-xl font-bold text-zinc-800 dark:text-zinc-200">{waterTargetMl} ml</span>
                  <span className="text-[10px] text-zinc-500 block">({Math.round(waterTargetOunces)} fl oz)</span>
                </div>
                <div className="border-l border-zinc-200 dark:border-zinc-800 h-10" />
                <div>
                  <span className="text-xs text-zinc-400 block">Logged Today</span>
                  <span className="text-xl font-black text-sky-500">{waterLogged} ml</span>
                  <span className="text-[10px] text-zinc-500 block">({Math.round(waterLogged / 29.5735)} fl oz)</span>
                </div>
              </div>
            </div>

            {/* Fluid cup logger UI */}
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs font-bold text-zinc-600 dark:text-zinc-400">
                <span>Daily Hydration Goal Progress</span>
                <span className="text-sky-500">{waterLoggedPercent}% Done</span>
              </div>
              <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-4 rounded-full overflow-hidden relative">
                <div
                  className="bg-sky-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${waterLoggedPercent}%` }}
                />
              </div>

              {/* Water logging actions */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setWaterLogged((prev) => prev + 250)}
                  className="flex flex-col items-center justify-center p-3 bg-white dark:bg-zinc-850 rounded-xl border border-sky-150 dark:border-sky-950 hover:bg-sky-50/50 dark:hover:bg-sky-950/20 active:scale-95 transition-all text-xs font-bold text-sky-600 dark:text-sky-400"
                >
                  <Plus className="w-4 h-4 mb-1" />
                  +250ml
                  <span className="text-[8px] font-normal text-zinc-400">Small Cup</span>
                </button>
                <button
                  onClick={() => setWaterLogged((prev) => prev + 500)}
                  className="flex flex-col items-center justify-center p-3 bg-white dark:bg-zinc-850 rounded-xl border border-sky-150 dark:border-sky-950 hover:bg-sky-50/50 dark:hover:bg-sky-950/20 active:scale-95 transition-all text-xs font-bold text-sky-600 dark:text-sky-400"
                >
                  <Plus className="w-4 h-4 mb-1" />
                  +500ml
                  <span className="text-[8px] font-normal text-zinc-400">Regular Bottle</span>
                </button>
                <button
                  onClick={() => setWaterLogged(0)}
                  className="flex flex-col items-center justify-center p-3 bg-zinc-100 dark:bg-zinc-800 rounded-xl hover:bg-zinc-200 active:scale-95 transition-all text-xs font-bold text-zinc-600 dark:text-zinc-300"
                >
                  <Trash className="w-4 h-4 mb-1 text-zinc-400" />
                  Reset
                  <span className="text-[8px] font-normal text-zinc-400">Clear Logs</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. PREGNANCY DUE DATE CALCULATOR */}
      {id === 'pregnancy' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-6">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <Baby className="w-5 h-5 text-rose-400" />
              Pregnancy Milestones
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">First Day of Last Period (LMP)</label>
                <input
                  type="date"
                  value={lmpDate}
                  onChange={(e) => setLmpDate(e.target.value)}
                  className="w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Average Cycle Length (Days)</label>
                <input
                  type="number"
                  value={cycleLength}
                  onChange={(e) => setCycleLength(Math.max(20, Number(e.target.value)))}
                  className="w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-6 flex flex-col justify-between">
            {pregnancyData ? (
              <>
                <div className="text-center space-y-2">
                  <span className="text-xs text-zinc-500 block">Estimated Delivery Date</span>
                  <span className="text-3xl font-black text-rose-500 block">
                    {pregnancyData.dueDate}
                  </span>
                  <div className="inline-block px-3 py-1 text-xs font-bold rounded-full bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400">
                    {pregnancyData.trimester}
                  </div>
                </div>

                <div className="bg-white dark:bg-zinc-850 p-4 rounded-xl border border-zinc-150 dark:border-zinc-800 space-y-3">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-zinc-600">Current Gestation Progress</span>
                    <span className="text-rose-400">{pregnancyData.weeksPregnant} Weeks, {pregnancyData.remainingDays} Days</span>
                  </div>
                  <div className="w-full bg-zinc-200 dark:bg-zinc-850 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-rose-400 h-full rounded-full"
                      style={{ width: `${pregnancyData.progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="text-center p-3 bg-rose-50/50 dark:bg-rose-950/10 rounded-xl border border-rose-100 dark:border-rose-900/20">
                  <span className="text-xs text-rose-700 dark:text-rose-300 font-bold block">
                    🚀 Only {pregnancyData.daysToDue} Days to go until your bundle of joy arrives!
                  </span>
                </div>
              </>
            ) : (
              <div className="p-8 text-center text-zinc-500">
                Please input a valid date.
              </div>
            )}
          </div>
        </div>
      )}

      {/* 5. HEART RATE / CARDIO ZONES PANEL */}
      {id === 'heart_rate' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-rose-500" />
              Vitals Input
            </h3>
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Your Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Math.max(1, Number(e.target.value)))}
                className="w-full rounded-md border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-3 py-1.5 text-sm"
              />
            </div>
            <div className="p-4 bg-rose-50/50 dark:bg-rose-950/15 border border-rose-100 dark:border-rose-900/30 rounded-xl text-center">
              <span className="text-xs text-zinc-500 block">Est. Maximum Heart Rate</span>
              <span className="text-3xl font-extrabold text-rose-500">{heartRateData.maxHR} BPM</span>
            </div>
          </div>

          {/* Zones grid */}
          <div className="lg:col-span-8 bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-xs space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-zinc-500 uppercase">
              Your Aerobic & Anaerobic Training Zones
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {heartRateData.zones.map((z, idx) => (
                <div key={idx} className={`p-4 bg-white dark:bg-zinc-850 rounded-xl border border-zinc-150 dark:border-zinc-800 border-l-4 ${z.color} space-y-1`}>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-zinc-800 dark:text-zinc-200">{z.name}</span>
                    <span className="text-xs bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full text-zinc-600 dark:text-zinc-400">{z.range}</span>
                  </div>
                  <div className="text-lg font-black text-zinc-900 dark:text-zinc-100">
                    {z.min} – {z.max} <span className="text-xs font-normal text-zinc-500">BPM</span>
                  </div>
                  <p className="text-[10px] text-zinc-500 leading-normal">{z.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
