import { motion } from "framer-motion";
import { ArrowLeft, Clock, Users, Star, ChefHat, CheckCircle2, Volume2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ANIME_CHARACTERS } from "../data/animeCharacters";

interface RecipeDetailProps {
  recipe: {
    title: string;
    emoji: string;
    time: string;
    difficulty: "easy" | "medium" | "challenging";
    servings: number;
    ingredients: string[];
    steps: string[];
    culturalOrigin?: string;
    nutritionFacts?: string;
  };
  ageGroup: string;
  characterGuide?: keyof typeof ANIME_CHARACTERS;
  onBack: () => void;
}

const difficultyConfig = (t: any) => ({
  easy: { label: t("recipes_section.difficulty_easy"), stars: 1, color: "text-secondary" },
  medium: { label: t("recipes_section.difficulty_medium"), stars: 2, color: "text-kawaii-yellow" },
  challenging: { label: t("recipes_section.difficulty_hard"), stars: 3, color: "text-primary" },
});

const RecipeDetail = ({ recipe, ageGroup, characterGuide, onBack }: RecipeDetailProps) => {
  const { t } = useTranslation();
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [activeTimer, setActiveTimer] = useState<number | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const config = difficultyConfig(t)[recipe.difficulty];

  // Get character guide
  const guideCharacter = characterGuide
    ? ANIME_CHARACTERS[characterGuide]
    : ANIME_CHARACTERS.deku;

  // Timer effect
  useEffect(() => {
    if (activeTimer !== null && timerSeconds > 0) {
      const interval = setInterval(() => {
        setTimerSeconds(s => {
          if (s <= 1) {
            setActiveTimer(null);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [activeTimer, timerSeconds]);

  const toggleStep = (index: number) => {
    setCompletedSteps(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const startTimer = (minutes: number) => {
    setActiveTimer(minutes);
    setTimerSeconds(minutes * 60);
  };

  const progress = (completedSteps.length / recipe.steps.length) * 100;

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-lg z-40 px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.button>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">{ageGroup} Recipe</p>
            <h2 className="font-display font-bold text-foreground truncate">
              {recipe.title}
            </h2>
          </div>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-br from-kawaii-yellow/40 to-primary/30 p-8 flex items-center justify-center">
        <motion.span
          className="text-8xl"
          animate={{ rotate: [-5, 5, -5], y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {recipe.emoji}
        </motion.span>
      </div>

      <main className="px-4 py-6 space-y-6">
        {/* Title & Meta */}
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground mb-3">
            {recipe.title}
          </h1>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-full">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{recipe.time}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-full">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{recipe.servings} servings</span>
            </div>
            <div className="flex items-center gap-1.5 bg-muted px-3 py-1.5 rounded-full">
              {[...Array(3)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < config.stars ? `${config.color} fill-current` : "text-muted"
                  }`}
                />
              ))}
              <span className={`text-sm font-medium ${config.color}`}>{config.label}</span>
            </div>
          </div>
        </div>

        {/* Progress */}
        <div className="bg-card rounded-2xl p-4 shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-foreground">Your Progress</span>
            <span className="text-sm text-muted-foreground">
              {completedSteps.length}/{recipe.steps.length} steps
            </span>
          </div>
          <div className="bg-muted rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-secondary to-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          {progress === 100 && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-3 text-secondary font-semibold"
            >
              🎉 Amazing! You completed the recipe!
            </motion.p>
          )}
        </div>

        {/* Ingredients */}
        <div className="bg-card rounded-3xl p-5 shadow-card">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">🥄</span>
            <h3 className="font-display text-lg font-bold text-foreground">
              What You Need
            </h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {recipe.ingredients.map((ingredient, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2 bg-muted/50 rounded-xl px-3 py-2"
              >
                <span className="w-2 h-2 bg-secondary rounded-full" />
                <span className="text-sm text-foreground">{ingredient}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Character Guide Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-4 border border-primary/20"
        >
          <div className="flex items-start gap-3">
            <div className="text-4xl flex-shrink-0">{guideCharacter.emoji}</div>
            <div className="flex-1">
              <p className="font-display font-bold text-foreground">{guideCharacter.name}'s Tip</p>
              <p className="text-sm text-muted-foreground mt-1">
                "{guideCharacter.personality} - Pro tip: Take your time with each step and have fun!"
              </p>
            </div>
          </div>
        </motion.div>

        {/* Nutrition Info */}
        {recipe.nutritionFacts && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card rounded-2xl p-4 shadow-card border border-border"
          >
            <p className="font-display font-bold text-foreground mb-2">💪 Nutrition Facts</p>
            <p className="text-sm text-muted-foreground">{recipe.nutritionFacts}</p>
          </motion.div>
        )}

        {/* Cultural Origin */}
        {recipe.culturalOrigin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-card rounded-2xl p-4 shadow-card border border-border"
          >
            <p className="font-display font-bold text-foreground mb-2">🌍 Cultural Origin</p>
            <p className="text-sm text-muted-foreground">{recipe.culturalOrigin}</p>
          </motion.div>
        )}

        {/* Steps */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <ChefHat className="w-6 h-6 text-primary" />
            <h3 className="font-display text-lg font-bold text-foreground">
              Let's Cook!
            </h3>
          </div>
          <div className="space-y-3">
            {recipe.steps.map((step, i) => {
              const isCompleted = completedSteps.includes(i);
              const hasTimer = step.toLowerCase().includes("min") || 
                              step.toLowerCase().includes("hour");
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-card rounded-2xl p-4 shadow-card transition-all ${
                    isCompleted ? "ring-2 ring-secondary" : ""
                  }`}
                >
                  <div className="flex gap-3 mb-3">
                    <button
                      onClick={() => toggleStep(i)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        isCompleted
                          ? "bg-secondary text-secondary-foreground"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <span className="font-display font-bold">{i + 1}</span>
                      )}
                    </button>
                    <p
                      className={`text-sm leading-relaxed flex-1 ${
                        isCompleted
                          ? "text-muted-foreground line-through"
                          : "text-foreground"
                      }`}
                    >
                      {step}
                    </p>
                  </div>

                  {/* Timer Button */}
                  {hasTimer && (
                    <div className="ml-11 space-y-2">
                      {activeTimer === i ? (
                        <motion.div
                          initial={{ scale: 0.8 }}
                          animate={{ scale: 1 }}
                          className="bg-primary/20 rounded-lg p-3 text-center"
                        >
                          <p className="text-xs text-muted-foreground mb-1">Step {i + 1} Timer</p>
                          <p className="font-display font-bold text-2xl text-primary">
                            {Math.floor(timerSeconds / 60)}:{String(timerSeconds % 60).padStart(2, '0')}
                          </p>
                          <button
                            onClick={() => setActiveTimer(null)}
                            className="mt-2 text-xs bg-primary text-primary-foreground px-3 py-1 rounded hover:bg-primary/90"
                          >
                            Stop
                          </button>
                        </motion.div>
                      ) : (
                        <button
                          onClick={() => startTimer(3)}
                          className="text-xs bg-primary/20 hover:bg-primary/30 text-primary px-3 py-2 rounded transition-colors flex items-center gap-2 w-full justify-center"
                        >
                          <Clock className="w-4 h-4" />
                          Set 3-min Timer
                        </button>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Safety Tip */}
        <div className="bg-accent/10 rounded-3xl p-4 border-2 border-dashed border-accent">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="font-display font-bold text-foreground text-sm mb-1">
                Safety First!
              </p>
              <p className="text-xs text-muted-foreground">
                Always ask an adult for help when using sharp knives, the stove, or the oven. 
                Cooking is more fun when everyone stays safe!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RecipeDetail;