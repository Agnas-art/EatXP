import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Flame, Heart, SkipBack } from "lucide-react";

interface BossBattleChallengesProps {
  onBack?: () => void;
}

const BOSS_BATTLES = [
  {
    id: 1,
    name: "Grease Oni",
    health: 100,
    question: "What happens to your arteries when you eat too much fried food?",
    options: [
      "They get clogged with plaque",
      "They become stronger",
      "They shrink",
    ],
    correct: 0,
    reward: 200,
    image: "😈",
  },
  {
    id: 2,
    name: "Processed Phantom",
    health: 80,
    question: "Which of these is NOT a benefit of eating whole grains?",
    options: [
      "Makes you tired",
      "Provides fiber",
      "Helps digestion",
    ],
    correct: 0,
    reward: 250,
    image: "👻",
  },
  {
    id: 3,
    name: "Sugar Sorcerer",
    health: 90,
    question: "How much added sugar should teens consume per day?",
    options: [
      "Less than 25 grams",
      "100 grams",
      "Unlimited",
    ],
    correct: 0,
    reward: 200,
    image: "🍭",
  },
  {
    id: 4,
    name: "Soda Specter",
    health: 70,
    question: "Why is drinking too much soda bad for your teeth?",
    options: [
      "Acid erodes tooth enamel",
      "It makes teeth whiter",
      "It helps with calcium",
    ],
    correct: 0,
    reward: 180,
    image: "🥤",
  },
];

export const BossBattleChallenges = ({ onBack }: BossBattleChallengesProps) => {
  const { t } = useTranslation();
  const [currentBoss, setCurrentBoss] = useState<number | null>(null);
  const [bossHealth, setBossHealth] = useState(0);
  const [battleLog, setBattleLog] = useState<string[]>([]);
  const [defeated, setDefeated] = useState<number[]>([]);

  const handleStartBattle = (bossId: number) => {
    const boss = BOSS_BATTLES.find((b) => b.id === bossId);
    if (boss) {
      setCurrentBoss(bossId);
      setBossHealth(boss.health);
      setBattleLog(["🎬 Battle Started! Answer correctly to defeat the boss!"]);
    }
  };

  const handleAnswer = (selectedIndex: number) => {
    const boss = BOSS_BATTLES.find((b) => b.id === currentBoss);
    if (!boss) return;

    const isCorrect = selectedIndex === boss.correct;
    if (isCorrect) {
      const newHealth = bossHealth - 25;
      setBossHealth(newHealth);
      setBattleLog((prev) => [
        ...prev,
        "✅ Correct! Your sword strikes true! 🗡️",
      ]);

      if (newHealth <= 0) {
        setBattleLog((prev) => [
          ...prev,
          `🎉 VICTORY! ${boss.name} defeated! +${boss.reward} XP earned!`,
        ]);
        setDefeated((prev) => [...prev, currentBoss as number]);
        setTimeout(() => {
          setCurrentBoss(null);
        }, 2000);
      }
    } else {
      setBattleLog((prev) => [
        ...prev,
        `❌ Wrong! The boss laughs at you! ${boss.name} counterattacks!`,
      ]);
      setBossHealth((prev) => Math.max(0, prev - 10));
      setTimeout(() => {
        setCurrentBoss(null);
      }, 2000);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-red-600 flex items-center gap-2">
          <Flame className="w-8 h-8" />
          Boss Battle Challenges
        </h2>
        <Button onClick={onBack} variant="outline" size="sm">
          <SkipBack className="w-4 h-4" /> Back
        </Button>
      </div>

      {currentBoss ? (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="space-y-6"
        >
          {/* Boss Health Bar */}
          <Card className="p-4 bg-red-100 border-red-300">
            <div className="flex items-center justify-center mb-4">
              <span className="text-6xl">
                {BOSS_BATTLES.find((b) => b.id === currentBoss)?.image}
              </span>
              <div className="ml-6 flex-1">
                <p className="font-bold text-lg">
                  {BOSS_BATTLES.find((b) => b.id === currentBoss)?.name}
                </p>
                <div className="bg-gray-300 rounded-full h-6 overflow-hidden">
                  <motion.div
                    className="h-full bg-red-500"
                    initial={{ width: "100%" }}
                    animate={{
                      width: `${Math.max(0, (bossHealth / BOSS_BATTLES.find((b) => b.id === currentBoss)?.health!) * 100)}%`,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-sm font-semibold">{Math.max(0, bossHealth)} HP</p>
              </div>
            </div>
          </Card>

          {/* Question */}
          <Card className="p-4 bg-blue-50">
            <p className="text-lg font-bold mb-4">
              {BOSS_BATTLES.find((b) => b.id === currentBoss)?.question}
            </p>
            <div className="space-y-2">
              {BOSS_BATTLES.find((b) => b.id === currentBoss)?.options.map(
                (option, idx) => (
                  <Button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className="w-full justify-start text-left"
                    variant="outline"
                  >
                    {String.fromCharCode(65 + idx)}. {option}
                  </Button>
                )
              )}
            </div>
          </Card>

          {/* Battle Log */}
          <Card className="p-4 bg-yellow-50 max-h-32 overflow-y-auto">
            {battleLog.map((log, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm font-semibold text-gray-700"
              >
                {log}
              </motion.p>
            ))}
          </Card>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BOSS_BATTLES.map((boss) => (
            <motion.div
              key={boss.id}
              whileHover={{ scale: 1.05 }}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                defeated.includes(boss.id)
                  ? "border-green-300 bg-green-50"
                  : "border-red-300 bg-red-50 hover:border-red-500"
              }`}
            >
              <div className="text-center">
                <p className="text-5xl mb-2">{boss.image}</p>
                <p className="text-xl font-bold text-red-700">{boss.name}</p>
                <p className="text-sm text-gray-600 mb-3">
                  <Heart className="inline w-4 h-4" /> {boss.health} HP
                </p>
                {defeated.includes(boss.id) ? (
                  <div className="text-green-700 font-bold">✅ DEFEATED</div>
                ) : (
                  <Button
                    onClick={() => handleStartBattle(boss.id)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    Battle Now
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
