import { motion } from "framer-motion";

interface AnimeMascotFeedbackProps {
  isOrganic: boolean;
  foodName: string;
  foodEmoji: string;
}

const mascotResponses = {
  organic: [
    "That's AMAZING! So organic! 🌟",
    "YES! You're making healthy choices! 💚",
    "Wow, organic power! Keep it up! ⚡",
    "Farm fresh vibes! I love it! 🌾",
    "YESSS! Green warrior energy! 🛡️",
    "Organic excellence! You're a legend! 👑",
  ],
  conventional: [
    "Good choice, but try organic next time! 💪",
    "That works, but go organic for more power! 🌱",
    "Nice! Mix in some organic options though! 🍃",
    "Cool, but organic would be more powerful! ✨",
    "Tasty! But let's aim for organic! 🎯",
  ],
};

export const AnimeMascotFeedback = ({
  isOrganic,
  foodName,
  foodEmoji,
}: AnimeMascotFeedbackProps) => {
  const responses = isOrganic
    ? mascotResponses.organic
    : mascotResponses.conventional;
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
    >
      {/* Mascot Container */}
      <div className="relative">
        {/* Power-up Effect for Organic */}
        {isOrganic && (
          <>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 2, opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 blur-2xl"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full border-2 border-green-400"
            />
          </>
        )}

        {/* Mascot Head */}
        <motion.div
          animate={isOrganic ? { y: [0, -10, 0] } : {}}
          transition={{ duration: 0.5, repeat: 2 }}
          className={`relative z-10 w-24 h-24 rounded-full flex items-center justify-center text-5xl
            ${
              isOrganic
                ? "bg-gradient-to-br from-green-400 to-emerald-500 shadow-lg shadow-green-400/50"
                : "bg-gradient-to-br from-yellow-400 to-orange-400 shadow-lg"
            }`}
        >
          ✨
        </motion.div>

        {/* Speech Bubble */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`absolute top-28 left-1/2 transform -translate-x-1/2 w-48 p-3 rounded-xl text-center text-sm font-bold text-white whitespace-wrap
            ${
              isOrganic
                ? "bg-gradient-to-r from-green-500 to-emerald-600"
                : "bg-gradient-to-r from-yellow-500 to-orange-600"
            } shadow-lg`}
        >
          <p>{randomResponse}</p>
          <div className="text-lg mt-1">{foodEmoji}</div>
        </motion.div>

        {/* Shine effect for organic */}
        {isOrganic && (
          <>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute top-2 left-4 w-3 h-3 bg-white rounded-full blur-sm"
            />
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              className="absolute top-8 right-2 w-2 h-2 bg-white rounded-full blur-sm"
            />
          </>
        )}
      </div>

      {/* Floating particles for organic */}
      {isOrganic && (
        <>
          <motion.div
            animate={{ y: -100, opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute left-0 top-0 text-2xl"
          >
            ✨
          </motion.div>
          <motion.div
            animate={{ y: -100, opacity: 0 }}
            transition={{ duration: 1.5, delay: 0.1 }}
            className="absolute right-0 top-0 text-2xl"
          >
            🌟
          </motion.div>
          <motion.div
            animate={{ y: -100, opacity: 0 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="absolute left-10 top-0 text-2xl"
          >
            💚
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default AnimeMascotFeedback;
