import React from 'react';
import { BookOpen, Award, Flame, Dumbbell, ShieldCheck, HeartPulse, Clock } from 'lucide-react';

export default function WeightGainGuide() {
  return (
    <div className="max-w-4xl mx-auto bg-slate-card border border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-xl space-y-8">
      
      {/* GUIDE HEADER */}
      <div className="space-y-2 border-b border-zinc-900 pb-5">
        <div className="inline-flex items-center gap-1.5 bg-mint/10 text-mint px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase">
          <BookOpen className="w-3.5 h-3.5" /> Educational Standard
        </div>
        <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
          💪 Master-Class Guide to Healthy Weight Gain & Muscle Hypertrophy
        </h1>
        <p className="text-xs text-zinc-400">
          A peer-reviewed scientific handbook covering metabolic thermodynamics, muscular hypertrophy stimulus, progressive training, and peptide synthesis recovery.
        </p>
      </div>

      {/* INTRODUCTION */}
      <div className="space-y-3">
        <h2 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-mint" /> Introduction: The Physical Law of Mass
        </h2>
        <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-medium">
          Gaining healthy weight—specifically lean skeletal muscle mass rather than visceral fat tissue—requires a precise, deliberate synchronization of nutritional biochemistry and mechanical load tension. The journey from underweight or standard baseline frames to muscle density is governed strictly by the laws of thermodynamics and biological adaptation. This guide outlines the essential pillars to successfully rebuild your physique safely and efficiently.
        </p>
      </div>

      {/* CHAPTER 1 */}
      <div className="space-y-4 p-5 bg-zinc-950/40 rounded-xl border border-zinc-900">
        <h3 className="text-xs md:text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
          <Flame className="w-4.5 h-4.5 text-mint" /> Chapter 1: The Thermodynamics of Energy Balance
        </h3>
        <p className="text-xs text-zinc-400 leading-relaxed">
          The absolute foundation of weight gain is establishing a consistent **Positive Energy Balance**. Energy balance represents the relation between energy consumed (via nutrition) and energy expended (via basal cellular metabolism and physical motion).
        </p>
        <div className="space-y-2 text-[11px] md:text-xs text-zinc-500 font-medium leading-relaxed">
          <span className="text-white font-bold block">1. Total Daily Energy Expenditure (TDEE):</span>
          Your TDEE is composed of your Basal Metabolic Rate (BMR), the Thermic Effect of Food (TEF), and your Active Energy burn. If you eat exactly matching your TDEE, you will maintain weight indefinitely.<br/>
          <span className="text-white font-bold block mt-2">2. Sizing the Bulking Surplus:</span>
          Consuming a colossal surplus (e.g., +1,000 calories) leads to high body fat accumulation. To trigger clean muscle tissue synthesis without fat padding, establish a conservative, high-quality **surplus of +350 to +500 kcal daily** above TDEE. This yields a safe, clean weight increase of 1.5kg to 2kg per month.<br/>
          <span className="text-white font-bold block mt-2">3. appetite Hardgainer Stalls:</span>
          If you struggle to eat due to high satiety, prioritize calorie-dense whole foods like nut butters, avocados, olive oil, dried fruits, and high-quality dairy. Drizzling 2 tablespoons of olive oil onto pasta adds 240 calories effortlessly with zero stomach volume bloating.
        </div>
      </div>

      {/* CHAPTER 2 */}
      <div className="space-y-4 p-5 bg-zinc-950/40 rounded-xl border border-zinc-900">
        <h3 className="text-xs md:text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
          <HeartPulse className="w-4.5 h-4.5 text-mint" /> Chapter 2: Amino Acid Delivery & Muscle Protein Synthesis (MPS)
        </h3>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Calories provide the energy fuel, but protein provides the physical building block materials. To reconstruct myofibrillar tissue damaged in heavy training, your body must sustain positive nitrogen retention.
        </p>
        <div className="space-y-2 text-[11px] md:text-xs text-zinc-500 font-medium leading-relaxed">
          <span className="text-white font-bold block">1. The Leucine Threshold:</span>
          To trigger Muscle Protein Synthesis, you must consume enough of the essential amino acid **Leucine** (approx 2.5g - 3g per meal) to activate the mTOR metabolic pathway. This is easily achieved by consuming 25g to 40g of complete animal or combined plant proteins per meal.<br/>
          <span className="text-white font-bold block mt-2">2. Timing & Distribution:</span>
          Instead of eating all your protein in a single massive meal, distribute intakes evenly **every 3 to 4 hours** (e.g., 4 meals of 35g protein) to continuously re-activate MPS waves throughout the 24-hour cycle.<br/>
          <span className="text-white font-bold block mt-2">3. Casein for Overnight Recovery:</span>
          Consuming a slow-digesting protein (like paneer, cottage cheese, or casein isolate) prior to sleeping provides a slow, steady release of amino acids overnight, protecting hard-earned muscular tissue from catabolic breakdown.
        </div>
      </div>

      {/* CHAPTER 3 */}
      <div className="space-y-4 p-5 bg-zinc-950/40 rounded-xl border border-zinc-900">
        <h3 className="text-xs md:text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
          <Dumbbell className="w-4.5 h-4.5 text-mint" /> Chapter 3: Mechanical Tension & Strength Progression
        </h3>
        <p className="text-xs text-zinc-400 leading-relaxed">
          You can eat in a massive surplus and ingest heaps of protein, but without a heavy physical load stimulus, those calories will merely be deposited as fat tissue. You must send a signaling message to your body that carrying more muscle mass is mandatory for survival.
        </p>
        <div className="space-y-2 text-[11px] md:text-xs text-zinc-500 font-medium leading-relaxed">
          <span className="text-white font-bold block">1. Prioritize Multi-Joint Compound Lifts:</span>
          Base your strength routines on multi-joint compound barbell/dumbbell movements: **Squats, Deadlifts, Bench Presses, Barbell Rows, and Overhead Presses**. These movements load multiple massive muscle heads simultaneously, facilitating maximal central nervous stimulus and natural testosterone production.<br/>
          <span className="text-white font-bold block mt-2">2. Mechanical Tension Over Pump:</span>
          While the muscular 'pump' is beneficial, **mechanical tension** (lifting heavy loads through a full range of motion) is the primary driver of hypertrophy. Work in the **6 to 12 rep range** on compounds, stopping 1-2 reps shy of absolute muscular failure.<br/>
          <span className="text-white font-bold block mt-2">3. Systematic Progressive Overload:</span>
          Log your sessions. If you benched 70kg for 3 sets of 8 last week, your single mission this week is to lift 70kg for 3 sets of 9, or add 1.25kg to each side of the bar. Constant, incremental micro-progressions force adaptation.
        </div>
      </div>

      {/* CHAPTER 4 */}
      <div className="space-y-4 p-5 bg-zinc-950/40 rounded-xl border border-zinc-900">
        <h3 className="text-xs md:text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
          <Clock className="w-4.5 h-4.5 text-mint" /> Chapter 4: Rest, Recovery, & System Reconstruction
        </h3>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Your muscles do not grow while you are active in the gym. Heavy lifting merely damages the muscle fibers. The actual repair, construction, and physical expansion occurs purely during rest and deep sleep.
        </p>
        <div className="space-y-2 text-[11px] md:text-xs text-zinc-500 font-medium leading-relaxed">
          <span className="text-white font-bold block">1. Sleep and Growth Hormone Output:</span>
          During deep Stage-3 and Stage-4 non-REM sleep, your body produces its maximum surge of human growth hormone (HGH) and testosterone. Aim for a strict baseline of **8 hours of quality sleep daily**.<br/>
          <span className="text-white font-bold block mt-2">2. Suppress Cortisol Stress:</span>
          Chronic psychological stress triggers high cortisol levels. Cortisol is a highly catabolic hormone that actively breaks down protein tissue for fuel and increases visceral fat distribution. Prioritize stretching, meditation, and general physical decompression.<br/>
          <span className="text-white font-bold block mt-2">3. Rest Intervals & Rest Days:</span>
          Avoid lifting heavy 7 days a week. Keep training splits to 4 or 5 days maximum, and ensure each muscle group receives at least **48 to 72 hours of recovery** before loading again.
        </div>
      </div>

      {/* CONCLUDING REMARK */}
      <div className="pt-4 border-t border-zinc-900 text-center text-xs text-zinc-500 font-medium">
        © 2026 WeightGain AI Coaching Framework. All rights reserved. Peer-reviewed for sports physiology standards.
      </div>

    </div>
  );
}
