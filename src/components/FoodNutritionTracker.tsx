import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, AlertCircle, CheckCircle2, Plus, Trash2, Barcode, Copy, Check } from "lucide-react";
import { useState } from "react";
import { ANIME_CHARACTERS } from "../data/animeCharacters";

interface MealItem {
  id: string;
  name: string;
  calories: number;
  protein: number;
  sugar: number;
  additives: string[];
  healthScore: number;
}

interface TrackedMeal {
  id: string;
  name: string;
  items: MealItem[];
  totalCalories: number;
  overallGrade: string;
  timestamp: Date;
}

interface FoodNutritionTrackerProps {
  onBack: () => void;
}

// Food database with nutrition information
const FOOD_DATABASE: Record<string, MealItem> = {
  apple: {
    id: "apple",
    name: "Apple",
    calories: 95,
    protein: 0.5,
    sugar: 19,
    additives: [],
    healthScore: 95,
  },
  banana: {
    id: "banana",
    name: "Banana",
    calories: 105,
    protein: 1.3,
    sugar: 27,
    additives: [],
    healthScore: 90,
  },
  broccoli: {
    id: "broccoli",
    name: "Broccoli",
    calories: 34,
    protein: 2.8,
    sugar: 2.2,
    additives: [],
    healthScore: 98,
  },
  carrots: {
    id: "carrots",
    name: "Carrots",
    calories: 41,
    protein: 0.9,
    sugar: 5,
    additives: [],
    healthScore: 94,
  },
  chicken_breast: {
    id: "chicken_breast",
    name: "Chicken Breast",
    calories: 165,
    protein: 31,
    sugar: 0,
    additives: [],
    healthScore: 92,
  },
  chocolate_bar: {
    id: "chocolate_bar",
    name: "Chocolate Bar",
    calories: 250,
    protein: 3,
    sugar: 27,
    additives: ["artificial flavor", "emulsifier", "preservative"],
    healthScore: 35,
  },
  pizza_slice: {
    id: "pizza_slice",
    name: "Pizza Slice",
    calories: 285,
    protein: 12,
    sugar: 3,
    additives: ["sodium phosphate", "dough conditioner"],
    healthScore: 45,
  },
  salad: {
    id: "salad",
    name: "Garden Salad",
    calories: 50,
    protein: 2,
    sugar: 3,
    additives: [],
    healthScore: 96,
  },
  salmon: {
    id: "salmon",
    name: "Salmon",
    calories: 280,
    protein: 25,
    sugar: 0,
    additives: [],
    healthScore: 95,
  },
  french_fries: {
    id: "french_fries",
    name: "French Fries",
    calories: 365,
    protein: 3.4,
    sugar: 0,
    additives: ["trans fat", "sodium"],
    healthScore: 30,
  },
  yogurt: {
    id: "yogurt",
    name: "Greek Yogurt",
    calories: 100,
    protein: 17,
    sugar: 7,
    additives: [],
    healthScore: 88,
  },
  // Soft Drinks Category
  soft_drink_cola: {
    id: "soft_drink_cola",
    name: "Soft Drinks - Cola",
    calories: 140,
    protein: 0,
    sugar: 39,
    additives: ["high fructose corn syrup", "caramel color"],
    healthScore: 15,
  },
  soft_drink_lemon_lime: {
    id: "soft_drink_lemon_lime",
    name: "Soft Drinks - Lemon-Lime",
    calories: 140,
    protein: 0,
    sugar: 38,
    additives: ["high fructose corn syrup", "natural flavor"],
    healthScore: 20,
  },
};

