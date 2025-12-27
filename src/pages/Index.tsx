import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Gamepad2, BookOpen, Users, BookMarked } from "lucide-react";
import FoodMascot from "@/components/FoodMascot";
import { LanguageSelector } from "@/components/LanguageSelector";
import AgeSelector from "@/components/AgeSelector";
import BottomNav from "@/components/BottomNav";
import CategoryPill from "@/components/CategoryPill";
import FoodCard from "@/components/FoodCard";
import RecipeCard from "@/components/RecipeCard";
import FoodFactBubble from "@/components/FoodFactBubble";
import AchievementBadge from "@/components/AchievementBadge";
import RecipeDetail from "@/components/RecipeDetail";
import WeatherFoodSuggestion from "@/components/WeatherFoodSuggestion";
import GamesHub from "@/components/GamesHub";
import ComicStories from "@/components/ComicStories";
import StoryMode from "@/components/StoryMode";
import FoodKingdomMap from "@/components/FoodKingdomMap";
import AnimeCutscenes from "@/components/AnimeCutscenes";
import MangaPanels from "@/components/MangaPanels";
import SeasonalProduce from "@/components/SeasonalProduce";
import FoodNutritionTracker from "@/components/FoodNutritionTracker";
import CommunitySpace from "@/components/CommunitySpace";
import { CharacterSelector } from "@/components/CharacterSelector";
import { VoiceControlButton } from "@/components/VoiceControlButton";
import { UserProfile } from "@/components/UserProfile";
import VoiceBot from "@/components/VoiceBot";
import { AnimeCharacterBackground } from "@/components/AnimeCharacterBackground";
import { ShokuikuSagaRPG } from "@/components/teen/ShokuikuSagaRPG";
import { BossBattleChallenges } from "@/components/teen/BossBattleChallenges";
import { MealMasterySimulator } from "@/components/teen/MealMasterySimulator";
import { AboutEatXP } from "@/components/AboutEatXP";
import { AnimeMangaBuilder } from "@/components/teen/AnimeMangaBuilder";
import { RealLifeMissions } from "@/components/teen/RealLifeMissions";
import HealthyFoodHeroesDetail from "@/components/HealthyFoodHeroesDetail";
import { useAuth } from "@/hooks/useAuth";
import { useVoiceRecognition } from "@/hooks/useVoiceRecognition";
import { foodCategories, healthyFoods, recipes, foodFacts, achievements } from "@/data/foodData";

