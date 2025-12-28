import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sword,
  MapPin,
  Users,
  SkipBack,
  Zap,
  CheckCircle2,
  X,
  BookOpen,
  Flame,
  Trophy,
  Star,
  Heart,
  Shield,
} from "lucide-react";
import { ANIME_CHARACTERS } from "@/data/animeCharacters";
import { BOSSES, BOSS_CUTSCENES, WEEKLY_CHALLENGES } from "@/data/bossBattleSystem";
import type { BossData, FoodSpirit } from "@/data/bossBattleSystem";

interface ShokuikuSagaRPGProps {
  onBack?: () => void;
}

interface QuestChallenge {
  type: "quiz" | "cooking" | "collection" | "battle" | "mindfulness";
  question?: string;
  options?: string[];
  correctAnswer?: number;
  items?: { name: string; emoji: string }[];
  enemyName?: string;
  enemyHp?: number;
}

interface Quest {
  id: number;
  name: string;
  description: string;
  reward: number;
  difficulty: "Easy" | "Medium" | "Hard";
  completed: boolean;
  challenges?: QuestChallenge[];
  narrative?: string;
  theme?: string;
}

interface Skill {
  id: string;
  name: string;
  description: string;
  category: "cooking" | "mindfulness" | "food_knowledge" | "combat";
  unlocked: boolean;
  requiredLevel: number;
  effect: string;
}

interface Chapter {
  id: number;
  name: string;
  region: string;
  narrative: string;
  bossName: string;
  bossDescription: string;
  unlocked: boolean;
  completed: boolean;
  questIds: number[];
  reward: string;
  emoji: string;
}

interface CollectedCompanion {
  id: string;
  name: string;
  emoji: string;
  ability: string;
  rarity: string;
}

interface PlayerStats {
  health: number;
  maxHealth: number;
  defense: number;
  attack: number;
  wisdom: number;
}

type GameMode =
  | "start"
  | "hero_selection"
  | "prologue"
  | "chapter_select"
  | "quest_play"
  | "skill_tree"
  | "boss_battle"
  | "boss_cutscene"
  | "weekly_challenges";

const CHAPTERS: Chapter[] = [
  {
    id: 1,
    name: "Prologue: The Broken Plate",
    region: "Food Kingdom",
    narrative:
      "The sacred plate of the Food Kingdom shatters! Diet Myths spread confusion among teens. You are chosen as the Food Guardian to restore harmony.",
    bossName: "Diet Myth Swarm",
    bossDescription: "Manifestations of confusion and false health claims",
    unlocked: true,
    completed: false,
    questIds: [1],
    reward: "Food Guardian Title",
    emoji: "🍽️",
  },
  {
    id: 2,
    name: "Chapter 1: Grain Plains",
    region: "Grain Plains",
    narrative:
      "Learn the importance of carbohydrates and whole grains. Energy for your adventures!",
    bossName: "Refined Carb Phantom",
    bossDescription: "Drains energy by promoting refined carbs over whole grains",
    unlocked: true,
    completed: false,
    questIds: [2, 3],
    reward: "Carbohydrate Mastery Badge",
    emoji: "🌾",
  },
  {
    id: 3,
    name: "Chapter 2: Veggie Forest",
    region: "Veggie Forest",
    narrative:
      "Discover vitamins, minerals, and fiber. Save the vegetables from the Junk Goblin!",
    bossName: "Junk Goblin",
    bossDescription: "Tempts villagers with fried snacks and unhealthy foods",
    unlocked: false,
    completed: false,
    questIds: [4, 5],
    reward: "Vegetable Expert Badge",
    emoji: "🥕",
  },
  {
    id: 4,
    name: "Chapter 3: Protein Peaks",
    region: "Protein Peaks",
    narrative:
      "Balance plant vs. animal proteins. Climb the mountain and defeat the Overload Ogre!",
    bossName: "Overload Ogre",
    bossDescription: "Represents excess consumption and unhealthy habits",
    unlocked: false,
    completed: false,
    questIds: [6, 7],
    reward: "Protein Balance Master Badge",
    emoji: "💪",
  },
  {
    id: 5,
    name: "Chapter 4a: Dairy Valley",
    region: "Dairy Valley",
    narrative:
      "Explore calcium, probiotics, and dairy alternatives. Defeat the Lactose Leviathan!",
    bossName: "Lactose Leviathan",
    bossDescription: "Spreads myths about dairy intolerance",
    unlocked: false,
    completed: false,
    questIds: [8],
    reward: "Dairy Expert Badge",
    emoji: "🥛",
  },
  {
    id: 6,
    name: "Chapter 4b: Fruit Isles",
    region: "Fruit Isles",
    narrative:
      "Discover natural sugars and fruit vitamins. Resist the Sugar Siren's temptations!",
    bossName: "Sugar Siren",
    bossDescription: "Tempts with energy drinks and excessive sugar",
    unlocked: false,
    completed: false,
    questIds: [9],
    reward: "Fruit Master Badge",
    emoji: "🍎",
  },
  {
    id: 7,
    name: "Final Chapter: The Balanced Feast",
    region: "Sacred Realm",
    narrative:
      "Reforge the sacred plate by combining all food groups. Face the ultimate test of your nutrition wisdom!",
    bossName: "Chaos Diet Dragon",
    bossDescription:
      "Symbolizes fad diets, body image pressures, and misinformation",
    unlocked: false,
    completed: false,
    questIds: [10],
    reward: "Food Guardian Mastery",
    emoji: "⚔️",
  },
];

