import React, { useState } from 'react';
import { BookOpen, Clock, ChevronRight, ArrowLeft, Heart, MessageSquare } from 'lucide-react';

interface Article {
  title: string;
  excerpt: string;
  readingTime: string;
  category: string;
  date: string;
  content: string[];
}

export default function BlogSection() {
  const [activeArticleIdx, setActiveArticleIdx] = useState<number | null>(null);

  const articles: Article[] = [
    {
      title: "🍗 The Science of Hyper-Caloric Bulking: How to Gain Lean Mass Without Excess Fat",
      excerpt: "Uncover the precise thermodynamics of muscular weight gain, baseline calorie calculations, and macronutrient strategies to minimize fat accumulation.",
      readingTime: "6 min read",
      category: "Nutrition",
      date: "July 12, 2026",
      content: [
        "To build raw skeletal muscle tissue, your body must be positioned in a physiological state called a positive energy balance—more commonly known as a caloric surplus. Without excess energy, muscle protein synthesis (MPS) is restricted because the body prioritizes standard metabolic baseline life maintenance over the high-energy process of laying down new myofibrillar cells.",
        "However, eating everything in sight—commonly known as 'dirty bulking'—is a recipe for accelerated lipid fat storage. Since muscle tissue assembly is physiologically capped, excess energy above that ceiling goes directly to fat cells.",
        "🔬 Calculating the Optimal Surplus:",
        "Research suggests a conservative caloric surplus of +350 to +500 calories above your Total Daily Energy Expenditure (TDEE) is optimal for lean mass accretion. This facilitates a weight gain velocity of roughly 0.3kg to 0.5kg per week. Any weight gain faster than this threshold is almost guaranteed to be fat tissue or excess water storage.",
        "🥩 Macronutrient Partitioning Rules:",
        "Your surplus must be backed by correct macro splits to facilitate muscular repair rather than simple fat filling:",
        "1. Protein: Consume 1.6g to 2.2g per kg of bodyweight. Protein provides the amino acid bricks (leucine, isoleucine, valine) to construct new muscle fibers.",
        "2. Carbohydrates: Aim for 4g to 6g per kg of bodyweight. Carbohydrates replenish muscle glycogen, which fuels heavy pressing workouts and spikes insulin, an highly anabolic hormone that transports nutrients straight into exhausted muscle fibers.",
        "3. Fats: Allocate 25% to 30% of total calories to healthy fats. Fats support hormone profiles, specifically natural testosterone and growth hormone, both critical for physical strength and cell repair.",
        "🥤 Appetite Management Hacks:",
        "If you have a naturally low appetite ('hardgainer'), consuming 3,200 calories can feel like a chore. Conquer this by prioritizing liquid calories. Blend rolled oats, peanut butter, whole milk, bananas, and whey protein. This provides 800+ calories that bypasses heavy chewing and digests quickly without leaving you feeling chronically stuffed."
      ]
    },
    {
      title: "🏋 Progressive Overload Explained: The Only Muscle Growth Principle That Matters",
      excerpt: "If you do not force your muscles to work harder over time, they will never grow. Master the 3 primary progressive overload execution paths.",
      readingTime: "5 min read",
      category: "Strength Training",
      date: "June 28, 2026",
      content: [
        "Muscle hypertrophy is fundamentally an adaptation process. Your body does not want to carry heavy, energy-expensive muscle tissue unless it is absolutely forced to do so. If you lift the exact same weights, for the exact same reps, week after week, your body will maintain its current size, regardless of how much protein or calories you ingest.",
        "This is the core law of Progressive Overload: you must systematically increase the physical stress placed on your muscular system over time to force the myofibrils to adapt and grow larger.",
        "📈 The Three Paths to Progressive Overload:",
        "1. Mechanical Tension (Lifting Heavier Weights): This is the most straightforward path. If you successfully benched 60kg for 3 sets of 8 last week, increase the weight to 62.5kg this week. The increased mechanical tension forces new muscle recruitment and density adaptions.",
        "2. Volume (Adding Reps or Sets): If your weight stalls, add reps. Performing 9 reps of 60kg is a higher total workout volume than doing 8 reps. Alternatively, add a 4th set of an exercise to increase the localized hypertrophic stimulus.",
        "3. Density (Reducing Rest Periods): Complete the same workout volume in less time. Rest for 2 minutes instead of 3 minutes between sets. This triggers high metabolic stress, creating massive lactic acid and localized cellular swelling.",
        "📝 Training logs are mandatory. Never step into the gym guessing your weights. Carry a notepad or phone log, review what you did last session, and aim to beat it by at least 1 rep or 1 kg on every single exercise."
      ]
    },
    {
      title: "🥛 5 High-Calorie Liquid Recipes to Easily Beat Low Appetite Stalls",
      excerpt: "Low appetite is the number one barrier for skinny hardgainers. Discover 5 clean, home-made high-calorie shake recipes.",
      readingTime: "4 min read",
      category: "Recipes",
      date: "June 19, 2026",
      content: [
        "Skinny hardgainers frequently state: 'I eat so much but I cannot gain weight.' However, once their food is actually tracked, they often discover they are barely reaching 2,200 calories due to a highly active satiety response. Chewing massive volumes of dry chicken breast, broccoli, and brown rice becomes physically exhausting.",
        "Liquid calories digest much faster than solid foods because your stomach does not need to mechanically grind them. This allows you to consume massive calorie loads without feeling full for 6 hours.",
        "🥛 Recipe 1: The 900 kcal Classic Monster shake:",
        "- 100g Rolled Oats (blended to powder first)\n- 300ml Whole Milk\n- 2 tbsp Peanut Butter\n- 1 scoop Chocolate Whey Protein\n- 1 Medium Banana\nBlend all ingredients. This shake contains roughly 55g of protein, 110g of carbs, and 30g of fats. It serves as an exceptional breakfast replacement.",
        "🥥 Recipe 2: Vegan Coconut-Berry Mass Maker (800 kcal):",
        "- 100g Rolled Oats\n- 200ml Canned Coconut Milk (high density fats)\n- 150ml Soy Milk\n- 1 scoop Pea Protein Isolate\n- 50g Blueberries\n- 2 tbsp Chia Seeds\nExcellent plant-based, dairy-free mass builder rich in medium-chain triglycerides (MCT) for fast energy.",
        "🌰 Recipe 3: Almond-Honey Calorie Bomb (850 kcal):",
        "- 100g Oats\n- 300ml Whole Milk\n- 2.5 tbsp Almond Butter\n- 2 tbsp Honey\n- 1 scoop Vanilla Whey Protein\nA delicious, slightly sweet, high-calorie option for those tired of heavy chocolate peanut butter flavor stalls."
      ]
    }
  ];

  if (activeArticleIdx !== null) {
    const art = articles[activeArticleIdx];
    return (
      <div className="max-w-4xl mx-auto bg-slate-card border border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
        
        {/* BACK ACTION */}
        <button
          onClick={() => setActiveArticleIdx(null)}
          className="inline-flex items-center gap-1.5 text-xs text-mint font-bold hover:underline cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Articles
        </button>

        {/* METADATA */}
        <div className="space-y-3">
          <span className="text-[10px] font-black uppercase tracking-widest text-mint bg-mint/10 px-2.5 py-1 rounded-full">
            {art.category}
          </span>
          <h1 className="text-xl md:text-3xl font-black text-white leading-tight">
            {art.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-zinc-500 font-bold">
            <span>By WeightGain AI Coach</span>
            <span>•</span>
            <span>{art.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {art.readingTime}</span>
          </div>
        </div>

        {/* FULL CONTENT */}
        <div className="prose prose-invert max-w-none text-xs md:text-sm text-zinc-300 leading-relaxed space-y-4 pt-4 border-t border-zinc-900">
          {art.content.map((paragraph, pIdx) => {
            const isSubheading = paragraph.startsWith('🔬') || paragraph.startsWith('🥩') || paragraph.startsWith('📚') || paragraph.startsWith('📈') || paragraph.startsWith('📝') || paragraph.startsWith('🥤') || paragraph.startsWith('🥛') || paragraph.startsWith('🥥') || paragraph.startsWith('🌰');
            return (
              <p 
                key={pIdx} 
                className={isSubheading ? "text-sm md:text-base font-extrabold text-white mt-6 pt-2" : "leading-relaxed text-zinc-400 font-medium"}
              >
                {paragraph}
              </p>
            );
          })}
        </div>

      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* HEADER */}
      <div className="bg-slate-card border border-zinc-800/80 rounded-2xl p-6 shadow-xl">
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          📚 Educational Articles & Guides
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Explore highly structured, scientific material written by muscle physiology and sports nutrition experts to optimize your progress.
        </p>
      </div>

      {/* ARTICLES LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((art, idx) => (
          <div 
            key={idx}
            className="bg-slate-card border border-zinc-800/80 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-zinc-700/80 transition-all group"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] font-bold font-mono">
                <span className="text-mint uppercase tracking-wider bg-mint/5 px-2 py-0.5 rounded-md">
                  {art.category}
                </span>
                <span className="text-zinc-500">{art.date}</span>
              </div>

              <h3 className="font-extrabold text-white text-sm group-hover:text-mint transition-colors line-clamp-2">
                {art.title}
              </h3>

              <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                {art.excerpt}
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-zinc-900 flex items-center justify-between">
              <span className="text-[10px] text-zinc-500 font-bold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {art.readingTime}
              </span>
              <button
                onClick={() => setActiveArticleIdx(idx)}
                className="text-xs text-mint font-black hover:underline flex items-center gap-1 cursor-pointer"
              >
                Read Article <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
