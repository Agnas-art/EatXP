import { motion } from "framer-motion";
import { ArrowLeft, Leaf, Thermometer } from "lucide-react";
import { useState } from "react";
import { ANIME_CHARACTERS } from "../data/animeCharacters";

interface SeasonalProduceProps {
  onBack: () => void;
}

// Seasonal produce data organized by season
const SEASONAL_PRODUCE = {
  spring: {
    season: "Spring 🌸",
    color: "#FF69B4",
    description: "Fresh growth after winter! Enjoy vibrant greens and light vegetables.",
    items: [
      {
        name: "Strawberries",
        emoji: "🍓",
        benefits: ["Vitamin C boost", "Sweet & juicy"],
        funFact: "Strawberries have their seeds on the outside!",
      },
      {
        name: "Asparagus",
        emoji: "🌱",
        benefits: ["Super nutrients", "Crunchy texture"],
        funFact: "Asparagus can grow up to 10 inches in a day!",
      },
      {
        name: "Peas",
        emoji: "💚",
        benefits: ["Protein power", "Sweet taste"],
        funFact: "Peas were one of the first frozen vegetables!",
      },
      {
        name: "Spinach",
        emoji: "🥬",
        benefits: ["Iron rich", "Super strength"],
        funFact: "Spinach contains oxalates that can coat your teeth!",
      },
    ],
  },
  summer: {
    season: "Summer ☀️",
    color: "#FFD700",
    description: "Peak season! Enjoy colorful fruits and refreshing vegetables.",
    items: [
      {
        name: "Watermelon",
        emoji: "🍉",
        benefits: ["Stay hydrated", "Natural coolness"],
        funFact: "Watermelon is 92% water!",
      },
      {
        name: "Tomato",
        emoji: "🍅",
        benefits: ["Heart healthy", "Juicy goodness"],
        funFact: "Tomatoes are technically berries, not vegetables!",
      },
      {
        name: "Corn",
        emoji: "🌽",
        benefits: ["Energy boost", "Sweet kernels"],
        funFact: "Each corn cob has about 800 kernels!",
      },
      {
        name: "Blueberries",
        emoji: "🫐",
        benefits: ["Brain boost", "Antioxidants"],
        funFact: "Blueberries are the only food that's naturally blue!",
      },
    ],
  },
  autumn: {
    season: "Autumn 🍂",
    color: "#FF8C00",
    description: "Harvest time! Enjoy warm, comforting fruits and vegetables.",
    items: [
      {
        name: "Pumpkin",
        emoji: "🎃",
        benefits: ["Vitamin A power", "Warm comfort"],
        funFact: "Pumpkins are 90% water!",
      },
      {
        name: "Apple",
        emoji: "🍎",
        benefits: ["Fiber rich", "Crispy crunch"],
        funFact: "It takes 36 apples to make one gallon of apple juice!",
      },
      {
        name: "Grape",
        emoji: "🍇",
        benefits: ["Antioxidants", "Sweet clusters"],
        funFact: "Grapes have been grown for over 8000 years!",
      },
      {
        name: "Carrot",
        emoji: "🥕",
        benefits: ["Eye health", "Natural sweetness"],
        funFact: "Orange carrots weren't popular until the 1600s!",
      },
    ],
  },
  winter: {
    season: "Winter ❄️",
    color: "#87CEEB",
    description: "Hearty choices! Root vegetables and citrus keep you healthy.",
    items: [
      {
        name: "Orange",
        emoji: "🍊",
        benefits: ["Vitamin C", "Citrus brightness"],
        funFact: "Oranges were originally green!",
      },
      {
        name: "Broccoli",
        emoji: "🥦",
        benefits: ["Immune boost", "Tree-shaped yum"],
        funFact: "Broccoli is technically a flower!",
      },
      {
        name: "Potato",
        emoji: "🥔",
        benefits: ["Energy fuel", "Versatile veggie"],
        funFact: "Potatoes were the first vegetable to be grown in space!",
      },
      {
        name: "Kale",
        emoji: "🥬",
        benefits: ["Super nutrient", "Leafy power"],
        funFact: "Kale is packed with more nutrients than most vegetables!",
      },
    ],
  },
};

