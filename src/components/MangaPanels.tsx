import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { MANGA_PANELS, MangaStrip } from "../data/mangaPanels";
import { ANIME_CHARACTERS } from "../data/animeCharacters";

interface MangaPanelsProps {
  completedChapters: string[];
  onBack: () => void;
  selectedCharacter?: string;
}

export default function MangaPanels({
  completedChapters,
  onBack,
  selectedCharacter = "deku",
}: MangaPanelsProps) {
  const [selectedStrip, setSelectedStrip] = useState<MangaStrip | null>(null);
  const [currentPanelIndex, setCurrentPanelIndex] = useState(0);

  const selectedChar = ANIME_CHARACTERS[selectedCharacter] || ANIME_CHARACTERS["deku"];

  const isMangaUnlocked = (strip: MangaStrip): boolean => {
    // First manga panel is always unlocked
    if (strip.id === "fruit_forest_adventure") {
      return true;
    }
    return completedChapters.includes(strip.unlockedAt);
  };

  const unlockedManga = Object.values(MANGA_PANELS).filter(isMangaUnlocked);
  const lockedManga = Object.values(MANGA_PANELS).filter((m) => !isMangaUnlocked(m));

  const getEmotionColor = (emotion: string | undefined): string => {
    switch (emotion) {
      case "excited":
      case "happy":
      case "triumphant":
        return "from-yellow-300 to-orange-300";
      case "sad":
      case "worried":
        return "from-blue-200 to-blue-300";
      case "evil":
      case "angry":
        return "from-red-300 to-red-400";
      case "heroic":
      case "brave":
        return "from-purple-300 to-purple-400";
      case "amazed":
      case "inspired":
        return "from-pink-300 to-pink-400";
      case "energetic":
      case "cheerful":
        return "from-green-300 to-green-400";
      case "proud":
      case "magical":
        return "from-indigo-300 to-indigo-400";
      case "determined":
        return "from-orange-400 to-red-500";
      default:
        return "from-white to-gray-100";
    }
  };

  if (selectedStrip) {
    const currentPanel = selectedStrip.panels[currentPanelIndex];
    const nextPanelIndex = (currentPanelIndex + 1) % selectedStrip.panels.length;

    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 overflow-auto">
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-amber-200 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedStrip(null)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ChevronLeft className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              📖 {selectedStrip.title}
            </h1>
          </div>
        </div>

        <div className="p-6 max-w-5xl mx-auto">
          <motion.div
            key={currentPanelIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`rounded-xl border-4 border-black bg-gradient-to-br ${getEmotionColor(currentPanel.emotion)} p-8 mb-8 shadow-2xl relative min-h-96 flex flex-col justify-center overflow-hidden`}
          >
            <div className="absolute top-3 left-3 w-5 h-5 border-t-3 border-l-3 border-black"></div>
            <div className="absolute top-3 right-3 w-5 h-5 border-t-3 border-r-3 border-black"></div>
            <div className="absolute bottom-3 left-3 w-5 h-5 border-b-3 border-l-3 border-black"></div>
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b-3 border-r-3 border-black"></div>

            <div className="absolute top-6 right-6 bg-black text-white rounded-full w-14 h-14 flex items-center justify-center font-bold text-lg shadow-lg border-2 border-white">
              {currentPanelIndex + 1}/{selectedStrip.panels.length}
            </div>

            <div className="flex items-center justify-between w-full gap-8 relative z-10">
              <div className="flex flex-col items-center flex-shrink-0">
                {selectedChar.imageUrl ? (
                  <img
                    src={selectedChar.imageUrl}
                    alt={selectedChar.name}
                    className="w-40 h-48 object-cover rounded-lg border-4 border-black shadow-lg hover:scale-105 transition"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      const fallback = e.currentTarget.nextElementSibling as HTMLElement;
                      if (fallback) fallback.classList.remove("hidden");
                    }}
                  />
                ) : null}
                <div className="hidden text-8xl mt-2">{selectedChar.emoji || "🧑"}</div>
              </div>

              <div className="flex-1">
                <div className="text-9xl mb-6 text-center drop-shadow-lg">
                  {currentPanel.image}
                </div>

                <div className="relative bg-white rounded-2xl p-8 border-4 border-black shadow-xl before:content-[''] before:absolute before:-left-8 before:top-8 before:w-0 before:h-0 before:border-l-10 before:border-t-10 before:border-r-0 before:border-b-0 before:border-l-transparent before:border-t-white before:border-b-transparent">
                  <p className="text-2xl font-bold text-gray-900 mb-4 leading-relaxed">
                    {currentPanel.dialogue}
                  </p>
                  <p className="text-lg font-semibold text-gray-700 border-t-2 border-gray-300 pt-3">
                    — {selectedChar.name}
                  </p>
                </div>

                {currentPanel.emotion && (
                  <div className="mt-6 inline-block">
                    <div className="bg-black text-white px-6 py-3 rounded-full font-bold text-base border-2 border-white shadow-lg">
                      💭 {currentPanel.emotion.toUpperCase()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          <div className="flex justify-between items-center gap-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPanelIndex((currentPanelIndex - 1 + selectedStrip.panels.length) % selectedStrip.panels.length)}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-bold hover:shadow-lg transition text-lg"
            >
              ← Previous Panel
            </motion.button>

            <div className="flex gap-3 flex-wrap justify-center">
              {selectedStrip.panels.map((_, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => setCurrentPanelIndex(idx)}
                  className={`rounded-full transition shadow-md ${
                    idx === currentPanelIndex 
                      ? "bg-orange-600 w-5 h-5 scale-125 ring-2 ring-orange-300" 
                      : "bg-gray-400 w-4 h-4 hover:bg-orange-400"
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentPanelIndex(nextPanelIndex)}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-bold hover:shadow-lg transition text-lg"
            >
              Next Panel →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white border-2 border-amber-300 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">📝 Author</p>
              <p className="font-bold text-orange-700">{selectedStrip.author}</p>
            </div>
            <div className="bg-white border-2 border-amber-300 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">🎯 Theme</p>
              <p className="font-bold text-orange-700">{selectedStrip.theme}</p>
            </div>
            <div className="bg-white border-2 border-amber-300 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-1">📑 Total Panels</p>
              <p className="font-bold text-orange-700">{selectedStrip.panels.length}</p>
            </div>
          </div>

          {selectedStrip.lesson && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 border-3 border-orange-400 rounded-lg p-6 mb-8 shadow-lg"
            >
              <p className="font-bold text-xl text-orange-900 mb-3">✨ Lesson Takeaway</p>
              <p className="text-lg text-orange-800 leading-relaxed">{selectedStrip.lesson}</p>
            </motion.div>
          )}

          <div className="bg-white border-2 border-amber-200 rounded-lg p-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              {selectedStrip.description}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 overflow-auto">
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-amber-200 p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            📖 Manga Panels - {selectedChar.name}
          </h1>
        </div>
      </div>

      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-8 p-6 bg-white rounded-lg border-2 border-amber-200 shadow-md">
          <p className="text-lg text-gray-700 leading-relaxed">
            Explore food adventures through manga! Stories feature <strong>{selectedChar.name}</strong> learning nutrition through epic culinary journeys! 📖✨
          </p>
        </div>

        {unlockedManga.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-orange-700 mb-6">🔓 Available Manga</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {unlockedManga.map((strip) => (
                <motion.button
                  key={strip.id}
                  whileHover={{ scale: 1.05, y: -10 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedStrip(strip);
                    setCurrentPanelIndex(0);
                  }}
                  className="p-8 rounded-xl border-4 border-orange-400 bg-gradient-to-br from-orange-400 to-red-500 text-white hover:shadow-2xl transition cursor-pointer text-left group"
                >
                  <div className="text-7xl mb-4 group-hover:scale-125 transition inline-block">
                    {strip.emoji}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{strip.title}</h3>
                  <p className="text-orange-100 mb-4">{strip.description}</p>
                  <div className="flex items-center justify-between mt-6 pt-4 border-t-2 border-orange-200">
                    <div className="flex gap-3">
                      <span className="text-sm bg-white/30 px-3 py-1 rounded-full font-semibold">
                        {strip.panels.length} panels
                      </span>
                      <span className="text-sm bg-white/30 px-3 py-1 rounded-full font-semibold">
                        {strip.theme}
                      </span>
                    </div>
                    <span className="text-3xl">→</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {lockedManga.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold text-gray-400 mb-6">🔒 Locked Manga</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {lockedManga.map((strip) => (
                <div
                  key={strip.id}
                  className="p-8 rounded-xl border-4 border-gray-300 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 opacity-70"
                >
                  <div className="text-7xl mb-4 opacity-50">{strip.emoji}</div>
                  <h3 className="text-2xl font-bold mb-2">{strip.title}</h3>
                  <p className="text-gray-500 mb-4">{strip.description}</p>
                  <div className="mt-6 pt-4 border-t-2 border-gray-300">
                    <div className="inline-flex items-center gap-2 text-sm bg-white/50 px-4 py-2 rounded-full">
                      <span className="text-lg">🔐</span>
                      <span className="font-semibold">Unlock at {strip.unlockedAt.replace(/_/g, " ")}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {unlockedManga.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">No Manga Yet</h3>
            <p className="text-gray-600">Complete lessons to unlock manga collections featuring {selectedChar.name}!</p>
          </div>
        )}
      </div>
    </div>
  );
}
