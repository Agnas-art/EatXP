import { motion } from "framer-motion";
import { Cloud, Sun, CloudRain, Snowflake, Wind, MapPin, Search, Droplets, Eye, Gauge } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

interface WeatherData {
  condition: "sunny" | "cloudy" | "rainy" | "snowy" | "windy";
  temperature: number;
  location: string;
  country: string;
  humidity?: number;
  windSpeed?: number;
  visibility?: number;
  feelsLike?: number;
}

interface FoodSuggestion {
  food: string;
  emoji: string;
  reason: string;
  recipe?: string;
}

const getWeatherFoods = (t: any, temp: number): Record<string, FoodSuggestion[]> => ({
  sunny: [
    { food: t("weather_section.watermelon"), emoji: "🍉", reason: t("weather_section.sunny"), recipe: "Watermelon Pops" },
    { food: t("weather_section.ice_cream"), emoji: "🍦", reason: "A refreshing treat! Perfect on hot days!", recipe: "Frozen Yogurt Bites" },
    { food: t("weather_section.salad"), emoji: "🥗", reason: "Light and fresh! Great for sunny weather!", recipe: "Rainbow Salad" },
    ...(temp > 28 ? [{ food: "Popsicles", emoji: "🍭", reason: "Ultra refreshing for hot days!", recipe: "Fruit Popsicles" }] : []),
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
    { food: "Bread & Butter", emoji: "🍞", reason: "Warm and soothing on rainy days!", recipe: "Garlic Bread" },
  ],
  snowy: [
    { food: t("weather_section.hot_oatmeal"), emoji: "🥣", reason: t("weather_section.snowy"), recipe: "Apple Cinnamon Oatmeal" },
    { food: "Stew", emoji: "🥘", reason: "Hearty and warming!", recipe: "Veggie Stew" },
    { food: t("weather_section.baked_potato"), emoji: "🥔", reason: "Filling and delicious!", recipe: "Loaded Baked Potato" },
    { food: "Hot Chocolate", emoji: "🍫", reason: "Warming drink for cold snowy days!", recipe: "Rich Hot Chocolate" },
  ],
  windy: [
    { food: t("weather_section.energy_bars"), emoji: "🍫", reason: t("weather_section.windy"), recipe: "Homemade Granola Bars" },
    { food: t("weather_section.warm_milk"), emoji: "🥛", reason: "Soothing and nutritious!", recipe: "Golden Milk" },
    { food: t("weather_section.rice_bowl"), emoji: "🍚", reason: "Filling and grounding!", recipe: "Teriyaki Rice Bowl" },
    { food: "Nuts & Seeds", emoji: "🥜", reason: "Energy-dense for windy days!", recipe: "Trail Mix" },
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

// Real weather API integration
const fetchWeatherFromAPI = async (location: string): Promise<WeatherData | null> => {
  try {
    // Using Open-Meteo API (free, no API key required)
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1&language=en&format=json`
    );
    const geoData = await geoResponse.json();
    
    if (!geoData.results || geoData.results.length === 0) {
      return null;
    }
    
    const place = geoData.results[0];
    const latitude = place.latitude;
    const longitude = place.longitude;
    
    // Fetch weather data
    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,visibility&timezone=auto`
    );
    const weatherData = await weatherResponse.json();
    const current = weatherData.current;
    
    // Map weather codes to conditions
    const mapWeatherCode = (code: number): WeatherData["condition"] => {
      if (code === 0 || code === 1) return "sunny";
      if (code === 2 || code === 3) return "cloudy";
      if (code === 45 || code === 48) return "cloudy";
      if (code >= 50 && code <= 67) return "rainy";
      if (code >= 71 && code <= 77) return "snowy";
      if (code >= 80 && code <= 82) return "rainy";
      if (code === 85 || code === 86) return "snowy";
      if (code >= 90 && code <= 99) return "rainy";
      return "cloudy";
    };
    
    return {
      condition: mapWeatherCode(current.weather_code),
      temperature: Math.round(current.temperature_2m),
      location: place.name,
      country: place.country || "",
      humidity: current.relative_humidity_2m,
      windSpeed: Math.round(current.wind_speed_10m),
      visibility: Math.round(current.visibility / 1000), // Convert to km
      feelsLike: Math.round(current.temperature_2m - current.wind_speed_10m * 0.2), // Rough approximation
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
};

const WeatherFoodSuggestion = () => {
  const { t } = useTranslation();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFood, setSelectedFood] = useState<FoodSuggestion | null>(null);
  const [locationInput, setLocationInput] = useState("");
  const [searchError, setSearchError] = useState("");

  // Initialize with geolocation
  useEffect(() => {
    const initializeWeather = async () => {
      setLoading(true);
      
      // Try to get user's location using geolocation API
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            
            // Reverse geocoding using Open-Meteo
            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
              );
              const data = await response.json();
              const city = data.address?.city || data.address?.town || data.address?.village || "Your Area";
              
              // Now fetch weather for this location
              const weatherData = await fetchWeatherFromAPI(city);
              if (weatherData) {
                setWeather(weatherData);
                setLocationInput(city);
              } else {
                // Fallback
                setWeather({
                  condition: "sunny",
                  temperature: 22,
                  location: city,
                  country: data.address?.country || "Local",
                });
              }
            } catch (error) {
              console.error("Reverse geocoding error:", error);
              setWeather({
                condition: "sunny",
                temperature: 22,
                location: "Your Area",
                country: "Local",
              });
            }
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

    initializeWeather();
  }, []);

  const handleLocationSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!locationInput.trim()) return;
    
    setLoading(true);
    setSearchError("");
    
    const weatherData = await fetchWeatherFromAPI(locationInput);
    if (weatherData) {
      setWeather(weatherData);
      setSelectedFood(null);
    } else {
      setSearchError(`Could not find weather for "${locationInput}". Please try another location.`);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="bg-card rounded-3xl p-6 shadow-card">
        <div className="space-y-4 animate-pulse">
          <div className="h-20 bg-muted rounded-xl" />
          <div className="h-10 bg-muted rounded-lg" />
          <div className="h-24 bg-muted rounded-xl" />
        </div>
      </div>
    );
  }

  if (!weather) return null;

  const WeatherIcon = weatherIcons[weather.condition];
  const weatherFoods = getWeatherFoods(t, weather.temperature);
  const suggestions = weatherFoods[weather.condition];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Location Search */}
      <form onSubmit={handleLocationSearch} className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={locationInput}
            onChange={(e) => {
              setLocationInput(e.target.value);
              setSearchError("");
            }}
            placeholder="Search location..."
            className="w-full px-4 py-2.5 rounded-2xl bg-card border-2 border-primary/20 focus:border-primary outline-none text-foreground placeholder:text-muted-foreground transition-all"
          />
          <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="gap-2 rounded-2xl"
        >
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline">Search</span>
        </Button>
      </form>

      {searchError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border-2 border-red-200 rounded-2xl p-3 text-sm text-red-700"
        >
          {searchError}
        </motion.div>
      )}

      {/* Weather Card */}
      <motion.div
        key={weather.location}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`bg-gradient-to-br ${weatherColors[weather.condition]} rounded-3xl p-5 relative overflow-hidden`}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-3xl" />
        
        <div className="relative space-y-4">
          {/* Main Weather Info */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 text-foreground/70 text-sm mb-2">
                <MapPin className="w-4 h-4" />
                <span className="font-semibold">{weather.location}</span>
                {weather.country && <span className="text-xs">• {weather.country}</span>}
              </div>
              <p className="font-display text-4xl font-bold text-foreground">
                {weather.temperature}°C
              </p>
              <p className="text-foreground/80 capitalize font-medium mt-1">
                {weather.condition.charAt(0).toUpperCase() + weather.condition.slice(1)} Weather
              </p>
              {weather.feelsLike && (
                <p className="text-xs text-foreground/70 mt-1">
                  Feels like: {weather.feelsLike}°C
                </p>
              )}
            </div>
            
            <motion.div
              animate={{ 
                y: [0, -5, 0],
                rotate: weather.condition === "windy" ? [0, 10, -10, 0] : 0
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <WeatherIcon className="w-20 h-20 text-foreground/90" />
            </motion.div>
          </div>

          {/* Additional Weather Details */}
          {(weather.humidity || weather.windSpeed || weather.visibility) && (
            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/20">
              {weather.humidity !== undefined && (
                <div className="flex items-center gap-2 text-sm">
                  <Droplets className="w-4 h-4 text-foreground/70" />
                  <div>
                    <p className="text-xs text-foreground/70">Humidity</p>
                    <p className="font-semibold text-foreground">{weather.humidity}%</p>
                  </div>
                </div>
              )}
              {weather.windSpeed !== undefined && (
                <div className="flex items-center gap-2 text-sm">
                  <Gauge className="w-4 h-4 text-foreground/70" />
                  <div>
                    <p className="text-xs text-foreground/70">Wind</p>
                    <p className="font-semibold text-foreground">{weather.windSpeed} km/h</p>
                  </div>
                </div>
              )}
              {weather.visibility !== undefined && (
                <div className="flex items-center gap-2 text-sm">
                  <Eye className="w-4 h-4 text-foreground/70" />
                  <div>
                    <p className="text-xs text-foreground/70">Visibility</p>
                    <p className="font-semibold text-foreground">{weather.visibility} km</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Food Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <h4 className="font-display font-bold text-foreground">
          🍽️ {t("weather_section.title")}
        </h4>
        <p className="text-sm text-muted-foreground">
          Perfect foods based on today's {weather.condition} weather in {weather.location}
        </p>
        <div className="grid grid-cols-3 gap-2">
          {suggestions.map((food, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedFood(food)}
              className={`bg-card rounded-2xl p-3 shadow-card text-center transition-all border-2 ${
                selectedFood?.food === food.food
                  ? "ring-2 ring-primary border-primary"
                  : "border-transparent hover:border-primary/30"
              }`}
            >
              <motion.span
                className="text-3xl block mb-1"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              >
                {food.emoji}
              </motion.span>
              <p className="text-xs font-semibold text-foreground line-clamp-2">{food.food}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Selected Food Detail */}
      {selectedFood && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-primary/10 border-2 border-primary rounded-2xl p-4 shadow-lg"
        >
          <div className="flex items-start gap-3">
            <motion.span
              className="text-4xl flex-shrink-0"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {selectedFood.emoji}
            </motion.span>
            <div className="flex-1">
              <p className="font-display font-bold text-foreground text-lg">{selectedFood.food}</p>
              <p className="text-sm text-foreground/80 mt-1">{selectedFood.reason}</p>
              {selectedFood.recipe && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-2 p-2 bg-primary/20 rounded-lg"
                >
                  <p className="text-xs text-primary font-semibold">
                    👨‍🍳 Recipe: {selectedFood.recipe}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default WeatherFoodSuggestion;