// Additives information with disadvantages
const ADDITIVES_INFO: Record<string, string> = {
  "high fructose corn syrup": "Can cause blood sugar spikes and liver damage",
  "artificial sweetener": "May disrupt gut bacteria and metabolism",
  "caramel color": "Linked to potential cancer risk in animal studies",
  "artificial flavor": "May cause headaches and allergic reactions",
  "emulsifier": "Can damage intestinal lining and cause inflammation",
  "preservative": "May increase risk of heart disease",
  "sodium phosphate": "Excessive sodium can raise blood pressure",
  "dough conditioner": "May contain harmful chemicals",
  "trans fat": "Increases bad cholesterol and heart disease risk",
  "sodium": "Excess intake linked to high blood pressure",
  "natural flavor": "Often contains hidden additives and chemicals",
};

// Barcode Database - maps UPC/EAN codes to food items
const BARCODE_DATABASE: Record<string, MealItem> = {
  "5901234123457": { // Sample Cola Soft Drink
    id: "soft_drink_cola",
    name: "Soft Drinks - Cola (12oz)",
    calories: 140,
    protein: 0,
    sugar: 39,
    additives: ["high fructose corn syrup", "caramel color"],
    healthScore: 15,
  },
  "5901234567890": { // Sample Apple
    id: "barcode_apple",
    name: "Organic Apple (Whole Foods)",
    calories: 95,
    protein: 0.5,
    sugar: 19,
    additives: [],
    healthScore: 95,
  },
  "5051234567890": { // Sample Banana
    id: "barcode_banana",
    name: "Fresh Banana",
    calories: 105,
    protein: 1.3,
    sugar: 27,
    additives: [],
    healthScore: 90,
  },
  "4006381333931": { // Sample Greek Yogurt
    id: "barcode_yogurt",
    name: "Plain Greek Yogurt (7oz)",
    calories: 100,
    protein: 17,
    sugar: 7,
    additives: [],
    healthScore: 88,
  },
  "4011999999999": { // Sample Broccoli
    id: "barcode_broccoli",
    name: "Fresh Broccoli Bunch",
    calories: 34,
    protein: 2.8,
    sugar: 2.2,
    additives: [],
    healthScore: 98,
  },
  "5000230110627": { // Sample Salmon
    id: "barcode_salmon",
    name: "Wild Salmon Fillet",
    calories: 280,
    protein: 25,
    sugar: 0,
    additives: [],
    healthScore: 95,
  },
  "5449000050127": { // Sample Lemon-Lime Soft Drink
    id: "soft_drink_lemon_lime",
    name: "Soft Drinks - Lemon-Lime (12oz)",
    calories: 140,
    protein: 0,
    sugar: 38,
    additives: ["high fructose corn syrup", "natural flavor"],
    healthScore: 20,
  },
  "4006885006113": { // Sample Chocolate
    id: "barcode_chocolate",
    name: "Chocolate Truffles",
    calories: 250,
    protein: 3,
    sugar: 27,
    additives: ["artificial flavor", "emulsifier"],
    healthScore: 35,
  },
};

// Sample barcodes for demo - user can copy these to test
export const SAMPLE_BARCODES = [
  { barcode: "5901234123457", name: "Soft Drinks - Cola" },
  { barcode: "5901234567890", name: "Apple" },
  { barcode: "5051234567890", name: "Banana" },
  { barcode: "4006381333931", name: "Greek Yogurt" },
  { barcode: "4011999999999", name: "Broccoli" },
  { barcode: "5000230110627", name: "Salmon" },
  { barcode: "5449000050127", name: "Soft Drinks - Lemon-Lime" },
  { barcode: "4006885006113", name: "Chocolate Truffles" },
];

const calculateGrade = (healthScore: number, sugar: number, additives: number): string => {
  let score = healthScore;
  
  // Deduct points for high sugar
  if (sugar > 25) score -= 20;
  else if (sugar > 15) score -= 10;
  
  // Deduct points for additives
  if (additives > 3) score -= 15;
  else if (additives > 0) score -= 5;
  
  if (score >= 85) return "A";
  if (score >= 70) return "B";
  if (score >= 55) return "C";
  if (score >= 40) return "D";
  return "F";
};