const QUESTS_DATA: Quest[] = [
  {
    id: 1,
    name: "The Broken Plate",
    description: "Witness the shattering of the sacred plate and accept your destiny",
    reward: 100,
    difficulty: "Easy",
    completed: false,
    theme: "Prologue",
    narrative: "The kingdom's balance is broken. You must restore it.",
    challenges: [
      {
        type: "mindfulness",
        question: "Take a moment to breathe and center yourself for the journey ahead",
      },
    ],
  },
  {
    id: 2,
    name: "Energy for Exams",
    description: "Learn how carbs fuel your brain and body for peak performance",
    reward: 150,
    difficulty: "Easy",
    completed: false,
    theme: "Energy for Exams",
    narrative: "Students in Grain Plains are losing energy. Help them understand carbs!",
    challenges: [
      {
        type: "quiz",
        question: "Which is a whole grain?",
        options: ["White bread", "Brown rice", "Instant noodles"],
        correctAnswer: 1,
      },
      {
        type: "collection",
        items: [
          { name: "Oats", emoji: "🌾" },
          { name: "Wheat", emoji: "🌾" },
          { name: "Quinoa", emoji: "🌾" },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Defeat the Refined Carb Phantom",
    description: "Battle the boss that drains energy with refined carbs",
    reward: 250,
    difficulty: "Medium",
    completed: false,
    theme: "Boss Battle",
    narrative: "The Refined Carb Phantom awaits! Use your carb knowledge to defeat it.",
    challenges: [
      {
        type: "battle",
        enemyName: "Refined Carb Phantom",
        enemyHp: 60,
      },
    ],
  },
  {
    id: 4,
    name: "Vegetable Valley Rescue",
    description: "Help farmers save vegetables and learn about vitamins",
    reward: 150,
    difficulty: "Easy",
    completed: false,
    theme: "Glow-Up Quest",
    narrative: "The vegetables are wilting! Learn their super powers.",
    challenges: [
      {
        type: "collection",
        items: [
          { name: "Spinach", emoji: "🥬" },
          { name: "Carrot", emoji: "🥕" },
          { name: "Broccoli", emoji: "🥦" },
        ],
      },
      {
        type: "quiz",
        question: "Which vegetable is highest in Vitamin C?",
        options: ["Spinach", "Broccoli", "Carrot"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 5,
    name: "Defeat the Junk Goblin",
    description: "Stop the Junk Goblin from tempting villagers with unhealthy snacks",
    reward: 250,
    difficulty: "Medium",
    completed: false,
    theme: "Boss Battle",
    narrative: "The Junk Goblin spreads chaos! Fight back with healthy choices.",
    challenges: [
      {
        type: "battle",
        enemyName: "Junk Goblin",
        enemyHp: 70,
      },
    ],
  },
  {
    id: 6,
    name: "Sports Power-Up",
    description: "Learn how proteins build strength and aid recovery",
    reward: 200,
    difficulty: "Medium",
    completed: false,
    theme: "Sports Power-Up",
    narrative: "Athletes need protein! Learn about both plant and animal sources.",
    challenges: [
      {
        type: "quiz",
        question: "Which is a plant-based protein?",
        options: ["Chicken", "Lentils", "Fish"],
        correctAnswer: 1,
      },
      {
        type: "cooking",
        question: "Which meal has balanced protein?",
      },
    ],
  },
  {
    id: 7,
    name: "Defeat the Overload Ogre",
    description: "Teach the ogre about balanced consumption",
    reward: 300,
    difficulty: "Hard",
    completed: false,
    theme: "Boss Battle",
    narrative: "The Overload Ogre represents excess. Show the power of balance!",
    challenges: [
      {
        type: "battle",
        enemyName: "Overload Ogre",
        enemyHp: 100,
      },
    ],
  },
  {
    id: 8,
    name: "Dairy Valley Exploration",
    description: "Explore calcium sources and dairy alternatives",
    reward: 200,
    difficulty: "Medium",
    completed: false,
    theme: "Calcium Quest",
    narrative: "Discover the power of calcium for strong bones!",
    challenges: [
      {
        type: "collection",
        items: [
          { name: "Milk", emoji: "🥛" },
          { name: "Yogurt", emoji: "🥛" },
          { name: "Cheese", emoji: "🧀" },
        ],
      },
      {
        type: "battle",
        enemyName: "Lactose Leviathan",
        enemyHp: 80,
      },
    ],
  },
  {
    id: 9,
    name: "Resist the Sugar Siren",
    description: "Learn about natural vs. added sugars and defeat temptation",
    reward: 250,
    difficulty: "Hard",
    completed: false,
    theme: "Late-Night Boss Battle",
    narrative: "The Sugar Siren tempts with energy drinks. Choose wisely!",
    challenges: [
      {
        type: "quiz",
        question: "How much added sugar should teens have daily?",
        options: ["50g", "25g", "100g"],
        correctAnswer: 1,
      },
      {
        type: "cooking",
        question: "Which is a healthier drink choice?",
      },
      {
        type: "battle",
        enemyName: "Sugar Siren",
        enemyHp: 90,
      },
    ],
  },
  {
    id: 10,
    name: "Reforge the Sacred Plate",
    description: "Combine all food groups and defeat the Chaos Diet Dragon",
    reward: 500,
    difficulty: "Hard",
    completed: false,
    theme: "Final Boss",
    narrative:
      "The final test! Combine all your nutrition knowledge to defeat the dragon!",
    challenges: [
      {
        type: "collection",
        items: [
          { name: "Grains", emoji: "🌾" },
          { name: "Veggies", emoji: "🥕" },
          { name: "Proteins", emoji: "💪" },
          { name: "Dairy", emoji: "🥛" },
          { name: "Fruits", emoji: "🍎" },
        ],
      },
      {
        type: "battle",
        enemyName: "Chaos Diet Dragon",
        enemyHp: 150,
      },
    ],
  },
];

const SKILLS: Skill[] = [
  {
    id: "cooking_1",
    name: "Basic Cooking",
    description: "Learn simple recipes and food preparation",
    category: "cooking",
    unlocked: true,
    requiredLevel: 1,
    effect: "+10% Cooking Speed",
  },
  {
    id: "cooking_2",
    name: "Advanced Cooking",
    description: "Master complex recipes and techniques",
    category: "cooking",
    unlocked: false,
    requiredLevel: 3,
    effect: "+25% Cooking Efficiency",
  },
  {
    id: "mindfulness_1",
    name: "Mindful Eating",
    description: "Learn to eat slowly and appreciate food",
    category: "mindfulness",
    unlocked: true,
    requiredLevel: 1,
    effect: "Focus Mode - Slow down eating",
  },
  {
    id: "mindfulness_2",
    name: "Meditation Mastery",
    description: "Deep meditation for body awareness",
    category: "mindfulness",
    unlocked: false,
    requiredLevel: 4,
    effect: "+50% Health Recovery",
  },
  {
    id: "knowledge_1",
    name: "Nutrition Basics",
    description: "Understand macronutrients and micronutrients",
    category: "food_knowledge",
    unlocked: true,
    requiredLevel: 1,
    effect: "Digestive Boost - +15% nutrient absorption",
  },
  {
    id: "knowledge_2",
    name: "Food Myth Buster",
    description: "Identify and counter diet myths",
    category: "food_knowledge",
    unlocked: false,
    requiredLevel: 5,
    effect: "Immunity to Myth Effects",
  },
  {
    id: "combat_1",
    name: "Veggie Shield",
    description: "Defend using vegetable power",
    category: "combat",
    unlocked: true,
    requiredLevel: 1,
    effect: "Defense Boost +20%",
  },
  {
    id: "combat_2",
    name: "Protein Punch",
    description: "Attack with protein-powered strength",
    category: "combat",
    unlocked: true,
    requiredLevel: 1,
    effect: "Attack Power +20%",
  },
  {
    id: "combat_3",
    name: "Hydration Heal",
    description: "Restore health with water power",
    category: "combat",
    unlocked: true,
    requiredLevel: 1,
    effect: "Restore 30 HP per use",
  },
  {
    id: "combat_4",
    name: "Grain Ground",
    description: "Create stability with whole grain energy",
    category: "combat",
    unlocked: false,
    requiredLevel: 3,
    effect: "Stability Boost - Reduced damage taken",
  },
  {
    id: "combat_5",
    name: "Fruit Force",
    description: "Unleash elemental fruit powers",
    category: "combat",
    unlocked: false,
    requiredLevel: 4,
    effect: "Elemental Attack Power +30%",
  },
];

export const ShokuikuSagaRPG = ({ onBack }: ShokuikuSagaRPGProps) => {
  const { t } = useTranslation();
  const [gameMode, setGameMode] = useState<GameMode>("start");
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [selectedHero, setSelectedHero] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [selectedQuest, setSelectedQuest] = useState<number | null>(null);
  const [chapters, setChapters] = useState(CHAPTERS);
  const [quests, setQuests] = useState(QUESTS_DATA);
  const [skills, setSkills] = useState(SKILLS);
  const [inProgress, setInProgress] = useState(false);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [challengeComplete, setChallengeComplete] = useState(false);
  const [enemyHp, setEnemyHp] = useState(0);
  const [playerHp, setPlayerHp] = useState(100);
  const [collectedItems, setCollectedItems] = useState<Set<number>>(new Set());
  
  // Boss Battle States
  const [currentBoss, setCurrentBoss] = useState<BossData | null>(null);
  const [currentBossPhase, setCurrentBossPhase] = useState(0);
  const [bossHp, setBossHp] = useState(0);
  const [showCutscene, setShowCutscene] = useState(false);
  const [cutsceneText, setCutsceneText] = useState("");
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    health: 100,
    maxHealth: 100,
    defense: 10,
    attack: 15,
    wisdom: 10,
  });
  const [companions, setCompanions] = useState<CollectedCompanion[]>([]);
  const [bossDefeated, setBossDefeated] = useState(false);
  const [bossRewardShown, setBossRewardShown] = useState(false);
  const [weeklyChallenge, setWeeklyChallenge] = useState(WEEKLY_CHALLENGES[0]);

  const heroData = selectedHero
    ? ANIME_CHARACTERS[selectedHero as keyof typeof ANIME_CHARACTERS]
    : null;

  const handleHeroSelect = (heroId: string) => {
    setSelectedHero(heroId);
    setGameMode("prologue");
  };

  const handleStartBossBattle = (bossId: string) => {
    const boss = BOSSES[bossId as keyof typeof BOSSES];
    if (boss) {
      setCurrentBoss(boss);
      setCurrentBossPhase(0);
      setBossHp(boss.baseHp);
      setPlayerStats({
        health: 100,
        maxHealth: 100,
        defense: 10 + level * 2,
        attack: 15 + level * 2,
        wisdom: 10 + level,
      });
      setShowCutscene(true);
      setCutsceneText(boss.cutscene.opening);
      setGameMode("boss_cutscene");
      setBossDefeated(false);
      setBossRewardShown(false);
    }
  };

  const handleBossBattleStart = () => {
    setShowCutscene(false);
    setGameMode("boss_battle");
  };

  const handleBossAttack = (actionType: "attack" | "defend" | "counter_myth" | "use_companion") => {
    if (!currentBoss) return;

    const currentPhase = currentBoss.phases[currentBossPhase];
    const randomTaunt = currentPhase.taunts[Math.floor(Math.random() * currentPhase.taunts.length)];
    let playerDamage = 0;
    let bossDamage = 0;

    switch (actionType) {
      case "attack":
        playerDamage = Math.floor(Math.random() * 15) + playerStats.attack;
        bossDamage = Math.floor(Math.random() * 12) + 5;
        break;
      case "defend":
        playerDamage = Math.floor(Math.random() * 5) + 3;
        bossDamage = Math.floor(Math.random() * 8) + 2;
        break;
      case "counter_myth":
        playerDamage = Math.floor(Math.random() * 20) + playerStats.wisdom;
        bossDamage = 0; // Nutrition facts protect you!
        break;
      case "use_companion":
        playerDamage = Math.floor(Math.random() * 18) + 10;
        bossDamage = Math.floor(Math.random() * 6) + 2;
        break;
    }

    setBossHp((prev) => Math.max(0, prev - playerDamage));
    setPlayerStats((prev) => ({
      ...prev,
      health: Math.max(0, prev.health - bossDamage),
    }));

    // Check phase transition
    if (bossHp - playerDamage <= currentBoss.baseHp * (1 - (currentBossPhase + 1) / currentBoss.phases.length)) {
      if (currentBossPhase < currentBoss.phases.length - 1) {
        setCurrentBossPhase((prev) => prev + 1);
      }
    }

    // Check victory
    if (bossHp - playerDamage <= 0) {
      setBossDefeated(true);
      setCutsceneText(currentBoss.cutscene.victory);
    }

    // Check defeat
    if (playerStats.health - bossDamage <= 0) {
      setCutsceneText(currentBoss.cutscene.defeat);
      setGameMode("boss_cutscene");
    }
  };

  const handleClaimBossReward = () => {
    if (!currentBoss) return;

    // Award XP
    const rewardXp = currentBoss.baseHp * 3;
    setXp((prev) => prev + rewardXp);

    // Award companion if exists
    if (currentBoss.rewards_spirit) {
      setCompanions((prev) => [...prev, {
        id: currentBoss.rewards_spirit!.id,
        name: currentBoss.rewards_spirit!.name,
        emoji: currentBoss.rewards_spirit!.emoji,
        ability: currentBoss.rewards_spirit!.ability,
        rarity: currentBoss.rewards_spirit!.rarity,
      }]);
    }

    // Mark chapter as completed
    setChapters((prev) =>
      prev.map((ch) =>
        ch.id === currentBoss.chapter ? { ...ch, completed: true, unlocked: true } : {
          ...ch,
          unlocked: ch.id <= currentBoss.chapter + 1,
        }
      )
    );

    setBossRewardShown(true);
  };

  const handleStartWeeklyChallenge = () => {
    const bossId = weeklyChallenge.boss_id;
    handleStartBossBattle(bossId);
  };

  const handleStartQuest = (questId: number) => {
    const quest = quests.find((q) => q.id === questId);
    if (quest) {
      setSelectedQuest(questId);
      setInProgress(true);
      setCurrentChallengeIndex(0);
      setSelectedAnswer(null);
      setChallengeComplete(false);
      setPlayerHp(100);
      setCollectedItems(new Set());
      const firstChallenge = quest.challenges?.[0];
      if (firstChallenge?.type === "battle") {
        setEnemyHp(firstChallenge.enemyHp || 50);
      }
      setGameMode("quest_play");
    }
  };

  const handleAnswerQuestion = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    const quest = quests.find((q) => q.id === selectedQuest);
    const challenge = quest?.challenges?.[currentChallengeIndex];
    if (challenge?.type === "quiz" && challenge.correctAnswer === answerIndex) {
      setChallengeComplete(true);
    }
  };

  const handleCollectItem = () => {
    const quest = quests.find((q) => q.id === selectedQuest);
    const challenge = quest?.challenges?.[currentChallengeIndex];
    if (challenge?.type === "collection") {
      const allItems = challenge.items?.length || 0;
      if (collectedItems.size < allItems - 1) {
        setCollectedItems((prev) => new Set([...prev, prev.size]));
      } else {
        setChallengeComplete(true);
      }
    }
  };

  const handleNextChallenge = () => {
    const quest = quests.find((q) => q.id === selectedQuest);
    if (currentChallengeIndex < (quest?.challenges?.length ?? 0) - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setChallengeComplete(false);
      setCollectedItems(new Set());
      const nextChallenge = quest?.challenges?.[currentChallengeIndex + 1];
      if (nextChallenge?.type === "battle") {
        setEnemyHp(nextChallenge.enemyHp || 50);
        setPlayerHp(100);
      }
    } else {
      handleCompleteQuest(selectedQuest!);
    }
  };

  const handleBattleAction = (action: string) => {
    const damage = action === "attack" ? Math.floor(Math.random() * 20) + 10 : 5;
    const enemyDamage = Math.floor(Math.random() * 15) + 5;

    setEnemyHp((prev) => Math.max(0, prev - damage));
    setPlayerHp((prev) => Math.max(0, prev - enemyDamage));

    if (enemyHp - damage <= 0) {
      setChallengeComplete(true);
    }
  };

  const handleCompleteQuest = (questId: number) => {
    const quest = quests.find((q) => q.id === questId);
    if (quest && !quest.completed) {
      setXp((prev) => prev + quest.reward);
      if (xp + quest.reward >= level * 500) {
        setLevel((prev) => prev + 1);
        setXp(0);
        // Unlock new skills on level up
        setSkills((prev) =>
          prev.map((skill) =>
            skill.requiredLevel === level + 1
              ? { ...skill, unlocked: true }
              : skill
          )
        );
      }
      setQuests((prev) =>
        prev.map((q) =>
          q.id === questId ? { ...q, completed: true } : q
        )
      );
      setInProgress(false);
      setSelectedQuest(null);
      setGameMode("chapter_select");
    }
  };

  const nextLevelXp = level * 500;
  const xpPercent = (xp / nextLevelXp) * 100;

  const currentQuest = quests.find((q) => q.id === selectedQuest);
  const currentChallenge = currentQuest?.challenges?.[currentChallengeIndex];

  // ============ START SCREEN ============
  if (gameMode === "start") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 p-4 space-y-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <Sword className="w-10 h-10" />
            Shokuiku Saga RPG
          </h1>
          <Button onClick={onBack} variant="outline" size="sm" className="bg-white">
            <SkipBack className="w-4 h-4" /> Back
          </Button>
        </div>

        <Card className="p-8 bg-white/95 max-w-2xl mx-auto space-y-6">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-purple-600">
              Welcome, Food Guardian!
            </h2>
            <p className="text-gray-600 text-lg">
              The Food Kingdom needs you. Will you answer the call?
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-100 to-purple-100 p-6 rounded-lg space-y-3"
          >
            <p className="font-semibold text-gray-700">About This Adventure:</p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>🌍 Explore the vibrant Food Kingdom across 5 regions</li>
              <li>⚔️ Battle manifestations of unhealthy eating habits</li>
              <li>📚 Learn nutrition facts through epic quests</li>
              <li>💪 Master cooking, mindfulness, and food knowledge</li>
              <li>🏆 Defeat the Chaos Diet Dragon and restore balance</li>
            </ul>
          </motion.div>

          <Button
            onClick={() => setGameMode("hero_selection")}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-lg"
          >
            <Star className="w-5 h-5 mr-2" />
            Begin Your Journey
          </Button>
        </Card>
      </div>
    );
  }

  // ============ HERO SELECTION ============
  if (gameMode === "hero_selection") {
    return (
      <div className="space-y-6 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-purple-600">Choose Your Hero</h2>
          <Button
            onClick={() => setGameMode("start")}
            variant="outline"
            size="sm"
          >
            <SkipBack className="w-4 h-4" /> Back
          </Button>
        </div>

        <p className="text-gray-600 text-lg">
          Select the anime character who will become your Food Guardian. Each hero
          has unique skills and a personal storyline!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.values(ANIME_CHARACTERS).map((character) => (
            <motion.div
              key={character.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleHeroSelect(character.id)}
              className="cursor-pointer"
            >
              <Card className="p-4 h-full hover:shadow-lg transition-shadow hover:border-purple-500 border-2">
                <div className="text-center space-y-3">
                  {character.imageUrl && (
                    <img
                      src={character.imageUrl}
                      alt={character.name}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  )}
                  <h3 className="text-xl font-bold">{character.name}</h3>
                  <p className="text-sm text-gray-500">{character.anime}</p>
                  <p className="text-sm text-gray-600">{character.description}</p>
                  <div className="flex flex-wrap gap-1 justify-center">
                    {character.personality.split(",").map((trait) => (
                      <span
                        key={trait.trim()}
                        className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded"
                      >
                        {trait.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // ============ PROLOGUE ============
  if (gameMode === "prologue" && heroData) {
    return (
      <div className="space-y-6 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-purple-600">Prologue</h2>
          <Button
            onClick={() => setGameMode("hero_selection")}
            variant="outline"
            size="sm"
          >
            <SkipBack className="w-4 h-4" /> Back
          </Button>
        </div>

        <Card className="p-6 space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-2xl font-bold">
                Meet {heroData.name}, the Food Guardian
              </h3>
              <p className="text-gray-600">
                Like {heroData.name} from {heroData.anime}, you possess the strength
                and determination needed to save the Food Kingdom. Your journey begins
                now...
              </p>

              <div className="bg-blue-50 p-4 rounded-lg space-y-3 border-l-4 border-blue-500">
                <p className="font-bold text-lg">📖 The Story So Far...</p>
                <p className="text-gray-700">
                  The sacred plate of the Food Kingdom has shattered! Diet Myths have
                  invaded, spreading confusion among teens about what's healthy and
                  what's not. Fast food, energy drinks, fad diets - they're everywhere,
                  tempting villagers away from balanced nutrition.
                </p>
                <p className="text-gray-700">
                  But there's hope. The wise Chef Sensei has chosen YOU as the Food
                  Guardian. Together with allies like the Snack Ninja, Smoothie Mage,
                  and the Farmer Guide, you must journey across five regions of the
                  kingdom to defeat the manifestations of unhealthy habits and restore
                  the sacred plate.
                </p>
                <p className="text-gray-700 font-semibold">
                  Will you accept this quest?
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-4 rounded-lg">
                <p className="font-bold mb-2">Your Character:</p>
                {heroData.imageUrl && (
                  <img
                    src={heroData.imageUrl}
                    alt={heroData.name}
                    className="w-full rounded-lg mb-3"
                  />
                )}
                <p className="text-sm font-semibold">{heroData.name}</p>
                <p className="text-xs text-gray-600">{heroData.anime}</p>
              </div>
            </div>
          </div>

          <Button
            onClick={() => setGameMode("chapter_select")}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-lg"
          >
            <Zap className="w-5 h-5 mr-2" />
            Continue to Adventure
          </Button>
        </Card>
      </div>
    );
  }

  // ============ CHAPTER SELECT ============
  if (gameMode === "chapter_select" && heroData) {
    return (
      <div className="space-y-6 p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-purple-600 flex items-center gap-2">
              <BookOpen className="w-8 h-8" />
              Choose Your Chapter
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Hero: {heroData.name} | Level: {level} | XP: {xp}/{nextLevelXp}
            </p>
          </div>
          <Button onClick={onBack} variant="outline" size="sm">
            <SkipBack className="w-4 h-4" /> Back
          </Button>
        </div>

        {/* Stats Card */}
        <Card className="p-4 bg-gradient-to-r from-purple-100 to-pink-100">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold">Level: {level}</span>
              <span>👤 XP: {xp}/{nextLevelXp}</span>
            </div>
            <div className="bg-gray-300 rounded-full h-4 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                animate={{ width: `${xpPercent}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex gap-3 text-sm">
              <Button
                onClick={() => setGameMode("skill_tree")}
                size="sm"
                variant="outline"
              >
                📚 Skill Tree
              </Button>
            </div>
          </div>
        </Card>

        {/* Chapters Grid */}
        <div className="grid gap-4">
          {chapters.map((chapter) => (
            <motion.div
              key={chapter.id}
              whileHover={chapter.unlocked ? { scale: 1.02 } : {}}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                chapter.unlocked
                  ? "border-purple-300 bg-white hover:border-purple-500 hover:shadow-lg"
                  : "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{chapter.emoji}</span>
                    <div>
                      <h3 className="text-lg font-bold">{chapter.name}</h3>
                      <p className="text-sm text-gray-600">{chapter.region}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{chapter.narrative}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded font-semibold">
                      Boss: {chapter.bossName}
                    </span>
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                      Reward: {chapter.reward}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 italic mb-3">
                    {chapter.bossDescription}
                  </p>
                </div>
                {chapter.completed && (
                  <div className="text-3xl">✅</div>
                )}
              </div>
              {chapter.unlocked && !chapter.completed && (
                <Button
                  onClick={() => {
                    setSelectedChapter(chapter.id);
                    // Start first quest of chapter
                    const firstQuestId = chapter.questIds[0];
                    handleStartQuest(firstQuestId);
                  }}
                  className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Start Chapter
                </Button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // ============ SKILL TREE ============
  if (gameMode === "skill_tree") {
    return (
      <div className="space-y-6 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-purple-600 flex items-center gap-2">
            <Star className="w-8 h-8" />
            Skill Tree
          </h2>
          <Button
            onClick={() => setGameMode("chapter_select")}
            variant="outline"
            size="sm"
          >
            <SkipBack className="w-4 h-4" /> Back
          </Button>
        </div>

        <Card className="p-4 bg-gradient-to-r from-yellow-100 to-orange-100">
          <p className="text-sm text-gray-700">
            Level: {level} | Unspent Points: {0} | Next Level: {nextLevelXp - xp} XP
          </p>
        </Card>

        {/* Skills by Category */}
        {["cooking", "mindfulness", "food_knowledge", "combat"].map((category) => (
          <div key={category} className="space-y-3">
            <h3 className="text-xl font-bold text-purple-600 capitalize">
              {category.replace(/_/g, " ")}
            </h3>
            <div className="grid gap-3">
              {skills
                .filter((skill) => skill.category === category)
                .map((skill) => (
                  <Card
                    key={skill.id}
                    className={`p-4 ${
                      skill.unlocked
                        ? "bg-green-50 border-green-300"
                        : "bg-gray-50 opacity-60"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-bold flex items-center gap-2">
                          {skill.name}
                          {skill.unlocked && (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          )}
                        </h4>
                        <p className="text-sm text-gray-600">{skill.description}</p>
                        <p className="text-xs text-purple-600 font-semibold mt-1">
                          Effect: {skill.effect}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-500">
                          Level {skill.requiredLevel}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ============ QUEST GAMEPLAY ============
  if (gameMode === "quest_play" && currentQuest && currentChallenge) {
    return (
      <div className="space-y-4 p-4">
        {/* Quest Header */}
        <Card className="p-4 bg-gradient-to-r from-blue-400 to-purple-500 text-white">
          <h3 className="text-2xl font-bold mb-2">{currentQuest.name}</h3>
          <p className="text-sm">{currentQuest.narrative}</p>
          <div className="mt-3 text-xs">
            Challenge {currentChallengeIndex + 1} of {currentQuest.challenges?.length}
          </div>
        </Card>

        {/* Quiz Challenge */}
        {currentChallenge.type === "quiz" && (
          <Card className="p-6 space-y-4">
            <p className="text-lg font-bold">{currentChallenge.question}</p>
            <div className="grid gap-2">
              {currentChallenge.options?.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => handleAnswerQuestion(idx)}
                  className={`p-3 rounded-lg text-left font-semibold transition-all ${
                    selectedAnswer === idx
                      ? currentChallenge.correctAnswer === idx
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {option}
                </motion.button>
              ))}
            </div>
            {selectedAnswer !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`p-3 rounded-lg ${
                  challengeComplete
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {challengeComplete
                  ? "✅ Correct! Great job!"
                  : "❌ Not quite right. Try again or continue."}
              </motion.div>
            )}
            <Button
              onClick={handleNextChallenge}
              disabled={selectedAnswer === null}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              {currentChallengeIndex < (currentQuest.challenges?.length ?? 0) - 1
                ? "Next Challenge"
                : "Complete Quest"}
            </Button>
          </Card>
        )}

        {/* Collection Challenge */}
        {currentChallenge.type === "collection" && (
          <Card className="p-6 space-y-4">
            <p className="text-lg font-bold">Collect the ingredients!</p>
            <div className="grid grid-cols-3 gap-3">
              {currentChallenge.items?.map((item, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.1 }}
                  onClick={handleCollectItem}
                  className={`p-4 rounded-lg text-center transition-all ${
                    collectedItems.has(idx)
                      ? "bg-green-300 opacity-50"
                      : "bg-gradient-to-br from-yellow-200 to-orange-200 hover:from-yellow-300 hover:to-orange-300"
                  }`}
                >
                  <div className="text-4xl mb-2">{item.emoji}</div>
                  <div className="text-sm font-semibold">{item.name}</div>
                </motion.button>
              ))}
            </div>
            <p className="text-sm text-gray-600">
              Collected: {collectedItems.size}/{currentChallenge.items?.length}
            </p>
            {challengeComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 rounded-lg bg-green-100 text-green-700"
              >
                ✅ Great! You've collected all the ingredients!
              </motion.div>
            )}
            <Button
              onClick={handleNextChallenge}
              disabled={!challengeComplete}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              {currentChallengeIndex < (currentQuest.challenges?.length ?? 0) - 1
                ? "Next Challenge"
                : "Complete Quest"}
            </Button>
          </Card>
        )}

        {/* Cooking Challenge */}
        {currentChallenge.type === "cooking" && (
          <Card className="p-6 space-y-4">
            <p className="text-lg font-bold">{currentChallenge.question}</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: "Apple & Almonds", emoji: "🍎", healthy: true },
                { name: "Chips & Soda", emoji: "🥔", healthy: false },
              ].map((snack, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => {
                    if (snack.healthy) {
                      setChallengeComplete(true);
                    }
                  }}
                  className={`p-4 rounded-lg text-center ${
                    snack.healthy
                      ? "bg-green-200 hover:bg-green-300"
                      : "bg-red-200 hover:bg-red-300"
                  }`}
                >
                  <div className="text-4xl mb-2">{snack.emoji}</div>
                  <div className="text-sm font-semibold">{snack.name}</div>
                </motion.button>
              ))}
            </div>
            {challengeComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 rounded-lg bg-green-100 text-green-700"
              >
                ✅ Perfect choice! That's a healthy snack!
              </motion.div>
            )}
            <Button
              onClick={handleNextChallenge}
              disabled={!challengeComplete}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              {currentChallengeIndex < (currentQuest.challenges?.length ?? 0) - 1
                ? "Next Challenge"
                : "Complete Quest"}
            </Button>
          </Card>
        )}

        {/* Mindfulness Challenge */}
        {currentChallenge.type === "mindfulness" && (
          <Card className="p-6 space-y-4">
            <p className="text-lg font-bold">{currentChallenge.question}</p>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-6 rounded-lg text-center space-y-4">
              <div className="text-5xl">🧘</div>
              <p className="text-gray-700">
                Take a moment to breathe deeply. In through your nose... out through
                your mouth.
              </p>
              <p className="text-sm text-gray-600">
                Mindful eating helps you appreciate food and make better choices.
              </p>
              <Button
                onClick={() => setChallengeComplete(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                I'm Ready
              </Button>
            </div>
            {challengeComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 rounded-lg bg-green-100 text-green-700"
              >
                ✅ Excellent! You've centered yourself.
              </motion.div>
            )}
            <Button
              onClick={handleNextChallenge}
              disabled={!challengeComplete}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
            >
              {currentChallengeIndex < (currentQuest.challenges?.length ?? 0) - 1
                ? "Next Challenge"
                : "Complete Quest"}
            </Button>
          </Card>
        )}

        {/* Battle Challenge */}
        {currentChallenge.type === "battle" && (
          <Card className="p-6 space-y-4">
            <div className="text-center">
              <h4 className="text-2xl font-bold mb-2">⚔️ BOSS BATTLE ⚔️</h4>
              <p className="text-xl font-semibold">{currentChallenge.enemyName}</p>
            </div>

            {/* Health Bars */}
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold mb-1">You: {playerHp} HP</p>
                <div className="bg-gray-300 rounded-full h-4 overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-500"
                    animate={{ width: `${Math.max(0, playerHp)}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold mb-1">
                  {currentChallenge.enemyName}: {Math.max(0, enemyHp)} HP
                </p>
                <div className="bg-gray-300 rounded-full h-4 overflow-hidden">
                  <motion.div
                    className="h-full bg-red-500"
                    animate={{
                      width: `${Math.max(0, (enemyHp / (currentChallenge.enemyHp || 50)) * 100)}%`,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>

            {/* Battle Actions */}
            <div className="grid grid-cols-3 gap-3">
              <Button
                onClick={() => handleBattleAction("attack")}
                disabled={playerHp <= 0 || challengeComplete}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                💥 Attack
              </Button>
              <Button
                onClick={() => handleBattleAction("defend")}
                disabled={playerHp <= 0 || challengeComplete}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                🛡️ Defend
              </Button>
              <Button
                onClick={() => handleBattleAction("heal")}
                disabled={playerHp <= 0 || challengeComplete}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                💧 Heal
              </Button>
            </div>

            {/* Battle Result */}
            {challengeComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 rounded-lg bg-green-100 text-green-700 text-center font-bold"
              >
                ✅ Victory! You've defeated {currentChallenge.enemyName}!
              </motion.div>
            )}
            {playerHp <= 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 rounded-lg bg-red-100 text-red-700 text-center font-bold"
              >
                💔 Defeated! Try again!
              </motion.div>
            )}

            {challengeComplete && (
              <Button
                onClick={handleNextChallenge}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              >
                {currentChallengeIndex < (currentQuest.challenges?.length ?? 0) - 1
                  ? "Next Challenge"
                  : "Complete Quest"}
              </Button>
            )}
          </Card>
        )}
      </div>
    );
  }

  // ============ BOSS CUTSCENE ============
  if (gameMode === "boss_cutscene" && currentBoss) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black p-4 flex items-center justify-center">
        <Card className="max-w-2xl w-full bg-black border-4 border-purple-500 p-8 space-y-6">
          <div className="text-center space-y-4">
            <div className="text-6xl animate-bounce">{currentBoss.emoji}</div>
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600">
              {currentBoss.name}
            </h2>
          </div>

          <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-lg h-48 overflow-y-auto">
            <p className="text-white text-lg leading-relaxed">
              {showCutscene ? cutsceneText : currentBoss.cutscene.opening}
            </p>
          </div>

          <div className="flex gap-3">
            {bossDefeated ? (
              <Button
                onClick={() => setGameMode("boss_battle")}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-lg py-3"
              >
                <Trophy className="w-5 h-5 mr-2" />
                Claim Victory!
              </Button>
            ) : playerStats.health <= 0 ? (
              <Button
                onClick={() => setGameMode("chapter_select")}
                className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white text-lg py-3"
              >
                <SkipBack className="w-5 h-5 mr-2" />
                Return to Chapter
              </Button>
            ) : (
              <Button
                onClick={handleBossBattleStart}
                className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white text-lg py-3"
              >
                <Sword className="w-5 h-5 mr-2" />
                Enter Battle!
              </Button>
            )}
          </div>
        </Card>
      </div>
    );
  }

  // ============ BOSS BATTLE ============
  if (gameMode === "boss_battle" && currentBoss) {
    const currentPhase = currentBoss.phases[currentBossPhase];
    const bossHpPercent = (bossHp / currentBoss.baseHp) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-purple-900 to-black p-4 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <p className="text-sm text-gray-300">Chapter {currentBoss.chapter}</p>
            <h2 className="text-3xl font-bold text-white">{currentBoss.name}</h2>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-300">Level {level}</p>
            <p className="text-sm text-gray-300">Phase {currentBossPhase + 1}/{currentBoss.phases.length}</p>
          </div>
        </div>

        {/* Boss Section */}
        <Card className="p-6 bg-gradient-to-b from-gray-800 to-gray-900 border-2 border-red-500">
          <div className="text-center mb-4">
            <div className="text-6xl mb-2">{currentBoss.emoji}</div>
            <p className="text-red-400 font-bold text-lg">{currentPhase.description}</p>
          </div>

          {/* Boss Health */}
          <div className="space-y-2 mb-4">
            <p className="text-white font-bold">
              {currentBoss.name} HP: {Math.max(0, bossHp)} / {currentBoss.baseHp}
            </p>
            <div className="bg-gray-700 rounded-full h-6 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-red-600 to-red-400"
                animate={{ width: `${Math.max(0, bossHpPercent)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Boss Taunt / Myth */}
          <div className="bg-red-900/50 border border-red-500 rounded-lg p-4 mb-4">
            <p className="text-red-200 font-semibold text-sm mb-2">🗣️ Boss Taunt:</p>
            {currentPhase.taunts && currentPhase.taunts.length > 0 && (
              <>
                <p className="text-white italic">"{currentPhase.taunts[0].myth}"</p>
                <p className="text-red-300 text-xs mt-2">
                  💬 Myth effect: {currentPhase.taunts[0].effect}
                </p>
                <p className="text-green-300 text-xs mt-1">
                  ✓ Counter: {currentPhase.taunts[0].nutritionCounter}
                </p>
              </>
            )}
          </div>
        </Card>

        {/* Player Section */}
        <Card className="p-6 bg-gradient-to-b from-blue-800 to-blue-900 border-2 border-blue-500">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-white font-bold">
                Your HP: {playerStats.health} / {playerStats.maxHealth}
              </p>
              <div className="bg-gray-700 rounded-full h-6 overflow-hidden mt-2">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
                  animate={{ width: `${(playerStats.health / playerStats.maxHealth) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
            <div className="text-right text-white">
              <p className="text-sm">ATK: {playerStats.attack}</p>
              <p className="text-sm">DEF: {playerStats.defense}</p>
              <p className="text-sm">WIS: {playerStats.wisdom}</p>
            </div>
          </div>

          {/* Companions */}
          {companions.length > 0 && (
            <div className="flex gap-2 mb-4 flex-wrap">
              {companions.slice(0, 3).map((comp) => (
                <div
                  key={comp.id}
                  className="bg-blue-700 px-3 py-1 rounded text-xs text-white"
                >
                  {comp.emoji} {comp.name}
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Battle Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => handleBossAttack("attack")}
            disabled={playerStats.health <= 0 || bossDefeated}
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-3 text-lg font-bold"
          >
            <Sword className="w-5 h-5 mr-2" />
            Attack
          </Button>
          <Button
            onClick={() => handleBossAttack("defend")}
            disabled={playerStats.health <= 0 || bossDefeated}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 text-lg font-bold"
          >
            <Shield className="w-5 h-5 mr-2" />
            Defend
          </Button>
          <Button
            onClick={() => handleBossAttack("counter_myth")}
            disabled={playerStats.health <= 0 || bossDefeated}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 text-lg font-bold"
          >
            💡 Counter Myth
          </Button>
          {companions.length > 0 && (
            <Button
              onClick={() => handleBossAttack("use_companion")}
              disabled={playerStats.health <= 0 || bossDefeated}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-lg font-bold"
            >
              🎁 Use Companion
            </Button>
          )}
        </div>

        {/* Battle Status */}
        {bossDefeated && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white text-center space-y-4"
          >
            <p className="text-3xl font-bold">🎉 VICTORY! 🎉</p>
            <p className="text-lg">{currentBoss.name} has been defeated!</p>
            {!bossRewardShown && (
              <Button
                onClick={handleClaimBossReward}
                className="bg-white text-green-600 hover:bg-gray-100 font-bold py-2 px-4"
              >
                <Trophy className="w-5 h-5 mr-2" />
                Claim Rewards
              </Button>
            )}
            {bossRewardShown && (
              <div className="space-y-2">
                <p className="font-bold">Rewards Claimed!</p>
                <Button
                  onClick={() => setGameMode("chapter_select")}
                  className="w-full bg-white text-green-600 hover:bg-gray-100 font-bold"
                >
                  <SkipBack className="w-4 h-4 mr-2" />
                  Return to Chapter Select
                </Button>
              </div>
            )}
          </motion.div>
        )}

        {playerStats.health <= 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-6 rounded-lg bg-gradient-to-r from-red-600 to-pink-600 text-white text-center space-y-4"
          >
            <p className="text-3xl font-bold">💔 DEFEATED! 💔</p>
            <p className="text-lg">You've been knocked out by {currentBoss.name}!</p>
            <Button
              onClick={() => {
                handleStartBossBattle(currentBoss.id);
              }}
              className="bg-white text-red-600 hover:bg-gray-100 font-bold py-2 px-4"
            >
              <SkipBack className="w-5 h-5 mr-2" />
              Try Again
            </Button>
          </motion.div>
        )}
      </div>
    );
  }

  // ============ WEEKLY CHALLENGES ============
  if (gameMode === "weekly_challenges") {
    return (
      <div className="space-y-6 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-purple-600">Weekly Challenge</h2>
          <Button
            onClick={() => setGameMode("chapter_select")}
            variant="outline"
            size="sm"
          >
            <SkipBack className="w-4 h-4" /> Back
          </Button>
        </div>

        {weeklyChallenge && (
          <Card className="p-6 space-y-4 border-2 border-gold-500">
            <div className="text-center space-y-2">
              <p className="text-2xl font-bold">Week {weeklyChallenge.week}</p>
              <div className="text-6xl">{BOSSES[weeklyChallenge.boss_id]?.emoji}</div>
              <h3 className="text-2xl font-bold text-purple-600">
                {BOSSES[weeklyChallenge.boss_id]?.name}
              </h3>
            </div>

            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-lg space-y-2">
              <p className="font-bold">Modifiers:</p>
              <div className="flex flex-wrap gap-2">
                {weeklyChallenge.modifiers.map((mod) => (
                  <span
                    key={mod}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-bold"
                  >
                    ⚡ {mod}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-lg font-semibold">Difficulty: {weeklyChallenge.difficulty}</p>
              <p className="text-sm text-gray-600">
                Defeat {BOSSES[weeklyChallenge.boss_id]?.name} with the active modifiers!
              </p>
            </div>

            <Button
              onClick={handleStartWeeklyChallenge}
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-3 text-lg font-bold"
            >
              <Sword className="w-5 h-5 mr-2" />
              Accept Challenge
            </Button>
          </Card>
        )}
      </div>
    );
  }

  return null;
};
