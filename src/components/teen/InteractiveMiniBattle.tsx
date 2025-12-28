import { motion } from "framer-motion";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

interface MiniBattleProps {
  playerEmoji: string;
  enemyEmoji: string;
  enemyName: string;
  playerHp: number;
  playerMaxHp: number;
  enemyHp: number;
  enemyMaxHp: number;
  onAttack: (type: string) => void;
  onDefend: (type: string) => void;
  onCounter: (type: string) => void;
  isPlayerAttacking?: boolean;
  isEnemyAttacking?: boolean;
  battleType: "minion" | "quest";
  playerDefeated: boolean;
  enemyDefeated: boolean;
  turnCount: number;
  battleLog?: string[];
}

export function InteractiveMiniBattle({
  playerEmoji,
  enemyEmoji,
  enemyName,
  playerHp,
  playerMaxHp,
  enemyHp,
  enemyMaxHp,
  onAttack,
  onDefend,
  onCounter,
  isPlayerAttacking = false,
  isEnemyAttacking = false,
  battleType,
  playerDefeated,
  enemyDefeated,
  turnCount,
  battleLog = [],
}: MiniBattleProps) {
  const playerHpPercent = (playerHp / playerMaxHp) * 100;
  const enemyHpPercent = (enemyHp / enemyMaxHp) * 100;
  const [screenShake, setScreenShake] = useState(false);

  const triggerScreenShake = () => {
    setScreenShake(true);
    setTimeout(() => setScreenShake(false), 500);
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-black p-4 space-y-3 overflow-hidden ${
        screenShake ? "animate-pulse" : ""
      }`}
    >
      {/* Floating Particles on Attack */}
      {isPlayerAttacking &&
        Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`player-attack-${i}`}
            className="absolute text-2xl"
            initial={{
              x: "50%",
              y: "50%",
              opacity: 1,
            }}
            animate={{
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              opacity: 0,
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
          >
            ✨
          </motion.div>
        ))}

      {/* Battle Arena */}
      <div className="relative bg-gradient-to-b from-gray-800/70 to-gray-900/70 backdrop-blur rounded-xl border-2 border-red-500 p-8 h-80 overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Enemy - Left Side */}
        <motion.div
          className="absolute top-1/4 left-1/4 pointer-events-none"
          animate={{
            x: isEnemyAttacking ? -50 : 0,
            scale: isEnemyAttacking ? 1.15 : 1,
          }}
          transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
          onAnimationComplete={() => {
            if (isPlayerAttacking) triggerScreenShake();
          }}
        >
          <motion.div
            className="text-6xl filter drop-shadow-lg"
            animate={{
              rotate: isEnemyAttacking ? [0, -20, 20, -15, 0] : 0,
              filter: isEnemyAttacking
                ? "drop-shadow(0 0 25px rgba(255, 80, 80, 0.9))"
                : "drop-shadow(0 0 10px rgba(255, 80, 80, 0.4))",
            }}
            transition={{ duration: 0.7 }}
          >
            {enemyEmoji}
          </motion.div>
          <p className="text-white font-bold text-center mt-3 text-sm">
            {enemyName}
          </p>
        </motion.div>

        {/* Player - Right Side */}
        <motion.div
          className="absolute top-1/4 right-1/4 pointer-events-none"
          animate={{
            x: isPlayerAttacking ? 50 : 0,
            scale: isPlayerAttacking ? 1.15 : 1,
          }}
          transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
        >
          <motion.div
            className="text-6xl filter drop-shadow-lg"
            animate={{
              rotate: isPlayerAttacking ? [0, 20, -20, 15, 0] : 0,
              filter: isPlayerAttacking
                ? "drop-shadow(0 0 25px rgba(100, 200, 255, 0.9))"
                : "drop-shadow(0 0 10px rgba(100, 200, 255, 0.4))",
            }}
            transition={{ duration: 0.7 }}
          >
            {playerEmoji}
          </motion.div>
          <p className="text-white font-bold text-center mt-3 text-sm">You</p>
        </motion.div>

        {/* Attack Impact Animation */}
        {isPlayerAttacking && (
          <motion.div
            className="absolute top-1/3 left-1/2 text-4xl pointer-events-none"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 1.5, 0], opacity: [1, 1, 0] }}
            transition={{ duration: 0.6 }}
          >
            💥
          </motion.div>
        )}

        {isEnemyAttacking && (
          <motion.div
            className="absolute top-1/3 right-1/2 text-4xl pointer-events-none"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: [0, 1.5, 0], opacity: [1, 1, 0] }}
            transition={{ duration: 0.6 }}
          >
            🔥
          </motion.div>
        )}
      </div>

      {/* Health Bars */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-3 bg-red-900/60 border-red-500">
          <div className="space-y-1">
            <div className="flex justify-between items-center text-sm">
              <span className="text-red-200 font-bold">{enemyName}</span>
              <span className="text-red-300 text-xs">
                {Math.max(0, enemyHp)}/{enemyMaxHp}
              </span>
            </div>
            <div className="bg-gray-800 rounded-full h-5 overflow-hidden border border-red-600">
              <motion.div
                className="h-full bg-gradient-to-r from-red-600 to-orange-500"
                animate={{ width: `${Math.max(0, enemyHpPercent)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-xs text-red-300 text-right">
              {Math.round(enemyHpPercent)}%
            </p>
          </div>
        </Card>

        <Card className="p-3 bg-blue-900/60 border-blue-500">
          <div className="space-y-1">
            <div className="flex justify-between items-center text-sm">
              <span className="text-blue-200 font-bold">You</span>
              <span className="text-blue-300 text-xs">
                {playerHp}/{playerMaxHp}
              </span>
            </div>
            <div className="bg-gray-800 rounded-full h-5 overflow-hidden border border-blue-600">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                animate={{ width: `${Math.max(0, playerHpPercent)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-xs text-blue-300 text-right">
              {Math.round(playerHpPercent)}%
            </p>
          </div>
        </Card>
      </div>

      {/* Battle Log */}
      {battleLog.length > 0 && (
        <Card className="p-2 bg-gray-900/80 text-white border-gray-700 max-h-20 overflow-y-auto">
          <div className="space-y-0.5">
            {battleLog.slice(-4).map((log, idx) => (
              <p key={idx} className="text-xs text-gray-300 font-mono">
                {log}
              </p>
            ))}
          </div>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-2">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => {
              onAttack("attack");
            }}
            disabled={playerDefeated || enemyDefeated}
            className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-2 text-xs font-bold"
          >
            💥 Attack
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => {
              onDefend("defend");
            }}
            disabled={playerDefeated || enemyDefeated}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-2 text-xs font-bold"
          >
            🛡️ Defend
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => {
              onCounter("counter_myth");
            }}
            disabled={playerDefeated || enemyDefeated}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-2 text-xs font-bold"
          >
            💡 Counter
          </Button>
        </motion.div>
      </div>

      {/* Victory Animation */}
      {enemyDefeated && !playerDefeated && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="p-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white text-center space-y-2 border-2 border-green-300"
        >
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-4xl"
          >
            🎉
          </motion.div>
          <div>
            <p className="font-bold text-lg">Victory!</p>
            <p className="text-sm">Defeated {enemyName}!</p>
          </div>
        </motion.div>
      )}

      {/* Defeat Animation */}
      {playerDefeated && !enemyDefeated && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="p-4 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white text-center space-y-2 border-2 border-red-300"
        >
          <motion.div
            animate={{ scale: [1, 0.9, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-4xl"
          >
            💔
          </motion.div>
          <div>
            <p className="font-bold text-lg">Defeated!</p>
            <p className="text-sm">Try again!</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
