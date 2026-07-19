import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Sparkles, User, Settings, Award } from 'lucide-react';
import AIPanel from './components/AIPanel';
import InteractiveCalculators from './components/InteractiveCalculators';
import MealPlans from './components/MealPlans';
import FoodDatabase from './components/FoodDatabase';
import WorkoutRepository from './components/WorkoutRepository';
import BlogSection from './components/BlogSection';
import ProgressTracker from './components/ProgressTracker';
import WeightGainGuide from './components/WeightGainGuide';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    return saved !== 'light'; // default to dark mode for WeightGain AI
  });

  const [activeTab, setActiveTab] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [selectedCalcId, setSelectedCalcId] = useState<string>('bmi');

  // Global user biometric profile
  const [profile, setProfile] = useState({
    weight: 58,
    goalWeight: 70,
    height: 172,
    age: 24,
    gender: 'male' as 'male' | 'female',
    activity: 'moderate',
    dietPreference: 'balanced'
  });

  // Load profile from local storage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem('user_profile');
    if (savedProfile) {
      try {
        setProfile(JSON.parse(savedProfile));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Sync theme
  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Dynamic page & full website SEO
  useEffect(() => {
    let title = "WeightGain AI | Personal AI Nutrition & Muscle Coach";
    let desc = "Build high-quality muscle mass and gain healthy weight with WeightGain AI. Access custom calorie-surplus meal plans, precise BMR/TDEE calculators, strength workout routines, and real-time tracking.";

    switch (activeTab) {
      case 'home':
        title = "WeightGain AI | Your Personal AI Nutrition & Muscle Building Coach";
        desc = "Calculate BMR & TDEE, customize healthy weight-gain diet plans, track macros, and build high-quality muscle mass with WeightGain AI.";
        break;
      case 'ai_tools':
        title = "AI Personal Coach & Custom Calculators | WeightGain AI";
        desc = "Leverage advanced fitness intelligence. Query your AI Nutrition Coach and compute highly accurate caloric surpluses, BMR, TDEE, and macronutrients.";
        break;
      case 'meal_plans':
        title = "Custom Weight Gain Meal Plans & Calorie Surplus | WeightGain AI";
        desc = "Explore custom calorie-surplus meal structures calibrated for clean bulk, vegan diets, and vegetarian-friendly muscle building protocols.";
        break;
      case 'foods':
        title = "Calorie Dense Fitness Foods Database | WeightGain AI";
        desc = "Search and discover high-protein, calorie-dense bulking foods to hit your muscle-building macros efficiently.";
        break;
      case 'workout':
        title = "Hypertrophy & Strength Workout Routines | WeightGain AI";
        desc = "Maximize progressive overload with specialized workout divisions—Push-Pull-Legs, Upper-Lower, and high-protein bulking strategies.";
        break;
      case 'blog':
        title = "Weight Gain & Muscle Science Articles | WeightGain AI";
        desc = "Read evidence-based articles about hyper-caloric nutrition, hardgainer strategies, progressive resistance, and health.";
        break;
      case 'progress':
        title = "Interactive Weight & Progress Tracker | WeightGain AI";
        desc = "Visualize weight predictions, log weekly progress, and keep yourself highly accountable on your muscle building journey.";
        break;
      default:
        break;
    }

    // Set Document Title
    document.title = title;

    // Set Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', desc);

    // Set OpenGraph Title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }

    // Set OpenGraph Description
    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) {
      ogDesc.setAttribute('content', desc);
    }

    // Set Twitter Title
    let twTitle = document.querySelector('meta[property="twitter:title"]');
    if (twTitle) {
      twTitle.setAttribute('content', title);
    }

    // Set Twitter Description
    let twDesc = document.querySelector('meta[property="twitter:description"]');
    if (twDesc) {
      twDesc.setAttribute('content', desc);
    }
  }, [activeTab]);

  const updateProfile = (updates: any) => {
    const newProfile = { ...profile, ...updates };
    setProfile(newProfile);
    localStorage.setItem('user_profile', JSON.stringify(newProfile));
  };

  const handleSelectCalculator = (calcId: string) => {
    setSelectedCalcId(calcId);
    setActiveTab('ai_tools');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const tabs = [
    { id: 'home', name: 'Home' },
    { id: 'ai_tools', name: 'AI Tools' },
    { id: 'meal_plans', name: 'Meal Plans' },
    { id: 'foods', name: 'Foods' },
    { id: 'workout', name: 'Workout' },
    { id: 'blog', name: 'Blog' },
    { id: 'progress', name: 'Progress' }
  ];

  return (
    <div className={darkMode ? 'dark text-zinc-100 bg-[#0B1220] min-h-screen' : 'text-zinc-900 bg-slate-light min-h-screen'}>
      
      {/* HEADER brand bar */}
      <header className="sticky top-0 z-40 border-b border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#0B1220]/95 backdrop-blur-xs transition-colors">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          
          {/* Logo brand */}
          <button
            onClick={() => handleSelectTab('home')}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="logo font-black text-xl md:text-2xl text-mint tracking-tight flex items-center">
              💪 WeightGain <span className="text-zinc-900 dark:text-white ml-1.5 font-extrabold text-sm md:text-base border-l border-zinc-300 dark:border-zinc-800 pl-2 tracking-widest uppercase">AI</span>
            </div>
          </button>

          {/* Tab navigation Desktop */}
          <nav className="hidden md:flex space-x-6 h-full items-center">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleSelectTab(tab.id)}
                  className={`text-xs uppercase tracking-widest font-black h-full flex items-center px-1 border-b-2 transition-all cursor-pointer ${
                    isActive
                      ? 'border-mint text-mint font-black'
                      : 'border-transparent text-zinc-500 hover:text-mint dark:text-zinc-400 dark:hover:text-mint'
                  }`}
                >
                  {tab.name}
                </button>
              );
            })}
          </nav>

          {/* Header Action Tools */}
          <div className="flex items-center gap-3">
            
            {/* Quick stats indicators */}
            <div className="hidden lg:flex items-center gap-4 text-xs font-bold mr-4 text-zinc-500 dark:text-zinc-400 border-r border-zinc-200 dark:border-zinc-800 pr-6">
              <span>Goal: <span className="text-zinc-900 dark:text-white font-extrabold">{profile.goalWeight} kg</span></span>
              <span>Current: <span className="text-mint font-extrabold">{profile.weight} kg</span></span>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer transition-colors"
              title="Toggle Theme"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-600" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-72 max-w-xs bg-white dark:bg-[#0B1220] p-6 flex flex-col justify-between h-full shadow-2xl animate-fade-in border-r dark:border-zinc-800/80">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <span className="font-black text-xs tracking-widest uppercase text-zinc-500">Menu Navigation</span>
                <button onClick={() => setMobileMenuOpen(false)} className="cursor-pointer">
                  <X className="w-4 h-4 text-zinc-500" />
                </button>
              </div>

              {/* Mobile links */}
              <div className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleSelectTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-xs uppercase tracking-widest font-black flex items-center gap-3 transition-all cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-mint text-zinc-950 shadow-md'
                        : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900'
                    }`}
                  >
                    <span>
                      {tab.id === 'home' && '🏠'}
                      {tab.id === 'ai_tools' && '📊'}
                      {tab.id === 'meal_plans' && '🍳'}
                      {tab.id === 'foods' && '🥑'}
                      {tab.id === 'workout' && '🏋'}
                      {tab.id === 'blog' && '📚'}
                      {tab.id === 'progress' && '📈'}
                    </span>
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-center text-[10px] text-zinc-500 font-bold border-t border-zinc-200 dark:border-zinc-800/60 pt-4">
              © 2026 WeightGain AI Suite. All rights reserved.
            </div>
          </div>
        </div>
      )}

      {/* CORE WORKSPACE */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        {activeTab === 'home' && (
          <AIPanel 
            userWeight={profile.weight}
            userGoalWeight={profile.goalWeight}
            userHeight={profile.height}
            userAge={profile.age}
            userGender={profile.gender}
            userActivity={profile.activity}
            userDietPreference={profile.dietPreference}
            onUpdateProfile={updateProfile}
            onSelectTab={handleSelectTab}
            onSelectCalculator={handleSelectCalculator}
          />
        )}

        {activeTab === 'ai_tools' && (
          <InteractiveCalculators
            selectedCalculatorId={selectedCalcId}
            userWeight={profile.weight}
            userGoalWeight={profile.goalWeight}
            userHeight={profile.height}
            userAge={profile.age}
            userGender={profile.gender}
            userActivity={profile.activity}
            userDietPreference={profile.dietPreference}
            onSyncWithAI={(syncedData) => updateProfile(syncedData)}
            onSelectTab={handleSelectTab}
          />
        )}

        {activeTab === 'meal_plans' && <MealPlans />}

        {activeTab === 'foods' && <FoodDatabase />}

        {activeTab === 'workout' && <WorkoutRepository />}

        {activeTab === 'blog' && <BlogSection />}

        {activeTab === 'progress' && <ProgressTracker />}

        {activeTab === 'guide' && <WeightGainGuide />}
      </main>

      {/* FOOTER */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0B1220] py-6 transition-colors">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
          <div>
            © 2026 WeightGain AI Network. Built with precision and privacy standards.
          </div>
          <div className="flex gap-4">
            <button onClick={() => handleSelectTab('home')} className="hover:text-mint cursor-pointer">Home</button>
            <button onClick={() => handleSelectTab('ai_tools')} className="hover:text-mint cursor-pointer">AI Tools</button>
            <button onClick={() => handleSelectTab('blog')} className="hover:text-mint cursor-pointer">Expert Blog</button>
            <button onClick={() => handleSelectTab('progress')} className="hover:text-mint cursor-pointer">Log Progress</button>
          </div>
        </div>
      </footer>

    </div>
  );
}