const Index = () => {
  const { t } = useTranslation();
  const { user, completeStoryChapter } = useAuth();
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("home");
  const [activeCategory, setActiveCategory] = useState("fruits");
  const [currentFact, setCurrentFact] = useState(foodFacts[0]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [showGames, setShowGames] = useState(false);
  const [showComics, setShowComics] = useState(false);
  const [showCharacterSelector, setShowCharacterSelector] = useState(false);
  const [showStoryMode, setShowStoryMode] = useState(false);
  const [showFoodKingdomMap, setShowFoodKingdomMap] = useState(false);
  const [showAnimeCutscenes, setShowAnimeCutscenes] = useState(false);
  const [showMangaPanels, setShowMangaPanels] = useState(false);
  const [showSeasonalProduce, setShowSeasonalProduce] = useState(false);
  const [showFoodNutritionTracker, setShowFoodNutritionTracker] = useState(false);
  const [showCommunitySpace, setShowCommunitySpace] = useState(false);
  const [showShokuikuSaga, setShowShokuikuSaga] = useState(false);
  const [showBossBattles, setShowBossBattles] = useState(false);
  const [showMealMastery, setShowMealMastery] = useState(false);
  const [showMangaBuilder, setShowMangaBuilder] = useState(false);
  const [showRealMissions, setShowRealMissions] = useState(false);
  const [showAboutEatXP, setShowAboutEatXP] = useState(false);
  const [selectedFoodHero, setSelectedFoodHero] = useState<string | null>(null);
  const { transcript, isListening } = useVoiceRecognition();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact(foodFacts[Math.floor(Math.random() * foodFacts.length)]);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // Voice command handling
  useEffect(() => {
    if (!transcript) return;
    
    const lower = transcript.toLowerCase();
    
    if (lower.includes("games") || lower.includes("play")) {
      setShowGames(true);
    } else if (lower.includes("comics") || lower.includes("stories")) {
      setShowComics(true);
    } else if (lower.includes("character") || lower.includes("avatar")) {
      setShowCharacterSelector(true);
    } else if (lower.includes("story") || lower.includes("chapter") || lower.includes("learn")) {
      setShowStoryMode(true);
    } else if (lower.includes("map") || lower.includes("kingdom") || lower.includes("explore")) {
      setShowFoodKingdomMap(true);
    } else if (lower.includes("cutscene") || lower.includes("animation") || lower.includes("anime")) {
      setShowAnimeCutscenes(true);
    } else if (lower.includes("manga") || lower.includes("comic") || lower.includes("panel")) {
      setShowMangaPanels(true);
    } else if (lower.includes("seasonal") || lower.includes("produce") || lower.includes("vegetables") || lower.includes("fruits")) {
      setShowSeasonalProduce(true);
    } else if (lower.includes("nutrition") || lower.includes("tracker") || lower.includes("meal") || lower.includes("analyze")) {
      setShowFoodNutritionTracker(true);
    } else if (lower.includes("community") || lower.includes("social") || lower.includes("friends") || lower.includes("challenge") || lower.includes("forum")) {
      setShowCommunitySpace(true);
    } else if (lower.includes("home") || lower.includes("back")) {
      setShowGames(false);
      setShowComics(false);
      setShowCharacterSelector(false);
      setShowStoryMode(false);
      setShowFoodKingdomMap(false);
      setShowAnimeCutscenes(false);
      setShowMangaPanels(false);
      setShowSeasonalProduce(false);
      setShowFoodNutritionTracker(false);
      setShowCommunitySpace(false);
    }
  }, [transcript]);

  const getFoodData = () => {
    if (!selectedAge) return [];
    const foods = healthyFoods[selectedAge as keyof typeof healthyFoods] || [];
    
    // Map food names to translation keys
    const foodNameMap: {[key: string]: string} = {
      "Banana": "foods.banana",
      "Carrot": "foods.carrot",
      "Apple": "foods.apple",
      "Cheese": "foods.cheese",
      "Avocado": "foods.avocado",
      "Salmon": "foods.salmon",
      "Spinach": "foods.spinach",
      "Eggs": "foods.eggs",
      "Quinoa": "foods.quinoa",
      "Greek Yogurt": "foods.greek_yogurt",
      "Sweet Potato": "foods.sweet_potato",
      "Chicken": "foods.chicken",
    };

    // Map benefit names to translation keys
    const benefitMap: {[key: string]: string} = {
      "Energy boost": "seasonal_produce.energy_boost",
      "Happy tummy": "food_info.banana_benefit_2",
      "Super eyes": "food_info.carrot_benefit_1",
      "Crunchy fun": "food_info.carrot_benefit_2",
      "Strong teeth": "food_info.apple_benefit_1",
      "Yummy snack": "food_info.apple_benefit_2",
      "Strong bones": "food_info.apple_benefit_1",
      "Tasty treat": "food_info.apple_benefit_2",
      "Brain power": "food_info.banana_benefit_1",
      "Healthy fats": "seasonal_produce.healthy_fats",
      "Omega-3": "seasonal_produce.omega_3",
      "Strong muscles": "seasonal_produce.strong_muscles",
      "Iron boost": "seasonal_produce.iron_boost",
      "Energy": "seasonal_produce.energy",
      "Complete protein": "seasonal_produce.complete_protein",
      "Brain food": "seasonal_produce.brain_food",
      "Probiotics": "seasonal_produce.probiotics",
      "Muscle recovery": "seasonal_produce.muscle_recovery",
      "Vitamin A": "seasonal_produce.vitamin_a",
      "Complex carbs": "seasonal_produce.complex_carbs",
      "Lean protein": "seasonal_produce.lean_protein",
      "B vitamins": "seasonal_produce.b_vitamins",
    };

    // Map fun fact keys
    const funFactMap: {[key: string]: string} = {
      "Bananas can float in water!": "food_info.banana_fact",
      "Carrots were first purple, not orange!": "food_info.carrot_fact",
      "Apples are part of the rose family!": "food_info.apple_fact",
    };

    return foods.map(food => ({
      ...food,
      name: t(foodNameMap[food.name] || `foods.${food.name.toLowerCase().replace(/\s+/g, '_')}`),
      benefits: food.benefits.map(b => t(benefitMap[b] || b)),
      funFact: food.funFact ? t(funFactMap[food.funFact] || food.funFact) : undefined,
    }));
  };

  const currentFoods = getFoodData();
  const currentRecipes = selectedAge
    ? recipes[selectedAge as keyof typeof recipes] || []
    : [];

  const getAgeLabel = () => {
    switch (selectedAge) {
      case "kids": return t("age_groups.kids");
      case "tweens": return t("age_groups.tweens");
      case "teens": return t("age_groups.teens");
      default: return t("age_groups.default");
    }
  };

  if (showWelcome && !selectedAge) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        {/* Language Selector in top right */}
        <div className="absolute top-6 right-6">
          <LanguageSelector />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6 max-w-sm"
        >
          <FoodMascot mood="waving" size="lg" />
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="font-display text-4xl font-bold text-foreground">
              {t("app_name")} 🍽️
            </h1>
            <p className="text-muted-foreground mt-2">
              {t("home.subtitle")}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <AgeSelector selectedAge={selectedAge} onSelect={(age) => {
              setSelectedAge(age);
              setShowWelcome(false);
            }} />
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (selectedRecipe) {
    return (
      <RecipeDetail
        recipe={selectedRecipe}
        onBack={() => setSelectedRecipe(null)}
        ageGroup={getAgeLabel()}
      />
    );
  }

  if (selectedFoodHero) {
    return (
      <HealthyFoodHeroesDetail
        foodKey={selectedFoodHero}
        onBack={() => setSelectedFoodHero(null)}
        selectedAge={selectedAge || "kids"}
      />
    );
  }

  if (showStoryMode) {
    return (
      <StoryMode
        completedChapters={user?.completedStoryChapters || []}
        currentCharacterId={user?.characterId}
        onBack={() => setShowStoryMode(false)}
        onChapterSelect={(chapterId) => {
          const chapter = require("@/data/storyChapters").STORY_CHAPTERS[chapterId];
          if (chapter) {
            completeStoryChapter(chapterId, chapter.rewards.xp);
          }
        }}
      />
    );
  }

  if (showCharacterSelector) {
    return (
      <div className="min-h-screen bg-background pb-8">
        <header className="sticky top-0 bg-background/95 backdrop-blur-lg z-40 px-4 py-3 border-b border-border flex items-center justify-between">
          <button
            onClick={() => setShowCharacterSelector(false)}
            className="text-muted-foreground hover:text-foreground transition-colors font-semibold"
          >
            {t("common.back_to_home")}
          </button>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <span className="font-display font-bold">{t("common.choose_character")}</span>
          </div>
        </header>
        <main className="px-4 py-6">
          <CharacterSelector onSelect={() => setShowCharacterSelector(false)} ageGroup={selectedAge as "kids" | "tweens" | "teens"} />
        </main>
      </div>
    );
  }

  if (showAboutEatXP) {
    return <AboutEatXP onClose={() => setShowAboutEatXP(false)} />;
  }

  if (showGames) {
    return (
      <div className="min-h-screen bg-background pb-8">
        <header className="sticky top-0 bg-background/95 backdrop-blur-lg z-40 px-4 py-3 border-b border-border">
          <button
            onClick={() => setShowGames(false)}
            className="text-muted-foreground hover:text-foreground transition-colors font-semibold"
          >
            {t("common.back_to_home")}
          </button>
        </header>
        <main className="px-4 py-4">
          <GamesHub ageGroup={selectedAge || "kids"} />
        </main>
      </div>
    );
  }

  if (showComics) {
    return (
      <div className="min-h-screen bg-background pb-8">
        <header className="sticky top-0 bg-background/95 backdrop-blur-lg z-40 px-4 py-3 border-b border-border">
          <button
            onClick={() => setShowComics(false)}
            className="text-muted-foreground hover:text-foreground transition-colors font-semibold"
          >
            {t("common.back_to_home")}
          </button>
        </header>
        <main className="px-4 py-4">
          <ComicStories ageGroup={selectedAge || "kids"} />
        </main>
      </div>
    );
  }

  if (showFoodKingdomMap) {
    return (
      <FoodKingdomMap
        completedChapters={user?.completedStoryChapters || []}
        onBack={() => setShowFoodKingdomMap(false)}
      />
    );
  }

  if (showAnimeCutscenes) {
    return (
      <AnimeCutscenes
        completedChapters={user?.completedStoryChapters || []}
        onBack={() => setShowAnimeCutscenes(false)}
      />
    );
  }

  if (showMangaPanels) {
    return (
      <MangaPanels
        completedChapters={user?.completedStoryChapters || []}
        onBack={() => setShowMangaPanels(false)}
      />
    );
  }

  if (showSeasonalProduce) {
    return (
      <SeasonalProduce
        onBack={() => setShowSeasonalProduce(false)}
      />
    );
  }

  if (showFoodNutritionTracker) {
    return (
      <FoodNutritionTracker
        onBack={() => setShowFoodNutritionTracker(false)}
      />
    );
  }

  if (showCommunitySpace) {
    return (
      <CommunitySpace
        onBack={() => setShowCommunitySpace(false)}
      />
    );
  }

  if (showShokuikuSaga) {
    return (
      <div className="min-h-screen bg-background pb-8">
        <main className="px-4 py-4">
          <ShokuikuSagaRPG onBack={() => setShowShokuikuSaga(false)} />
        </main>
      </div>
    );
  }

  if (showBossBattles) {
    return (
      <div className="min-h-screen bg-background pb-8">
        <main className="px-4 py-4">
          <BossBattleChallenges onBack={() => setShowBossBattles(false)} />
        </main>
      </div>
    );
  }

  if (showMealMastery) {
    return (
      <div className="min-h-screen bg-background pb-8">
        <main className="px-4 py-4">
          <MealMasterySimulator onBack={() => setShowMealMastery(false)} />
        </main>
      </div>
    );
  }

  if (showMangaBuilder) {
    return (
      <div className="min-h-screen bg-background pb-8">
        <main className="px-4 py-4">
          <AnimeMangaBuilder onBack={() => setShowMangaBuilder(false)} />
        </main>
      </div>
    );
  }

  if (showRealMissions) {
    return (
      <div className="min-h-screen bg-background pb-8">
        <main className="px-4 py-4">
          <RealLifeMissions onBack={() => setShowRealMissions(false)} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24 relative overflow-hidden">
      {/* Anime Character Background */}
      <AnimeCharacterBackground
        characterId={user?.characterId || "tanjiro"}
        opacity={1}
        scale={1.15}
        position="right"
        animate={true}
      />

      {/* Content wrapper with z-index to sit above background */}
      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 bg-background/95 backdrop-blur-lg z-40 px-4 py-3 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FoodMascot mood="happy" size="sm" />
              <div>
                <p className="text-xs text-muted-foreground">{t("common.hello")}, {getAgeLabel()}!</p>
                <h2 className="font-display font-bold text-foreground">{t("app_name")}</h2>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LanguageSelector />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowCharacterSelector(true)}
                className="bg-primary/10 text-primary hover:bg-primary/20 p-2 rounded-full transition-all"
                title={t("common.choose_character")}
              >
                <Users className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowStoryMode(true)}
                className="bg-secondary/10 text-secondary hover:bg-secondary/20 p-2 rounded-full transition-all"
                title={t("common.story_mode")}
              >
                <BookMarked className="w-5 h-5" />
              </motion.button>
              <VoiceControlButton className="relative" />
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowWelcome(true)}
                className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-semibold"
              >
                {t("common.change_age")}
              </motion.button>
              <UserProfile />
            </div>
          </div>
        </header>

        <main className="px-4 py-4 space-y-6">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {/* Weather-based Food Suggestions */}
              <WeatherFoodSuggestion />

              {/* Quick Actions - Games, Comics, Story, Map, Cutscenes, Manga */}
              <div className="grid grid-cols-3 gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowStoryMode(true)}
                  className="bg-gradient-to-br from-kawaii-blue to-secondary rounded-2xl p-3 text-left relative overflow-hidden"
                >
                  <BookMarked className="w-6 h-6 text-primary-foreground mb-1" />
                  <p className="font-display font-bold text-xs text-primary-foreground">{t("home.story_mode")}</p>
                  <p className="text-xs text-primary-foreground/80">{t("home.story_desc")}</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowGames(true)}
                  className="bg-gradient-to-br from-kawaii-pink to-accent rounded-2xl p-3 text-left relative overflow-hidden"
                >
                  <Gamepad2 className="w-6 h-6 text-primary-foreground mb-1" />
                  <p className="font-display font-bold text-xs text-primary-foreground">{t("home.play_games")}</p>
                  <p className="text-xs text-primary-foreground/80">{t("home.games_desc")}</p>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowComics(true)}
                  className="bg-gradient-to-br from-kawaii-yellow to-primary rounded-2xl p-3 text-left relative overflow-hidden"
                >
                  <BookOpen className="w-6 h-6 text-primary-foreground mb-1" />
                  <p className="font-display font-bold text-xs text-primary-foreground">{t("home.read_comics")}</p>
                  <p className="text-xs text-primary-foreground/80">{t("home.comics_desc")}</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowFoodKingdomMap(true)}
                  className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-3 text-left relative overflow-hidden"
                >
                  <span className="text-2xl mb-1 inline-block">🗺️</span>
                  <p className="font-display font-bold text-xs text-primary-foreground">{t("home.food_map")}</p>
                  <p className="text-xs text-primary-foreground/80">{t("home.food_map_desc")}</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowAnimeCutscenes(true)}
                  className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl p-3 text-left relative overflow-hidden"
                >
                  <span className="text-2xl mb-1 inline-block">🎬</span>
                  <p className="font-display font-bold text-xs text-primary-foreground">{t("home.cutscenes")}</p>
                  <p className="text-xs text-primary-foreground/80">{t("home.cutscenes_desc")}</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowMangaPanels(true)}
                  className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-3 text-left relative overflow-hidden"
                >
                  <span className="text-2xl mb-1 inline-block">📖</span>
                  <p className="font-display font-bold text-xs text-primary-foreground">{t("home.manga")}</p>
                  <p className="text-xs text-primary-foreground/80">{t("home.manga_desc")}</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowSeasonalProduce(true)}
                  className="bg-gradient-to-br from-green-500 to-lime-400 rounded-2xl p-3 text-left relative overflow-hidden"
                >
                  <span className="text-2xl mb-1 inline-block">🌿</span>
                  <p className="font-display font-bold text-xs text-primary-foreground">{t("seasonal_produce.title")}</p>
                  <p className="text-xs text-primary-foreground/80">{t("seasonal_produce.subtitle")}</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowFoodNutritionTracker(true)}
                  className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-3 text-left relative overflow-hidden"
                >
                  <span className="text-2xl mb-1 inline-block">📊</span>
                  <p className="font-display font-bold text-xs text-primary-foreground">{t("nutrition_tracker.title")}</p>
                  <p className="text-xs text-primary-foreground/80">{t("nutrition_tracker.subtitle")}</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCommunitySpace(true)}
                  className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl p-3 text-left relative overflow-hidden"
                >
                  <span className="text-2xl mb-1 inline-block">🌍</span>
                  <p className="font-display font-bold text-xs text-primary-foreground">{t("community_space.title")}</p>
                  <p className="text-xs text-primary-foreground/80">{t("community_space.subtitle")}</p>
                </motion.button>


              </div>

              {/* Teen Features - Only show for ages 13+ */}
              {(selectedAge === "teens" || !selectedAge) && (
                <>
                  <div className="border-t-2 border-purple-300 pt-4 mt-4">
                    <h3 className="font-display text-lg font-bold text-purple-600 mb-3 flex items-center gap-2">
                      🎮 {t("teen_features.shokuiku_saga", "Teen Challenges")}
                    </h3>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowShokuikuSaga(true)}
                      className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl p-3 text-left relative overflow-hidden"
                    >
                      <span className="text-2xl mb-1 inline-block">⚔️</span>
                      <p className="font-display font-bold text-xs text-white">{t("teen_features.shokuiku_saga")}</p>
                      <p className="text-xs text-white/80">{t("teen_features.shokuiku_desc")}</p>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowBossBattles(true)}
                      className="bg-gradient-to-br from-red-500 to-red-700 rounded-2xl p-3 text-left relative overflow-hidden"
                    >
                      <span className="text-2xl mb-1 inline-block">⚡</span>
                      <p className="font-display font-bold text-xs text-white">{t("teen_features.boss_battles")}</p>
                      <p className="text-xs text-white/80">{t("teen_features.boss_desc")}</p>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowMealMastery(true)}
                      className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl p-3 text-left relative overflow-hidden"
                    >
                      <span className="text-2xl mb-1 inline-block">🍽️</span>
                      <p className="font-display font-bold text-xs text-white">{t("teen_features.meal_mastery")}</p>
                      <p className="text-xs text-white/80">{t("teen_features.meal_desc")}</p>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowMangaBuilder(true)}
                      className="bg-gradient-to-br from-pink-500 to-pink-700 rounded-2xl p-3 text-left relative overflow-hidden"
                    >
                      <span className="text-2xl mb-1 inline-block">📚</span>
                      <p className="font-display font-bold text-xs text-white">{t("teen_features.manga_builder")}</p>
                      <p className="text-xs text-white/80">{t("teen_features.manga_desc")}</p>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowRealMissions(true)}
                      className="bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-2xl p-3 text-left relative overflow-hidden"
                    >
                      <span className="text-2xl mb-1 inline-block">🎯</span>
                      <p className="font-display font-bold text-xs text-white">{t("teen_features.real_missions")}</p>
                      <p className="text-xs text-white/80">{t("teen_features.missions_desc")}</p>
                    </motion.button>
                  </div>
                </>
              )}

              {/* Fun Fact */}
              <FoodFactBubble fact={currentFact} title={t("did_you_know.title")} />

              {/* Daily Challenge */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-secondary to-kawaii-mint rounded-3xl p-5 text-foreground relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5" />
                    <span className="text-sm font-semibold opacity-90">{t("home.daily_challenge")}</span>
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">
                    {t("home.challenge_desc")}
                  </h3>
                  <p className="text-sm opacity-80 mb-3">
                    {t("home.challenge_text")}
                  </p>
                  <button className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-white/30 transition-colors">
                    {t("home.accept_challenge")} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>

              {/* Quick Recipes */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display text-lg font-bold text-foreground">{t("home.quick_recipes")}</h3>
                  <button 
                    onClick={() => setActiveTab("recipes")}
                    className="text-primary text-sm font-semibold"
                  >
                    See all
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {currentRecipes.slice(0, 2).map((recipe, i) => (
                    <RecipeCard
                      key={i}
                      {...recipe}
                      ageGroup={getAgeLabel()}
                      onClick={() => setSelectedRecipe(recipe)}
                    />
                  ))}
                </div>
              </div>

              {/* Healthy Foods */}
              <div>
                <h3 className="font-display text-lg font-bold text-foreground mb-3">
                  {t("healthy_heroes.title")}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {currentFoods.slice(0, 4).map((food, i) => (
                    <div key={i} onClick={() => setSelectedFoodHero(food.name.toLowerCase())}>
                      <FoodCard {...food} />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "discover" && (
            <motion.div
              key="discover"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-display text-xl font-bold text-foreground mb-1">
                  Discover Foods
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Learn about amazing foods and their superpowers!
                </p>
              </div>

              {/* Categories */}
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                {foodCategories.map((cat) => (
                  <CategoryPill
                    key={cat.id}
                    {...cat}
                    active={activeCategory === cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                  />
                ))}
              </div>

              {/* Food Grid */}
              <div className="grid grid-cols-2 gap-3">
                {currentFoods.map((food, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setSelectedFoodHero(food.name.toLowerCase())}
                  >
                    <FoodCard {...food} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "recipes" && (
            <motion.div
              key="recipes"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-display text-xl font-bold text-foreground mb-1">
                  Recipe Collection
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Yummy recipes perfect for your age!
                </p>
              </div>

              <div className="space-y-4">
                {currentRecipes.map((recipe, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <RecipeCard 
                      {...recipe} 
                      ageGroup={getAgeLabel()}
                      onClick={() => setSelectedRecipe(recipe)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "achievements" && (
            <motion.div
              key="achievements"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-display text-xl font-bold text-foreground mb-1">
                  Your Badges
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Collect badges as you learn and cook!
                </p>
              </div>

              {/* Points Card */}
              <div className="bg-gradient-to-r from-kawaii-yellow/40 to-primary/30 rounded-3xl p-5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-3xl">⭐</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Points</p>
                    <p className="font-display text-3xl font-bold text-foreground">250</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <AchievementBadge {...achievement} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="text-center py-6">
                <FoodMascot mood="excited" size="lg" />
                <h3 className="font-display text-2xl font-bold text-foreground mt-4">
                  {getAgeLabel()}
                </h3>
                <p className="text-muted-foreground">Food Explorer Level 3</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Recipes", value: "12", emoji: "📖" },
                  { label: "Foods", value: "28", emoji: "🥗" },
                  { label: "Badges", value: "4", emoji: "🏅" },
                ].map((stat, i) => (
                  <div key={i} className="bg-card rounded-2xl p-4 text-center shadow-card">
                    <span className="text-2xl">{stat.emoji}</span>
                    <p className="font-display text-xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Quick Links */}
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowGames(true)}
                  className="bg-card rounded-2xl p-4 shadow-card text-center"
                >
                  <span className="text-3xl block mb-1">🎮</span>
                  <span className="font-semibold text-foreground text-sm">Play Games</span>
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowComics(true)}
                  className="bg-card rounded-2xl p-4 shadow-card text-center"
                >
                  <span className="text-3xl block mb-1">📖</span>
                  <span className="font-semibold text-foreground text-sm">Read Comics</span>
                </motion.button>
              </div>

              {/* Settings */}
              <div className="space-y-2">
                <h4 className="font-display font-bold text-foreground">Settings</h4>
                {[
                  { label: "Change Age Group", icon: "👤" },
                  { label: "Notifications", icon: "🔔" },
                  { label: "About EatXP", icon: "ℹ️" },
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (item.label === "Change Age Group") {
                        setShowWelcome(true);
                        setSelectedAge(null);
                      } else if (item.label === "About EatXP") {
                        setShowAboutEatXP(true);
                      }
                    }}
                    className="w-full bg-card rounded-2xl p-4 flex items-center gap-3 shadow-card hover:shadow-float transition-shadow"
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-semibold text-foreground">{item.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </main>

        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
};

export default Index;