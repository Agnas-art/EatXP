import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { MANGA_PANELS, MangaStrip } from "../data/mangaPanels";
import { Card } from "./ui/card";

interface MangaPanelsProps {
  completedChapters: string[];
  onBack: () => void;
}

export default function MangaPanels({
  completedChapters,
  onBack,
}: MangaPanelsProps) {
  const [selectedStrip, setSelectedStrip] = useState<MangaStrip | null>(null);

  const isMangaUnlocked = (strip: MangaStrip): boolean => {
    return completedChapters.includes(strip.unlockedAt);
  };

  const unlockedManga = Object.values(MANGA_PANELS).filter(isMangaUnlocked);
  const lockedManga = Object.values(MANGA_PANELS).filter(
    (m) => !isMangaUnlocked(m)
  );

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
      default:
        return "from-gray-200 to-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 overflow-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-amber-200 p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            📖 Manga Panels
          </h1>
        </div>
      </div>

      {selectedStrip ? (
        // Manga Detail View
        <div className="p-4 max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedStrip(null)}
            className="mb-4 p-2 hover:bg-white rounded-lg transition flex items-center gap-2 text-orange-700"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Manga Collection
          </button>

          <Card className="bg-white border-4 border-amber-300 overflow-hidden">
            {/* Strip Header */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
              <div className="flex items-center justify-between mb-3">
                <div className="text-4xl">{selectedStrip.emoji}</div>
                <div className="text-2xl">By {selectedStrip.author}</div>
              </div>
              <h2 className="text-3xl font-bold mb-2">{selectedStrip.title}</h2>
              <p className="text-orange-100">{selectedStrip.description}</p>
              <p className="text-orange-100 mt-2 text-sm">
                📚 Theme: {selectedStrip.theme}
              </p>
            </div>

            {/* Manga Panels Grid */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {selectedStrip.panels.map((panel, idx) => (
                  <div
                    key={panel.id}
                    className={`p-4 rounded-lg border-3 border-amber-300 bg-gradient-to-br ${getEmotionColor(panel.emotion)} relative overflow-hidden`}
                  >
                    {/* Panel Number */}
                    <div className="absolute top-2 right-2 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </div>

                    {/* Character/Object */}
                    <div className="text-6xl mb-3 inline-block hover:scale-110 transition">
                      {panel.image}
                    </div>

                    {/* Dialogue Box */}
                    <div className="bg-white rounded-lg p-3 border-2 border-gray-800 mt-4">
                      <p className="text-gray-800 font-semibold text-sm">
                        {panel.dialogue}
                      </p>
                    </div>

                    {/* Emotion Tag */}
                    {panel.emotion && (
                      <div className="mt-2 inline-block bg-black text-white px-2 py-1 rounded text-xs font-bold">
                        {panel.emotion}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Lesson Takeaway */}
              {selectedStrip.lesson && (
                <div className="p-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-lg border-3 border-orange-300 mt-6">
                  <h3 className="text-xl font-bold text-orange-800 mb-2">
                    ✨ Lesson Takeaway
                  </h3>
                  <p className="text-orange-900 text-lg">
                    {selectedStrip.lesson}
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Story Guide */}
          <div className="mt-6 bg-white rounded-lg p-6 border-2 border-amber-200">
            <h3 className="text-lg font-bold text-orange-700 mb-3">
              📖 How to Read Manga
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>
                📍 <span className="font-semibold">Read left to right</span>,
                top to bottom
              </p>
              <p>
                💬 <span className="font-semibold">Dialogue boxes</span> show
                what characters say
              </p>
              <p>
                😊 <span className="font-semibold">Emotions</span> show how
                characters feel
              </p>
              <p>
                🎯 <span className="font-semibold">Numbers</span> show the order
                of panels
              </p>
            </div>
          </div>
        </div>
      ) : (
        // Manga Collection View
        <div className="p-4 max-w-6xl mx-auto">
          <div className="mb-6 p-4 bg-white rounded-lg border-2 border-amber-200">
            <p className="text-gray-700">
              Unlock comic strips and explore food adventures through manga!
              These story-driven panels teach nutrition in a fun, visual way.
              📖
            </p>
          </div>

          {/* Unlocked Manga */}
          {unlockedManga.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-orange-700 mb-4">
                🔓 Available Manga Collections
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {unlockedManga.map((strip) => (
                  <button
                    key={strip.id}
                    onClick={() => setSelectedStrip(strip)}
                    className="p-6 rounded-xl border-4 border-orange-400 bg-gradient-to-br from-orange-400 to-red-400 text-white hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer text-left group"
                  >
                    <div className="text-6xl mb-2 group-hover:scale-125 transition">
                      {strip.emoji}
                    </div>
                    <h3 className="text-2xl font-bold">{strip.title}</h3>
                    <p className="text-orange-100 mt-2">{strip.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex gap-2">
                        <span className="text-sm bg-white/30 px-2 py-1 rounded">
                          {strip.panels.length} panels
                        </span>
                        <span className="text-sm bg-white/30 px-2 py-1 rounded">
                          {strip.theme}
                        </span>
                      </div>
                      <span className="text-2xl">→</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Locked Manga */}
          {lockedManga.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-400 mb-4">
                🔒 Locked Manga Collections
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lockedManga.map((strip) => (
                  <div
                    key={strip.id}
                    className="p-6 rounded-xl border-4 border-gray-300 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 opacity-60"
                  >
                    <div className="text-6xl mb-2 opacity-50">{strip.emoji}</div>
                    <h3 className="text-2xl font-bold">{strip.title}</h3>
                    <p className="text-gray-500 mt-2">{strip.description}</p>
                    <div className="mt-4 flex gap-2">
                      <span className="text-sm">
                        🔐 Unlock at{" "}
                        {strip.unlockedAt.replace(/_/g, " ").toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Manga Genres */}
          <div className="mt-8 p-6 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl border-3 border-orange-300">
            <h3 className="text-xl font-bold text-red-800 mb-4">
              📚 Manga Story Genres
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="p-3 bg-white rounded-lg border-2 border-orange-300">
                <p className="font-bold text-orange-700">⚔️ Adventure</p>
                <p className="text-sm text-gray-700">
                  Epic journeys through food kingdoms
                </p>
              </div>
              <div className="p-3 bg-white rounded-lg border-2 border-orange-300">
                <p className="font-bold text-orange-700">💪 Action</p>
                <p className="text-sm text-gray-700">
                  Battles and challenges testing nutrition knowledge
                </p>
              </div>
              <div className="p-3 bg-white rounded-lg border-2 border-orange-300">
                <p className="font-bold text-orange-700">🎓 Education</p>
                <p className="text-sm text-gray-700">
                  Learning valuable nutrition facts through stories
                </p>
              </div>
              <div className="p-3 bg-white rounded-lg border-2 border-orange-300">
                <p className="font-bold text-orange-700">🌟 Comedy</p>
                <p className="text-sm text-gray-700">
                  Funny interactions between food characters
                </p>
              </div>
              <div className="p-3 bg-white rounded-lg border-2 border-orange-300">
                <p className="font-bold text-orange-700">❤️ Drama</p>
                <p className="text-sm text-gray-700">
                  Emotional stories about healthy choices
                </p>
              </div>
              <div className="p-3 bg-white rounded-lg border-2 border-orange-300">
                <p className="font-bold text-orange-700">🎯 Inspiration</p>
                <p className="text-sm text-gray-700">
                  Motivating tales of transformation and growth
                </p>
              </div>
            </div>
          </div>

          {/* Reading Tips */}
          <div className="mt-6 p-6 bg-white rounded-lg border-2 border-amber-200">
            <h3 className="text-lg font-bold text-orange-700 mb-3">
              💡 Manga Reading Guide
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                ✨ <span className="font-semibold">Visual storytelling</span> -
                Images tell part of the story
              </li>
              <li>
                🗣️ <span className="font-semibold">Speech bubbles</span> -
                Contain character dialogue
              </li>
              <li>
                💭 <span className="font-semibold">Thought bubbles</span> -
                Show character thoughts
              </li>
              <li>
                🎨 <span className="font-semibold">Color gradients</span> -
                Indicate emotions and moods
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
