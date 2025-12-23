import { motion } from "framer-motion";
import { Cloud, Sun, CloudRain, Snowflake, Wind, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface WeatherData {
  condition: "sunny" | "cloudy" | "rainy" | "snowy" | "windy";
  temperature: number;
  location: string;
  country: string;
}

interface FoodSuggestion {
  food: string;
  emoji: string;
  reason: string;
  recipe?: string;
}

const getWeatherFoods = (t: any): Record<string, FoodSuggestion[]> => ({
  sunny: [
    { food: t("weather_section.watermelon"), emoji: "🍉", reason: t("weather_section.sunny"), recipe: "Watermelon Pops" },
    { food: t("weather_section.ice_cream"), emoji: "🍦", reason: "A refreshing treat!", recipe: "Frozen Yogurt Bites" },
    { food: t("weather_section.salad"), emoji: "🥗", reason: "Light and fresh!", recipe: "Rainbow Salad" },
  ],
  cloudy: [
    { food: t("weather_section.sandwich"), emoji: "🥪", reason: t("weather_section.cloudy"), recipe: "Veggie Club" },
    { food: t("weather_section.smoothie"), emoji: "🥤", reason: "Boost your energy!", recipe: "Berry Blast Smoothie" },
    { food: t("weather_section.pasta"), emoji: "🍝", reason: "Comfort food time!", recipe: "Veggie Pasta" },
  ],
  rainy: [
    { food: t("weather_section.hot_soup"), emoji: "🍜", reason: t("weather_section.rainy"), recipe: "Vegetable Soup" },
    { food: t("weather_section.hot_cocoa"), emoji: "☕", reason: "Cozy drink for rainy days!", recipe: "Healthy Hot Cocoa" },
    { food: t("weather_section.grilled_cheese"), emoji: "🧀", reason: "Ultimate comfort food!", recipe: "Cheesy Delight" },
  ],
  snowy: [
    { food: t("weather_section.hot_oatmeal"), emoji: "🥣", reason: t("weather_section.snowy"), recipe: "Apple Cinnamon Oatmeal" },
    { food: "Stew", emoji: "🥘", reason: "Hearty and warming!", recipe: "Veggie Stew" },
    { food: t("weather_section.baked_potato"), emoji: "🥔", reason: "Filling and delicious!", recipe: "Loaded Baked Potato" },
  ],
  windy: [
    { food: t("weather_section.energy_bars"), emoji: "🍫", reason: t("weather_section.windy"), recipe: "Homemade Granola Bars" },
    { food: t("weather_section.warm_milk"), emoji: "🥛", reason: "Soothing and nutritious!", recipe: "Golden Milk" },
    { food: t("weather_section.rice_bowl"), emoji: "🍚", reason: "Filling and grounding!", recipe: "Teriyaki Rice Bowl" },
  ],
});

const weatherIcons = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
  snowy: Snowflake,
  windy: Wind,
};

const weatherColors = {
  sunny: "from-kawaii-yellow to-primary",
  cloudy: "from-muted to-kawaii-blue/50",
  rainy: "from-kawaii-blue to-kawaii-purple",
  snowy: "from-white to-kawaii-blue/30",
  windy: "from-kawaii-mint to-kawaii-blue",
};

const WeatherFoodSuggestion = () => {
  const { t } = useTranslation();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFood, setSelectedFood] = useState<FoodSuggestion | null>(null);

  useEffect(() => {
    // Simulate getting location and weather
    const getWeatherData = async () => {
      setLoading(true);
      
      // Try to get user's location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // Simulate weather based on time and random factors
            const hour = new Date().getHours();
            const conditions: WeatherData["condition"][] = ["sunny", "cloudy", "rainy", "snowy", "windy"];
            let condition: WeatherData["condition"];
            
            // More realistic weather simulation
            if (hour >= 6 && hour < 18) {
              condition = Math.random() > 0.5 ? "sunny" : "cloudy";
            } else {
              condition = Math.random() > 0.7 ? "rainy" : "cloudy";
            }
            
            // Simulate temperature based on latitude
            const baseTemp = 20 - Math.abs(position.coords.latitude - 40) * 0.5;
            const temp = Math.round(baseTemp + (Math.random() * 10 - 5));
            
            if (temp < 5) condition = "snowy";
            if (temp > 30) condition = "sunny";
            
            setWeather({
              condition,
              temperature: temp,
              location: "Your Area",
              country: "Local",
            });
            setLoading(false);
          },
          () => {
            // Default weather if location denied
            setWeather({
              condition: "sunny",
              temperature: 22,
              location: "Unknown",
              country: "World",
            });
            setLoading(false);
          }
        );
      } else {
        setWeather({
          condition: "sunny",
          temperature: 22,
          location: "Unknown",
          country: "World",
        });
        setLoading(false);
      }
    };

    getWeatherData();
  }, []);

  if (loading) {
    return (
      <div className="bg-card rounded-3xl p-6 shadow-card animate-pulse">
        <div className="h-20 bg-muted rounded-xl" />
      </div>
    );
  }

  if (!weather) return null;

  const WeatherIcon = weatherIcons[weather.condition];
  const weatherFoods = getWeatherFoods(t);
  const suggestions = weatherFoods[weather.condition];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Weather Card */}
      <div className={`bg-gradient-to-br ${weatherColors[weather.condition]} rounded-3xl p-5 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl" />
        
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-foreground/70 text-sm mb-1">
              <MapPin className="w-4 h-4" />
              <span>{weather.location}</span>
            </div>
            <p className="font-display text-3xl font-bold text-foreground">
              {weather.temperature}°C
            </p>
            <p className="text-foreground/80 capitalize font-medium">
              {weather.condition}
            </p>
          </div>
          
          <motion.div
            animate={{ 
              y: [0, -5, 0],
              rotate: weather.condition === "windy" ? [0, 10, -10, 0] : 0
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <WeatherIcon className="w-16 h-16 text-foreground/80" />
          </motion.div>
        </div>
      </div>

      {/* Food Suggestions */}
      <div>
        <h4 className="font-display font-bold text-foreground mb-3">
          🍽️ {t("weather_section.title")}
        </h4>
        <div className="grid grid-cols-3 gap-2">
          {suggestions.map((food, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedFood(food)}
              className={`bg-card rounded-2xl p-3 shadow-card text-center ${
                selectedFood?.food === food.food ? "ring-2 ring-primary" : ""
              }`}
            >
              <motion.span
                className="text-3xl block mb-1"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              >
                {food.emoji}
              </motion.span>
              <p className="text-xs font-semibold text-foreground">{food.food}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Selected Food Detail */}
      {selectedFood && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-secondary/10 rounded-2xl p-4"
        >
          <div className="flex items-start gap-3">
            <span className="text-4xl">{selectedFood.emoji}</span>
            <div>
              <p className="font-display font-bold text-foreground">{selectedFood.food}</p>
              <p className="text-sm text-muted-foreground">{selectedFood.reason}</p>
              {selectedFood.recipe && (
                <p className="text-xs text-secondary font-semibold mt-1">
                  Try: {selectedFood.recipe}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default WeatherFoodSuggestion;