import { motion } from "framer-motion";
import { Share2 } from "lucide-react";

interface AchievementStickerProps {
  unlockedAchievements: Array<{
    id: string;
    name: string;
    emoji: string;
    description: string;
    title: string;
    badgeColor: string;
  }>;
  organicCount: number;
}

export const AchievementSticker = ({
  unlockedAchievements,
  organicCount,
}: AchievementStickerProps) => {
  const handleShare = async (achievement: any) => {
    const shareText = `🌱 I unlocked "${achievement.name}" by logging ${organicCount} organic foods in EatXP! ${achievement.emoji} Join me in choosing organic! #OrganicWarrior #FarmFreshHero`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `EatXP - ${achievement.name}`,
          text: shareText,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(shareText);
      alert("Achievement text copied to clipboard!");
    }
  };

  if (unlockedAchievements.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-400 rounded-2xl p-6"
    >
      <h3 className="text-2xl font-bold text-center mb-6">🏆 Your Achievements</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {unlockedAchievements.map((achievement, idx) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className={`bg-gradient-to-br ${achievement.badgeColor} rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer group relative overflow-hidden`}
          >
            {/* Shine effect */}
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 bg-white/20 pointer-events-none"
            />

            {/* Content */}
            <div className="relative z-10">
              <div className="text-5xl mb-2 animate-bounce">
                {achievement.emoji}
              </div>
              <h4 className="font-bold text-sm mb-1 text-gray-800">
                {achievement.name}
              </h4>
              <p className="text-xs text-gray-700 mb-3">
                {achievement.description}
              </p>

              {/* Share Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleShare(achievement)}
                className="flex items-center justify-center gap-1 bg-white/50 hover:bg-white text-gray-700 font-semibold py-1 px-2 rounded-lg transition-colors text-xs"
              >
                <Share2 className="w-3 h-3" />
                Share
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Motivational Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-center text-sm font-semibold text-amber-900"
      >
        <p>✨ You've logged {organicCount} organic foods! Keep it up! 🌱</p>
      </motion.div>
    </motion.div>
  );
};

export default AchievementSticker;
