import React, { useState } from 'react';
import { Dumbbell, Award, Clock, Flame, ChevronRight, HelpCircle, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  target: string;
  notes: string;
}

interface RoutineDay {
  dayName: string;
  focus: string;
  exercises: Exercise[];
}

interface WorkoutSplit {
  name: string;
  desc: string;
  days: RoutineDay[];
}

export default function WorkoutRepository() {
  const [activeSplit, setActiveSplit] = useState<number>(0);
  const [expandedDayIdx, setExpandedDayIdx] = useState<number | null>(null);

  const splits: WorkoutSplit[] = [
    {
      name: "🔥 Push, Pull, Legs (PPL) Split",
      desc: "The gold standard split for muscle tissue building. Targets related synergist muscle groups together, allowing maximal recovery.",
      days: [
        {
          dayName: "Day 1: Push (Chest, Shoulders & Triceps)",
          focus: "Heavy pressing & horizontal pushing power",
          exercises: [
            { name: "Flat Barbell Bench Press", sets: 4, reps: "6 - 8", rest: "3 mins", target: "Pectorals, Anterior Delts", notes: "Lower bar to mid-chest. Press upward explosively." },
            { name: "Overhead Barbell Press (OHP)", sets: 4, reps: "6 - 8", rest: "3 mins", target: "Shoulders, Triceps", notes: "Keep core tight, press directly overhead, locking arms." },
            { name: "Incline Dumbbell Chest Press", sets: 3, reps: "10 - 12", rest: "2 mins", target: "Upper Chest, Shoulders", notes: "Bench angled at 30 degrees. Focus on deep stretch at bottom." },
            { name: "Dumbbell Lateral Raises", sets: 4, reps: "12 - 15", rest: "90 secs", target: "Lateral Deltoids", notes: "Lead with elbows. Slight forward lean for side shoulder isolation." },
            { name: "Overhead Cable Triceps Extensions", sets: 3, reps: "10 - 12", rest: "90 secs", target: "Long-head Triceps", notes: "Keep upper arms static. Extend elbows forward completely." }
          ]
        },
        {
          dayName: "Day 2: Pull (Back, Rear Delts & Biceps)",
          focus: "Vertical and horizontal back pulling strength",
          exercises: [
            { name: "Heavy Barbell Deadlifts", sets: 3, reps: "5", rest: "4 mins", target: "Posterior Chain, Lats, Lower Back", notes: "Hinge at hips. Keep spine fully straight throughout pull." },
            { name: "Weighted Pull-Ups / Chin-Ups", sets: 4, reps: "6 - 8", rest: "2.5 mins", target: "Lats, Upper Back, Biceps", notes: "Pull chest up to bar. Slowly lower over 3 seconds." },
            { name: "Chest-Supported Dumbbell Rows", sets: 3, reps: "10 - 12", rest: "2 mins", target: "Mid-back, Rhomboids, Traps", notes: "Pull elbows high. Squeeze shoulder blades together." },
            { name: "Incline Dumbbell Bicep Curls", sets: 3, reps: "10 - 12", rest: "90 secs", target: "Long-head Biceps", notes: "Angle bench back. Isolate biceps in fully stretched position." },
            { name: "Dumbbell Hammer Curls", sets: 3, reps: "12 - 15", rest: "90 secs", target: "Brachialis, Forearms", notes: "Thumbs up grip. Maximizes bicep thickness and forearm size." }
          ]
        },
        {
          dayName: "Day 3: Legs & Core (Squats & Hinges)",
          focus: "Heavy compound lower-body hypertrophy",
          exercises: [
            { name: "Barbell Back Squats", sets: 4, reps: "6 - 8", rest: "3.5 mins", target: "Quads, Glutes, Hamstrings", notes: "Drop hips below parallel. Explode through heels on upward phase." },
            { name: "Romanian Deadlifts (RDL)", sets: 3, reps: "8 - 10", rest: "2.5 mins", target: "Hamstrings, Glutes", notes: "Focus on pushing hips back. Feel deep stretch behind legs." },
            { name: "Dumbbell Bulgarian Split Squats", sets: 3, reps: "10 - 12 per leg", rest: "2 mins", target: "Quadriceps, Glutes", notes: "Elevate rear foot on bench. Keep torso vertical." },
            { name: "Standing Calf Raises", sets: 4, reps: "15 - 20", rest: "60 secs", target: "Gastrocnemius (Calves)", notes: "Hold stretch at bottom for 2s. Contract hard at top." },
            { name: "Hanging Leg Raises", sets: 3, reps: "15", rest: "60 secs", target: "Lower Abs, Core", notes: "Control lowering. Avoid using body momentum or swinging." }
          ]
        }
      ]
    },
    {
      name: "💪 Upper / Lower Strength Split",
      desc: "High-frequency split ideal for intermediate lifters. Hits each muscle group twice weekly for accelerated muscle protein synthesis.",
      days: [
        {
          dayName: "Day 1: Upper Body Hypertrophy",
          focus: "Balanced upper chest, back, and shoulders",
          exercises: [
            { name: "Incline Barbell Press", sets: 4, reps: "8", rest: "3 mins", target: "Upper Pectorals", notes: "Controlled negative. Explode on upward press." },
            { name: "Bent-Over Barbell Rows", sets: 4, reps: "8", rest: "2.5 mins", target: "Latissimus Dorsi, Traps", notes: "Keep torso bent at 45 degrees. Pull to lower rib cage." },
            { name: "Standing Dumbbell Shoulder Press", sets: 3, reps: "10", rest: "2 mins", target: "Anterior Deltoids, Triceps", notes: "Press upward in slight arc. Avoid arching lower back." },
            { name: "Cable Pullover", sets: 3, reps: "12 - 15", rest: "90 secs", target: "Lats, Serratus", notes: "Slight bend in elbows. Sweep cable down to thighs." },
            { name: "Cable Triceps Pushdowns", sets: 3, reps: "12", rest: "90 secs", target: "Triceps Lateral Head", notes: "Keep elbows pinned to your sides. Squeeze at bottom." }
          ]
        },
        {
          dayName: "Day 2: Lower Body Hypertrophy",
          focus: "Heavy quad, posterior chain, and calf builders",
          exercises: [
            { name: "Barbell Front Squats", sets: 4, reps: "8 - 10", rest: "3 mins", target: "Quadriceps, Upper Back", notes: "Front rack position. Keep elbows high to support weight." },
            { name: "Lying Leg Curls", sets: 3, reps: "10 - 12", rest: "90 secs", target: "Hamstring heads", notes: "Control eccentric phase. Squeeze heels to glutes." },
            { name: "Leg Press (Stance Width High)", sets: 3, reps: "12 - 15", rest: "2 mins", target: "Glutes, Quads", notes: "Slow negative, avoid bouncing weight plate stack." },
            { name: "Seated Calf Raises", sets: 4, reps: "12 - 15", rest: "60 secs", target: "Soleus muscle", notes: "Maximum flexion at ankles. Control the stretch." }
          ]
        }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* HEADER */}
      <div className="bg-slate-card border border-zinc-800/80 rounded-2xl p-6 shadow-xl">
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          🏋 Strength & Muscle-Building Splits
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Hand-picked hypertrophic routines configured on heavy compound resistance training to stimulate muscle cell expansion.
        </p>
      </div>

      {/* SPLIT TABS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {splits.map((split, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveSplit(idx);
              setExpandedDayIdx(null);
            }}
            className={`p-4 text-left rounded-xl border transition-all cursor-pointer ${
              activeSplit === idx 
                ? 'bg-mint border-mint text-zinc-950' 
                : 'bg-slate-card border-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-950/40'
            }`}
          >
            <div className="font-extrabold text-sm">{split.name}</div>
            <p className={`text-[11px] mt-1 leading-relaxed ${activeSplit === idx ? 'text-zinc-800' : 'text-zinc-500'}`}>
              {split.desc}
            </p>
          </button>
        ))}
      </div>

      {/* PROGRESSIVE OVERLOAD GUIDE ACCORDION/HERO */}
      <div className="bg-gradient-to-r from-[#182335] to-[#0D1525] border border-zinc-800 p-5 rounded-2xl space-y-2">
        <span className="text-[10px] font-bold text-mint uppercase tracking-widest block">💪 The Law of Hypertrophy</span>
        <h4 className="text-xs font-black text-white uppercase tracking-wider">How to implement Progressive Overload</h4>
        <p className="text-xs text-zinc-400 leading-relaxed font-medium">
          Muscles do not grow simply by repeating standard motions. You must give them a reason to adapt. Each week, focus on:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] pt-1 text-zinc-400 font-medium">
          <div className="p-3 bg-zinc-950/40 rounded-xl border border-zinc-900">
            <span className="text-white font-bold block mb-1">1. Overload the Weight</span>
            Add 1.25kg - 2.5kg to compound lifts (Squat, Deadlift, Bench Press) once you successfully hit your target reps.
          </div>
          <div className="p-3 bg-zinc-950/40 rounded-xl border border-zinc-900">
            <span className="text-white font-bold block mb-1">2. Overload the Reps</span>
            If you bench 80kg for 3 sets of 6, aim to perform 7 reps on your first set next session with the same weight.
          </div>
          <div className="p-3 bg-zinc-950/40 rounded-xl border border-zinc-900">
            <span className="text-white font-bold block mb-1">3. Improve Execution</span>
            Control the eccentric (lowering) phase for 3 full seconds. High muscle tension triggers deep myofibrillar micro-tears.
          </div>
        </div>
      </div>

      {/* DETAILED DRILLDOWN DAYS */}
      <div className="bg-slate-card border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-black text-white uppercase tracking-wider border-b border-zinc-800 pb-3 flex items-center gap-2">
          <Dumbbell className="w-4 h-4 text-mint" /> Routine Days & Exercises
        </h3>

        <div className="space-y-4">
          {splits[activeSplit].days.map((day, dIdx) => {
            const isExpanded = expandedDayIdx === dIdx;
            return (
              <div 
                key={dIdx} 
                className="bg-zinc-950/40 border border-zinc-900 rounded-xl overflow-hidden"
              >
                {/* Trigger */}
                <button
                  onClick={() => setExpandedDayIdx(isExpanded ? null : dIdx)}
                  className="w-full p-4 flex justify-between items-center text-left text-xs font-bold hover:bg-zinc-950/80 transition-colors"
                >
                  <div className="space-y-1">
                    <span className="text-white text-sm font-extrabold block">{day.dayName}</span>
                    <span className="text-[10px] text-zinc-500 font-bold block tracking-wide uppercase">{day.focus}</span>
                  </div>
                  <span className="text-zinc-500">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {/* Content */}
                {isExpanded && (
                  <div className="p-4 bg-zinc-950/20 border-t border-zinc-900 space-y-4">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-[11px] font-medium text-zinc-400">
                        <thead>
                          <tr className="border-b border-zinc-900 pb-2 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                            <th className="py-2 pr-4">Exercise Name</th>
                            <th className="py-2 pr-4">Sets</th>
                            <th className="py-2 pr-4">Target Rep Range</th>
                            <th className="py-2 pr-4">Rest Interval</th>
                            <th className="py-2 pr-4">Primary Targets</th>
                            <th className="py-2">Form Execution Tip</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-900">
                          {day.exercises.map((ex, exIdx) => (
                            <tr key={exIdx} className="hover:bg-zinc-950/20 text-xs">
                              <td className="py-3 pr-4 font-extrabold text-white">{ex.name}</td>
                              <td className="py-3 pr-4 text-mint font-bold">{ex.sets}</td>
                              <td className="py-3 pr-4 text-white font-extrabold">{ex.reps}</td>
                              <td className="py-3 pr-4 font-bold">{ex.rest}</td>
                              <td className="py-3 pr-4 text-[11px] text-zinc-500">{ex.target}</td>
                              <td className="py-3 text-[11px] text-zinc-400 leading-relaxed">{ex.notes}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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
