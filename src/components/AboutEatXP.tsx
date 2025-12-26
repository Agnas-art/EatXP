import { X } from "lucide-react";
import { motion } from "framer-motion";

interface AboutEatXPProps {
  onClose: () => void;
}

export const AboutEatXP = ({ onClose }: AboutEatXPProps) => {
  return (
    <div className="fixed inset-0 bg-black z-50 overflow-y-auto">
      {/* Animated background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-10 text-6xl opacity-10"
        >
          🍜
        </motion.div>
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-10 text-5xl opacity-10"
        >
          🍱
        </motion.div>
        <motion.div
          animate={{ float: [0, -20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/3 right-1/4 text-4xl opacity-20"
        >
          ✨
        </motion.div>
        <motion.div
          animate={{ float: [0, 20, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-1/3 left-1/4 text-4xl opacity-15"
        >
          🍜
        </motion.div>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-50 bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl w-full"
        >
          <div className="space-y-12 text-white">
            {/* Header */}
            <div className="text-center space-y-4 border-b border-white/20 pb-8">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl"
              >
                🍜✨
              </motion.div>
              <h1 className="text-5xl md:text-6xl font-display font-bold">About EatXP</h1>
            </div>

            {/* Main Description */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-6 text-lg leading-relaxed"
            >
              <p>
                EatXP is a fusion of anime and food education, designed to make learning about food fun, interactive, and unforgettable. Step into an anime-inspired world where cooking, nutrition, and culture come alive through gamified challenges, quests, and rewards.
              </p>

              <div className="space-y-4 pl-4 border-l-2 border-white/20">
                <div className="flex gap-4">
                  <span className="text-3xl">🎨</span>
                  <div>
                    <p className="font-bold text-xl mb-1">Anime Magic</p>
                    <p className="text-white/80">Explore vibrant characters and stories that bring food education to life.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-3xl">🍱</span>
                  <div>
                    <p className="font-bold text-xl mb-1">Learn & Play</p>
                    <p className="text-white/80">Discover recipes, nutrition tips, and food facts while leveling up your skills.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="text-3xl">🕹️</span>
                  <div>
                    <p className="font-bold text-xl mb-1">Gamified Fun</p>
                    <p className="text-white/80">Complete quests, earn rewards, and progress through exciting food adventures.</p>
                  </div>
                </div>
              </div>

              <p className="text-white/90 italic">
                EatXP isn't just an app—it's your journey to eat smarter, cook better, and enjoy food education in the most entertaining way possible.
              </p>
            </motion.div>

            {/* Founders Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="border-t border-white/20 pt-8 space-y-6"
            >
              <div className="text-center space-y-2">
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-5xl inline-block"
                >
                  👩‍🎓✨
                </motion.div>
                <h2 className="text-4xl font-display font-bold">Meet the Founders</h2>
              </div>

              <div className="space-y-4 text-white/90">
                <p>
                  Hi! We're <span className="font-bold text-white">Sangamithra</span> and <span className="font-bold text-white">Akshaya</span>, two grade 9 students who created EatXP.
                </p>

                <p>
                  We started EatXP because we love learning about food and wanted to share that knowledge in a way that feels fun and exciting. As students ourselves, we know that learning can sometimes feel boring, so we thought: why not make food education playful?
                </p>

                <p>
                  Anime is something many young people enjoy, so even though we're not anime experts, we decided to use its colorful style to make EatXP more relatable. By combining food education with anime-inspired design and gamified challenges, we built an app that turns learning into an adventure.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 pt-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/30 transition-colors"
                >
                  <p className="text-2xl mb-2">👩‍💼</p>
                  <p className="font-bold text-lg mb-2">Akshaya Srinivasan</p>
                  <p className="text-white/80 text-sm">
                    I focus on the food education side—exploring nutrition, health, and how food impacts our lives. I love understanding the science behind what we eat.
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/5 rounded-xl p-4 border border-white/10 hover:border-white/30 transition-colors"
                >
                  <p className="text-2xl mb-2">🎨</p>
                  <p className="font-bold text-lg mb-2">Sangamithra Srikandan</p>
                  <p className="text-white/80 text-sm">
                    I bring in the creative side and the concept—making sure EatXP feels engaging, interactive, informative, and connected to youth trends.
                  </p>
                </motion.div>
              </div>

              <p className="text-center text-white/90 pt-4">
                Together, we want EatXP to inspire people to eat smarter, learn better, and enjoy food education in a way that feels fresh, fun, and made for our generation.
              </p>
            </motion.div>

            {/* Footer decoration */}
            <div className="text-center text-4xl space-x-4 pt-4">
              <motion.span
                animate={{ rotate: [0, 20, -20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block"
              >
                🍜
              </motion.span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block"
              >
                💫
              </motion.span>
              <motion.span
                animate={{ rotate: [0, -20, 20, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block"
              >
                🍱
              </motion.span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
