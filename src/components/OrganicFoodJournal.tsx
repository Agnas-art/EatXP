import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Trash2, Calendar } from "lucide-react";
import {
  organicFoods,
  FoodJournalEntry,
  getOrganicCount,
  getUnlockedAchievements,
  getFoodById,
  getNextAchievement,
} from "@/data/organicFoodsData";
import { FoodLogger } from "./FoodLogger";
import { AnimeMascotFeedback } from "./AnimeMascotFeedback";
import { AchievementSticker } from "./AchievementSticker";

interface OrganicFoodJournalProps {
  onBack: () => void;
}

export const OrganicFoodJournal = ({ onBack }: OrganicFoodJournalProps) => {
  const [entries, setEntries] = useState<FoodJournalEntry[]>(() => {
    const saved = localStorage.getItem("organic_food_journal");
    return saved ? JSON.parse(saved) : [];
  });

  const [showFoodLogger, setShowFoodLogger] = useState(false);
  const [feedbackFood, setFeedbackFood] = useState<{
    foodId: string;
    isOrganic: boolean;
  } | null>(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("organic_food_journal", JSON.stringify(entries));
  }, [entries]);

  const organicCount = getOrganicCount(entries);
  const unlockedAchievements = getUnlockedAchievements(organicCount);
  const nextAchievement = getNextAchievement(organicCount);

  const todayEntries = entries.filter((entry) => entry.date === selectedDate);
  const organicToday = todayEntries.filter((entry) => {
    const food = getFoodById(entry.foodId);
    return food?.isOrganic;
  });

  const handleAddFood = (foodId: string, mealType: string) => {
    const food = getFoodById(foodId);
    if (!food) return;

    const newEntry: FoodJournalEntry = {
      id: Date.now().toString(),
      foodId,
      date: selectedDate,
      mealType: mealType as "breakfast" | "lunch" | "dinner" | "snack",
      quantity: "1 serving",
      timestamp: Date.now(),
    };

    setEntries([...entries, newEntry]);
    setFeedbackFood({
      foodId,
      isOrganic: food.isOrganic,
    });
    setShowFoodLogger(false);

    // Hide feedback after 3 seconds
    setTimeout(() => setFeedbackFood(null), 3000);
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const mealEmojis = {
    breakfast: "🌅",
    lunch: "☀️",
    dinner: "🌙",
    snack: "🍿",
  };

  const getProgressPercentage = () => {
    if (!nextAchievement) return 100;
    const prevRequired = unlockedAchievements[unlockedAchievements.length - 1]?.requirement || 0;
    const nextRequired = nextAchievement.requirement;
    const progress = ((organicCount - prevRequired) / (nextRequired - prevRequired)) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-br from-background via-background to-green-500/5 p-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 pt-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            📓 Organic Food Journal
          </h1>
          <div className="w-12" />
        </div>

        {/* Feedback Animation */}
        <AnimatePresence>
          {feedbackFood && (
            <AnimeMascotFeedback
              isOrganic={feedbackFood.isOrganic}
              foodName={getFoodById(feedbackFood.foodId)?.name || "Food"}
              foodEmoji={getFoodById(feedbackFood.foodId)?.emoji || "🍎"}
            />
          )}
        </AnimatePresence>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6 mb-6"
        >
          <div className="grid grid-cols-3 gap-4">
            {/* Organic Count */}
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-1">
                {organicCount}
              </div>
              <p className="text-sm font-semibold text-foreground">
                Organic Items
              </p>
              <p className="text-xs text-muted-foreground">Total logged</p>
            </div>

            {/* Today's Organic */}
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-1">
                {organicToday.length}
              </div>
              <p className="text-sm font-semibold text-foreground">
                Today's Organic
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(selectedDate).toLocaleDateString()}
              </p>
            </div>

            {/* Achievements */}
            <div className="text-center">
              <div className="text-4xl font-bold text-amber-600 mb-1">
                {unlockedAchievements.length}
              </div>
              <p className="text-sm font-semibold text-foreground">
                Achievements
              </p>
              <p className="text-xs text-muted-foreground">Unlocked</p>
            </div>
          </div>

          {/* Progress Bar */}
          {nextAchievement && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-foreground">
                  Progress to {nextAchievement.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {organicCount}/{nextAchievement.requirement}
                </p>
              </div>
              <div className="w-full bg-gray-300/30 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${getProgressPercentage()}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-green-400 to-emerald-500"
                />
              </div>
            </div>
          )}
        </motion.div>

        {/* Date Selector */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Food Logger Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowFoodLogger(true)}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-lg mb-6 hover:shadow-lg transition-shadow text-lg flex items-center justify-center gap-2"
        >
          <span className="text-2xl">➕</span>
          Log a Food
        </motion.button>

        {/* Today's Entries */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4">
            Today's Foods ({todayEntries.length})
          </h2>

          {todayEntries.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-card rounded-lg border-2 border-dashed border-border"
            >
              <p className="text-muted-foreground text-lg mb-4">
                No foods logged yet for this day
              </p>
              <p className="text-sm text-muted-foreground">
                Start by clicking "Log a Food" above!
              </p>
            </motion.div>
          ) : (
            <div className="space-y-3">
              {todayEntries.map((entry, idx) => {
                const food = getFoodById(entry.foodId);
                if (!food) return null;

                const mealEmoji = mealEmojis[entry.mealType];

                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className={`p-4 rounded-lg border-2 flex items-center justify-between group
                      ${
                        food.isOrganic
                          ? "bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/50 hover:border-green-400"
                          : "bg-gray-500/5 border-gray-400/50 hover:border-gray-300"
                      }`}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-3xl">{food.emoji}</span>
                      <div>
                        <p className="font-bold text-foreground">{food.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{mealEmoji} {entry.mealType}</span>
                          <span>•</span>
                          <span>{entry.quantity}</span>
                        </div>
                      </div>
                    </div>

                    {food.isOrganic && (
                      <span className="text-green-600 font-bold text-sm mr-3">
                        ✨ Organic
                      </span>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Achievements */}
        {unlockedAchievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <AchievementSticker
              unlockedAchievements={unlockedAchievements}
              organicCount={organicCount}
            />
          </motion.div>
        )}

        {/* Fun Fact */}
        {todayEntries.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 bg-blue-500/10 border border-blue-500/30 rounded-lg p-4"
          >
            <p className="text-sm font-semibold text-foreground mb-2">💡 Organic Tip:</p>
            <p className="text-sm text-muted-foreground">
              Organic foods are grown without synthetic pesticides, herbicides, or fertilizers. They're
              better for your body and the environment!
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Food Logger Modal */}
      <AnimatePresence>
        {showFoodLogger && (
          <FoodLogger
            onAddFood={handleAddFood}
            onClose={() => setShowFoodLogger(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrganicFoodJournal;
