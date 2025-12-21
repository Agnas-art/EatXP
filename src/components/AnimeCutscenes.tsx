import { useState } from "react";
import { ChevronLeft, Play } from "lucide-react";
import { ANIME_CUTSCENES, AnimeCutscene } from "../data/cutscenes";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface AnimeCutscenesProps {
  completedChapters: string[];
  onBack: () => void;
}

export default function AnimeCutscenes({
  completedChapters,
  onBack,
}: AnimeCutscenesProps) {
  const [selectedCutscene, setSelectedCutscene] = useState<AnimeCutscene | null>(
    null
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  const isCutsceneUnlocked = (cutscene: AnimeCutscene): boolean => {
    return completedChapters.includes(cutscene.unlockedAt);
  };

  const unlockedCutscenes = Object.values(ANIME_CUTSCENES).filter(
    isCutsceneUnlocked
  );
  const lockedCutscenes = Object.values(ANIME_CUTSCENES).filter(
    (c) => !isCutsceneUnlocked(c)
  );

  const playAnimation = (cutscene: AnimeCutscene) => {
    setSelectedCutscene(cutscene);
    setCurrentFrameIndex(0);
    setIsPlaying(true);
  };

  const stopAnimation = () => {
    setIsPlaying(false);
    setCurrentFrameIndex(0);
  };

  // Auto-advance frames
  if (isPlaying && selectedCutscene) {
    const currentFrame = selectedCutscene.frames[currentFrameIndex];
    setTimeout(() => {
      if (currentFrameIndex < selectedCutscene.frames.length - 1) {
        setCurrentFrameIndex(currentFrameIndex + 1);
      } else {
        setIsPlaying(false);
      }
    }, currentFrame.duration);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-pink-100 to-blue-100 overflow-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm border-b border-purple-200 p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            🎬 Anime Cutscenes
          </h1>
        </div>
      </div>

      {isPlaying && selectedCutscene ? (
        // Playing Animation
        <div className="p-4 max-w-4xl mx-auto">
          <button
            onClick={() => stopAnimation()}
            className="mb-4 p-2 hover:bg-white rounded-lg transition flex items-center gap-2 text-purple-700"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Cutscenes
          </button>

          <Card className="bg-gradient-to-b from-purple-900 to-indigo-900 border-4 border-purple-400 p-8 text-center text-white overflow-hidden">
            {/* Title */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-purple-100 mb-2">
                {selectedCutscene.title}
              </h2>
              <p className="text-purple-200">{selectedCutscene.topic}</p>
            </div>

            {/* Animation Frame */}
            <div className="mb-8 p-8 bg-purple-800 rounded-lg border-2 border-purple-400 min-h-64 flex flex-col items-center justify-center">
              <div className="text-8xl mb-4 animate-pulse">
                {selectedCutscene.frames[currentFrameIndex].character ===
                "naruto"
                  ? "🧑‍🦱"
                  : selectedCutscene.frames[currentFrameIndex].character ===
                      "tanjiro"
                    ? "🧑"
                    : selectedCutscene.frames[currentFrameIndex].character ===
                        "deku"
                      ? "🧑"
                      : selectedCutscene.frames[currentFrameIndex].character ===
                          "goku"
                        ? "🧑‍⚖️"
                        : selectedCutscene.frames[currentFrameIndex].character}
              </div>

              {/* Dialogue */}
              <div className="bg-purple-700 rounded-lg p-4 border-2 border-purple-300 max-w-2xl">
                <p className="text-lg text-white text-center">
                  {selectedCutscene.frames[currentFrameIndex].dialogue}
                </p>
              </div>

              {/* Action Description */}
              {selectedCutscene.frames[currentFrameIndex].action && (
                <p className="text-purple-300 text-sm mt-4 italic">
                  *{selectedCutscene.frames[currentFrameIndex].action}*
                </p>
              )}
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex gap-1 justify-center">
                {selectedCutscene.frames.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-2 w-8 rounded transition ${
                      idx === currentFrameIndex
                        ? "bg-pink-400"
                        : idx < currentFrameIndex
                          ? "bg-purple-400"
                          : "bg-purple-700"
                    }`}
                  />
                ))}
              </div>
              <p className="text-purple-200 text-sm mt-2">
                Frame {currentFrameIndex + 1} of{" "}
                {selectedCutscene.frames.length}
              </p>
            </div>

            {/* Controls */}
            <div className="flex gap-2 justify-center">
              <Button
                onClick={() => stopAnimation()}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                ⏹️ Stop
              </Button>
            </div>
          </Card>

          {/* Lesson */}
          <div className="mt-6 bg-white rounded-lg p-6 border-2 border-purple-200">
            <h3 className="text-xl font-bold text-purple-700 mb-3">
              📚 {selectedCutscene.lesson.title}
            </h3>
            <ul className="space-y-2">
              {selectedCutscene.lesson.key_points.map((point, idx) => (
                <li key={idx} className="flex gap-2 text-gray-700">
                  <span className="text-purple-600 font-bold">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : selectedCutscene ? (
        // Cutscene Detail View
        <div className="p-4 max-w-2xl mx-auto">
          <button
            onClick={() => setSelectedCutscene(null)}
            className="mb-4 p-2 hover:bg-white rounded-lg transition flex items-center gap-2 text-purple-700"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Cutscenes
          </button>

          <Card className="bg-white border-2 border-purple-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
              <div className="text-5xl mb-2">{selectedCutscene.emoji}</div>
              <h2 className="text-3xl font-bold">{selectedCutscene.title}</h2>
              <p className="text-purple-100 mt-2">
                Featuring {selectedCutscene.character}
              </p>
            </div>

            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <p className="text-gray-700 text-lg">
                  {selectedCutscene.description}
                </p>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-2 text-purple-700 font-semibold">
                <span>⏱️ Duration:</span>
                <span>{selectedCutscene.duration} seconds</span>
              </div>

              {/* Lesson Preview */}
              <div className="p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
                <h3 className="font-bold text-purple-700 mb-2">
                  📚 Lesson Topic: {selectedCutscene.lesson.title}
                </h3>
                <ul className="space-y-1">
                  {selectedCutscene.lesson.key_points.slice(0, 2).map((p, i) => (
                    <li key={i} className="text-sm text-gray-700">
                      • {p}
                    </li>
                  ))}
                  {selectedCutscene.lesson.key_points.length > 2 && (
                    <li className="text-sm text-gray-500">
                      +{selectedCutscene.lesson.key_points.length - 2} more points
                    </li>
                  )}
                </ul>
              </div>

              {/* Play Button */}
              <Button
                onClick={() => playAnimation(selectedCutscene)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-6 text-lg font-bold"
              >
                <Play className="w-6 h-6 mr-2" />
                ▶️ Watch Cutscene
              </Button>
            </div>
          </Card>
        </div>
      ) : (
        // Cutscenes List View
        <div className="p-4 max-w-6xl mx-auto">
          <div className="mb-6 p-4 bg-white rounded-lg border-2 border-purple-200">
            <p className="text-gray-700">
              Watch anime cutscenes featuring your favorite characters learning
              about nutrition! Complete story chapters to unlock new cutscenes.
              🎬
            </p>
          </div>

          {/* Unlocked Cutscenes */}
          {unlockedCutscenes.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-purple-700 mb-4">
                🔓 Available Cutscenes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {unlockedCutscenes.map((cutscene) => (
                  <button
                    key={cutscene.id}
                    onClick={() => setSelectedCutscene(cutscene)}
                    className="p-6 rounded-xl border-2 border-purple-300 bg-gradient-to-br from-purple-500 to-pink-500 text-white hover:shadow-xl transition transform hover:-translate-y-1 cursor-pointer text-left group"
                  >
                    <div className="text-5xl mb-2 group-hover:scale-110 transition">
                      {cutscene.emoji}
                    </div>
                    <h3 className="text-xl font-bold">{cutscene.title}</h3>
                    <p className="text-purple-100 text-sm mt-2">
                      {cutscene.description}
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-purple-100">
                      <span>⏱️</span>
                      <span className="text-sm">{cutscene.duration}s</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Locked Cutscenes */}
          {lockedCutscenes.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-400 mb-4">
                🔒 Locked Cutscenes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lockedCutscenes.map((cutscene) => (
                  <div
                    key={cutscene.id}
                    className="p-6 rounded-xl border-2 border-gray-300 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 opacity-60"
                  >
                    <div className="text-5xl mb-2 opacity-50">
                      {cutscene.emoji}
                    </div>
                    <h3 className="text-xl font-bold">{cutscene.title}</h3>
                    <p className="text-gray-500 text-sm mt-2">
                      {cutscene.description}
                    </p>
                    <div className="mt-3">
                      <p className="text-sm">
                        🔐 Unlock at{" "}
                        {cutscene.unlockedAt.replace(/_/g, " ").toUpperCase()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips Section */}
          <div className="mt-8 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl border-2 border-purple-300">
            <h3 className="text-xl font-bold text-purple-800 mb-3">
              💡 Anime Education Tips
            </h3>
            <ul className="space-y-2 text-purple-800">
              <li>
                🎬 Watch cutscenes to learn nutrition concepts in an engaging way
              </li>
              <li>
                ⭐ Each cutscene features a different anime character and topic
              </li>
              <li>📚 Take notes on the key learning points from each cutscene</li>
              <li>🔓 Unlock all cutscenes by completing story chapters</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