const SeasonalProduce = ({ onBack }: SeasonalProduceProps) => {
  const [selectedSeason, setSelectedSeason] = useState<keyof typeof SEASONAL_PRODUCE>("spring");
  const characterData = ANIME_CHARACTERS.tanjiro;

  const currentSeason = SEASONAL_PRODUCE[selectedSeason];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-background pb-20"
    >
      {/* Header */}
      <header 
        className="sticky top-0 bg-background/95 backdrop-blur-lg z-40 px-4 py-3 border-b transition-colors"
        style={{ borderColor: currentSeason.color + "40" }}
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
            <h2 className="font-display font-bold text-foreground">🌿 Seasonal Produce</h2>
            <p className="text-xs text-muted-foreground">
              Eat what's fresh and in season!
            </p>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Season Info Card */}
        <motion.div
          key={selectedSeason}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-4 border transition-all"
          style={{ 
            borderColor: currentSeason.color + "60", 
            backgroundColor: currentSeason.color + "20" 
          }}
        >
          <div className="flex items-start gap-3">
            <Leaf style={{ color: currentSeason.color }} className="w-6 h-6 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-display font-bold text-lg text-foreground">
                {currentSeason.season}
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                {currentSeason.description}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Season Selector */}
        <div className="space-y-3">
          <h3 className="font-display font-bold text-foreground text-sm">Choose a Season:</h3>
          <div className="grid grid-cols-4 gap-2">
            {(Object.keys(SEASONAL_PRODUCE) as Array<keyof typeof SEASONAL_PRODUCE>).map((season) => (
              <motion.button
                key={season}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedSeason(season)}
                className={`py-3 rounded-lg font-semibold transition-all border-2 text-sm ${
                  selectedSeason === season
                    ? "text-white shadow-lg"
                    : "bg-card text-foreground hover:bg-muted"
                }`}
                style={
                  selectedSeason === season
                    ? {
                        backgroundColor: SEASONAL_PRODUCE[season].color,
                        borderColor: SEASONAL_PRODUCE[season].color,
                      }
                    : {}
                }
              >
                {SEASONAL_PRODUCE[season].season.split(" ")[0]}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Produce Grid */}
        <div className="space-y-3">
          <h3 className="font-display font-bold text-foreground">Fresh Picks</h3>
          <div className="grid grid-cols-1 gap-3">
            {currentSeason.items.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card rounded-xl p-4 shadow-card border transition-colors hover:shadow-lg cursor-pointer group"
                style={{ borderColor: currentSeason.color + "40" }}
              >
                <div className="flex items-start gap-4">
                  <div className="text-5xl flex-shrink-0 group-hover:scale-110 transition-transform">
                    {item.emoji}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-display font-bold text-foreground text-lg">
                      {item.name}
                    </h4>
                    <div className="mt-3 space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {item.benefits.map((benefit, bidx) => (
                          <span
                            key={bidx}
                            className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white"
                            style={{ backgroundColor: currentSeason.color }}
                          >
                            ✨ {benefit}
                          </span>
                        ))}
                      </div>
                      <div className="mt-3 p-3 rounded-lg bg-muted/30">
                        <p className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-lg">💡</span>
                          <span>{item.funFact}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-2xl p-4 shadow-card border transition-colors"
          style={{ borderColor: characterData.color + "40", backgroundColor: characterData.color + "10" }}
        >
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Thermometer style={{ color: characterData.color }} className="w-5 h-5 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-display font-bold text-foreground mb-2">Why Eat Seasonal?</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✅ More flavorful and nutritious</li>
                  <li>✅ Fresher from farm to table</li>
                  <li>✅ Better for the environment</li>
                  <li>✅ Often more affordable</li>
                  <li>✅ Supports local farmers</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default SeasonalProduce;
