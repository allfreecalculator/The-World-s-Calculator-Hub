import React, { useState, useEffect } from 'react';
import { 
  Award, Flame, Droplet, Scale, Plus, Trash, Check, Sparkles, 
  HelpCircle, ChevronRight, Activity, Calendar, Save, RotateCcw 
} from 'lucide-react';

interface WeightLog {
  id: string;
  weight: number;
  date: string;
}

export default function ProgressTracker() {
  // Daily intake states
  const [dailyCalorieTotal, setDailyCalorieTotal] = useState<number>(2400);
  const [dailyProteinTotal, setDailyProteinTotal] = useState<number>(110);
  const [dailyWaterTotal, setDailyWaterTotal] = useState<number>(1500);

  // Calorie and Protein target caps (defaults, can be synced or custom)
  const [calorieCap, setCalorieCap] = useState<number>(3000);
  const [proteinCap, setProteinCap] = useState<number>(150);
  const [waterCap, setWaterCap] = useState<number>(3000);

  // Quick addition states
  const [addCalorieInput, setAddCalorieInput] = useState<string>('300');
  const [addProteinInput, setAddProteinInput] = useState<string>('20');
  const [addWeightInput, setAddWeightInput] = useState<string>('58.5');

  // Weight History logging
  const [weightHistory, setWeightHistory] = useState<WeightLog[]>([
    { id: '1', weight: 58.0, date: '2026-07-01' },
    { id: '2', weight: 58.2, date: '2026-07-05' },
    { id: '3', weight: 58.4, date: '2026-07-10' },
    { id: '4', weight: 58.8, date: '2026-07-15' }
  ]);

  // Load from local storage on mount
  useEffect(() => {
    const cachedCalories = localStorage.getItem('daily_calories');
    const cachedProtein = localStorage.getItem('daily_protein');
    const cachedWater = localStorage.getItem('daily_water');
    const cachedWeight = localStorage.getItem('weight_history');

    if (cachedCalories) setDailyCalorieTotal(Number(cachedCalories));
    if (cachedProtein) setDailyProteinTotal(Number(cachedProtein));
    if (cachedWater) setDailyWaterTotal(Number(cachedWater));
    if (cachedWeight) setWeightHistory(JSON.parse(cachedWeight));
  }, []);

  // Sync state to local storage when changed
  const saveDailyStats = (c: number, p: number, w: number) => {
    localStorage.setItem('daily_calories', c.toString());
    localStorage.setItem('daily_protein', p.toString());
    localStorage.setItem('daily_water', w.toString());
  };

  const handleAddCalories = () => {
    const val = Number(addCalorieInput);
    if (isNaN(val) || val <= 0) return;
    const newTotal = dailyCalorieTotal + val;
    setDailyCalorieTotal(newTotal);
    saveDailyStats(newTotal, dailyProteinTotal, dailyWaterTotal);
    setAddCalorieInput('300');
  };

  const handleAddProtein = () => {
    const val = Number(addProteinInput);
    if (isNaN(val) || val <= 0) return;
    const newTotal = dailyProteinTotal + val;
    setDailyProteinTotal(newTotal);
    saveDailyStats(dailyCalorieTotal, newTotal, dailyWaterTotal);
    setAddProteinInput('20');
  };

  const handleAddWater = (ml: number) => {
    const newTotal = dailyWaterTotal + ml;
    setDailyWaterTotal(newTotal);
    saveDailyStats(dailyCalorieTotal, dailyProteinTotal, newTotal);
  };

  const handleLogWeight = () => {
    const wt = Number(addWeightInput);
    if (isNaN(wt) || wt <= 0) return;

    const todayStr = new Date().toISOString().split('T')[0];
    const newLog: WeightLog = {
      id: Math.random().toString(),
      weight: wt,
      date: todayStr
    };

    const newHistory = [...weightHistory, newLog].sort((a, b) => a.date.localeCompare(b.date));
    setWeightHistory(newHistory);
    localStorage.setItem('weight_history', JSON.stringify(newHistory));
    setAddWeightInput('');
  };

  const handleDeleteWeightLog = (id: string) => {
    const filtered = weightHistory.filter(item => item.id !== id);
    setWeightHistory(filtered);
    localStorage.setItem('weight_history', JSON.stringify(filtered));
  };

  const handleResetIntakes = () => {
    setDailyCalorieTotal(0);
    setDailyProteinTotal(0);
    setDailyWaterTotal(0);
    saveDailyStats(0, 0, 0);
  };

  // Math percentages
  const caloriePercent = Math.min(100, Math.round((dailyCalorieTotal / calorieCap) * 100));
  const proteinPercent = Math.min(100, Math.round((dailyProteinTotal / proteinCap) * 100));
  const waterPercent = Math.min(100, Math.round((dailyWaterTotal / waterCap) * 100));

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* HEADER */}
      <div className="bg-slate-card border border-zinc-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-mint/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="space-y-1 text-center md:text-left">
            <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              📈 Biometric Progress & Logging Tracker
            </h1>
            <p className="text-xs text-zinc-400">
              Actively log your daily macronutrient totals, hydration metrics, and weight checkpoints to secure consistent bulking benchmarks.
            </p>
          </div>
          <button
            onClick={handleResetIntakes}
            className="px-3.5 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 text-xs font-black rounded-xl transition-all flex items-center gap-1 cursor-pointer shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Daily Totals
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* DAILY CALORIE & PROTEIN INTAKE BOARD (Span 7) */}
        <div className="lg:col-span-7 bg-slate-card border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-6">
          <h3 className="text-xs font-black text-zinc-300 uppercase tracking-widest border-b border-zinc-800 pb-3 flex items-center gap-2">
            <Flame className="w-4 h-4 text-mint" /> Daily Intake Progress
          </h3>

          <div className="space-y-6">
            
            {/* Calories logging */}
            <div className="p-4 bg-zinc-950/40 rounded-xl border border-zinc-900 space-y-4">
              <div className="flex justify-between items-center text-xs">
                <div className="space-y-0.5">
                  <span className="font-extrabold text-white text-sm block">🔥 Calories Consumption</span>
                  <span className="text-zinc-500 font-bold font-mono">
                    {dailyCalorieTotal} / {calorieCap} kcal
                  </span>
                </div>
                <div className="font-black text-mint text-lg">{caloriePercent}%</div>
              </div>

              {/* Bar */}
              <div className="w-full h-3 bg-zinc-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-mint to-teal-400 rounded-full transition-all duration-1000"
                  style={{ width: `${caloriePercent}%` }}
                />
              </div>

              {/* Quick Add */}
              <div className="flex gap-2 text-xs font-bold items-center pt-1">
                <span className="text-zinc-500 text-[10px] uppercase">Add Calories:</span>
                <input
                  type="number"
                  value={addCalorieInput}
                  onChange={(e) => setAddCalorieInput(e.target.value)}
                  className="w-16 bg-zinc-950 border border-zinc-800 rounded px-2 py-1 focus:ring-1 focus:ring-mint focus:outline-none font-bold text-white text-right"
                />
                <button
                  onClick={handleAddCalories}
                  className="px-3.5 py-1 bg-mint hover:bg-mint/90 text-zinc-950 text-[11px] font-black rounded-lg cursor-pointer transition-colors"
                >
                  + Add
                </button>
              </div>
            </div>

            {/* Protein logging */}
            <div className="p-4 bg-zinc-950/40 rounded-xl border border-zinc-900 space-y-4">
              <div className="flex justify-between items-center text-xs">
                <div className="space-y-0.5">
                  <span className="font-extrabold text-white text-sm block">🥩 Protein Consumption</span>
                  <span className="text-zinc-500 font-bold font-mono">
                    {dailyProteinTotal} / {proteinCap} g
                  </span>
                </div>
                <div className="font-black text-mint text-lg">{proteinPercent}%</div>
              </div>

              {/* Bar */}
              <div className="w-full h-3 bg-zinc-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-mint rounded-full transition-all duration-1000"
                  style={{ width: `${proteinPercent}%` }}
                />
              </div>

              {/* Quick Add */}
              <div className="flex gap-2 text-xs font-bold items-center pt-1">
                <span className="text-zinc-500 text-[10px] uppercase">Add Protein:</span>
                <input
                  type="number"
                  value={addProteinInput}
                  onChange={(e) => setAddProteinInput(e.target.value)}
                  className="w-16 bg-zinc-950 border border-zinc-800 rounded px-2 py-1 focus:ring-1 focus:ring-mint focus:outline-none font-bold text-white text-right"
                />
                <span className="text-zinc-500">g</span>
                <button
                  onClick={handleAddProtein}
                  className="px-3.5 py-1 bg-mint hover:bg-mint/90 text-zinc-950 text-[11px] font-black rounded-lg cursor-pointer transition-colors"
                >
                  + Add
                </button>
              </div>
            </div>

            {/* Water tracking */}
            <div className="p-4 bg-zinc-950/40 rounded-xl border border-zinc-900 space-y-4">
              <div className="flex justify-between items-center text-xs">
                <div className="space-y-0.5">
                  <span className="font-extrabold text-white text-sm block">🥤 Water Log Intake</span>
                  <span className="text-zinc-500 font-bold font-mono">
                    {dailyWaterTotal} / {waterCap} ml
                  </span>
                </div>
                <div className="font-black text-mint text-lg">{waterPercent}%</div>
              </div>

              {/* Bar */}
              <div className="w-full h-3 bg-zinc-900 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-sky-500 to-blue-400 rounded-full transition-all duration-1000"
                  style={{ width: `${waterPercent}%` }}
                />
              </div>

              {/* Quick additions */}
              <div className="flex flex-wrap gap-2 text-xs font-bold items-center pt-1">
                <span className="text-zinc-500 text-[10px] uppercase mr-1">Log Cups:</span>
                <button
                  onClick={() => handleAddWater(250)}
                  className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white rounded-lg cursor-pointer transition-all"
                >
                  + 250ml (Cup)
                </button>
                <button
                  onClick={() => handleAddWater(500)}
                  className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white rounded-lg cursor-pointer transition-all"
                >
                  + 500ml (Bottle)
                </button>
                <button
                  onClick={() => handleAddWater(1000)}
                  className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white rounded-lg cursor-pointer transition-all"
                >
                  + 1 Liter
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* WEIGHT LOGS LOGISTIC PANEL (Span 5) */}
        <div className="lg:col-span-5 bg-slate-card border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-5">
          <h3 className="text-xs font-black text-zinc-300 uppercase tracking-widest border-b border-zinc-800 pb-3 flex items-center gap-2">
            <Scale className="w-4 h-4 text-mint" /> Weight Logs History
          </h3>

          <div className="space-y-4">
            {/* Enter weight form */}
            <div className="flex gap-2 text-xs font-bold items-center bg-zinc-950/40 p-3 rounded-xl border border-zinc-900">
              <span className="text-zinc-400 text-[11px] uppercase shrink-0">Log Today's Weight:</span>
              <input
                type="number"
                step="0.1"
                value={addWeightInput}
                onChange={(e) => setAddWeightInput(e.target.value)}
                placeholder="e.g. 58.5"
                className="w-20 bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1 text-white font-extrabold focus:outline-none text-right"
              />
              <span className="text-zinc-500">kg</span>
              <button
                onClick={handleLogWeight}
                className="px-4 py-1.5 bg-mint hover:bg-mint/90 text-zinc-950 text-[11px] font-black rounded-lg cursor-pointer transition-all shrink-0 ml-auto"
              >
                Log weight
              </button>
            </div>

            {/* List of past logged weights */}
            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-wider block">Logged Checkpoints</span>
              
              <div className="divide-y divide-zinc-900 font-medium text-xs">
                {weightHistory.slice().reverse().map((log) => (
                  <div key={log.id} className="flex justify-between items-center py-2.5">
                    <span className="text-zinc-500 font-bold">{log.date}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-white">{log.weight} kg</span>
                      <button
                        onClick={() => handleDeleteWeightLog(log.id)}
                        className="text-zinc-600 hover:text-rose-500 p-1 cursor-pointer transition-colors"
                        title="Delete log"
                      >
                        <Trash className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {weightHistory.length === 0 && (
                  <div className="py-6 text-center text-zinc-600 font-bold">
                    No weight checkpoints logged. Log today's weight above to start tracking!
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
