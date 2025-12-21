import { motion } from "framer-motion";
import { ArrowLeft, Lock, CheckCircle2, Trophy, Star } from "lucide-react";
import { useState } from "react";
import { ANIME_CHARACTERS } from "../data/animeCharacters";
import { STORY_CHAPTERS, StoryChapter } from "../data/storyChapters";
import Character3D from "./Character3D"; // Character3D is a default export

interface StoryModeProps {
  completedChapters: string[];
  currentCharacterId?: string;
  onBack: () => void;
  onChapterSelect?: (chapterId: string) => void;
}

const StoryMode = ({
  completedChapters,
  currentCharacterId,
  onBack,
  onChapterSelect,
}: StoryModeProps) => {
  const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
  const [showLessonModal, setShowLessonModal] = useState(false);

  const chapters = Object.values(STORY_CHAPTERS).sort((a, b) => a.number - b.number);
  const selectedChapterData = selectedChapter
    ? STORY_CHAPTERS[selectedChapter]
    : null;

  const characterData =
    currentCharacterId && ANIME_CHARACTERS[currentCharacterId]
      ? ANIME_CHARACTERS[currentCharacterId]
      : ANIME_CHARACTERS.naruto;

  const totalXP = chapters.reduce((sum, ch) => {
    if (completedChapters.includes(ch.id)) {
      return sum + ch.rewards.xp;
    }
    return sum;
  }, 0);

  const isChapterUnlocked = (chapterId: string) => {
    const chapter = STORY_CHAPTERS[chapterId];
    if (chapter.number === 1) return true;
    const prevChapter = chapters.find(c => c.number === chapter.number - 1);
    return prevChapter ? completedChapters.includes(prevChapter.id) : true;
  };

  const isChapterCompleted = (chapterId: string) =>
    completedChapters.includes(chapterId);

  if (selectedChapterData) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen bg-background pb-20"
      >
        {/* Header */}
        <header className="sticky top-0 bg-background/95 backdrop-blur-lg z-40 px-4 py-3 border-b border-border">
          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedChapter(null)}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </motion.button>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">Chapter {selectedChapterData.number}</p>
              <h2 className="font-display font-bold text-foreground truncate">
                {selectedChapterData.title}
              </h2>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 space-y-6">
          {/* Character Guide */}
          <div className="bg-card rounded-2xl p-4 shadow-card border border-border">
            <p className="text-xs text-muted-foreground mb-3">Your Guide</p>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-muted rounded-full overflow-hidden flex-shrink-0">
                <Character3D
                  character={characterData}
                  size="small"
                  autoRotate={true}
                />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-foreground">
                  {characterData.name}
                </h3>
                <p className="text-sm text-muted-foreground">{characterData.personality}</p>
              </div>
            </div>
          </div>

          {/* Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-card rounded-2xl p-4 shadow-card border border-border"
          >
            <p className="text-sm leading-relaxed text-foreground">
              "{selectedChapterData.narrative}"
            </p>
          </motion.div>

          {/* Comic Panels */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-3"
          >
            <h3 className="font-display font-bold text-foreground">📖 Story Panels</h3>
            {selectedChapterData.comicPanels.map((panel, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`flex gap-3 ${
                  panel.position === "right" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div className="text-4xl flex-shrink-0">{panel.emoji}</div>
                <div
                  className={`bg-card rounded-2xl p-3 flex-1 shadow-card border border-border ${
                    panel.position === "right" ? "rounded-tr-none" : "rounded-tl-none"
                  }`}
                >
                  <p className="text-sm text-foreground">{panel.dialogue}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Lesson */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-card rounded-2xl p-4 shadow-card border border-border space-y-3"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl flex-shrink-0">{selectedChapterData.lesson.emoji}</span>
              <div className="flex-1">
                <h3 className="font-display font-bold text-foreground">
                  {selectedChapterData.lesson.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedChapterData.lesson.duration}
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-foreground">
              {selectedChapterData.lesson.content}
            </p>
            <button
              onClick={() => setShowLessonModal(true)}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg font-semibold transition-colors"
            >
              📚 Learn More
            </button>
          </motion.div>

          {/* Unlocked Recipes */}
          {selectedChapterData.unlocksRecipes.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-3"
            >
              <h3 className="font-display font-bold text-foreground">🔓 Unlocked Recipes</h3>
              <div className="grid grid-cols-2 gap-3">
                {selectedChapterData.unlocksRecipes.map((recipe, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="bg-card rounded-xl p-3 shadow-card border border-border text-center cursor-pointer hover:bg-muted transition-colors"
                  >
                    <div className="text-3xl mb-2">{recipe.emoji}</div>
                    <p className="font-display font-bold text-sm text-foreground">
                      {recipe.title}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Rewards */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-4 border border-primary/20 space-y-3"
          >
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              <h3 className="font-display font-bold text-foreground">Chapter Rewards</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-card rounded-lg p-3 text-center">
                <Star className="w-5 h-5 text-kawaii-yellow mx-auto mb-1" />
                <p className="text-xs text-muted-foreground">XP</p>
                <p className="font-display font-bold text-foreground">
                  +{selectedChapterData.rewards.xp}
                </p>
              </div>
              {selectedChapterData.rewards.badge && (
                <div className="bg-card rounded-lg p-3 text-center">
                  <p className="text-2xl mb-1">🏆</p>
                  <p className="text-xs text-muted-foreground">Badge</p>
                  <p className="font-display font-bold text-foreground text-xs">
                    {selectedChapterData.rewards.badge}
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Action Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              onChapterSelect?.(selectedChapterData.id);
              setSelectedChapter(null);
            }}
            className="w-full py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-display font-bold rounded-xl transition-colors"
          >
            {isChapterCompleted(selectedChapterData.id)
              ? "✅ Chapter Complete!"
              : "🎮 Start Chapter"}
          </motion.button>
        </main>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-background pb-20"
    >
      {/* Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-lg z-40 px-4 py-3 border-b border-border">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </motion.button>
          <div className="flex-1">
            <h2 className="font-display font-bold text-foreground">📖 Story Mode</h2>
            <p className="text-xs text-muted-foreground">
              {completedChapters.length} / {chapters.length} Chapters
            </p>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6">
        {/* Progress Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-4 border border-primary/20"
        >
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-xs text-muted-foreground">Chapters</p>
              <p className="font-display font-bold text-lg text-foreground">
                {completedChapters.length}/{chapters.length}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total XP</p>
              <p className="font-display font-bold text-lg text-primary">{totalXP}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Progress</p>
              <p className="font-display font-bold text-lg text-secondary">
                {Math.round((completedChapters.length / chapters.length) * 100)}%
              </p>
            </div>
          </div>
          <div className="mt-3 h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${(completedChapters.length / chapters.length) * 100}%`,
              }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
            />
          </div>
        </motion.div>

        {/* Chapters Grid */}
        <div className="space-y-3">
          <h3 className="font-display font-bold text-foreground">Chapters</h3>
          <div className="space-y-2">
            {chapters.map((chapter, idx) => {
              const isUnlocked = isChapterUnlocked(chapter.id);
              const isCompleted = isChapterCompleted(chapter.id);

              return (
                <motion.div
                  key={chapter.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={isUnlocked ? { scale: 1.02 } : {}}
                  onClick={() => isUnlocked && setSelectedChapter(chapter.id)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    !isUnlocked
                      ? "bg-muted/30 border-border opacity-50 cursor-not-allowed"
                      : "bg-card border-border hover:bg-card/80 shadow-card"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isCompleted ? (
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-6 h-6 text-primary" />
                      </div>
                    ) : isUnlocked ? (
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 font-display font-bold text-foreground">
                        {chapter.number}
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <Lock className="w-5 h-5 text-muted-foreground" />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-foreground truncate">
                        {chapter.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        📚 {chapter.lesson.title} • +{chapter.rewards.xp} XP
                      </p>
                    </div>

                    {chapter.rewards.badge && !isCompleted && (
                      <div className="text-xl flex-shrink-0">🏆</div>
                    )}
                    {isUnlocked && !isCompleted && (
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-muted-foreground"
                      >
                        →
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Story Tips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl p-4 shadow-card border border-border"
        >
          <p className="text-xs font-bold text-foreground mb-2">💡 Tip</p>
          <p className="text-sm text-muted-foreground">
            Complete each chapter to unlock new recipes and badges! Your anime character guide will help you learn nutrition secrets
            and cooking skills.
          </p>
        </motion.div>
      </main>
    </motion.div>
  );
};

export default StoryMode;
