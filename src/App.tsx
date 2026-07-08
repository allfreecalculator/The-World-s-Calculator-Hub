import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Calculator, Search, History, Star, Bookmark, Home, HelpCircle } from 'lucide-react';
import { CATEGORIES, CALCULATORS } from './data';
import { CategoryId, SavedCalculation } from './types';
import MainDirectory from './components/MainDirectory';
import CalculatorDetails from './components/CalculatorDetails';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsPage from './components/TermsPage';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark';
  });
  const [activeTab, setActiveTab] = useState<CategoryId>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCalcId, setSelectedCalcId] = useState<string | null>(null);
  const [activeExtraPage, setActiveExtraPage] = useState<'about' | 'contact' | 'privacy' | 'terms' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [savedCalculations, setSavedCalculations] = useState<SavedCalculation[]>(() => {
    const saved = localStorage.getItem('saved_calculations');
    return saved ? JSON.parse(saved) : [];
  });

  // Theme Syncing
  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // URL Parameter Routing on Mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const calc = params.get('calc');
    if (calc) {
      const exists = CALCULATORS.some((c) => c.id === calc);
      if (exists) {
        setSelectedCalcId(calc);
      }
    }
  }, []);

  // Save/Delete Calculations Helpers
  const handleSaveCalculation = (title: string, inputs: any, outputs: any) => {
    if (!selectedCalcId) return;
    const calcName = CALCULATORS.find((c) => c.id === selectedCalcId)?.name || 'Calculator';
    const newSaved: SavedCalculation = {
      id: Date.now().toString(),
      calculatorId: selectedCalcId,
      calculatorName: calcName,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      title: title || `${calcName} - Log`,
      summary: Object.entries(outputs).map(([k, v]) => `${k}: ${v}`).join(', '),
      inputs,
      outputs
    };
    const updated = [newSaved, ...savedCalculations];
    setSavedCalculations(updated);
    localStorage.setItem('saved_calculations', JSON.stringify(updated));
  };

  const handleDeleteCalculation = (id: string) => {
    const updated = savedCalculations.filter((c) => c.id !== id);
    setSavedCalculations(updated);
    localStorage.setItem('saved_calculations', JSON.stringify(updated));
  };

  const handleSelectCalculator = (id: string) => {
    setSelectedCalcId(id);
    setSearchQuery('');
  };

  const handleTabChange = (tabId: CategoryId) => {
    setActiveTab(tabId);
    setSelectedCalcId(null); // Go back to directory
    setSearchQuery('');
    setActiveExtraPage(null);
    setMobileMenuOpen(false);
  };

  return (
    <div className={darkMode ? 'dark text-zinc-100 bg-slate-dark min-h-screen' : 'text-slate-dark bg-slate-light min-h-screen'}>
      {/* 1. HEADER BRAND BAR */}
      <header className="sticky top-0 z-40 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-slate-dark/95 backdrop-blur-xs transition-colors">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          
          {/* Logo Brand */}
          <button
            onClick={() => {
              setActiveExtraPage(null);
              handleTabChange('home');
            }}
            className="flex items-center gap-2 group"
          >
            <div className="logo font-extrabold text-xl md:text-2xl text-mint dark:text-mint tracking-tight flex items-center">
              CALC<span className="text-slate-dark dark:text-slate-light ml-1 font-bold">HUB</span>
            </div>
          </button>
 
          {/* Quick Header Search (only visible on desktop and when not searching on Hero) */}
          <div className="hidden md:flex max-w-xs w-full relative">
            <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400 dark:text-zinc-500 text-xs">
              🔍
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSelectedCalcId(null); // Return to directory listing on typing
                setActiveExtraPage(null);
              }}
              placeholder="Search calculators..."
              className="block w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-slate-800 dark:text-zinc-100 py-1.5 pl-8 pr-4 text-xs focus:border-mint focus:ring-1 focus:ring-mint outline-hidden placeholder-slate-400 dark:placeholder-zinc-600 font-medium"
            />
          </div>
 
          {/* Theme Switcher & Actions */}
          <div className="flex items-center gap-3">
            {/* About Link */}
            <button
              onClick={() => {
                setActiveExtraPage('about');
                setSelectedCalcId(null);
                setSearchQuery('');
              }}
              className={`hidden md:flex px-3.5 py-1.5 rounded-xl text-xs font-extrabold tracking-wide uppercase transition-all items-center gap-1.5 border cursor-pointer ${
                activeExtraPage === 'about'
                  ? 'bg-mint text-slate-dark border-mint'
                  : 'text-zinc-600 dark:text-zinc-300 hover:text-mint dark:hover:text-mint border-zinc-200 dark:border-zinc-800 hover:border-mint/30 bg-zinc-50 dark:bg-zinc-900'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              About
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-850 transition-colors"
              title="Toggle Theme"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-500" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-600" />
              )}
            </button>
 
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-850"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 2. TABBED CATEGORY RIBBON HEADER (Desktop Only) */}
        <div className="hidden md:block border-b border-zinc-200 dark:border-zinc-850 bg-white dark:bg-slate-dark transition-colors">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <nav className="flex space-x-8 h-12 items-center">
              {CATEGORIES.map((cat) => {
                const isActive = activeTab === cat.id && !selectedCalcId;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleTabChange(cat.id as CategoryId)}
                    className={`text-sm font-medium h-full flex items-center px-1 border-b-2 transition-colors cursor-pointer relative ${
                      isActive
                        ? 'border-mint text-mint dark:border-mint dark:text-mint font-bold'
                        : 'border-transparent text-zinc-500 hover:text-mint dark:text-zinc-400 dark:hover:text-mint'
                    }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </header>

      {/* MOBILE OVERLAY SIDEBAR DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-72 max-w-xs bg-white dark:bg-slate-dark p-6 flex flex-col justify-between h-full shadow-2xl animate-slide-in">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-150 dark:border-zinc-800">
                <span className="font-extrabold text-sm tracking-widest uppercase text-zinc-400">Navigation</span>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X className="w-4 h-4 text-zinc-500" />
                </button>
              </div>

              {/* Mobile tabs */}
              <div className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleTabChange(cat.id as CategoryId)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                      activeTab === cat.id && !selectedCalcId && !activeExtraPage
                        ? 'bg-slate-dark dark:bg-slate-light text-white dark:text-slate-dark'
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                    }`}
                  >
                    <span className="text-sm">
                      {cat.id === 'home' && '🏠'}
                      {cat.id === 'finance' && '💰'}
                      {cat.id === 'health' && '❤️'}
                      {cat.id === 'math' && '🧮'}
                      {cat.id === 'education' && '🎓'}
                      {cat.id === 'conversion' && '🔄'}
                      {cat.id === 'utility' && '⚙️'}
                    </span>
                    {cat.name}
                  </button>
                ))}

                <button
                  onClick={() => {
                    setActiveExtraPage('about');
                    setSelectedCalcId(null);
                    setSearchQuery('');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                    activeExtraPage === 'about'
                      ? 'bg-slate-dark dark:bg-slate-light text-white dark:text-slate-dark'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                  }`}
                >
                  <span className="text-sm">ℹ️</span>
                  About Us
                </button>

                <button
                  onClick={() => {
                    setActiveExtraPage('contact');
                    setSelectedCalcId(null);
                    setSearchQuery('');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                    activeExtraPage === 'contact'
                      ? 'bg-slate-dark dark:bg-slate-light text-white dark:text-slate-dark'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                  }`}
                >
                  <span className="text-sm">📞</span>
                  Contact Support
                </button>

                <button
                  onClick={() => {
                    setActiveExtraPage('privacy');
                    setSelectedCalcId(null);
                    setSearchQuery('');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                    activeExtraPage === 'privacy'
                      ? 'bg-slate-dark dark:bg-slate-light text-white dark:text-slate-dark'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                  }`}
                >
                  <span className="text-sm">🛡️</span>
                  Privacy Policy
                </button>

                <button
                  onClick={() => {
                    setActiveExtraPage('terms');
                    setSelectedCalcId(null);
                    setSearchQuery('');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
                    activeExtraPage === 'terms'
                      ? 'bg-slate-dark dark:bg-slate-light text-white dark:text-slate-dark'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                  }`}
                >
                  <span className="text-sm">📜</span>
                  Terms & Conditions
                </button>
              </div>
            </div>

            <div className="text-center text-[10px] text-zinc-400">
              © 2026 CalcHub Utility Network. All rights reserved.
            </div>
          </div>
        </div>
      )}

      {/* 3. MAIN WORKSPACE CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {activeExtraPage === 'about' ? (
          <AboutPage onBack={() => setActiveExtraPage(null)} />
        ) : activeExtraPage === 'contact' ? (
          <ContactPage onBack={() => setActiveExtraPage(null)} />
        ) : activeExtraPage === 'privacy' ? (
          <PrivacyPolicyPage onBack={() => setActiveExtraPage(null)} />
        ) : activeExtraPage === 'terms' ? (
          <TermsPage onBack={() => setActiveExtraPage(null)} />
        ) : selectedCalcId ? (
          <CalculatorDetails
            calculatorId={selectedCalcId}
            onBack={() => setSelectedCalcId(null)}
            savedCalculations={savedCalculations}
            onSaveCalculation={handleSaveCalculation}
            onDeleteCalculation={handleDeleteCalculation}
          />
        ) : (
          <MainDirectory
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onSelectCalculator={(id) => {
              setActiveExtraPage(null);
              handleSelectCalculator(id);
            }}
          />
        )}
      </main>

      {/* 4. FOOTER BRAND SECTION */}
      <footer className="h-16 md:h-12 border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-slate-dark transition-colors flex items-center">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-slate-400 dark:text-zinc-500">
          <div>
            © 2026 CalcHub Utility Network. All Rights Reserved. Fully offline optimized and privacy standard.
          </div>
          <div className="flex gap-6 font-medium text-slate-500 dark:text-zinc-400">
            <button
              onClick={(e) => {
                e.preventDefault();
                setActiveExtraPage('about');
                setSelectedCalcId(null);
                setSearchQuery('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-mint dark:hover:text-mint transition-colors cursor-pointer text-xs font-medium"
            >
              About
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setActiveExtraPage('contact');
                setSelectedCalcId(null);
                setSearchQuery('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-mint dark:hover:text-mint transition-colors cursor-pointer text-xs font-medium"
            >
              Contact
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setActiveExtraPage('privacy');
                setSelectedCalcId(null);
                setSearchQuery('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-mint dark:hover:text-mint transition-colors cursor-pointer text-xs font-medium"
            >
              Privacy Policy
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setActiveExtraPage('terms');
                setSelectedCalcId(null);
                setSearchQuery('');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-mint dark:hover:text-mint transition-colors cursor-pointer text-xs font-medium"
            >
              Terms
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
