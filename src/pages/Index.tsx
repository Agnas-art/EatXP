import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Gamepad2, BookOpen, Palette, Users, BookMarked } from "lucide-react";
import FoodMascot from "@/components/FoodMascot";
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
import { AnimeThemeSelector } from "@/components/AnimeThemeSelector";
import { CharacterSelector } from "@/components/CharacterSelector";
import { VoiceControlButton } from "@/components/VoiceControlButton";
import { UserProfile } from "@/components/UserProfile";
import { useAuth } from "@/hooks/useAuth";
import { useVoiceRecognition } from "@/hooks/useVoiceRecognition";
import { foodCategories, healthyFoods, recipes, foodFacts, achievements } from "@/data/foodData";

const Index = () => {
  const { user, completeStoryChapter } = useAuth();
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("home");
  const [activeCategory, setActiveCategory] = useState("fruits");
  const [currentFact, setCurrentFact] = useState(foodFacts[0]);
  const [showWelcome, setShowWelcome] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [showGames, setShowGames] = useState(false);
  const [showComics, setShowComics] = useState(false);
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  const [showCharacterSelector, setShowCharacterSelector] = useState(false);
  const [showStoryMode, setShowStoryMode] = useState(false);
  const [showFoodKingdomMap, setShowFoodKingdomMap] = useState(false);
  const [showAnimeCutscenes, setShowAnimeCutscenes] = useState(false);
  const [showMangaPanels, setShowMangaPanels] = useState(false);
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
    } else if (lower.includes("theme") || lower.includes("color")) {
      setShowThemeSelector(true);
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
    } else if (lower.includes("home") || lower.includes("back")) {
      setShowGames(false);
      setShowComics(false);
      setShowThemeSelector(false);
      setShowCharacterSelector(false);
      setShowStoryMode(false);
      setShowFoodKingdomMap(false);
      setShowAnimeCutscenes(false);
      setShowMangaPanels(false);
    }
  }, [transcript]);

  const currentFoods = selectedAge
    ? healthyFoods[selectedAge as keyof typeof healthyFoods] || []
    : [];
  const currentRecipes = selectedAge
    ? recipes[selectedAge as keyof typeof recipes] || []
    : [];

  const getAgeLabel = () => {
    switch (selectedAge) {
      case "kids": return "Little Chef";
      case "tweens": return "Junior Cook";
      case "teens": return "Teen Chef";
      default: return "Chef";
    }
  };

  if (showWelcome && !selectedAge) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
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
            <h1 className="font-display text-3xl font-bold text-foreground">
              Welcome to <span className="text-primary">Yummy</span>
              <span className="text-secondary">Learn!</span>
            </h1>
            <p className="text-muted-foreground mt-2">
              Your fun food adventure starts here! 🎉
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

  if (showThemeSelector) {
    return (
      <div className="min-h-screen bg-background pb-8">
        <header className="sticky top-0 bg-background/95 backdrop-blur-lg z-40 px-4 py-3 border-b border-border flex items-center justify-between">
          <button
            onClick={() => setShowThemeSelector(false)}
            className="text-muted-foreground hover:text-foreground transition-colors font-semibold"
          >
            ← Back to Home
          </button>
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary" />
            <span className="font-display font-bold">Anime Themes</span>
          </div>
        </header>
        <main className="px-4 py-6">
          <AnimeThemeSelector onSelect={() => setShowThemeSelector(false)} />
        </main>
      </div>
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
            ← Back to Home
          </button>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            <span className="font-display font-bold">Choose Character</span>
          </div>
        </header>
        <main className="px-4 py-6">
          <CharacterSelector onSelect={() => setShowCharacterSelector(false)} />
        </main>
      </div>
    );
  }

  if (showGames) {
    return (
      <div className="min-h-screen bg-background pb-8">
        <header className="sticky top-0 bg-background/95 backdrop-blur-lg z-40 px-4 py-3 border-b border-border">
          <button
            onClick={() => setShowGames(false)}
            className="text-muted-foreground hover:text-foreground transition-colors font-semibold"
          >
            ← Back to Home
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
            ← Back to Home
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

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-lg z-40 px-4 py-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FoodMascot mood="happy" size="sm" />
            <div>
              <p className="text-xs text-muted-foreground">Hello, {getAgeLabel()}!</p>
              <h2 className="font-display font-bold text-foreground">YummyLearn</h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowCharacterSelector(true)}
              className="bg-primary/10 text-primary hover:bg-primary/20 p-2 rounded-full transition-all"
              title="Choose Character"
            >
              <Users className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowStoryMode(true)}
              className="bg-secondary/10 text-secondary hover:bg-secondary/20 p-2 rounded-full transition-all"
              title="Story Mode"
            >
              <BookMarked className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowThemeSelector(true)}
              className="bg-accent/10 text-accent hover:bg-accent/20 p-2 rounded-full transition-all"
              title="Change Theme"
            >
              <Palette className="w-5 h-5" />
            </motion.button>
            <VoiceControlButton className="relative" />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowWelcome(true)}
              className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-semibold"
            >
              Change Age
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
                  <div className="absolute top-0 right-0 w-12 h-12 bg-white/20 rounded-full blur-xl" />
                  <BookMarked className="w-6 h-6 text-primary-foreground mb-1" />
                  <p className="font-display font-bold text-xs text-primary-foreground">Story Mode</p>
                  <p className="text-xs text-primary-foreground/80">Learn nutrition!</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowGames(true)}
                  className="bg-gradient-to-br from-kawaii-pink to-accent rounded-2xl p-3 text-left relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-12 h-12 bg-white/20 rounded-full blur-xl" />
                  <Gamepad2 className="w-6 h-6 text-primary-foreground mb-1" />
                  <p className="font-display font-bold text-xs text-primary-foreground">Play Games</p>
                  <p className="text-xs text-primary-foreground/80">Learn & have fun!</p>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowComics(true)}
                  className="bg-gradient-to-br from-kawaii-yellow to-primary rounded-2xl p-3 text-left relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-12 h-12 bg-white/20 rounded-full blur-xl" />
                  <BookOpen className="w-6 h-6 text-primary-foreground mb-1" />
                  <p className="font-display font-bold text-xs text-primary-foreground">Read Comics</p>
                  <p className="text-xs text-primary-foreground/80">Fun food stories!</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowFoodKingdomMap(true)}
                  className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-3 text-left relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-12 h-12 bg-white/20 rounded-full blur-xl" />
                  <span className="text-2xl mb-1 inline-block">🗺️</span>
                  <p className="font-display font-bold text-xs text-primary-foreground">Food Map</p>
                  <p className="text-xs text-primary-foreground/80">Explore regions!</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowAnimeCutscenes(true)}
                  className="bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl p-3 text-left relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-12 h-12 bg-white/20 rounded-full blur-xl" />
                  <span className="text-2xl mb-1 inline-block">🎬</span>
                  <p className="font-display font-bold text-xs text-primary-foreground">Cutscenes</p>
                  <p className="text-xs text-primary-foreground/80">Watch anime!</p>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowMangaPanels(true)}
                  className="bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl p-3 text-left relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-12 h-12 bg-white/20 rounded-full blur-xl" />
                  <span className="text-2xl mb-1 inline-block">📖</span>
                  <p className="font-display font-bold text-xs text-primary-foreground">Manga</p>
                  <p className="text-xs text-primary-foreground/80">Comic strips!</p>
                </motion.button>
              </div>

              {/* Fun Fact */}
              <FoodFactBubble fact={currentFact} />

              {/* Daily Challenge */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-r from-secondary to-kawaii-mint rounded-3xl p-5 text-foreground relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5" />
                    <span className="text-sm font-semibold opacity-90">Daily Challenge</span>
                  </div>
                  <h3 className="font-display text-xl font-bold mb-2">
                    Try a new veggie today! 🥦
                  </h3>
                  <p className="text-sm opacity-80 mb-3">
                    Earn 10 points by trying a vegetable you&apos;ve never had before!
                  </p>
                  <button className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-white/30 transition-colors">
                    Accept Challenge <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>

              {/* Quick Recipes */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display text-lg font-bold text-foreground">Quick Recipes</h3>
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
                  Healthy Food Heroes
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {currentFoods.slice(0, 4).map((food, i) => (
                    <FoodCard key={i} {...food} />
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
                  { label: "About YummyLearn", icon: "ℹ️" },
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (item.label === "Change Age Group") {
                        setShowWelcome(true);
                        setSelectedAge(null);
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
  );
};

export default Index;