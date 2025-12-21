import { useState } from "react";
import { ChevronLeft, Lock, Unlock } from "lucide-react";
import { FOOD_REGIONS, FoodRegion } from "../data/foodKingdoms";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface FoodKingdomMapProps {
  completedChapters: string[];
  onBack: () => void;
}

export default function FoodKingdomMap({
  completedChapters,
  onBack,
}: FoodKingdomMapProps) {
  const [selectedRegion, setSelectedRegion] = useState<FoodRegion | null>(null);

  const isRegionUnlocked = (region: FoodRegion): boolean => {
    if (!region.unlockedAt) return true;
    return completedChapters.includes(region.unlockedAt);
  };

  const unlockedRegions = Object.values(FOOD_REGIONS).filter(
    isRegionUnlocked
  );
  const lockedRegions = Object.values(FOOD_REGIONS).filter(
    (r) => !isRegionUnlocked(r)
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-green-50 overflow-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-emerald-200 p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            🗺️ Food Kingdom Map
          </h1>
        </div>
      </div>

      {selectedRegion ? (
        // Region Detail View
        <div className="p-4">
          <button
            onClick={() => setSelectedRegion(null)}
            className="mb-4 p-2 hover:bg-white rounded-lg transition flex items-center gap-2 text-emerald-700"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Map
          </button>

          <Card className="bg-white border-2 border-emerald-200 overflow-hidden">
            {/* Region Header */}
            <div
              className={`bg-gradient-to-r ${selectedRegion.color} p-6 text-white`}
            >
              <div className="text-5xl mb-2">{selectedRegion.emoji}</div>
              <h2 className="text-3xl font-bold">{selectedRegion.name}</h2>
              <p className="text-white/90 mt-2">{selectedRegion.description}</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Facts */}
              <div>
                <h3 className="text-xl font-bold text-emerald-700 mb-3">
                  🔍 Fun Facts
                </h3>
                <div className="space-y-2">
                  {selectedRegion.facts.map((fact, idx) => (
                    <div
                      key={idx}
                      className="flex gap-2 p-3 bg-emerald-50 rounded-lg border border-emerald-200"
                    >
                      <span className="text-emerald-600">✨</span>
                      <p className="text-gray-700">{fact}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recipes */}
              <div>
                <h3 className="text-xl font-bold text-emerald-700 mb-3">
                  🍽️ Recipes to Unlock
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedRegion.recipes.map((recipe) => (
                    <div
                      key={recipe.id}
                      className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-emerald-300 hover:shadow-lg transition"
                    >
                      <div className="text-3xl mb-2">{recipe.emoji}</div>
                      <p className="font-semibold text-gray-800">
                        {recipe.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Unlock Info */}
              {selectedRegion.unlockedAt && (
                <div className="p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
                  <p className="text-blue-900 text-sm">
                    <span className="font-bold">🔐 Unlocked at:</span> Complete{" "}
                    {selectedRegion.unlockedAt.replace("_", " ").toUpperCase()}
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>
      ) : (
        // Map View
        <div className="p-4 max-w-6xl mx-auto">
          <div className="mb-6 p-4 bg-white rounded-lg border-2 border-emerald-200">
            <p className="text-gray-700">
              Explore the Food Kingdom and unlock its delicious secrets! Complete
              story chapters to unlock new regions. 🌍
            </p>
          </div>

          {/* Unlocked Regions */}
          {unlockedRegions.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-emerald-700 mb-4">
                🔓 Unlocked Regions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {unlockedRegions.map((region) => (
                  <button
                    key={region.id}
                    onClick={() => setSelectedRegion(region)}
                    className={`p-6 rounded-xl border-2 border-emerald-300 bg-gradient-to-br ${region.color} text-white hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer text-left`}
                  >
                    <div className="text-5xl mb-2">{region.emoji}</div>
                    <h3 className="text-xl font-bold">{region.name}</h3>
                    <p className="text-white/90 text-sm mt-2 line-clamp-2">
                      {region.description}
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-white/80">
                      <Unlock className="w-4 h-4" />
                      <span className="text-sm">
                        {region.recipes.length} Recipes
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Locked Regions */}
          {lockedRegions.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-400 mb-4">
                🔒 Locked Regions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lockedRegions.map((region) => (
                  <div
                    key={region.id}
                    className="p-6 rounded-xl border-2 border-gray-300 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 opacity-60"
                  >
                    <div className="text-5xl mb-2 opacity-50">
                      {region.emoji}
                    </div>
                    <h3 className="text-xl font-bold">{region.name}</h3>
                    <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                      {region.description}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      <span className="text-sm">
                        Unlock at{" "}
                        {region.unlockedAt?.replace(/_/g, " ").toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips Section */}
          <div className="mt-8 p-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl border-2 border-yellow-300">
            <h3 className="text-xl font-bold text-orange-800 mb-3">
              💡 Exploration Tips
            </h3>
            <ul className="space-y-2 text-orange-800">
              <li>
                📖 Complete story chapters to unlock new regions of the Food
                Kingdom
              </li>
              <li>🍳 Each region has unique recipes and nutrition facts</li>
              <li>🎒 Collect recipes from all regions to become a Master Chef</li>
              <li>✨ Mix and match recipes to create balanced meals</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