const getGradeColor = (grade: string) => {
  switch (grade) {
    case "A": return "from-green-500 to-emerald-600";
    case "B": return "from-lime-500 to-green-600";
    case "C": return "from-yellow-500 to-amber-600";
    case "D": return "from-orange-500 to-red-600";
    case "F": return "from-red-500 to-red-700";
    default: return "from-gray-500 to-gray-600";
  }
};

const FoodNutritionTracker = ({ onBack }: FoodNutritionTrackerProps) => {
  const [meals, setMeals] = useState<TrackedMeal[]>([]);
  const [currentMealItems, setCurrentMealItems] = useState<MealItem[]>([]);
  const [mealName, setMealName] = useState("My Meal");
  const [searchQuery, setSearchQuery] = useState("");
  const [barcodeInput, setBarcodeInput] = useState("");
  const [barcodeMessage, setBarcodeMessage] = useState("");
  const [showFoodDatabase, setShowFoodDatabase] = useState(false);
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [showSampleBarcodes, setShowSampleBarcodes] = useState(false);
  const characterData = ANIME_CHARACTERS.tanjiro;

  const filteredFoods = Object.values(FOOD_DATABASE).filter(food =>
    food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addFoodToMeal = (food: MealItem) => {
    setCurrentMealItems([...currentMealItems, { ...food, id: `${food.id}-${Date.now()}` }]);
    setSearchQuery("");
  };

  const scanBarcode = (barcode: string) => {
    const product = BARCODE_DATABASE[barcode];
    if (product) {
      addFoodToMeal(product);
      setBarcodeMessage(`✅ Added: ${product.name}`);
      setBarcodeInput("");
      setTimeout(() => setBarcodeMessage(""), 3000);
    } else {
      setBarcodeMessage(`❌ Barcode not found: ${barcode}`);
      setTimeout(() => setBarcodeMessage(""), 3000);
    }
  };

  const handleBarcodeKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && barcodeInput.trim()) {
      scanBarcode(barcodeInput.trim());
    }
  };

  const removeFoodFromMeal = (id: string) => {
    setCurrentMealItems(currentMealItems.filter(item => item.id !== id));
  };

  const saveMeal = () => {
    if (currentMealItems.length === 0) return;

    const totalCalories = currentMealItems.reduce((sum, item) => sum + item.calories, 0);
    const totalSugar = currentMealItems.reduce((sum, item) => sum + item.sugar, 0);
    const allAdditives = new Set(currentMealItems.flatMap(item => item.additives));
    const avgHealthScore = 
      currentMealItems.reduce((sum, item) => sum + item.healthScore, 0) / 
      currentMealItems.length;

    const grade = calculateGrade(avgHealthScore, totalSugar, allAdditives.size);

    const newMeal: TrackedMeal = {
      id: `meal-${Date.now()}`,
      name: mealName,
      items: currentMealItems,
      totalCalories,
      overallGrade: grade,
      timestamp: new Date(),
    };

    setMeals([newMeal, ...meals]);
    setCurrentMealItems([]);
    setMealName("My Meal");
    setShowFoodDatabase(false);
  };

  const deleteMeal = (id: string) => {
    setMeals(meals.filter(meal => meal.id !== id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-background pb-20"
    >
      {/* Header */}
      <header 
        className="sticky top-0 bg-background/95 backdrop-blur-lg z-40 px-4 py-3 border-b transition-colors"
        style={{ borderColor: characterData.color + "40" }}
      >
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.button>
          <div className="flex-1">
            <h2 className="font-display font-bold text-foreground">🍽️ Nutrition Tracker</h2>
            <p className="text-xs text-muted-foreground">Track your meals and get grades</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Current Meal Builder */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-4 border transition-colors"
          style={{ borderColor: characterData.color + "60", backgroundColor: characterData.color + "20" }}
        >
          <h3 className="font-display font-bold text-foreground mb-3">Build Your Meal</h3>
          
          <input
            type="text"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
            placeholder="Meal name..."
            className="w-full px-3 py-2 rounded-lg bg-background text-foreground border border-border mb-3 text-sm"
          />

          {/* Add Food Button */}
          <div className="flex gap-2 mb-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFoodDatabase(!showFoodDatabase)}
              className="flex-1 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-lg font-semibold"
            >
              <Plus className="w-4 h-4 inline mr-2" />
              Browse Foods
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowBarcodeScanner(!showBarcodeScanner)}
              className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
            >
              <Barcode className="w-4 h-4 inline mr-2" />
              Scan
            </motion.button>
          </div>

          {/* Barcode Scanner */}
          <AnimatePresence>
            {showBarcodeScanner && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-3 space-y-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 p-3"
              >
                <div>
                  <p className="text-xs font-semibold text-cyan-700 mb-2">📱 Barcode Scanner</p>
                  <input
                    type="text"
                    value={barcodeInput}
                    onChange={(e) => setBarcodeInput(e.target.value)}
                    onKeyPress={handleBarcodeKeyPress}
                    placeholder="Scan or paste barcode... (press Enter)"
                    autoFocus
                    className="w-full px-3 py-2 rounded-lg bg-background text-foreground border border-border text-sm font-mono"
                  />
                </div>

                {barcodeMessage && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs font-semibold text-cyan-700"
                  >
                    {barcodeMessage}
                  </motion.p>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowSampleBarcodes(!showSampleBarcodes)}
                  className="text-xs text-cyan-700 hover:text-cyan-600 font-semibold"
                >
                  {showSampleBarcodes ? "Hide Sample Barcodes" : "Show Sample Barcodes"}
                </motion.button>

                {showSampleBarcodes && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-1 mt-2 max-h-40 overflow-y-auto"
                  >
                    <p className="text-xs text-muted-foreground font-semibold mb-2">Try these barcodes:</p>
                    {SAMPLE_BARCODES.map((item) => (
                      <motion.button
                        key={item.barcode}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          setBarcodeInput(item.barcode);
                          scanBarcode(item.barcode);
                        }}
                        className="w-full text-left text-xs px-2 py-1 rounded bg-card hover:bg-muted transition-colors flex items-center justify-between group"
                      >
                        <span>{item.name}</span>
                        <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Food Database Search */}
          <AnimatePresence>
            {showFoodDatabase && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-3 space-y-2"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search foods..."
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-background text-foreground border border-border text-sm"
                  />
                </div>
                <div className="max-h-48 overflow-y-auto space-y-1">
                  {filteredFoods.map((food) => (
                    <motion.button
                      key={food.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => addFoodToMeal(food)}
                      className="w-full text-left px-3 py-2 rounded-lg bg-card hover:bg-muted transition-colors text-sm"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">{food.name}</span>
                        <span className="text-xs text-muted-foreground">{food.calories} cal</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Current Meal Items */}
          {currentMealItems.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground">Foods Added:</p>
              {currentMealItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-card rounded-lg p-2">
                  <div className="flex-1 text-sm">
                    <p className="font-semibold text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.calories} cal • {item.protein}g protein</p>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFoodFromMeal(item.id)}
                    className="ml-2 p-1 hover:bg-muted rounded"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </motion.button>
                </div>
              ))}
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={saveMeal}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-semibold mt-3"
              >
                ✓ Save Meal
              </motion.button>
            </div>
          )}
        </motion.div>

        {/* Meal History */}
        {meals.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-display font-bold text-foreground">📋 Your Meals</h3>
            {meals.map((meal, idx) => {
              const totalCalories = meal.items.reduce((sum, item) => sum + item.calories, 0);
              const totalSugar = meal.items.reduce((sum, item) => sum + item.sugar, 0);
              const allAdditives = new Set(meal.items.flatMap(item => item.additives));

              return (
                <motion.div
                  key={meal.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-card rounded-xl p-4 shadow-card border border-border"
                >
                  {/* Grade Display */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-display font-bold text-foreground">{meal.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {meal.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`bg-gradient-to-br ${getGradeColor(meal.overallGrade)} rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0`}
                    >
                      <span className="font-display text-2xl font-bold text-white">
                        {meal.overallGrade}
                      </span>
                    </motion.div>
                  </div>

                  {/* Nutrition Summary */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="bg-muted rounded-lg p-2 text-center">
                      <p className="text-xs text-muted-foreground">Calories</p>
                      <p className="font-bold text-foreground">{totalCalories}</p>
                    </div>
                    <div className="bg-muted rounded-lg p-2 text-center">
                      <p className="text-xs text-muted-foreground">Sugar</p>
                      <p className="font-bold text-foreground">{Math.round(totalSugar)}g</p>
                    </div>
                    <div className="bg-muted rounded-lg p-2 text-center">
                      <p className="text-xs text-muted-foreground">Protein</p>
                      <p className="font-bold text-foreground">
                        {Math.round(meal.items.reduce((sum, item) => sum + item.protein, 0))}g
                      </p>
                    </div>
                  </div>

                  {/* Foods in Meal */}
                  <div className="mb-3 space-y-1">
                    {meal.items.map((item) => (
                      <p key={item.id} className="text-xs text-muted-foreground">
                        • {item.name}
                      </p>
                    ))}
                  </div>

                  {/* Alerts */}
                  {(totalSugar > 50 || allAdditives.size > 0) && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="rounded-lg bg-orange-500/10 border border-orange-500/30 p-3 mb-3 space-y-2"
                    >
                      <div className="flex gap-2 items-start">
                        <AlertCircle className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        <div className="flex-1 text-xs text-orange-700 space-y-1">
                          {totalSugar > 50 && (
                            <p>⚠️ High sugar content ({Math.round(totalSugar)}g)</p>
                          )}
                          {allAdditives.size > 0 && (
                            <div>
                              <p className="font-semibold mb-1">⚠️ Additives detected:</p>
                              <div className="space-y-1 ml-2">
                                {Array.from(allAdditives).map((additive) => (
                                  <div key={additive} className="text-xs">
                                    <p className="font-semibold text-orange-800">• {additive}</p>
                                    <p className="text-orange-700 ml-3">{ADDITIVES_INFO[additive] || "Unknown additive"}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Positive Feedback */}
                  {meal.overallGrade === "A" || meal.overallGrade === "B" ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="rounded-lg bg-green-500/10 border border-green-500/30 p-2 mb-3"
                    >
                      <div className="flex gap-2 items-center">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <p className="text-xs text-green-700">
                          {meal.overallGrade === "A"
                            ? "🌟 Excellent nutrition choice!"
                            : "✅ Good balanced meal!"}
                        </p>
                      </div>
                    </motion.div>
                  ) : null}

                  {/* Delete Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => deleteMeal(meal.id)}
                    className="w-full text-xs text-destructive hover:bg-destructive/10 px-2 py-1 rounded transition-colors"
                  >
                    Delete
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {meals.length === 0 && currentMealItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-3xl mb-3">🍽️</p>
            <p className="text-muted-foreground">Start by adding foods to track your nutrition!</p>
          </motion.div>
        )}

        {/* Grade Legend */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-4 shadow-card border border-border"
        >
          <h3 className="font-display font-bold text-foreground mb-3">📊 Grade System</h3>
          <div className="space-y-2 text-sm">
            <p><span className="font-bold text-green-600">A</span> - Excellent nutrition (85+)</p>
            <p><span className="font-bold text-lime-600">B</span> - Good nutrition (70-84)</p>
            <p><span className="font-bold text-yellow-600">C</span> - Fair nutrition (55-69)</p>
            <p><span className="font-bold text-orange-600">D</span> - Poor nutrition (40-54)</p>
            <p><span className="font-bold text-red-600">F</span> - Very unhealthy (&lt;40)</p>
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default FoodNutritionTracker;
