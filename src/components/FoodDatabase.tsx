import React, { useState, useMemo } from 'react';
import { Search, Info, Flame, ChevronDown, Award, Sparkles } from 'lucide-react';

interface FoodItem {
  name: string;
  category: 'Meat/Fish' | 'Dairy' | 'Nuts/Seeds' | 'Grains/Starch' | 'Oils/Fats';
  serving: string;
  kcal: number;
  protein: number; // in g
  carbs: number; // in g
  fat: number; // in g
  why: string;
}

export default function FoodDatabase() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'kcal' | 'protein' | 'name'>('kcal');

  const foods: FoodItem[] = [
    { name: "Organic Peanut Butter", category: "Nuts/Seeds", serving: "2 tbsp (32g)", kcal: 190, protein: 8, carbs: 6, fat: 16, why: "Incredibly calorie-dense, rich in healthy monounsaturated fats and muscle-building protein." },
    { name: "Whole Rolled Oats", category: "Grains/Starch", serving: "100g raw", kcal: 389, protein: 16.9, carbs: 66, fat: 6.9, why: "Excellent source of low-glycemic complex carbohydrates to fuel heavy hypertrophic training." },
    { name: "Baked Salmon Fillet", category: "Meat/Fish", serving: "150g cooked", kcal: 310, protein: 34, carbs: 0, fat: 18, why: "Packed with premium protein and Omega-3 fatty acids which support joint health and joint lubrication." },
    { name: "Whole Cage-Free Eggs", category: "Meat/Fish", serving: "2 large boiled", kcal: 155, protein: 13, carbs: 1.1, fat: 11, why: "The gold standard for bioavailable protein. Cholesterol in yolks supports anabolic hormones." },
    { name: "Hass Avocado", category: "Oils/Fats", serving: "1 medium fruit", kcal: 240, protein: 3, carbs: 12, fat: 22, why: "Loaded with potassium and healthy fats. Easy on digestion, allowing comfortable calorie ingestion." },
    { name: "Full-Cream Greek Yogurt", category: "Dairy", serving: "200g bowl", kcal: 220, protein: 20, carbs: 8, fat: 10, why: "Double the protein of regular yogurt. Packed with gut-friendly probiotics to facilitate digestion." },
    { name: "Organic Extra Virgin Olive Oil", category: "Oils/Fats", serving: "1 tbsp (15ml)", kcal: 120, protein: 0, carbs: 0, fat: 14, why: "The ultimate clean calorie booster. Drizzle on any meal to add easy fat calories with zero bloat." },
    { name: "Grass-Fed Ground Beef (85/15)", category: "Meat/Fish", serving: "150g cooked", kcal: 375, protein: 38, carbs: 0, fat: 23, why: "Rich in creatine, zinc, and iron. Accelerates pure strength levels and heavy compound progression." },
    { name: "Paneer (Cottage Cheese)", category: "Dairy", serving: "100g cubed", kcal: 320, protein: 18, carbs: 4, fat: 25, why: "Outstanding slow-digesting casein protein source. Keeps muscle protein synthesis elevated overnight." },
    { name: "Raw Walnut Halves", category: "Nuts/Seeds", serving: "50g handful", kcal: 327, protein: 7.6, carbs: 6.8, fat: 32, why: "Incredibly calorie-dense, loaded with Alpha-Linolenic Acid (ALA) to help fight workout inflammation." },
    { name: "Sweet Potato", category: "Grains/Starch", serving: "200g baked", kcal: 180, protein: 4, carbs: 41, fat: 0.3, why: "Stops cortisol and spikes glycogen replenishment rapidly post-workout without heavy bloating." },
    { name: "Basmati White Rice", category: "Grains/Starch", serving: "150g dry weight", kcal: 530, protein: 11, carbs: 115, fat: 1, why: "Very fast digesting carbohydrate. Perfect for eating large meals without feeling stuffed for hours." },
    { name: "Organic Soy Chunks", category: "Nuts/Seeds", serving: "50g dry weight", kcal: 172, protein: 26, carbs: 15, fat: 0.4, why: "One of the most concentrated plant proteins on Earth (over 50% pure protein content by weight)." },
    { name: "Raw Almonds", category: "Nuts/Seeds", serving: "50g handful", kcal: 289, protein: 10.6, carbs: 10, fat: 25, why: "High in Vitamin E which helps protect cells from oxidative stress induced by heavy lifting." }
  ];

  const filteredAndSortedFoods = useMemo(() => {
    return foods
      .filter(food => {
        const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'All' || food.category === activeCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'kcal') return b.kcal - a.kcal;
        if (sortBy === 'protein') return b.protein - a.protein;
        return a.name.localeCompare(b.name);
      });
  }, [searchQuery, activeCategory, sortBy]);

  const categories = ['All', 'Meat/Fish', 'Dairy', 'Nuts/Seeds', 'Grains/Starch', 'Oils/Fats'];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* HEADER */}
      <div className="bg-slate-card border border-zinc-800/80 rounded-2xl p-6 shadow-xl">
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          🥑 Muscle-Building Food Database
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Explore nutritional statistics of key nutrient-dense superfoods designed to feed your muscles and secure clean weight gain.
        </p>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-slate-card border border-zinc-800/80 rounded-2xl p-4 md:p-6 shadow-lg space-y-4">
        
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search foods..."
              className="w-full text-xs font-semibold bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-mint focus:border-transparent"
            />
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
          </div>

          {/* Sort selection */}
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 w-full md:w-auto justify-end">
            <span>Sort By:</span>
            <div className="inline-flex rounded-lg bg-zinc-950 p-1 text-[11px]">
              <button
                onClick={() => setSortBy('kcal')}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  sortBy === 'kcal' ? 'bg-mint text-zinc-950 font-extrabold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Calories
              </button>
              <button
                onClick={() => setSortBy('protein')}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  sortBy === 'protein' ? 'bg-mint text-zinc-950 font-extrabold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Protein
              </button>
              <button
                onClick={() => setSortBy('name')}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  sortBy === 'name' ? 'bg-mint text-zinc-950 font-extrabold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                Name
              </button>
            </div>
          </div>

        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-zinc-900">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 text-[11px] font-black rounded-xl border transition-all cursor-pointer ${
                activeCategory === cat 
                  ? 'bg-mint/15 border-mint text-mint' 
                  : 'bg-zinc-950/20 border-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-950/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* FOOD CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedFoods.map((food, idx) => (
          <div 
            key={idx}
            className="bg-slate-card border border-zinc-800/80 rounded-2xl p-5 shadow-lg space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h3 className="font-extrabold text-white text-sm">{food.name}</h3>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 mt-1 block">
                    {food.category}
                  </span>
                </div>
                <span className="text-[9px] font-bold uppercase bg-zinc-950 text-zinc-400 border border-zinc-800 px-2 py-0.5 rounded-md shrink-0">
                  {food.serving}
                </span>
              </div>

              {/* Macros values */}
              <div className="grid grid-cols-4 gap-2 pt-2 text-center text-xs font-mono font-bold">
                <div className="bg-zinc-950/60 p-2 rounded-lg border border-zinc-900">
                  <div className="text-[9px] uppercase font-bold tracking-widest text-zinc-500">Kcal</div>
                  <div className="text-sm font-black text-white mt-1">{food.kcal}</div>
                </div>
                <div className="bg-[#142621]/40 p-2 rounded-lg border border-mint/10">
                  <div className="text-[9px] uppercase font-bold tracking-widest text-mint">Pro</div>
                  <div className="text-sm font-black text-white mt-1">{food.protein}g</div>
                </div>
                <div className="bg-zinc-950/60 p-2 rounded-lg border border-zinc-900">
                  <div className="text-[9px] uppercase font-bold tracking-widest text-zinc-500">Carb</div>
                  <div className="text-sm font-black text-white mt-1">{food.carbs}g</div>
                </div>
                <div className="bg-zinc-950/60 p-2 rounded-lg border border-zinc-900">
                  <div className="text-[9px] uppercase font-bold tracking-widest text-zinc-500">Fat</div>
                  <div className="text-sm font-black text-white mt-1">{food.fat}g</div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-900 text-[11px] text-zinc-400 font-medium leading-relaxed flex gap-2">
              <Sparkles className="w-4 h-4 text-mint shrink-0 mt-0.5" />
              <div>
                <span className="text-white font-bold">Why it works:</span> {food.why}
              </div>
            </div>
          </div>
        ))}

        {filteredAndSortedFoods.length === 0 && (
          <div className="col-span-full py-12 text-center text-zinc-500 text-xs font-bold">
            No foods found matching your search parameters. Try modifying your queries.
          </div>
        )}
      </div>

    </div>
  );
}
