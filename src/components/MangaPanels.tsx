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

  if (selectedStrip) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black overflow-auto">
        <div className="sticky top-0 z-20 bg-black/90 backdrop-blur-sm border-b-4 border-orange-600 p-4 shadow-2xl">
          <div className="flex items-center justify-between gap-3 max-w-7xl mx-auto">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedStrip(null)}
                className="p-2 hover:bg-orange-600 rounded-lg transition"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              <h1 className="text-3xl font-black bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent">
                📖 {selectedStrip.title}
              </h1>
            </div>
            <div className="flex gap-3">
              <div className="px-4 py-2 bg-white/10 rounded-lg border border-orange-500">
                <p className="text-sm text-orange-300">Author</p>
                <p className="font-bold text-white">{selectedStrip.author}</p>
              </div>
              <div className="px-4 py-2 bg-white/10 rounded-lg border border-purple-500">
                <p className="text-sm text-purple-300">Theme</p>
                <p className="font-bold text-white">{selectedStrip.theme}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Manga Page */}
        <div className="p-8 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden border-8 border-yellow-100"
          >
            {/* Manga Grid Layout */}
            <div className="bg-white p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-screen">
              {selectedStrip.panels.map((panel, idx) => {
                // Varied panel sizes for dynamic manga layout
                const sizeClass =
                  idx === 0
                    ? "md:col-span-2 row-span-2 text-8xl"
                    : idx === 3
                      ? "lg:col-span-2 text-6xl"
                      : "text-5xl";
                const bgColor =
                  idx % 3 === 0
                    ? "from-yellow-100 to-orange-100"
                    : idx % 3 === 1
                      ? "from-blue-100 to-cyan-100"
                      : "from-pink-100 to-rose-100";

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                    className={`${sizeClass} border-4 border-black rounded-lg overflow-hidden bg-gradient-to-br ${bgColor} p-6 flex flex-col justify-between hover:shadow-lg transition-all cursor-pointer group relative`}
                  >
                    {/* Panel number indicator */}
                    <div className="absolute top-2 right-2 bg-black text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm border-2 border-white shadow-md">
                      {idx + 1}
                    </div>

                    {/* Manga effect corner lines */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-3 border-l-3 border-black"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-3 border-r-3 border-black"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-3 border-l-3 border-black"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-3 border-r-3 border-black"></div>

                    {/* Panel image/emoji - large and centered */}
                    <div className="flex items-center justify-center flex-1 mb-3 drop-shadow-lg group-hover:scale-110 transition">
                      {panel.image}
                    </div>

                    {/* Speech bubble with dialogue */}
                    <div className="relative bg-white rounded-2xl p-4 border-3 border-black shadow-md before:content-[''] before:absolute before:-left-6 before:bottom-4 before:w-0 before:h-0 before:border-l-12 before:border-t-6 before:border-r-0 before:border-b-6 before:border-l-white before:border-t-transparent before:border-b-transparent">
                      <p className="text-sm font-bold text-gray-900 leading-tight">
                        {panel.dialogue}
                      </p>
                    </div>

                    {/* Emotion indicator */}
                    {panel.emotion && (
                      <div className="mt-2 inline-block">
                        <span className="text-xs font-bold bg-black text-white px-3 py-1 rounded-full">
                          {panel.emotion.toUpperCase()}
                        </span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Lesson Takeaway Section */}
            {selectedStrip.lesson && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-orange-300 via-yellow-300 to-red-300 border-t-8 border-black p-8"
              >
                <div className="flex items-center gap-4">
                  <span className="text-6xl">✨</span>
                  <div>
                    <p className="font-black text-2xl text-black mb-2">LESSON TAKEAWAY</p>
                    <p className="text-lg font-bold text-gray-900 leading-relaxed">
                      {selectedStrip.lesson}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Story Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 bg-white/10 backdrop-blur-sm border-2 border-orange-500 rounded-xl p-6 text-white"
          >
            <p className="text-lg leading-relaxed">{selectedStrip.description}</p>
          </motion.div>

          {/* Navigation */}
          <div className="mt-8 flex justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedStrip(null)}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-bold hover:shadow-lg transition text-lg"
            >
              ← Back to Manga List
            </motion.button>
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
