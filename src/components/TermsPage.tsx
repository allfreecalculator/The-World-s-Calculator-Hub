import React from 'react';
import { ArrowLeft, BookOpen, AlertTriangle, Scale, CheckSquare, Home } from 'lucide-react';

interface TermsPageProps {
  onBack: () => void;
}

export default function TermsPage({ onBack }: TermsPageProps) {
  return (
    <div className="max-w-4xl mx-auto py-4 animate-fade-in" id="terms-page">
      {/* Back button */}
      <button
        onClick={onBack}
        className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-mint dark:text-zinc-400 dark:hover:text-mint transition-colors cursor-pointer"
        id="btn-terms-back"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Calculators
      </button>

      {/* Hero Header */}
      <div className="text-center mb-12">
        <span className="text-[10px] uppercase font-bold tracking-widest text-mint bg-mint/10 dark:bg-mint/5 px-3 py-1 rounded-full mb-4 inline-block">
          Legal Agreement
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-dark dark:text-white mt-2 mb-4">
          Terms & <span className="text-mint">Conditions</span>
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto font-medium leading-relaxed">
          Please read these Terms carefully before using CalcHub. By accessing our platform, you acknowledge and agree to comply with these guidelines.
        </p>
      </div>

      {/* Grid summarizing main guidelines */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-150 dark:border-zinc-850">
          <div className="p-2.5 rounded-lg bg-mint/10 text-mint shrink-0 h-9 w-9 flex items-center justify-center mb-3">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-dark dark:text-white mb-1.5">Free Personal Use</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            All utilities are 100% free for educational, personal, and professional assessment calculations.
          </p>
        </div>

        <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-150 dark:border-zinc-850">
          <div className="p-2.5 rounded-lg bg-mint/10 text-mint shrink-0 h-9 w-9 flex items-center justify-center mb-3">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-dark dark:text-white mb-1.5">No Advisory Liability</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Calculations are estimates. We are not a bank, certified accountant, or medical clinic. Seek experts first.
          </p>
        </div>

        <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-150 dark:border-zinc-850">
          <div className="p-2.5 rounded-lg bg-mint/10 text-mint shrink-0 h-9 w-9 flex items-center justify-center mb-3">
            <Scale className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-dark dark:text-white mb-1.5">Intellectual Property</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Logo, calculator designs, mathematical layouts, and CSS code are owned by the CalcHub Network.
          </p>
        </div>
      </div>

      {/* Detailed terms prose */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-8 rounded-2xl shadow-xs space-y-8 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-12">
        
        <div>
          <h3 className="text-lg font-bold text-slate-dark dark:text-white mb-2 flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-mint" />
            1. Acceptance of Terms
          </h3>
          <p>
            By launching, browsing, or running computations on CalcHub, you declare that you accept these Terms of Service without reservation. If you do not agree with any of these terms, you must cease using our directory and services immediately.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-dark dark:text-white mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-mint" />
            2. General Disclaimer & Estimates
          </h3>
          <p>
            All math, formulas, rates, projections, and estimations provided on CalcHub are purely for reference and illustrative purposes. We provide no guarantees regarding mathematical absolute precision, real-world rates (e.g., dynamic exchange rates or bank-specific amortizations), or medical diagnostics. 
          </p>
          <p className="mt-2">
            You are fully responsible for checking double-ledger math before undertaking any financial investments, medical diet choices, real estate acquisitions, or commercial engineering projects based on our outputs.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-dark dark:text-white mb-2 flex items-center gap-2">
            <Scale className="w-4 h-4 text-mint" />
            3. Prohibited Usage Conduct
          </h3>
          <p>
            Users are strictly forbidden from scraping calculator structures, bulk executing automatic scripts to overwhelm our system bandwidth, reverse-engineering our calculation state engines, or hot-linking resources inside frame setups without expressing clear written permissions from CalcHub LLC.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-dark dark:text-white mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-mint" />
            4. Limitation of Liability
          </h3>
          <p>
            In no situation shall CalcHub, its developers, authors, or corporate partners be held liable for any direct, indirect, random, or punitive damages (including, but not limited to, financial deficits, medical complications, or personal inaccuracies) originating from the use or malfunction of any calculator listed in this catalog.
          </p>
        </div>

        <div className="pt-6 border-t border-zinc-150 dark:border-zinc-800 text-xs text-zinc-500">
          Last Updated: July 6, 2026. For questions on these conditions, please email us at <a href="mailto:terms@calchub.net" className="text-mint hover:underline">terms@calchub.net</a>.
        </div>
      </div>

      {/* Dynamic Home CTA button */}
      <div className="bg-gradient-to-r from-zinc-100 to-zinc-50 dark:from-zinc-900/70 dark:to-zinc-900/30 border border-zinc-200 dark:border-zinc-800 p-8 rounded-3xl text-center shadow-xs">
        <h3 className="text-xl font-bold text-slate-dark dark:text-white mb-2 flex items-center justify-center gap-2">
          <Home className="w-5 h-5 text-mint" />
          Ready to Calculate?
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 max-w-md mx-auto">
          Explore over 500+ free online calculators and fast converters carefully built with absolute accuracy.
        </p>
        <button
          onClick={onBack}
          className="px-6 py-2.5 rounded-xl bg-mint hover:bg-mint/90 text-slate-dark font-extrabold text-sm transition-all hover:scale-[1.02] cursor-pointer"
          id="btn-bottom-home-cta-terms"
        >
          Return to Home Directory
        </button>
      </div>
    </div>
  );
}
