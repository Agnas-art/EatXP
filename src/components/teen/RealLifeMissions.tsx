import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Zap, SkipBack, Plus } from "lucide-react";

interface RealLifeMissionsProps {
  onBack?: () => void;
}

const MISSION_TYPES = [
  {
    name: "Try New Food",
    description: "Taste something you've never eaten before",
    reward: 50,
    icon: "🍽️",
  },
  {
    name: "Log Your Meals",
    description: "Record what you eat for a whole day",
    reward: 75,
    icon: "📝",
  },
  {
    name: "Cook a Recipe",
    description: "Prepare a healthy recipe from scratch",
    reward: 100,
    icon: "👨‍🍳",
  },
  {
    name: "Drink Water Challenge",
    description: "Drink 8 glasses of water in a day",
    reward: 50,
    icon: "💧",
  },
  {
    name: "Exercise Daily",
    description: "Do 30 minutes of physical activity",
    reward: 60,
    icon: "🏃",
  },
  {
    name: "Garden Growing",
    description: "Grow vegetables in a garden or pot",
    reward: 120,
    icon: "🌱",
  },
];

interface Mission {
  id: number;
  type: string;
  completed: boolean;
  date: string;
  xpGained: number;
}

export const RealLifeMissions = ({ onBack }: RealLifeMissionsProps) => {
  const { t } = useTranslation();
  const [missions, setMissions] = useState<Mission[]>([]);
  const [totalXP, setTotalXP] = useState(0);
  const [level, setLevel] = useState(1);
  const [selectedMission, setSelectedMission] = useState<string | null>(null);

  const handleCompleteMission = (missionType: string) => {
    const missionTemplate = MISSION_TYPES.find((m) => m.name === missionType);
    if (!missionTemplate) return;

    const newMission: Mission = {
      id: Date.now(),
      type: missionType,
      completed: true,
      date: new Date().toLocaleDateString(),
      xpGained: missionTemplate.reward,
    };

    setMissions([...missions, newMission]);
    const newTotalXP = totalXP + missionTemplate.reward;
    setTotalXP(newTotalXP);

    if (newTotalXP >= level * 1000) {
      setLevel(level + 1);
    }

    setSelectedMission(null);
  };

  const todaysMissions = missions.filter(
    (m) => m.date === new Date().toLocaleDateString()
  );
  const thisWeekMissions = missions.filter((m) => {
    const missionDate = new Date(m.date);
    const today = new Date();
    const daysDiff =
      (today.getTime() - missionDate.getTime()) / (1000 * 60 * 60 * 24);
    return daysDiff < 7;
  });

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-yellow-600 flex items-center gap-2">
          <Zap className="w-8 h-8" />
          Real-Life Missions
        </h2>
        <Button onClick={onBack} variant="outline" size="sm">
          <SkipBack className="w-4 h-4" /> Back
        </Button>
      </div>

      {/* Character Level & XP */}
      <Card className="p-6 bg-gradient-to-r from-yellow-100 to-orange-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-yellow-700">{level}</p>
            <p className="text-sm text-gray-600">Character Level</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-700">{totalXP}</p>
            <p className="text-sm text-gray-600">Total XP</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-yellow-600">
              {todaysMissions.length}
            </p>
            <p className="text-sm text-gray-600">Today's Missions Completed</p>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-700 mb-2">
            XP to Next Level: {level * 1000 - totalXP}
          </p>
          <div className="bg-gray-300 rounded-full h-4 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-yellow-500 to-orange-500"
              initial={{ width: 0 }}
              animate={{
                width: `${Math.min((totalXP / (level * 1000)) * 100, 100)}%`,
              }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </Card>

      {/* Available Missions */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Available Missions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MISSION_TYPES.map((mission) => (
            <motion.div
              key={mission.name}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                selectedMission === mission.name
                  ? "border-yellow-500 bg-yellow-50"
                  : "border-gray-200 bg-white hover:border-yellow-300"
              }`}
              onClick={() => setSelectedMission(mission.name)}
            >
              <div className="flex items-start gap-3">
                <span className="text-4xl">{mission.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-lg">{mission.name}</p>
                  <p className="text-sm text-gray-600">{mission.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="font-semibold text-yellow-600">
                      +{mission.reward} XP
                    </span>
                  </div>
                </div>
              </div>

              {selectedMission === mission.name && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 flex gap-2"
                >
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedMission(null);
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCompleteMission(mission.name);
                    }}
                    className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white"
                    size="sm"
                  >
                    Complete Mission
                  </Button>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mission History */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h4 className="font-bold text-lg mb-3">Today's Completed</h4>
          {todaysMissions.length === 0 ? (
            <p className="text-gray-500 text-sm">No missions completed today</p>
          ) : (
            <div className="space-y-2">
              {todaysMissions.map((mission) => (
                <motion.div
                  key={mission.id}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  className="flex items-center justify-between p-2 bg-green-50 rounded"
                >
                  <span className="text-sm font-semibold">{mission.type}</span>
                  <span className="text-xs font-bold text-green-600">
                    +{mission.xpGained} XP
                  </span>
                </motion.div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-4">
          <h4 className="font-bold text-lg mb-3">This Week</h4>
          <p className="text-2xl font-bold text-blue-600 mb-2">
            {thisWeekMissions.length}
          </p>
          <p className="text-sm text-gray-600">missions completed</p>
          <p className="text-sm text-gray-600">
            {thisWeekMissions.reduce((sum, m) => sum + m.xpGained, 0)} XP earned
          </p>
        </Card>
      </div>
    </div>
  );
};
