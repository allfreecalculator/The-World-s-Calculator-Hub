import React from 'react';
import { ArrowLeft, ShieldCheck, Zap, Sparkles, Smartphone, Heart, HelpCircle } from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
}

export default function AboutPage({ onBack }: AboutPageProps) {
  return (
    <div className="max-w-4xl mx-auto py-4 animate-fade-in" id="about-page">
      {/* Back button */}
      <button
        onClick={onBack}
        className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-mint dark:text-zinc-400 dark:hover:text-mint transition-colors cursor-pointer"
        id="btn-about-back"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Calculators
      </button>

      {/* Hero Header */}
      <div className="text-center mb-16">
        <span className="text-[10px] uppercase font-bold tracking-widest text-mint bg-mint/10 dark:bg-mint/5 px-3 py-1 rounded-full mb-4 inline-block">
          Our Story & Mission
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-dark dark:text-white mt-2 mb-4">
          Welcome to <span className="text-mint">CalcHub</span>
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed">
          The internet's premium utility directory. We build blazing-fast, privacy-respecting, and beautifully designed calculations to simplify your everyday math, financial planning, health tracking, and academic conversions.
        </p>
      </div>

      {/* Main Philosophy Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-bold text-slate-dark dark:text-white mb-3 flex items-center gap-2">
            <Heart className="w-5 h-5 text-mint" />
            Why We Built CalcHub
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Many online calculators are cluttered with overwhelming pop-ups, slow-loading ads, and outdated interfaces that make finding a quick percentage or loan payoff frustrating. We believed the web deserved better. 
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mt-3">
            CalcHub is designed to feel native, clean, and distraction-free. Every tool is carefully crafted to deliver immediate, visual results without sacrificing speed or your personal details.
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-bold text-slate-dark dark:text-white mb-3 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-mint" />
            What is Our Vision?
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Our vision is to provide a comprehensive, all-in-one resource for professionals, students, educators, and everyone in between. We constantly expand our index based on user suggestions, refining each calculation with step-by-step guides and accurate formulas.
          </p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mt-3">
            We operate fully offline-optimized and use browser local persistence, keeping your input secure and always right where you left off.
          </p>
        </div>
      </div>

      {/* Key Core Features Bento-ish Grid */}
      <div className="mb-16">
        <h2 className="text-2xl font-black text-slate-dark dark:text-white text-center mb-10">
          The Core Pillars of CalcHub
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex gap-4 p-5 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-150 dark:border-zinc-850">
            <div className="p-3 rounded-xl bg-mint/10 text-mint shrink-0 h-11 w-11 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-dark dark:text-white mb-1">Blazing Fast Calculations</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                No spinners or server lags. All math is calculated immediately in-browser as you type, giving you interactive real-time visual output.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-5 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-150 dark:border-zinc-850">
            <div className="p-3 rounded-xl bg-mint/10 text-mint shrink-0 h-11 w-11 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-dark dark:text-white mb-1">Privacy First & Secure</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                We do not track your input or store your financial or health data on any external servers. Your records and computations never leave your device.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-5 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-150 dark:border-zinc-850">
            <div className="p-3 rounded-xl bg-mint/10 text-mint shrink-0 h-11 w-11 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-dark dark:text-white mb-1">Vast Directory of Tools</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Whether you're estimating compound returns, calculating BMI, checking unit conversions, or figuring out tips—we've got you covered.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-5 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-150 dark:border-zinc-850">
            <div className="p-3 rounded-xl bg-mint/10 text-mint shrink-0 h-11 w-11 flex items-center justify-center">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-dark dark:text-white mb-1">Fully Responsive</h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Designed to adapt beautifully on every display. Use it at your work desk or save it to your phone for quick conversions on the go.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Footer Card */}
      <div className="bg-gradient-to-r from-mint/10 to-transparent border border-mint/20 p-8 rounded-3xl text-center shadow-xs">
        <h3 className="text-xl font-bold text-slate-dark dark:text-white mb-2">
          Ready to make some calculations?
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 max-w-md mx-auto">
          Explore our complete directory containing diverse categories of calculators, tools, and handy converters.
        </p>
        <button
          onClick={onBack}
          className="px-6 py-2.5 rounded-xl bg-mint hover:bg-mint/90 text-slate-dark font-extrabold text-sm transition-all hover:scale-[1.02] cursor-pointer"
          id="btn-about-explore"
        >
          Start Exploring
        </button>
      </div>
    </div>
  );
}
