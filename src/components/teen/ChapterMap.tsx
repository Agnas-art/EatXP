import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sword, MapPin, Users } from "lucide-react";

interface ChapterMapProps {
  chapterName: string;
  heroName: string;
  heroEmoji: string;
  minionEmojis: Array<{
    emoji: string;
    name: string;
    isDefeated: boolean;
  }>;
  bossEmoji: string;
  bossName: string;
  currentMinionIndex: number;
  onStartBattle: () => void;
  onBossClick?: () => void;
  onBack: () => void;
}

export function ChapterMap({
  chapterName,
  heroName,
  heroEmoji,
  minionEmojis,
  bossEmoji,
  bossName,
  currentMinionIndex,
  onStartBattle,
  onBossClick,
  onBack,
}: ChapterMapProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black p-6 space-y-6 overflow-hidden relative">
      {/* Animated Background Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
              opacity: Math.random() * 0.5,
            }}
            animate={{
              opacity: [Math.random() * 0.3, Math.random() * 0.8, Math.random() * 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 3,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-white">{chapterName}</h1>
          <p className="text-purple-300 flex items-center gap-2">
            <Users className="w-5 h-5" />
            Champion: {heroName}
          </p>
        </div>
        <Button onClick={onBack} variant="outline" className="bg-purple-900 border-purple-500 text-white hover:bg-purple-800">
          ← Back
        </Button>
      </div>

      {/* Battle Map Visualization */}
      <Card className="relative p-8 bg-gradient-to-b from-gray-800/40 to-gray-900/40 border-2 border-purple-500 overflow-hidden">
        {/* Hero Position - Left */}
        <motion.div
          className="absolute left-8 top-1/2 transform -translate-y-1/2 text-center space-y-2 z-20"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          <motion.div className="text-6xl">{heroEmoji}</motion.div>
          <p className="text-white font-bold text-sm">{heroName}</p>
          <div className="text-xs text-purple-300">👑 Your Champion</div>
        </motion.div>

        {/* Battle Path - Horizontal Line */}
        <div className="absolute top-1/2 left-24 right-24 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 transform -translate-y-1/2">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-300 to-orange-300"
            animate={{
              width: ["0%", "100%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          />
        </div>

        {/* Minion Path - Nodes */}
        <div className="flex justify-between items-center px-32 relative h-32">
          {minionEmojis.map((minion, idx) => (
            <motion.div
              key={idx}
              className="flex flex-col items-center space-y-2 relative"
              animate={{
                scale: idx === currentMinionIndex ? [1, 1.2, 1] : 1,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              {/* Node Background */}
              <motion.div
                className={`absolute inset-0 rounded-full ${
                  minion.isDefeated
                    ? "bg-green-500/30"
                    : idx === currentMinionIndex
                    ? "bg-yellow-500/40"
                    : "bg-gray-500/20"
                }`}
                animate={{
                  boxShadow: idx === currentMinionIndex
                    ? [
                        "0 0 0px rgba(255, 200, 0, 0.5)",
                        "0 0 20px rgba(255, 200, 0, 0.8)",
                        "0 0 0px rgba(255, 200, 0, 0.5)",
                      ]
                    : "0 0 0px rgba(255, 200, 0, 0)",
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />

              {/* Minion Emoji */}
              <motion.div
                className="text-4xl relative z-10"
                animate={{
                  filter:
                    idx === currentMinionIndex
                      ? "drop-shadow(0 0 10px rgba(255, 200, 0, 1))"
                      : minion.isDefeated
                      ? "grayscale(0%)"
                      : "grayscale(50%)",
                }}
              >
                {minion.emoji}
              </motion.div>

              {/* Status Badge */}
              <div className="text-xs font-bold text-center relative z-10">
                {minion.isDefeated ? (
                  <span className="text-green-400">✅ {minion.name}</span>
                ) : idx === currentMinionIndex ? (
                  <motion.span
                    className="text-yellow-300"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ⚔️ {minion.name}
                  </motion.span>
                ) : (
                  <span className="text-gray-400">{minion.name}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Boss Position - Right */}
        <motion.div
          className="absolute right-8 top-1/2 transform -translate-y-1/2 text-center space-y-2 z-20 cursor-pointer group"
          animate={{
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          onClick={() => currentMinionIndex >= minionEmojis.length && onBossClick?.()}
        >
          <motion.div
            className={`text-6xl transition-transform ${
              currentMinionIndex >= minionEmojis.length
                ? "group-hover:scale-110"
                : "opacity-50"
            }`}
            animate={{
              filter: "drop-shadow(0 0 20px rgba(255, 50, 50, 0.6))",
            }}
          >
            {bossEmoji}
          </motion.div>
          <p className="text-white font-bold text-sm">{bossName}</p>
          <div className={`text-xs ${
            currentMinionIndex >= minionEmojis.length
              ? "text-red-300"
              : "text-gray-500"
          }`}>
            {currentMinionIndex >= minionEmojis.length ? "🔥 FINAL BOSS" : "🔒 Locked"}
          </div>
        </motion.div>

        {/* Progress Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-white text-xs">
          <span className="text-purple-300">Progress:</span>
          <div className="flex gap-1">
            {Array.from({ length: minionEmojis.length + 1 }).map((_, idx) => (
              <motion.div
                key={idx}
                className={`w-2 h-2 rounded-full ${
                  idx < currentMinionIndex || (idx === minionEmojis.length && minionEmojis.every(m => m.isDefeated))
                    ? "bg-green-500"
                    : idx === currentMinionIndex
                    ? "bg-yellow-500"
                    : "bg-gray-600"
                }`}
                animate={
                  idx === currentMinionIndex
                    ? { scale: [1, 1.5, 1] }
                    : {}
                }
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            ))}
          </div>
        </div>
      </Card>

      {/* Battle Information */}
      <div className="relative z-10 grid grid-cols-3 gap-4">
        {/* Hero Stats */}
        <Card className="p-4 bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500">
          <h3 className="text-white font-bold mb-2">Your Champion</h3>
          <p className="text-blue-200 text-sm mb-2">{heroName}</p>
          <p className="text-xs text-blue-300">
            ✨ Ready for battle
          </p>
        </Card>

        {/* Current Enemy */}
        <Card className="p-4 bg-gradient-to-br from-orange-900/50 to-red-900/50 border-red-500">
          <h3 className="text-white font-bold mb-2">Next Challenge</h3>
          <p className="text-red-200 text-sm mb-2">
            {currentMinionIndex < minionEmojis.length
              ? minionEmojis[currentMinionIndex]?.name
              : bossName}
          </p>
          <p className="text-xs text-red-300">
            {currentMinionIndex + 1}/{minionEmojis.length + 1}
          </p>
        </Card>

        {/* Battle Stats */}
        <Card className="p-4 bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-500">
          <h3 className="text-white font-bold mb-2">Battle Status</h3>
          <p className="text-green-200 text-sm mb-2">
            {minionEmojis.filter(m => m.isDefeated).length} Enemies Defeated
          </p>
          <p className="text-xs text-green-300">
            {currentMinionIndex === minionEmojis.length ? "Boss battle next!" : "Prepare for combat"}
          </p>
        </Card>
      </div>

      {/* Start Battle Button */}
      <motion.div
        className="relative z-10"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={onStartBattle}
          className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white py-4 text-xl font-bold shadow-lg hover:shadow-red-500/50"
        >
          <Sword className="w-6 h-6 mr-2" />
          {currentMinionIndex < minionEmojis.length
            ? `Battle ${minionEmojis[currentMinionIndex]?.name}!`
            : `Face the Final Boss - ${bossName}!`}
        </Button>
      </motion.div>
    </div>
  );
}
