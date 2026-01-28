import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, Globe } from "lucide-react";
import { worldPantryData, getAllCountries } from "@/data/worldPantryData";

interface WorldPantryProps {
  onBack: () => void;
}

// Country positions for interactive map (approximate grid positions)
const countryMapPositions: Record<string, { x: number; y: number }> = {
  Japan: { x: 85, y: 35 },
  India: { x: 50, y: 45 },
  Mexico: { x: 20, y: 50 },
  Italy: { x: 50, y: 35 },
  Thailand: { x: 65, y: 50 },
  Nigeria: { x: 50, y: 65 },
  Peru: { x: 25, y: 70 },
  Greece: { x: 55, y: 40 },
  "South Korea": { x: 80, y: 32 },
};

export const WorldPantry = ({ onBack }: WorldPantryProps) => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"map" | "list">("map");

  const countries = getAllCountries();
  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCuisine = selectedCountry
    ? worldPantryData.find((c) => c.country === selectedCountry)
    : null;

  if (selectedCuisine) {
    return (
      <div className="fixed inset-0 bg-background z-50 overflow-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pt-4">
            <button
              onClick={() => setSelectedCountry(null)}
              className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <span className="text-3xl">{selectedCuisine.flag}</span>
              {selectedCuisine.country}
            </h1>
            <div className="w-12" />
          </div>

          {/* Staple Food Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 mb-6 border border-primary/20"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-5xl">{selectedCuisine.emoji}</span>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  {selectedCuisine.stapleFood}
                </h2>
                <p className="text-muted-foreground">National staple</p>
              </div>
            </div>
          </motion.div>

          {/* Traditional Meals */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Traditional Meals 🍽️
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {selectedCuisine.traditionalMeals.map((meal, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-card rounded-lg p-3 text-center font-medium text-sm border border-border hover:border-primary/50 transition-colors"
                >
                  {meal}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Health Benefits */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Health Benefits 💚
            </h3>
            <div className="grid gap-3">
              {selectedCuisine.healthBenefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center gap-3 bg-card p-3 rounded-lg border border-green-500/30"
                >
                  <span className="text-xl">✅</span>
                  <span className="text-foreground">{benefit}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Staple Ingredients */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Staple Ingredients 🥘
            </h3>
            <div className="grid gap-4">
              {selectedCuisine.stapleIngredients.map((ingredient, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-card rounded-lg p-4 border border-border hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{ingredient.emoji}</span>
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground text-lg">
                        {ingredient.name}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {ingredient.category}
                      </p>
                      <p className="text-foreground mb-3">
                        {ingredient.description}
                      </p>

                      <div className="mb-3">
                        <p className="text-xs font-semibold text-primary mb-2">
                          Nutrients:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {ingredient.nutrients.map((nutrient, nIdx) => (
                            <span
                              key={nIdx}
                              className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                            >
                              {nutrient}
                            </span>
                          ))}
                        </div>
                      </div>

                      <p className="text-sm text-accent italic">
                        🏛️ {ingredient.culturalSignificance}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4"
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
          <h1 className="text-2xl font-bold text-foreground">🌍 World Pantry</h1>
          <div className="w-12" />
        </div>

        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6 mb-8 border border-primary/20 text-center"
        >
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Explore Global Cuisine
          </h2>
          <p className="text-muted-foreground">
            Click on countries in the map or list to discover staple foods and traditional meals
          </p>
        </motion.div>

        {/* View Mode Toggle */}
        <div className="flex gap-2 mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode("map")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors
              ${
                viewMode === "map"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground hover:bg-secondary/10"
              }`}
          >
            <Globe className="w-5 h-5" />
            Map View
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors
              ${
                viewMode === "list"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-foreground hover:bg-secondary/10"
              }`}
          >
            <Search className="w-5 h-5" />
            List View
          </motion.button>
        </div>

        {/* MAP VIEW */}
        {viewMode === "map" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            {/* Interactive World Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-full bg-gradient-to-b from-blue-200/20 to-blue-100/20 rounded-2xl border-2 border-primary/30 p-8 mb-6 aspect-video"
            >
              {/* Map Background */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-100/30 via-cyan-50/20 to-teal-100/20" />

              {/* Country Markers */}
              <div className="relative w-full h-full">
                {countries.map((country, idx) => {
                  const position = countryMapPositions[country];
                  if (!position) return null;

                  const cuisine = worldPantryData.find((c) => c.country === country);

                  return (
                    <motion.button
                      key={country}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedCountry(country)}
                      style={{
                        left: `${position.x}%`,
                        top: `${position.y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      className="absolute flex flex-col items-center group cursor-pointer"
                    >
                      {/* Glow effect on hover */}
                      <motion.div
                        whileHover={{ scale: 1.3 }}
                        className="absolute w-12 h-12 rounded-full bg-primary/20 -z-10 group-hover:bg-primary/40 transition-colors"
                      />

                      {/* Country Emoji Button */}
                      <motion.div
                        whileHover={{ rotate: 10 }}
                        className="text-4xl p-2 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 border-2 border-primary/50 group-hover:border-primary transition-all"
                      >
                        {cuisine?.emoji}
                      </motion.div>

                      {/* Tooltip */}
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        className="absolute -top-12 bg-card border border-primary/50 rounded-lg px-3 py-2 text-xs font-bold text-foreground whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                      >
                        {country}
                      </motion.div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Map Instructions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-4 left-4 text-xs text-muted-foreground bg-background/50 backdrop-blur px-3 py-2 rounded-lg"
              >
                👆 Click on country emoji to explore
              </motion.div>
            </motion.div>

            {/* Search for Map View */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Quick Country Buttons */}
            {searchTerm && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"
              >
                <AnimatePresence>
                  {filteredCountries.map((country, idx) => {
                    const cuisine = worldPantryData.find((c) => c.country === country);
                    return (
                      <motion.button
                        key={country}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedCountry(country)}
                        className="p-2 rounded-lg bg-card border border-border hover:border-primary/50 transition-all text-center"
                      >
                        <div className="text-2xl mb-1">{cuisine?.flag}</div>
                        <p className="text-xs font-semibold text-foreground">{country}</p>
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* LIST VIEW */}
        {viewMode === "list" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            {/* Search */}
            <div className="mb-6 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Countries Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <AnimatePresence>
                {filteredCountries.map((country, idx) => {
                  const cuisine = worldPantryData.find((c) => c.country === country);
                  return (
                    <motion.button
                      key={country}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: idx * 0.05 }}
                      onClick={() => setSelectedCountry(country)}
                      className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-card to-card/50 border border-border hover:border-primary/50 p-4 transition-all duration-300 hover:scale-105"
                    >
                      {/* Background gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Content */}
                      <div className="relative text-center">
                        <div className="text-4xl mb-2">{cuisine?.flag}</div>
                        <h3 className="font-bold text-foreground mb-1">{country}</h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          {cuisine?.stapleFood}
                        </p>
                        <span className="text-2xl">{cuisine?.emoji}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>

            {filteredCountries.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-muted-foreground text-lg">
                  No countries found matching your search
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default WorldPantry;
