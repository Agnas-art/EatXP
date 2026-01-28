import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Info } from "lucide-react";
import { foodSources, foodCategories, getFoodSourceById } from "@/data/foodSourcesData";

interface FoodLoggerProps {
  onAddFood: (foodId: string, mealType: string) => void;
  onClose: () => void;
}

type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export const FoodLogger = ({ onAddFood, onClose }: FoodLoggerProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Fruits");
  const [selectedMealType, setSelectedMealType] = useState<MealType>("breakfast");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFoodInfo, setSelectedFoodInfo] = useState<string | null>(null);

  const categoryFoods = foodSources.filter(
    (food) =>
      food.category === selectedCategory &&
      food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Remove duplicates for display (show unique food names)
  const uniqueFoods = Array.from(
    new Map(categoryFoods.map((food) => [food.name, food])).values()
  );

  const mealEmojis = {
    breakfast: "🌅",
    lunch: "☀️",
    dinner: "🌙",
    snack: "🍿",
  };

  const methodEmojis: Record<string, string> = {
    "Chemical-Free Farming": "🌱",
    "Standard Agriculture": "🌾",
    "Sustainable Practices": "🌍",
    "Local Production": "🏡",
    "Industrial Scale": "🏭",
  };

  const handleAddFood = (foodId: string) => {
    onAddFood(foodId, selectedMealType);
  };

  const selectedFoodData = selectedFoodInfo ? getFoodSourceById(selectedFoodInfo) : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-40 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-card rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            🍽️ Discover Food Sources
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-background rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex">
          {/* Left Side - Food Selection */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 border-r border-border">
            {/* Meal Type Selection */}
            <div>
              <label className="block text-xs font-bold text-foreground/70 mb-2 uppercase tracking-wide">
                Meal Type
              </label>
              <div className="grid grid-cols-4 gap-2">
                {(["breakfast", "lunch", "dinner", "snack"] as MealType[]).map(
                  (mealType) => (
                    <motion.button
                      key={mealType}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedMealType(mealType)}
                      className={`p-2 rounded-lg text-sm font-semibold transition-all
                        ${
                          selectedMealType === mealType
                            ? "bg-primary text-primary-foreground shadow-lg"
                            : "bg-background text-foreground hover:bg-secondary/10"
                        }`}
                    >
                      <span className="text-lg block">{mealEmojis[mealType]}</span>
                    </motion.button>
                  )
                )}
              </div>
            </div>

            {/* Category Selection */}
            <div>
              <label className="block text-xs font-bold text-foreground/70 mb-2 uppercase tracking-wide">
                Category
              </label>
              <div className="space-y-2">
                {foodCategories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedCategory(category);
                      setSearchTerm("");
                      setSelectedFoodInfo(null);
                    }}
                    className={`w-full px-4 py-2 rounded-lg text-sm font-semibold transition-all text-left
                      ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-blue-500/30 to-purple-500/30 text-foreground border-2 border-blue-500"
                          : "bg-background text-foreground/70 border border-border hover:border-blue-500/50"
                      }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Foods List */}
            <div>
              <h3 className="text-xs font-bold text-foreground/70 mb-2 uppercase tracking-wide">
                Available Foods
              </h3>
              <div className="space-y-2">
                {uniqueFoods.length > 0 ? (
                  uniqueFoods.map((food, idx) => {
                    const allVariants = foodSources.filter((f) => f.name === food.name);
                    return (
                      <motion.button
                        key={food.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        onClick={() => setSelectedFoodInfo(food.id)}
                        className={`w-full p-3 rounded-lg border-2 transition-all text-left
                          ${
                            selectedFoodInfo === food.id
                              ? "border-purple-500 bg-gradient-to-r from-purple-500/20 to-blue-500/20"
                              : "border-border bg-background hover:border-purple-500/50"
                          }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 flex-1">
                            <span className="text-2xl">{food.emoji}</span>
                            <div>
                              <p className="font-semibold text-foreground">{food.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {allVariants.length > 1
                                  ? `${allVariants.length} production methods`
                                  : "1 production method"}
                              </p>
                            </div>
                          </div>
                          <Info className="w-4 h-4 text-muted-foreground" />
                        </div>
                      </motion.button>
                    );
                  })
                ) : (
                  <p className="text-center text-muted-foreground py-4 text-sm">
                    No foods found
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Details & Variants */}
          {selectedFoodData ? (
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-br from-background to-background/50">
              <div>
                <div className="text-5xl mb-4">{selectedFoodData.emoji}</div>
                <h3 className="text-2xl font-bold text-foreground mb-1">
                  {selectedFoodData.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {selectedFoodData.productionMethod}
                </p>
                <p className="text-xs text-muted-foreground italic mb-4">
                  {selectedFoodData.funFact}
                </p>

                {/* Production Badge */}
                <div className={`bg-gradient-to-r ${selectedFoodData.methodColor} rounded-lg p-3 mb-4`}>
                  <p className="text-xs font-bold text-white/90 mb-1 flex items-center gap-1">
                    {methodEmojis[selectedFoodData.productionMethod]} {selectedFoodData.productionMethod}
                  </p>
                  <p className="text-xs text-white/80">{selectedFoodData.productionDetails}</p>
                </div>

                {/* Key Benefits */}
                <div className="space-y-2 mb-4">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                    <p className="text-xs font-bold text-green-700 dark:text-green-400 mb-1">
                      💚 Health Benefit
                    </p>
                    <p className="text-xs text-foreground/80">{selectedFoodData.healthBenefit}</p>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                    <p className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-1">
                      🌍 Environmental Impact
                    </p>
                    <p className="text-xs text-foreground/80">{selectedFoodData.environmentalImpact}</p>
                  </div>
                </div>

                {/* Nutrients */}
                <div className="mb-4">
                  <p className="text-xs font-bold text-foreground/70 mb-2">🥗 Key Nutrients</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedFoodData.nutrients.map((nutrient) => (
                      <span
                        key={nutrient}
                        className="text-xs bg-primary/20 text-primary font-semibold px-2 py-1 rounded"
                      >
                        {nutrient}
                      </span>
                    ))}
                  </div>
                </div>

                {/* All Variants */}
                <div>
                  <p className="text-xs font-bold text-foreground/70 mb-2">📊 Production Methods</p>
                  <div className="space-y-2">
                    {foodSources
                      .filter((f) => f.name === selectedFoodData.name)
                      .map((variant) => (
                        <motion.button
                          key={variant.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => {
                            handleAddFood(variant.id);
                            onClose();
                          }}
                          className={`w-full p-3 rounded-lg border-2 bg-gradient-to-r ${variant.methodColor} text-white font-semibold text-sm transition-all hover:shadow-lg`}
                        >
                          <div className="flex items-center justify-between">
                            <span>{methodEmojis[variant.productionMethod]} {variant.productionMethod}</span>
                            <Plus className="w-4 h-4" />
                          </div>
                        </motion.button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center p-6">
              <div>
                <p className="text-4xl mb-2">👈</p>
                <p className="text-muted-foreground">Select a food to learn about production methods</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FoodLogger;

