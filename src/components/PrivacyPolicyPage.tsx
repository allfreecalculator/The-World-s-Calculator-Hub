import React from 'react';
import { ArrowLeft, Shield, Eye, Lock, FileText, Database, Server, Home } from 'lucide-react';

interface PrivacyPolicyPageProps {
  onBack: () => void;
}

export default function PrivacyPolicyPage({ onBack }: PrivacyPolicyPageProps) {
  return (
    <div className="max-w-4xl mx-auto py-4 animate-fade-in" id="privacy-policy-page">
      {/* Back button */}
      <button
        onClick={onBack}
        className="group mb-8 inline-flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-mint dark:text-zinc-400 dark:hover:text-mint transition-colors cursor-pointer"
        id="btn-privacy-back"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Calculators
      </button>

      {/* Hero Header */}
      <div className="text-center mb-12">
        <span className="text-[10px] uppercase font-bold tracking-widest text-mint bg-mint/10 dark:bg-mint/5 px-3 py-1 rounded-full mb-4 inline-block">
          Transparency First
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-dark dark:text-white mt-2 mb-4">
          Privacy <span className="text-mint">Policy</span>
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto font-medium leading-relaxed">
          At CalcHub, we respect your privacy above all else. This policy explains what data we process and how we protect your confidentiality.
        </p>
      </div>

      {/* Privacy highlights bento section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
        <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-150 dark:border-zinc-850">
          <div className="p-2.5 rounded-lg bg-mint/10 text-mint shrink-0 h-9 w-9 flex items-center justify-center mb-3">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-dark dark:text-white mb-1.5">No Client-Side Tracking</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            We don't collect, sell, or upload your calculation inputs. Your financial and health data remain purely yours.
          </p>
        </div>

        <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-150 dark:border-zinc-850">
          <div className="p-2.5 rounded-lg bg-mint/10 text-mint shrink-0 h-9 w-9 flex items-center justify-center mb-3">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-dark dark:text-white mb-1.5">Local Storage Only</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Your saved calculation logs and active session states are stored entirely inside your browser's LocalStorage database.
          </p>
        </div>

        <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-150 dark:border-zinc-850">
          <div className="p-2.5 rounded-lg bg-mint/10 text-mint shrink-0 h-9 w-9 flex items-center justify-center mb-3">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-sm text-slate-dark dark:text-white mb-1.5">Safe and Ad-Supported</h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            We serve non-intrusive standard ads via Google AdSense to run our platform without storing your personal identifiers.
          </p>
        </div>
      </div>

      {/* Main content prose */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-8 rounded-2xl shadow-xs space-y-8 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-12">
        
        <div>
          <h3 className="text-lg font-bold text-slate-dark dark:text-white mb-2 flex items-center gap-2">
            <Eye className="w-4 h-4 text-mint" />
            1. Information Collection and Processing
          </h3>
          <p>
            CalcHub acts as a fully serverless, edge-computed directory. We do not require you to sign up, create an account, or log in to use our 500+ utilities. We never collect or store any data you input into our calculators (e.g. your salary, compound investment details, body weight, caloric calculations, or age). All computations are executed instantaneously on your browser client.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-dark dark:text-white mb-2 flex items-center gap-2">
            <FileText className="w-4 h-4 text-mint" />
            2. Browser Cookies and Local Storage
          </h3>
          <p>
            We use browser <code>LocalStorage</code> solely to allow you to save your custom calculation logs (such as amortized schedules or fitness assessments) on your device. You can completely clear or wipe these logs at any time by clicking the delete icons, or by clearing your browser cache.
          </p>
          <p className="mt-2">
            Standard internet cookies may be utilized by our third-party partner Google AdSense to deliver customized non-personalized advertisements to support our development team.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-dark dark:text-white mb-2 flex items-center gap-2">
            <Server className="w-4 h-4 text-mint" />
            3. Third-Party Services & Links
          </h3>
          <p>
            Our utility platform may list outbound links to reference sites, official documentation, or legal calculators. We are not responsible for the privacy methodologies of those external domains. We encourage users to verify privacy pages of any secondary sites they navigate to.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-bold text-slate-dark dark:text-white mb-2 flex items-center gap-2">
            <Shield className="w-4 h-4 text-mint" />
            4. Security Standards
          </h3>
          <p>
            Because we use client-side operations, we secure your workflow against modern man-in-the-middle attacks. Since your inputs are never submitted to any database servers or external clouds, they cannot be compromised in a server data breach.
          </p>
        </div>

        <div className="pt-6 border-t border-zinc-150 dark:border-zinc-800 text-xs text-zinc-500">
          Last Updated: July 6, 2026. For privacy questions, please email us at <a href="mailto:privacy@calchub.net" className="text-mint hover:underline">privacy@calchub.net</a>.
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
          id="btn-bottom-home-cta-pp"
        >
          Return to Home Directory
        </button>
      </div>
    </div>
  );
}
