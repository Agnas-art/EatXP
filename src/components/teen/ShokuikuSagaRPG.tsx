import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sword, MapPin, Users, SkipBack } from "lucide-react";

interface ShokuikuSagaRPGProps {
  onBack?: () => void;
}

const QUESTS = [
  {
    id: 1,
    name: "Vegetable Valley Rescue",
    description: "Help the farmers save the vegetable crops from decay",
    reward: 100,
    difficulty: "Easy",
    completed: false,
  },
  {
    id: 2,
    name: "Protein Peak Challenge",
    description: "Climb the mountain and learn about protein sources",
    reward: 250,
    difficulty: "Medium",
    completed: false,
  },
  {
    id: 3,
    name: "Sugar Swamp Mystery",
    description: "Discover why excessive sugar harms your health",
    reward: 300,
    difficulty: "Hard",
    completed: false,
  },
  {
    id: 4,
    name: "Hydration Haven",
    description: "Restore the water kingdom and learn about hydration",
    reward: 150,
    difficulty: "Easy",
    completed: false,
  },
];

export const ShokuikuSagaRPG = ({ onBack }: ShokuikuSagaRPGProps) => {
  const { t } = useTranslation();
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const [selectedQuest, setSelectedQuest] = useState<number | null>(null);
  const [quests, setQuests] = useState(QUESTS);

  const handleCompleteQuest = (questId: number) => {
    const quest = quests.find((q) => q.id === questId);
    if (quest && !quest.completed) {
      setXp((prev) => prev + quest.reward);
      if (xp + quest.reward >= level * 500) {
        setLevel((prev) => prev + 1);
        setXp(0);
      }
      setQuests((prev) =>
        prev.map((q) =>
          q.id === questId ? { ...q, completed: true } : q
        )
      );
      setSelectedQuest(null);
    }
  };

  const nextLevelXp = level * 500;
  const xpPercent = (xp / nextLevelXp) * 100;

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-purple-600 flex items-center gap-2">
            <Sword className="w-8 h-8" />
            Shokuiku Saga RPG
          </h2>
        </div>
        <Button onClick={onBack} variant="outline" size="sm">
          <SkipBack className="w-4 h-4" /> Back
        </Button>
      </div>

      {/* Character Stats */}
      <Card className="p-4 bg-gradient-to-r from-purple-100 to-pink-100">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold">Level: {level}</span>
            <span>👤 XP: {xp}/{nextLevelXp}</span>
          </div>
          <div className="bg-gray-300 rounded-full h-4 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ width: 0 }}
              animate={{ width: `${xpPercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </Card>

      {/* Quest Selection */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          Available Quests
        </h3>
        <div className="grid gap-3">
          {quests.map((quest) => (
            <motion.div
              key={quest.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedQuest(quest.id)}
              className={`p-4 rounded-lg cursor-pointer border-2 transition-all ${
                selectedQuest === quest.id
                  ? "border-purple-500 bg-purple-50"
                  : "border-gray-200 bg-white hover:border-purple-300"
              } ${quest.completed ? "opacity-50" : ""}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-bold text-lg">{quest.name}</p>
                  <p className="text-sm text-gray-600">{quest.description}</p>
                  <div className="flex gap-3 mt-2">
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${
                      quest.difficulty === "Easy" ? "bg-green-200 text-green-700" :
                      quest.difficulty === "Medium" ? "bg-yellow-200 text-yellow-700" :
                      "bg-red-200 text-red-700"
                    }`}>
                      {quest.difficulty}
                    </span>
                    <span className="text-xs font-semibold px-2 py-1 bg-blue-200 text-blue-700 rounded">
                      +{quest.reward} XP
                    </span>
                  </div>
                </div>
                {quest.completed && <span className="text-2xl">✅</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quest Details */}
      {selectedQuest && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-blue-50 rounded-lg border-2 border-blue-300"
        >
          <p className="mb-4 text-sm text-gray-700">
            Complete this quest to learn valuable nutrition facts and earn XP!
          </p>
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => setSelectedQuest(null)}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                handleCompleteQuest(selectedQuest)
              }
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Complete Quest
            </Button>
          </div>
        </motion.div>
      )}

      {/* Leaderboard */}
      <Card className="p-4 bg-gradient-to-r from-blue-100 to-purple-100">
        <h3 className="text-lg font-bold flex items-center gap-2 mb-3">
          <Users className="w-5 h-5" />
          Your Progress
        </h3>
        <p className="text-sm text-gray-700">
          Total Quests Completed: {quests.filter((q) => q.completed).length}/{quests.length}
        </p>
        <p className="text-sm text-gray-700">
          Total XP Earned: {xp + (level - 1) * 500}
        </p>
      </Card>
    </div>
  );
};
