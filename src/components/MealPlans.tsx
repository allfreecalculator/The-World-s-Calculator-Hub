import React, { useState } from 'react';
import { Utensils, Flame, Check, ChevronDown, ChevronUp, Clock, Book, Calendar } from 'lucide-react';

export default function MealPlans() {
  const [activePlan, setActivePlan] = useState<number>(0);
  const [expandedRecipeIdx, setExpandedRecipeIdx] = useState<number | null>(null);

  const plans = [
    {
      name: "🔥 3,000 kcal Classic Bulk",
      desc: "An optimal starting tier for clean muscle hypertrophy using balanced whole foods.",
      macros: { p: "160g", c: "380g", f: "95g" },
      meals: [
        {
          name: "Breakfast: High-Calorie Oats & Eggs",
          kcal: 850,
          prep: "10 mins",
          ingredients: [
            "100g Rolled Oats",
            "250ml Whole Milk",
            "2 tbsp Organic Peanut Butter",
            "1 Large Banana",
            "3 Large Whole Eggs (Scrambled with olive oil)"
          ],
          instructions: "Boil oats in whole milk. Top with banana slices and peanut butter. Enjoy with a side of olive-oil scrambled eggs."
        },
        {
          name: "Lunch: Chicken, Basmati Rice & Avocado",
          kcal: 980,
          prep: "20 mins",
          ingredients: [
            "200g Grilled Chicken Breast",
            "150g (Dry weight) Basmati Rice",
            "1/2 Avocado (Sliced)",
            "100g Mixed broccoli and bell peppers",
            "1 tbsp Extra Virgin Olive Oil"
          ],
          instructions: "Grill chicken breast and boil basmati rice. Stir-fry broccoli and peppers in olive oil. Serve with sliced avocado on the side."
        },
        {
          name: "Snack: Creamy Whey & Nut Blend Shake",
          kcal: 450,
          prep: "5 mins",
          ingredients: [
            "1 Scoop Whey Protein Isolate",
            "300ml Whole Milk",
            "1 handful Almonds",
            "1 tbsp Honey"
          ],
          instructions: "Blend all ingredients until smooth. Best consumed immediately post-workout or as a mid-afternoon snack."
        },
        {
          name: "Dinner: Salmon & Sweet Potatoes",
          kcal: 820,
          prep: "25 mins",
          ingredients: [
            "180g Baked Salmon Fillet",
            "2 Medium Sweet Potatoes (Baked)",
            "1 cup Greek Yogurt (Plain, Full-fat)"
          ],
          instructions: "Bake salmon at 200°C for 15-18 mins. Serve with baked sweet potatoes and enjoy Greek yogurt as a nutrient-dense dessert."
        }
      ]
    },
    {
      name: "🍖 3,500 kcal High-Protein Bulk",
      desc: "Designed for advanced lifting splits and individuals with high baseline metabolisms.",
      macros: { p: "195g", c: "420g", f: "110g" },
      meals: [
        {
          name: "Breakfast: Golden-Era Mass Shake & Eggs",
          kcal: 1050,
          prep: "12 mins",
          ingredients: [
            "4 Whole Eggs",
            "3 Slices Whole Wheat Toast",
            "Mass Gainer Shake: 100g Oats, 1 scoop Whey, 30g Peanut butter, 300ml Milk"
          ],
          instructions: "Prepare scrambled eggs. Toast bread. Blend the ingredients for the mass gainer shake and drink alongside."
        },
        {
          name: "Lunch: Beef, Pasta & Olive Oil Stir-fry",
          kcal: 1100,
          prep: "25 mins",
          ingredients: [
            "200g Lean Ground Beef",
            "150g Penne Pasta (Dry)",
            "70g Marinara sauce",
            "2 tbsp Olive oil (Drizzled on pasta)"
          ],
          instructions: "Brown the ground beef. Boil penne and toss in olive oil and marinara. Mix in beef and garnish with green leaves."
        },
        {
          name: "Snack: Cottage Cheese & Trail Mix",
          kcal: 500,
          prep: "5 mins",
          ingredients: [
            "200g Full-fat Cottage Cheese (Paneer)",
            "50g Walnuts & Raisins Blend"
          ],
          instructions: "Mix cottage cheese with walnuts and raisins in a bowl. Drizzle honey if desired."
        },
        {
          name: "Dinner: Turkey Steak & Quinoa Bowl",
          kcal: 850,
          prep: "20 mins",
          ingredients: [
            "220g Lean Turkey Breast Steak",
            "1.5 cups Cooked Quinoa",
            "Mixed steamed asparagus and spinach",
            "1 tbsp Flaxseed oil"
          ],
          instructions: "Pan-sear turkey steak. Serve on a bed of warm quinoa and asparagus, drizzling flaxseed oil on top."
        }
      ]
    },
    {
      name: "🧀 3,000 kcal Vegetarian Bulk",
      desc: "A powerful muscle-building menu packed with paneer, milk, lentils, and dairy proteins.",
      macros: { p: "145g", c: "370g", f: "100g" },
      meals: [
        {
          name: "Breakfast: High-Protein Paneer Toast & Oats",
          kcal: 820,
          prep: "15 mins",
          ingredients: [
            "120g Grated Paneer (Sautéed)",
            "2 Slices Sourdough Toast",
            "🥣 80g Oats with Whole Milk and sliced Apple"
          ],
          instructions: "Sauté paneer with turmeric and pepper, serve on sourdough. Accompany with cooked oats topped with apples."
        },
        {
          name: "Lunch: Royal Chickpea & Rice Feast",
          kcal: 920,
          prep: "25 mins",
          ingredients: [
            "200g Cooked Chickpeas (Chana)",
            "2 cups Basmati Rice",
            "100g Spinach and tomatoes stir-fry",
            "2 tbsp Clarified Butter (Ghee)"
          ],
          instructions: "Prepare chickpea stew with tomatoes. Serve with hot basmati rice, adding ghee to top off calorie levels."
        },
        {
          name: "Snack: Greek Yogurt & Nut Butter Bowl",
          kcal: 460,
          prep: "5 mins",
          ingredients: [
            "250g probiotic Greek Yogurt",
            "2 tbsp Almond Butter",
            "30g Pumpkin Seeds"
          ],
          instructions: "Fold almond butter and pumpkin seeds into the yogurt bowl. An outstanding protein-heavy snack."
        },
        {
          name: "Dinner: Red Kidney Beans & Sweet Potatoes",
          kcal: 800,
          prep: "20 mins",
          ingredients: [
            "200g Rajma (Red Kidney Beans)",
            "2 Medium Sweet Potatoes",
            "50g Paneer cubes added to curry"
          ],
          instructions: "Simmer kidney beans with typical Indian spices. Add raw paneer cubes, and serve alongside baked sweet potatoes."
        }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* HEADER */}
      <div className="bg-slate-card border border-zinc-800/80 rounded-2xl p-6 shadow-xl">
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          🍳 Master Bulking Meal Plans
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Hand-crafted meal plans stacked with dense calories, rich proteins, and complex carbohydrates to support consistent tissue regeneration.
        </p>
      </div>

      {/* PLAN TAB BUTTONS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {plans.map((plan, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActivePlan(idx);
              setExpandedRecipeIdx(null);
            }}
            className={`p-4 text-left rounded-xl border transition-all cursor-pointer ${
              activePlan === idx 
                ? 'bg-mint border-mint text-zinc-950' 
                : 'bg-slate-card border-zinc-900 text-zinc-300 hover:text-white hover:bg-zinc-950/40'
            }`}
          >
            <div className="font-extrabold text-sm">{plan.name}</div>
            <p className={`text-[11px] mt-1 leading-relaxed ${activePlan === idx ? 'text-zinc-800' : 'text-zinc-500'}`}>
              {plan.desc}
            </p>
            <div className="flex gap-4 mt-3 text-[10px] font-bold font-mono">
              <span>PRO: {plan.macros.p}</span>
              <span>CARB: {plan.macros.c}</span>
              <span>FAT: {plan.macros.f}</span>
            </div>
          </button>
        ))}
      </div>

      {/* ACTIVE PLAN MEALS */}
      <div className="bg-slate-card border border-zinc-800/80 rounded-2xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-black text-white uppercase tracking-wider border-b border-zinc-800 pb-3 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-mint" /> Daily Meal Breakdown
        </h3>

        <div className="space-y-4">
          {plans[activePlan].meals.map((meal, idx) => {
            const isExpanded = expandedRecipeIdx === idx;
            return (
              <div 
                key={idx} 
                className="bg-zinc-950/40 border border-zinc-900 rounded-xl overflow-hidden transition-all"
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => setExpandedRecipeIdx(isExpanded ? null : idx)}
                  className="w-full p-4 flex justify-between items-center text-left text-xs font-bold hover:bg-zinc-950/80 transition-colors"
                >
                  <div className="space-y-1">
                    <span className="text-white text-sm font-extrabold block">{meal.name}</span>
                    <div className="flex gap-4 text-[10px] text-zinc-500 font-bold font-mono">
                      <span className="flex items-center gap-1"><Flame className="w-3 h-3 text-mint" /> {meal.kcal} kcal</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {meal.prep} prep</span>
                    </div>
                  </div>
                  <span className="text-zinc-500">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                {/* Accordion Content */}
                {isExpanded && (
                  <div className="p-4 bg-zinc-950/20 border-t border-zinc-900 grid grid-cols-1 md:grid-cols-12 gap-6 text-xs font-medium text-zinc-300">
                    {/* Ingredients Column */}
                    <div className="md:col-span-5 space-y-2">
                      <span className="font-black text-white tracking-wide uppercase text-[10px] text-zinc-400 block border-b border-zinc-900 pb-1">
                        Ingredients List
                      </span>
                      <ul className="space-y-1.5">
                        {meal.ingredients.map((ing, ingIdx) => (
                          <li key={ingIdx} className="flex items-center gap-2 text-xs">
                            <span className="w-1.5 h-1.5 bg-mint rounded-full shrink-0" />
                            <span>{ing}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Instructions Column */}
                    <div className="md:col-span-7 space-y-2">
                      <span className="font-black text-white tracking-wide uppercase text-[10px] text-zinc-400 block border-b border-zinc-900 pb-1">
                        Preparation Instructions
                      </span>
                      <p className="text-[11px] leading-relaxed text-zinc-400">
                        {meal.instructions}
                      </p>
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
