import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ComicPanel from "./ComicPanel";
import { BookOpen, ChevronRight, Star, Lock } from "lucide-react";

interface Story {
  id: string;
  title: string;
  emoji: string;
  description: string;
  ageGroup: string[];
  unlocked: boolean;
  panels: {
    image: string;
    dialogue: string;
    position?: "left" | "right";
  }[];
}

const stories: Story[] = [
  {
    id: "veggie-heroes",
    title: "The Debate Team Challenge",
    emoji: "🎤",
    description: "Meet Alex, a competitive debate team member who discovers how nutrition fuels mental performance.",
    ageGroup: ["tweens", "teens"],
    unlocked: true,
    panels: [
      { image: "🧠", dialogue: "SETTING: Alex's high school debate competition. Alex has been crushing it all season, but lately can't seem to focus during practice. Coach notices Alex keeps stumbling over arguments. 'Your mind's not sharp today,' Coach says. Alex realizes—skipped lunch before practice, relying on energy drinks.", position: "left" },
      { image: "🥦", dialogue: "TURNING POINT: Coach reveals the secret: 'Elite debaters fuel their brains properly. Dark leafy greens like spinach contain iron and B-vitamins that boost mental clarity. I add them to every meal.' Alex starts eating more vegetables and notices better focus, faster thinking, and sharper rebuttals in competitions.", position: "right" },
      { image: "🏆", dialogue: "RESOLUTION: Three months later, Alex wins the regional debate championship. 'It wasn't just the vegetables,' Alex tells the team, 'but the combination—spinach for brain focus, broccoli for sustained energy, and variety for complete nutrition. Your diet is your competitive advantage.'", position: "left" },
    ],
  },
  {
    id: "breakfast-adventure",
    title: "Marcus and the Midterm Meltdown",
    emoji: "📚",
    description: "Follow Marcus through exam season as he discovers why breakfast changes everything.",
    ageGroup: ["tweens", "teens"],
    unlocked: true,
    panels: [
      { image: "😫", dialogue: "SETTING: It's midterm week. Marcus has been waking up late, rolling straight to school, skipping breakfast to sleep an extra 15 minutes. By second period, he's exhausted, can't focus during math class, and bombing his first two exams. 'I'm just not a morning person,' he tells himself.", position: "left" },
      { image: "🍳", dialogue: "INTERVENTION: His best friend Maya notices Marcus nodding off and drags him to breakfast one morning before their hardest exam. 'Just try it,' she says, getting him eggs, whole wheat toast, and fruit. Marcus is shocked—he actually feels alert and focused during the exam.", position: "right" },
      { image: "✅", dialogue: "TRANSFORMATION: For the final exams, Marcus commits to breakfast. His grades jump significantly. Beyond academics, he's less irritable, has better mood throughout the day, and feels in control. 'Breakfast isn't about willpower—it's about giving my brain actual fuel,' Marcus realizes.", position: "left" },
    ],
  },
  {
    id: "sugar-detective",
    title: "Jordan's Energy Drink Spiral",
    emoji: "🎢",
    description: "Jordan's quest to understand why the energy drinks were leaving them feeling worse.",
    ageGroup: ["tweens", "teens"],
    unlocked: true,
    panels: [
      { image: "⚡", dialogue: "SETTING: Jordan, a committed gamer and esports enthusiast, drinks energy drinks to stay 'in the zone' during competitions and gaming sessions. Feels amazing for 30 minutes, then crashes hard. Soon Jordan needs 3-4 drinks per day just to function, but the crashes are getting worse—shaky, irritable, can't sleep.", position: "left" },
      { image: "🔍", dialogue: "THE INVESTIGATION: Frustrated, Jordan reads the labels and is shocked. One energy drink contains 54g of sugar (more than a full day's recommended amount) plus 300mg of caffeine. Jordan researches and learns about blood sugar spikes, insulin crashes, and addiction cycles. 'I'm literally creating the energy crashes by drinking these.'", position: "right" },
      { image: "🎮", dialogue: "THE SOLUTION: Jordan switches to water, balanced meals with protein, and occasional fruits for natural energy. Performance in gaming actually IMPROVES because there are no more crashes disrupting focus. Sleep improves. The shaking stops. 'Better performance through better fuel, not stimulant hacks,' Jordan realizes.", position: "left" },
    ],
  },
  {
    id: "hydration-hero",
    title: "Priya's Athletic Comeback",
    emoji: "⚽",
    description: "Watch Priya discover how hydration transforms her soccer performance.",
    ageGroup: ["tweens", "teens"],
    unlocked: false,
    panels: [
      { image: "😓", dialogue: "SETTING: Priya's a talented soccer player but has been underperforming this season. She's slower, cramping up by the second half, and recovering poorly. She attributes it to being 'out of shape' and pushes herself harder in training, which only makes things worse. Her teammates seem fine, though.", position: "left" },
      { image: "💧", dialogue: "THE REALIZATION: Priya's sports medicine trainer does a quick check: 'You're chronically dehydrated. Even mild dehydration cuts athletic performance by 20%. Your muscles can't work efficiently, your brain fog slows your reaction time, and your body can't cool itself properly.' Priya starts drinking water strategically throughout the day and before/during/after play.", position: "right" },
      { image: "🏆", dialogue: "THE COMEBACK: Within two weeks, Priya notices she has more endurance, faster recovery between plays, and her cramps disappear entirely. She starts school with better focus too. 'Hydration is invisible,' she tells her team, 'but it's the foundation everything else builds on. Water is your most reliable performance tool.'", position: "left" },
    ],
  },
  {
    id: "rainbow-plate",
    title: "Sam's Skin and Energy Transformation",
    emoji: "🎨",
    description: "Sam learns how balanced eating changes everything—skin, energy, mood, and confidence.",
    ageGroup: ["tweens", "teens"],
    unlocked: false,
    panels: [
      { image: "😔", dialogue: "SETTING: Sam, a 16-year-old, is frustrated. Dealing with breakouts, low energy despite sleeping plenty, mood swings, and feeling generally 'blah.' Doctor rules out medical issues. A school nutritionist suggests: 'Your diet is mostly processed foods and simple carbs. Your body's missing the nutrients it needs for this critical growth stage.'", position: "left" },
      { image: "🥗", dialogue: "THE EXPERIMENT: Sam tries the 'rainbow plate' approach—half vegetables/fruits, quarter protein, quarter whole grains. Different colored foods provide different nutrients: orange carrots for vision, red tomatoes for heart health, purple berries for brain function, dark greens for iron. Sam researches WHY each color matters and gets engaged in the process.", position: "right" },
      { image: "✨", dialogue: "THE RESULTS: Three weeks in, Sam's skin starts clearing up. Energy levels stabilize. Mood improves noticeably. Friends ask if Sam's gotten sleep—the answer is just nutrition. 'I'm not restricting,' Sam realizes, 'I'm actually eating MORE food, just better choices. And I feel amazing because my body finally has what it needs.'", position: "left" },
    ],
  },
];

