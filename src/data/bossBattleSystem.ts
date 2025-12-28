/**
 * Enhanced Boss Battle System for Shokuiku Saga RPG
 * Includes anime-style cutscenes, food myths, nutrition counters, and evolving bosses
 */

export interface BossMythTaunt {
  myth: string;
  effect: string;
  nutritionCounter: string;
}

export interface BossPhase {
  phaseNumber: number;
  healthPercent: number;
  moveset: BossMoveAttack[];
  taunts: BossMythTaunt[];
  description: string;
}

export interface BossMoveAttack {
  name: string;
  description: string;
  damage: number;
  emoji: string;
}

export interface BossReward {
  type: "recipe" | "cosmetic" | "companion";
  name: string;
  description: string;
  emoji: string;
  effect?: string;
}

export interface FoodSpirit {
  id: string;
  name: string;
  food: string;
  emoji: string;
  personality: string;
  ability: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export interface BossData {
  id: string;
  name: string;
  emoji: string;
  chapter: number;
  description: string;
  foodChallenge: string;
  baseHp: number;
  phases: BossPhase[];
  cutscene: {
    opening: string;
    victory: string;
    defeat: string;
  };
  rewards: BossReward[];
  rewards_spirit?: FoodSpirit;
}

// ============================================================================
// BOSS CUTSCENE SYSTEM
// ============================================================================

export const BOSS_CUTSCENES = {
  refined_carb_phantom_opening: `
    ⚡ CUTSCENE: REFINED CARB PHANTOM ⚡
    
    The Grain Plains grow dark as a ghostly figure emerges from the shadows.
    Its form shimmers with the shimmer of white bread and sugary cereals.
    
    "Welcome, young guardian... I've been draining the energy from these lands!
    Why eat whole grains when refined carbs taste so much better?
    Refined is superior! White is pure! Give in to the sweetness!"
    
    The Phantom laughs as your energy starts to fade...
    You must teach it the truth about nutrition!
  `,
  
  junk_goblin_opening: `
    🎭 CUTSCENE: JUNK GOBLIN ⚡
    
    Cackling echoes through Veggie Forest. A mischievous green creature
    materializes, holding sizzling fried foods in both hands.
    
    "Hehehehe! Vegetables are BORING! 🍟
    Look at all these delicious fried snacks! Crunchy, salty, TASTY!
    Why would anyone choose boring green stuff over THIS?
    Your precious vegetables will NEVER stand a chance!"
    
    The goblin throws greasy food everywhere, corrupting the forest!
    The veggies begin to wilt. You must save them!
  `,
  
  overload_ogre_opening: `
    💪 CUTSCENE: OVERLOAD OGRE 💪
    
    The ground shakes as a massive ogre emerges from the mountain.
    Its muscles bulge impossibly large as it devours enormous quantities of food.
    
    "MOOOORE! MORE IS BETTER! ALWAYS MORE!
    Why balance when you can OVERLOAD?
    I've consumed so much protein my body is UNSTOPPABLE!
    You pathetic guardian with your 'moderation'... YOU CAN'T COMPETE!"
    
    The Ogre pounds its chest, sending shockwaves across the peaks.
    You must teach it the power of BALANCE!
  `,
  
  sugar_siren_opening: `
    🎵 CUTSCENE: SUGAR SIREN 🎵
    
    A hauntingly beautiful siren's voice fills the air.
    A shimmering figure made of candy and sugary drinks materializes.
    
    "Come, come, my dear... 💘
    Why settle for natural sugars when I offer PURE SWEETNESS?
    Energy drinks, sodas, candy... I'm everything you CRAVE!
    One sip of me and you'll never want anything else...
    Drop your guardian duties and JOIN my sugary paradise!"
    
    Her song begins to affect your willpower. You must resist!
  `,
  
  chaos_diet_dragon_opening: `
    🐉 CUTSCENE: CHAOS DIET DRAGON 🐉
    
    The sky turns dark. The ground shakes. A massive dragon emerges,
    covered in symbols of every fad diet, body image myth, and health lie.
    
    "HAHAHAHA! I AM EVERYTHING YOU FEAR!
    I am the voice saying 'you're not enough'...
    I am every impossible diet promise... every body image lie...
    I am confusion, misinformation, and DESPAIR!
    
    You cannot defeat me, guardian! I exist in EVERY mind!"
    
    The dragon's power is immense. This is the final test.
    Everything you've learned will determine your fate!
  `,
};

// ============================================================================
// BOSS DEFINITIONS
// ============================================================================

export const BOSSES: Record<string, BossData> = {
  refined_carb_phantom: {
    id: "refined_carb_phantom",
    name: "Refined Carb Phantom",
    emoji: "👻",
    chapter: 1,
    description: "A ghostly manifestation of refined carbs that drains your energy",
    foodChallenge: "Refined Carbohydrates vs Whole Grains",
    baseHp: 80,
    phases: [
      {
        phaseNumber: 1,
        healthPercent: 100,
        moveset: [
          {
            name: "White Bread Assault",
            description: "Blast of refined carbs saps your energy",
            damage: 8,
            emoji: "🍞",
          },
          {
            name: "Sugar Crash",
            description: "Sudden energy drain from processed foods",
            damage: 6,
            emoji: "💥",
          },
        ],
        taunts: [
          {
            myth: "Refined carbs taste better than whole grains",
            effect: "Reduce player defense by 15%",
            nutritionCounter:
              "Whole grains provide sustained energy AND taste great!",
          },
          {
            myth: "White bread is cleaner and purer",
            effect: "Confuse player (reduce accuracy)",
            nutritionCounter:
              "Whole grains have MORE nutrients and fiber for your body!",
          },
        ],
        description: "Phase 1: The phantom is agile and quick",
      },
      {
        phaseNumber: 2,
        healthPercent: 50,
        moveset: [
          {
            name: "Instant Noodle Cyclone",
            description: "Refined carb tornado hits hard",
            damage: 12,
            emoji: "🌪️",
          },
          {
            name: "Donut Downpour",
            description: "Sugar-coated attack",
            damage: 10,
            emoji: "🍩",
          },
        ],
        taunts: [
          {
            myth: "You can't feel full on whole grains",
            effect: "Reduce player max HP temporarily",
            nutritionCounter:
              "Fiber in whole grains makes you feel full LONGER!",
          },
        ],
        description: "Phase 2: Phantom becomes more aggressive!",
      },
    ],
    cutscene: {
      opening: BOSS_CUTSCENES.refined_carb_phantom_opening,
      victory:
        "The phantom dissipates as the truth about whole grains shines through!\n\n✨ You've learned the POWER OF WHOLE GRAINS!",
      defeat:
        "The phantom's energy drain is too much... You've been defeated.\nBut don't give up! Try again and use nutrition facts to counter!",
    },
    rewards: [
      {
        type: "recipe",
        name: "Whole Grain Power Bowl",
        description: "A delicious and energizing bowl recipe",
        emoji: "🍚",
        effect: "+50% Energy Recovery",
      },
      {
        type: "cosmetic",
        name: "Grain Guardian Outfit",
        description: "Anime-style gear inspired by whole grain power",
        emoji: "👘",
        effect: "Look like a nutrition expert!",
      },
      {
        type: "companion",
        name: "Quinoa Spirit",
        description: "A wise spirit companion from the grain realm",
        emoji: "✨",
        effect: "+10% XP gain",
      },
    ],
    rewards_spirit: {
      id: "quinoa_spirit",
      name: "Quinoa",
      food: "Quinoa",
      emoji: "🌾",
      personality: "Wise and patient, always has steady energy",
      ability: "Sustained Energy - Restore 10 HP each turn",
      rarity: "rare",
    },
  },

  junk_goblin: {
    id: "junk_goblin",
    name: "Junk Goblin",
    emoji: "👹",
    chapter: 2,
    description: "A mischievous goblin that spreads junk food temptation",
    foodChallenge: "Vegetables vs Junk Food",
    baseHp: 90,
    phases: [
      {
        phaseNumber: 1,
        healthPercent: 100,
        moveset: [
          {
            name: "Greasy Splatter",
            description: "Tosses oily food at you",
            damage: 9,
            emoji: "🍟",
          },
          {
            name: "Junk Whirlwind",
            description: "Swirls processed foods around",
            damage: 7,
            emoji: "💨",
          },
        ],
        taunts: [
          {
            myth: "Vegetables taste boring compared to junk food",
            effect: "Reduce player attack by 20%",
            nutritionCounter:
              "Vegetables have AMAZING flavors AND make you feel great!",
          },
          {
            myth: "Fast food is convenient - health takes time",
            effect: "Skip player next turn",
            nutritionCounter:
              "Healthy meals are QUICK and DELICIOUS too! 5-minute veggie stir-fry!",
          },
        ],
        description: "Phase 1: Goblin is playful and taunting",
      },
      {
        phaseNumber: 2,
        healthPercent: 50,
        moveset: [
          {
            name: "Deep Fryer Explosion",
            description: "Massive oily attack",
            damage: 15,
            emoji: "💥",
          },
          {
            name: "Processed Poison",
            description: "Toxic junk food blast",
            damage: 12,
            emoji: "☠️",
          },
        ],
        taunts: [
          {
            myth: "Healthy food is expensive",
            effect: "Reduce loot drops",
            nutritionCounter:
              "Seasonal veggies are CHEAPER and taste better fresh!",
          },
        ],
        description: "Phase 2: Goblin gets more desperate and aggressive!",
      },
    ],
    cutscene: {
      opening: BOSS_CUTSCENES.junk_goblin_opening,
      victory:
        "The goblin retreats as the vegetables bloom again!\n\n🥬 You've unlocked the SECRET POWER OF VEGETABLES!",
      defeat:
        "The goblin's greasiness overwhelms you... Don't surrender!\nRemember: vegetables are your allies!",
    },
    rewards: [
      {
        type: "recipe",
        name: "Rainbow Veggie Stir-Fry",
        description: "A colorful, quick, and nutritious meal",
        emoji: "🍳",
        effect: "+30% Defense (healthy choices strengthen you!)",
      },
      {
        type: "cosmetic",
        name: "Veggie Guardian Armor",
        description: "Green armor that glows with health",
        emoji: "🥒",
        effect: "Show off your veggie power!",
      },
      {
        type: "companion",
        name: "Broccoli Spirit",
        description: "A protective forest spirit of broccoli",
        emoji: "🌟",
        effect: "+15% Defense",
      },
    ],
    rewards_spirit: {
      id: "broccoli_spirit",
      name: "Broccoli",
      food: "Broccoli",
      emoji: "🥦",
      personality: "Tough and protective, shields you with fiber",
      ability: "Veggie Shield - Reduce damage by 5 next turn",
      rarity: "rare",
    },
  },

  overload_ogre: {
    id: "overload_ogre",
    name: "Overload Ogre",
    emoji: "👿",
    chapter: 3,
    description: "A massive ogre representing excess and imbalance",
    foodChallenge: "Balanced Portions vs Overeating",
    baseHp: 120,
    phases: [
      {
        phaseNumber: 1,
        healthPercent: 100,
        moveset: [
          {
            name: "Massive Punch",
            description: "Huge unbalanced attack",
            damage: 15,
            emoji: "👊",
          },
          {
            name: "Gorge Attack",
            description: "Overeating creates power",
            damage: 12,
            emoji: "🍽️",
          },
        ],
        taunts: [
          {
            myth: "More food = More strength",
            effect: "Ogre gains +5 damage per turn",
            nutritionCounter:
              "BALANCE creates TRUE strength! Moderation = peak performance!",
          },
          {
            myth: "You must eat huge portions to be strong",
            effect: "Reduce player damage",
            nutritionCounter:
              "Healthy portions give SUSTAINED power, not short bursts!",
          },
        ],
        description: "Phase 1: Ogre is overwhelming and loud",
      },
      {
        phaseNumber: 2,
        healthPercent: 60,
        moveset: [
          {
            name: "Mountain Slam",
            description: "Slams with immense force",
            damage: 20,
            emoji: "⛰️",
          },
        ],
        taunts: [
          {
            myth: "Portion control is for the weak",
            effect: "Increase ogre defense significantly",
            nutritionCounter:
              "Smart eating = ultimate warrior wisdom!",
          },
        ],
        description: "Phase 2: Ogre realizes balance is gaining strength",
      },
      {
        phaseNumber: 3,
        healthPercent: 25,
        moveset: [
          {
            name: "Final Overload",
            description: "Last desperate massive attack",
            damage: 18,
            emoji: "💣",
          },
        ],
        taunts: [
          {
            myth: "NEVER STOP EATING!",
            effect: "Random damage variance",
            nutritionCounter:
              "Balance brings peace AND power! You WIN!",
          },
        ],
        description: "Phase 3: Ogre becomes unstable and weakens",
      },
    ],
    cutscene: {
      opening: BOSS_CUTSCENES.overload_ogre_opening,
      victory:
        "The ogre collapses, finally understanding true balance!\n\n⚖️ You've mastered the HARMONY OF BALANCED NUTRITION!",
      defeat:
        "The ogre's overwhelming power crushes you... Get up! Show it balance!",
    },
    rewards: [
      {
        type: "recipe",
        name: "Perfect Balanced Plate",
        description: "The ideal meal with all food groups",
        emoji: "🍲",
        effect: "+50% All Stats when used",
      },
      {
        type: "cosmetic",
        name: "Balance Master Robe",
        description: "Perfectly symmetrical anime warrior outfit",
        emoji: "👑",
        effect: "Respect! Everyone recognizes your mastery!",
      },
      {
        type: "companion",
        name: "Tempeh Spirit",
        description: "A balanced soy-based companion",
        emoji: "🌟",
        effect: "+20% ALL stats (true balance)",
      },
    ],
    rewards_spirit: {
      id: "tempeh_spirit",
      name: "Tempeh",
      food: "Tempeh",
      emoji: "🌟",
      personality:
        "Perfectly balanced, wise about moderation and strength",
      ability: "Perfect Balance - Restore all stats to 50%",
      rarity: "epic",
    },
  },

  sugar_siren: {
    id: "sugar_siren",
    emoji: "🧜‍♀️",
    name: "Sugar Siren",
    chapter: 4,
    description:
      "A tempting siren that lures with sugary promises and energy drink myths",
    foodChallenge: "Natural Sugars vs Added Sugars",
    baseHp: 100,
    phases: [
      {
        phaseNumber: 1,
        healthPercent: 100,
        moveset: [
          {
            name: "Candy Charm",
            description: "Tries to seduce you with sweets",
            damage: 10,
            emoji: "🍬",
          },
          {
            name: "Energy Drink Mirage",
            description: "False energy promise",
            damage: 8,
            emoji: "⚡",
          },
        ],
        taunts: [
          {
            myth: "Sugar gives you energy - you need me!",
            effect: "Apply confusion status",
            nutritionCounter:
              "Sugar CRASHES your energy! Real energy comes from balance!",
          },
          {
            myth: "Energy drinks are just healthy drinks",
            effect: "Reduce player willpower/accuracy",
            nutritionCounter:
              "Energy drinks have TOO MUCH caffeine and sugar! Water is better!",
          },
        ],
        description: "Phase 1: Siren is alluring and tempting",
      },
      {
        phaseNumber: 2,
        healthPercent: 50,
        moveset: [
          {
            name: "Soda Tsunami",
            description: "Wave of sugary drinks",
            damage: 14,
            emoji: "🌊",
          },
          {
            name: "Candy Cascade",
            description: "Avalanche of sweets",
            damage: 12,
            emoji: "🍫",
          },
        ],
        taunts: [
          {
            myth: "Natural juice is just as bad as soda",
            effect: "Confuse player about nutrition",
            nutritionCounter:
              "Whole fruit has FIBER! Juice is missing nutrients. Eat the fruit!",
          },
        ],
        description: "Phase 2: Siren becomes desperate and aggressive",
      },
    ],
    cutscene: {
      opening: BOSS_CUTSCENES.sugar_siren_opening,
      victory:
        "The siren's song fades as you see through her lies!\n\n🍎 You've discovered the TRUTH ABOUT NATURAL SWEETNESS!",
      defeat:
        "The siren's song enchants you... Resist! Remember fruits' true power!",
    },
    rewards: [
      {
        type: "recipe",
        name: "Smoothie of Truth",
        description: "Real whole fruit smoothie with no added sugar",
        emoji: "🧃",
        effect: "Cure confusion, sustained energy",
      },
      {
        type: "cosmetic",
        name: "Clarity Crown",
        description: "A crown that glows with truth",
        emoji: "👑",
        effect: "Immunity to myths and confusion!",
      },
      {
        type: "companion",
        name: "Blueberry Spirit",
        description: "A small but mighty antioxidant companion",
        emoji: "💜",
        effect: "+10% resistance to myths",
      },
    ],
    rewards_spirit: {
      id: "blueberry_spirit",
      name: "Blueberry",
      food: "Blueberry",
      emoji: "💜",
      personality: "Small but powerful, protects against health misinformation",
      ability: "Myth Shield - Gain immunity to next taint",
      rarity: "rare",
    },
  },

  chaos_diet_dragon: {
    id: "chaos_diet_dragon",
    name: "Chaos Diet Dragon",
    emoji: "🐉",
    chapter: 7,
    description: "The ultimate boss - all diet myths and misinformation combined",
    foodChallenge: "All Nutrition Knowledge",
    baseHp: 200,
    phases: [
      {
        phaseNumber: 1,
        healthPercent: 100,
        moveset: [
          {
            name: "Body Image Blast",
            description: "Attacks your confidence",
            damage: 12,
            emoji: "💔",
          },
          {
            name: "Fad Diet Cyclone",
            description: "Spins with contradictory advice",
            damage: 10,
            emoji: "🌪️",
          },
          {
            name: "Misinformation Flame",
            description: "Burns with false health claims",
            damage: 11,
            emoji: "🔥",
          },
        ],
        taunts: [
          {
            myth: "You'll never be healthy enough",
            effect: "Reduce player damage by 25%",
            nutritionCounter:
              "Health is a JOURNEY! Every choice you make matters!",
          },
          {
            myth: "One food can't hurt you - but this one will ruin you!",
            effect: "Apply fear status",
            nutritionCounter:
              "No single food defines your health - BALANCE does!",
          },
        ],
        description: "Phase 1: Dragon is overwhelming and confusing",
      },
      {
        phaseNumber: 2,
        healthPercent: 65,
        moveset: [
          {
            name: "Contradiction Storm",
            description: "Conflicting myths attack all at once",
            damage: 16,
            emoji: "⛈️",
          },
          {
            name: "Pressure Surge",
            description: "Body image and comparison pressure",
            damage: 14,
            emoji: "💪",
          },
        ],
        taunts: [
          {
            myth: "Everyone will judge your food choices",
            effect: "Apply anxiety status",
            nutritionCounter:
              "YOUR choices, YOUR body! Listen to nutrition experts, not others!",
          },
        ],
        description: "Phase 2: Dragon reveals its true power",
      },
      {
        phaseNumber: 3,
        healthPercent: 30,
        moveset: [
          {
            name: "Final Misinformation Breath",
            description: "All myths at maximum power",
            damage: 20,
            emoji: "💨",
          },
        ],
        taunts: [
          {
            myth: "YOU CANNOT WIN! MISINFORMATION IS FOREVER!",
            effect: "Heavy damage",
            nutritionCounter:
              "KNOWLEDGE IS POWER! You have learned the TRUTH!",
          },
        ],
        description: "Phase 3: Dragon is desperate - final stand!",
      },
    ],
    cutscene: {
      opening: BOSS_CUTSCENES.chaos_diet_dragon_opening,
      victory:
        "The dragon explodes into harmless sparkles of wisdom!\n\n🌟 YOU ARE THE TRUE FOOD GUARDIAN!\n\n The sacred plate glows as balance returns to the kingdom!",
      defeat:
        "The dragon's power overwhelms you... But wait - YOU HAVE COMPANIONS!\nUse the spirits you've collected! Never give up!",
    },
    rewards: [
      {
        type: "recipe",
        name: "Sacred Plate Master Recipe",
        description: "The legendary balanced feast",
        emoji: "🍽️",
        effect: "+100% All stats permanently",
      },
      {
        type: "cosmetic",
        name: "Food Guardian Legend Outfit",
        description: "Ultimate anime-style warrior gear",
        emoji: "✨",
        effect: "Recognition throughout the kingdom!",
      },
      {
        type: "companion",
        name: "Sacred Spirit",
        description: "The spirit of the sacred plate itself",
        emoji: "🌈",
        effect: "+50% ALL stats, passive wisdom aura",
      },
    ],
    rewards_spirit: {
      id: "sacred_spirit",
      name: "Sacred Plate Spirit",
      food: "All Food Groups",
      emoji: "🌈",
      personality: "Wise, ancient, represents perfect balance",
      ability: "Perfect Harmony - Full heal when you would be defeated",
      rarity: "legendary",
    },
  },
};

// ============================================================================
// NUTRITION FACT COUNTERS
// ============================================================================

export const NUTRITION_FACTS = {
  whole_grains:
    "Whole grains have 3x more fiber than refined carbs and keep you energized longer!",
  vegetables:
    "Vegetables are nutrient powerhouses! One serving gives you vitamins A, C, K, and minerals!",
  balance:
    "The golden rule: Eat from all food groups! Your body needs variety to thrive!",
  natural_sugars:
    "Fruit sugars come with fiber and nutrients. Soda is just empty calories and crashes!",
  water: "Proper hydration improves focus, energy, and even mood! Drink water, not just drinks!",
  portions:
    "Smart portions = sustained strength. Your stomach is only the size of your fist!",
};

// ============================================================================
// WEEKLY BOSS CHALLENGES
// ============================================================================

export interface WeeklyBossChallenge {
  week: number;
  boss_id: string;
  theme: string;
  modifiers: string[];
  leaderboard_reward: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Legendary";
}

export const WEEKLY_CHALLENGES: WeeklyBossChallenge[] = [
  {
    week: 1,
    boss_id: "refined_carb_phantom",
    theme: "Energy for Exams",
    modifiers: ["Double XP", "Faster Boss Attacks"],
    leaderboard_reward: "Golden Whole Grain Badge",
    difficulty: "Medium",
  },
  {
    week: 2,
    boss_id: "junk_goblin",
    theme: "The Great Veggie Defense",
    modifiers: ["Vegetables Heal You", "Goblin Spawns Minions"],
    leaderboard_reward: "Rainbow Guardian Badge",
    difficulty: "Medium",
  },
  {
    week: 3,
    boss_id: "overload_ogre",
    theme: "Balance Championship",
    modifiers: ["Perfect Balance = Triple Damage", "Ogre Gets Stronger Each Turn"],
    leaderboard_reward: "Harmony Master Badge",
    difficulty: "Hard",
  },
  {
    week: 4,
    boss_id: "sugar_siren",
    theme: "Resist the Sweetness",
    modifiers: ["Sugar Drain HP", "Siren Charms You"],
    leaderboard_reward: "Clarity Champion Badge",
    difficulty: "Hard",
  },
  {
    week: 5,
    boss_id: "refined_carb_phantom",
    theme: "Energy Mastery Rematch",
    modifiers: ["Harder Attacks", "More Taunts"],
    leaderboard_reward: "Energy Expert Badge",
    difficulty: "Hard",
  },
];

// ============================================================================
// COSMETIC REWARDS
// ============================================================================

export interface CosmeticGear {
  id: string;
  name: string;
  type: "outfit" | "weapon" | "accessory";
  description: string;
  emoji: string;
  stats_bonus?: Record<string, number>;
  unlock_condition: string;
}

export const COSMETIC_GEAR: CosmeticGear[] = [
  {
    id: "grain_guardian_outfit",
    name: "Grain Guardian Outfit",
    type: "outfit",
    description: "Golden outfit inspired by whole grain wisdom",
    emoji: "👘",
    stats_bonus: { defense: 10 },
    unlock_condition: "Defeat Refined Carb Phantom",
  },
  {
    id: "veggie_protector_armor",
    name: "Veggie Protector Armor",
    type: "outfit",
    description: "Green armor that glows with health",
    emoji: "🥒",
    stats_bonus: { health: 15 },
    unlock_condition: "Defeat Junk Goblin",
  },
  {
    id: "balance_master_robe",
    name: "Balance Master Robe",
    type: "outfit",
    description: "Perfectly symmetrical warrior outfit",
    emoji: "👑",
    stats_bonus: { all_stats: 20 },
    unlock_condition: "Defeat Overload Ogre",
  },
  {
    id: "clarity_crown",
    name: "Clarity Crown",
    type: "accessory",
    description: "Crown that protects you from myths",
    emoji: "👑",
    stats_bonus: { wisdom: 25 },
    unlock_condition: "Defeat Sugar Siren",
  },
  {
    id: "truth_sword",
    name: "Sword of Truth",
    type: "weapon",
    description: "Weapon that counters myths with facts",
    emoji: "⚔️",
    stats_bonus: { attack: 30 },
    unlock_condition: "Reach Level 5",
  },
  {
    id: "legend_outfit",
    name: "Food Guardian Legend Outfit",
    type: "outfit",
    description: "Ultimate warrior gear",
    emoji: "✨",
    stats_bonus: { all_stats: 50 },
    unlock_condition: "Defeat Chaos Diet Dragon",
  },
];
