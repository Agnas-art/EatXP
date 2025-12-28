import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sword, Shield, Zap, Trophy } from "lucide-react";

interface BattleArenaProps {
  playerEmoji: string;
  bossEmoji: string;
  playerHp: number;
  playerMaxHp: number;
  bossHp: number;
  bossMaxHp: number;
  bossName: string;
  onAttack: (type: string) => void;
  onDefend: (type: string) => void;
  onCounter: (type: string) => void;
  isPlayerAttacking?: boolean;
  isBossAttacking?: boolean;
  battleTurns: number;
  chapter: number;
  playerDefeated: boolean;
  bossDefeated: boolean;
}

export function BattleArena({
  playerEmoji,
  bossEmoji,
  playerHp,
  playerMaxHp,
  bossHp,
  bossMaxHp,
  bossName,
  onAttack,
  onDefend,
  onCounter,
  isPlayerAttacking = false,
  isBossAttacking = false,
  battleTurns,
  chapter,
  playerDefeated,
  bossDefeated,
}: BattleArenaProps) {
  const [damageNumbers, setDamageNumbers] = useState<
    Array<{ id: number; x: number; y: number; text: string; color: string }>
  >([]);
  const [damageId, setDamageId] = useState(0);

  const playerHpPercent = (playerHp / playerMaxHp) * 100;
  const bossHpPercent = (bossHp / bossMaxHp) * 100;

  // Add damage floating text animation
  const showDamage = (x: number, y: number, text: string, color: string = "red") => {
    const id = damageId;
    setDamageId(id + 1);
    setDamageNumbers((prev) => [...prev, { id, x, y, text, color }]);
    setTimeout(() => {
      setDamageNumbers((prev) => prev.filter((d) => d.id !== id));
    }, 2000);
  };

  // Chapter-specific backgrounds
  const getBackgroundClass = () => {
    const backgrounds: { [key: number]: string } = {
      1: "from-amber-900 via-orange-800 to-yellow-900", // Grain Plains
      2: "from-green-900 via-emerald-800 to-teal-900", // Veggie Forest
      3: "from-slate-800 via-stone-700 to-gray-900", // Protein Peaks
      4: "from-blue-900 via-indigo-800 to-purple-900", // Dairy Valley
      5: "from-pink-900 via-red-800 to-orange-900", // Fruit Isles
      6: "from-cyan-900 via-blue-800 to-indigo-900", // Liquid Ocean
      7: "from-purple-900 via-violet-800 to-black", // Final Kingdom
    };
    return backgrounds[chapter] || "from-red-900 via-purple-900 to-black";
  };

  // Chapter-specific emoji decorations
  const getBackgroundEmojis = () => {
    const emojis: { [key: number]: string[] } = {
      1: ["🌾", "🚜", "🌽"], // Grain Plains
      2: ["🥕", "🥬", "🍅"], // Veggie Forest
      3: ["💪", "🍗", "🥚"], // Protein Peaks
      4: ["🥛", "🧀", "🍦"], // Dairy Valley
      5: ["🍓", "🍉", "🍊"], // Fruit Isles
      6: ["💧", "🥤", "☕"], // Liquid Ocean
      7: ["⭐", "👑", "🏆"], // Final Kingdom
    };
    return emojis[chapter] || ["⚔️", "🛡️", "💫"];
  };

  return (
    <div className={`relative min-h-screen bg-gradient-to-br ${getBackgroundClass()} overflow-hidden p-4`}>
      {/* Parallax Background Decorations */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {getBackgroundEmojis().map((emoji, idx) => (
          <motion.div
            key={idx}
            className="absolute text-6xl"
            initial={{
              x: Math.random() * 100 + "%",
              y: Math.random() * 100 + "%",
            }}
            animate={{
              y: ["-10%", "110%"],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 10 + idx * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      {/* Main Battle Container */}
      <div className="relative z-10 space-y-3">
        {/* Header */}
        <div className="flex justify-between items-center text-white">
          <div className="flex-1">
            <p className="text-sm text-gray-300">Chapter {chapter}</p>
            <h2 className="text-3xl font-bold">{bossName}</h2>
          </div>
          <div className="text-right space-y-1">
            <p className="text-sm text-amber-400 font-bold">⚔️ Turn {battleTurns}</p>
            <p className="text-sm text-gray-300">Phase: {chapter}/{7}</p>
          </div>
        </div>

        {/* Battle Arena - Interactive 3D Space */}
        <div className="relative bg-gradient-to-b from-gray-800/80 to-gray-900/80 backdrop-blur rounded-xl border-2 border-purple-500 p-8 h-96 overflow-hidden">
          {/* Grid Pattern Background */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          {/* Damage Numbers */}
          {damageNumbers.map((dmg) => (
            <motion.div
              key={dmg.id}
              className="absolute font-bold text-lg pointer-events-none"
              initial={{ x: dmg.x, y: dmg.y, opacity: 1 }}
              animate={{ y: dmg.y - 80, opacity: 0 }}
              transition={{ duration: 2 }}
              style={{ color: dmg.color }}
            >
              {dmg.text}
            </motion.div>
          ))}

          {/* Boss Character - Left Side, Moving Right on Attack */}
          <motion.div
            className="absolute top-1/3 left-1/4 pointer-events-none"
            animate={{
              x: isBossAttacking ? -60 : 0,
              scale: isBossAttacking ? 1.1 : 1,
            }}
            transition={{
              duration: 0.4,
              type: "spring",
              stiffness: 300,
            }}
          >
            <motion.div
              className="text-7xl filter drop-shadow-lg"
              animate={{
                rotate: isBossAttacking ? [0, -15, 15, -10, 0] : 0,
                filter: isBossAttacking
                  ? "drop-shadow(0 0 20px rgba(255, 100, 100, 0.8))"
                  : "drop-shadow(0 0 10px rgba(255, 100, 100, 0.4))",
              }}
              transition={{ duration: 0.6 }}
            >
              {bossEmoji}
            </motion.div>
            <p className="text-white font-bold text-center mt-2 text-sm">{bossName}</p>
          </motion.div>

          {/* Player Character - Right Side, Moving Left on Attack */}
          <motion.div
            className="absolute top-1/3 right-1/4 pointer-events-none"
            animate={{
              x: isPlayerAttacking ? 60 : 0,
              scale: isPlayerAttacking ? 1.1 : 1,
            }}
            transition={{
              duration: 0.4,
              type: "spring",
              stiffness: 300,
            }}
          >
            <motion.div
              className="text-7xl filter drop-shadow-lg"
              animate={{
                rotate: isPlayerAttacking ? [0, 15, -15, 10, 0] : 0,
                filter: isPlayerAttacking
                  ? "drop-shadow(0 0 20px rgba(100, 200, 255, 0.8))"
                  : "drop-shadow(0 0 10px rgba(100, 200, 255, 0.4))",
              }}
              transition={{ duration: 0.6 }}
            >
              {playerEmoji}
            </motion.div>
            <p className="text-white font-bold text-center mt-2 text-sm">You</p>
          </motion.div>

          {/* Attack Lines - Visual feedback */}
          {isPlayerAttacking && (
            <motion.svg className="absolute inset-0 w-full h-full pointer-events-none">
              <motion.line
                x1="75%"
                y1="45%"
                x2="25%"
                y2="45%"
                stroke="rgba(100, 200, 255, 0.8)"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.svg>
          )}

          {isBossAttacking && (
            <motion.svg className="absolute inset-0 w-full h-full pointer-events-none">
              <motion.line
                x1="25%"
                y1="45%"
                x2="75%"
                y2="45%"
                stroke="rgba(255, 100, 100, 0.8)"
                strokeWidth="3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.svg>
          )}
        </div>

        {/* Health Bars with Detailed Info */}
        <div className="grid grid-cols-2 gap-4">
          {/* Boss Health */}
          <Card className="p-3 bg-gradient-to-br from-red-900/50 to-orange-900/50 border-red-500">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold text-sm">{bossName}</span>
                <span className="text-red-300 font-bold text-xs">
                  {Math.max(0, bossHp)}/{bossMaxHp}
                </span>
              </div>
              <div className="bg-gray-800 rounded-full h-6 overflow-hidden border border-red-600">
                <motion.div
                  className="h-full bg-gradient-to-r from-red-600 to-orange-500"
                  animate={{ width: `${Math.max(0, bossHpPercent)}%` }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-white/30 to-transparent"
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 0%"],
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </motion.div>
              </div>
              <p className="text-xs text-red-300 text-right font-bold">
                {Math.round(bossHpPercent)}%
              </p>
            </div>
          </Card>

          {/* Player Health */}
          <Card className="p-3 bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500">
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold text-sm">You</span>
                <span className="text-blue-300 font-bold text-xs">
                  {playerHp}/{playerMaxHp}
                </span>
              </div>
              <div className="bg-gray-800 rounded-full h-6 overflow-hidden border border-blue-600">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                  animate={{ width: `${Math.max(0, playerHpPercent)}%` }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-white/30 to-transparent"
                    animate={{
                      backgroundPosition: ["0% 0%", "100% 0%"],
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                </motion.div>
              </div>
              <p className="text-xs text-blue-300 text-right font-bold">
                {Math.round(playerHpPercent)}%
              </p>
            </div>
          </Card>
        </div>

        {/* Action Buttons - Interactive with Visual Feedback */}
        <div className="grid grid-cols-2 gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onAttack("attack");
            }}
          >
            <Button
              disabled={playerDefeated || bossDefeated}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-3 text-sm font-bold shadow-lg hover:shadow-red-500/50"
            >
              <Sword className="w-4 h-4 mr-2" />
              💥 Attack
            </Button>
            <p className="text-xs text-gray-400 mt-1 text-center">High Damage</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onDefend("defend");
            }}
          >
            <Button
              disabled={playerDefeated || bossDefeated}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 text-sm font-bold shadow-lg hover:shadow-blue-500/50"
            >
              <Shield className="w-4 h-4 mr-2" />
              🛡️ Defend
            </Button>
            <p className="text-xs text-gray-400 mt-1 text-center">-50% Damage</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onCounter("counter_myth");
            }}
          >
            <Button
              disabled={playerDefeated || bossDefeated}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 text-sm font-bold shadow-lg hover:shadow-green-500/50"
            >
              <Zap className="w-4 h-4 mr-2" />
              💡 Counter
            </Button>
            <p className="text-xs text-gray-400 mt-1 text-center">Wisdom-Based</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onCounter("use_companion");
            }}
          >
            <Button
              disabled={playerDefeated || bossDefeated}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-sm font-bold shadow-lg hover:shadow-purple-500/50"
            >
              <Zap className="w-4 h-4 mr-2" />
              🎁 Companion
            </Button>
            <p className="text-xs text-gray-400 mt-1 text-center">2-Turn CD</p>
          </motion.div>
        </div>

        {/* Victory Animation */}
        {bossDefeated && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white text-center space-y-4 border-2 border-green-300"
          >
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl"
            >
              🎉
            </motion.div>
            <div>
              <p className="text-2xl font-bold">VICTORY!</p>
              <p className="text-sm mt-1">Defeated {bossName} in {battleTurns} turns!</p>
            </div>
            <Button className="w-full bg-white text-green-600 hover:bg-gray-100 font-bold">
              <Trophy className="w-5 h-5 mr-2" />
              Claim Rewards
            </Button>
          </motion.div>
        )}

        {/* Defeat Animation */}
        {playerDefeated && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white text-center space-y-4 border-2 border-red-300"
          >
            <motion.div
              animate={{ scale: [1, 0.9, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-6xl"
            >
              💔
            </motion.div>
            <div>
              <p className="text-2xl font-bold">DEFEATED!</p>
              <p className="text-sm mt-1">Knocked out after {battleTurns} turns.</p>
              <p className="text-xs mt-2 opacity-90">Learn the myth counters and try again!</p>
            </div>
            <Button className="w-full bg-white text-red-600 hover:bg-gray-100 font-bold">
              Retry Battle
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