interface ComicStoriesProps {
  ageGroup: string;
}

const ComicStories = ({ ageGroup }: ComicStoriesProps) => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [completedStories, setCompletedStories] = useState<string[]>([]);

  const filteredStories = stories.filter(
    story => story.ageGroup.includes(ageGroup)
  );

  const handleComplete = () => {
    if (selectedStory && !completedStories.includes(selectedStory.id)) {
      setCompletedStories([...completedStories, selectedStory.id]);
    }
    setSelectedStory(null);
  };

  if (selectedStory) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setSelectedStory(null)}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to Stories
        </button>
        <ComicPanel
          title={selectedStory.title}
          panels={selectedStory.panels}
          onComplete={handleComplete}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block mb-2"
        >
          <BookOpen className="w-12 h-12 text-primary" />
        </motion.div>
        <h2 className="font-display text-2xl font-bold text-foreground">
          Food Comics! 📖
        </h2>
        <p className="text-sm text-muted-foreground">
          Learn about food through fun stories!
        </p>
      </div>

      {/* Progress */}
      <div className="bg-card rounded-2xl p-4 shadow-card">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-foreground">Stories Completed</span>
          <span className="text-sm text-muted-foreground">
            {completedStories.length}/{filteredStories.filter(s => s.unlocked).length}
          </span>
        </div>
        <div className="bg-muted rounded-full h-3">
          <motion.div
            className="h-full bg-gradient-to-r from-secondary to-primary rounded-full"
            animate={{
              width: `${(completedStories.length / filteredStories.filter(s => s.unlocked).length) * 100}%`
            }}
          />
        </div>
      </div>

      {/* Stories List */}
      <div className="space-y-3">
        {filteredStories.map((story, index) => {
          const isCompleted = completedStories.includes(story.id);
          
          return (
            <motion.button
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: story.unlocked ? 1.02 : 1 }}
              whileTap={{ scale: story.unlocked ? 0.98 : 1 }}
              onClick={() => story.unlocked && setSelectedStory(story)}
              disabled={!story.unlocked}
              className={`w-full bg-card rounded-3xl p-4 shadow-card text-left relative overflow-hidden ${
                !story.unlocked ? "opacity-60" : ""
              }`}
            >
              {!story.unlocked && (
                <div className="absolute inset-0 bg-muted/50 backdrop-blur-[1px] flex items-center justify-center z-10">
                  <div className="bg-foreground/10 rounded-full p-2">
                    <Lock className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-4">
                <motion.div
                  animate={story.unlocked ? { rotate: [-5, 5, -5] } : {}}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-14 h-14 bg-gradient-to-br from-kawaii-yellow/40 to-kawaii-pink/40 rounded-2xl flex items-center justify-center"
                >
                  <span className="text-3xl">{story.emoji}</span>
                </motion.div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-foreground">
                      {story.title}
                    </h3>
                    {isCompleted && (
                      <Star className="w-4 h-4 text-kawaii-yellow fill-kawaii-yellow" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {story.description}
                  </p>
                  <span className="text-xs bg-muted px-2 py-0.5 rounded-full mt-1 inline-block">
                    {story.panels.length} panels
                  </span>
                </div>
                
                {story.unlocked && (
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Unlock hint */}
      <div className="bg-accent/10 rounded-2xl p-4 text-center">
        <p className="text-sm text-muted-foreground">
          🔓 Complete quizzes and games to unlock more stories!
        </p>
      </div>
    </div>
  );
};

export default ComicStories;