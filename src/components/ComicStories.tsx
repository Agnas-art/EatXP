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
    title: "Why Sharp Thinking Requires Proper Fuel",
    emoji: "🎤",
    description: "Alex's journey from mental fog to debate champion through nutrition.",
    ageGroup: ["tweens", "teens"],
    unlocked: true,
    panels: [
      { image: "🧠", dialogue: "Alex stands on the debate stage, but the words feel sluggish in her mind. 'What was I saying?' she mumbles, stumbling over her opening argument. Her coach watches from the audience, shaking his head. After the match, he pulls her aside: 'Your arguments are strong, but your mind isn't sharp today. Did you eat before this?'", position: "left" },
      { image: "🥦", dialogue: "'I skipped lunch,' Alex admits. Her coach nods knowingly. 'That's your problem. Elite athletes—and debaters are athletes too—fuel their brains. I add spinach, kale, and broccoli to every meal. They're packed with iron and B-vitamins that keep my mind razor-sharp during competitions. Try it for a week and see the difference.'", position: "right" },
      { image: "🏆", dialogue: "Three months later, Alex wins the regional championship. Her rebuttals are quick, her arguments airtight, her thinking clear. At the awards ceremony, she smiles: 'This trophy isn't just about studying harder. It's about fueling my brain properly. Vegetables aren't just healthy—they're my competitive advantage.'", position: "left" },
    ],
  },
  {
    id: "breakfast-adventure",
    title: "Why Skipping Breakfast Destroys Your Grades",
    emoji: "📚",
    description: "Marcus discovers the secret to exam success before it's too late.",
    ageGroup: ["tweens", "teens"],
    unlocked: true,
    panels: [
      { image: "😫", dialogue: "Marcus stares blankly at his math exam. The problems swim in front of his eyes. It's only 10 AM and he's already exhausted. 'I can't focus,' he thinks, putting his pencil down. Second period is even worse. By lunch, he's crashed so hard he can barely keep his eyes open. His first two midterm grades come back: D's.", position: "left" },
      { image: "🍳", dialogue: "His best friend Maya corners him the morning of their hardest exam. 'You're doing it again—no breakfast, looking like a zombie. Just try eating something with me.' She gets them eggs, whole wheat toast, and fruit. Alex protests but eats. During the exam, something's different. His mind is clear. He actually understands the questions.", position: "right" },
      { image: "✅", dialogue: "That exam? A-minus. Marcus decides to test it. Every morning of finals week, breakfast. His grades jump dramatically. By the end of the semester, he's not just passing—he's thriving. 'It's not about being naturally smart,' he tells Maya. 'It's about giving your brain actual fuel. Breakfast isn't optional—it's essential.'", position: "left" },
    ],
  },
  {
    id: "sugar-detective",
    title: "How Energy Drinks Created the Very Crashes They Promise to Fix",
    emoji: "🎢",
    description: "Jordan's descent and discovery: the hidden truth about energy addiction.",
    ageGroup: ["tweens", "teens"],
    unlocked: true,
    panels: [
      { image: "⚡", dialogue: "Jordan boots up the gaming PC, cracking open an energy drink. The buzz hits within minutes—suddenly faster reflexes, sharper focus, fully in the zone. 'This is what I need to compete,' Jordan thinks. But by the end of the gaming session, the crash is brutal. Shaky. Irritable. Can't concentrate. By next week, Jordan's drinking 3-4 drinks a day just to feel normal.", position: "left" },
      { image: "🔍", dialogue: "Frustrated by the constant crashes, Jordan actually reads the label. Fifty-four grams of sugar in one drink. Three hundred milligrams of caffeine. Jordan researches and feels sick. 'I'm literally creating these crashes on purpose. Sugar spikes my blood sugar, my body floods with insulin, then I crash harder than before. I'm stuck in a cycle.'", position: "right" },
      { image: "🎮", dialogue: "Jordan quits cold turkey. Water, balanced meals, real food. The first week is rough, but then—the shaking stops. Sleep comes easily. And here's the shocking part: gaming performance actually improves because there are no crashes disrupting focus. 'Better performance through actual fuel, not stimulant hacks,' Jordan realizes. 'This should be obvious, but nobody talks about it.'", position: "left" },
    ],
  },
  {
    id: "hydration-hero",
    title: "Why Dehydration Ruins Athletic Performance More Than Most People Realize",
    emoji: "⚽",
    description: "Priya's comeback story: the invisible fuel that changed everything.",
    ageGroup: ["tweens", "teens"],
    unlocked: false,
    panels: [
      { image: "😓", dialogue: "Priya used to dominate the soccer field. This season? She's sluggish by the second half, cramping up constantly, recovering slowly between matches. 'I must be out of shape,' she thinks, pushing herself harder in training. But it only makes things worse. Her teammates seem fine, but she's struggling. She chalks it up to being 'just tired.'", position: "left" },
      { image: "💧", dialogue: "The sports medicine trainer watches her practice and stops her after. 'You're chronically dehydrated. Most people don't realize that even being just 1% dehydrated cuts athletic performance by 20%. Your muscles can't work efficiently. Your reaction time slows. You overheat.' Priya's shocked. 'I drink sometimes...' The trainer shakes his head. 'Not strategic hydration. Before, during, after. Water is your foundation.'", position: "right" },
      { image: "🏆", dialogue: "Priya commits to proper hydration protocol. Two weeks later, she feels like her old self again. More endurance. Faster recovery. The cramps vanish. She makes the regional all-star team. In class, she notices she's sharper too, more focused. 'Hydration is invisible because we take it for granted,' she tells her teammates. 'But it's literally the foundation of everything else. Water is your most reliable performance tool.'", position: "left" },
    ],
  },
  {
    id: "rainbow-plate",
    title: "How Real Food Changes Skin, Energy, Mood, and Confidence",
    emoji: "🎨",
    description: "Sam's visible transformation through balanced, colorful eating.",
    ageGroup: ["tweens", "teens"],
    unlocked: false,
    panels: [
      { image: "😔", dialogue: "Sam looks in the mirror frustrated. Breakouts covering her forehead. Her energy is mysteriously low despite sleeping plenty. Her mood swings make her snap at friends over nothing. She Googles 'why am I so tired' and gets a hundred results, but nothing helps. Her doctor runs tests—everything comes back normal. 'Maybe you need to look at your diet,' the nutritionist suggests gently.", position: "left" },
      { image: "🥗", dialogue: "'Your body's missing nutrients,' the nutritionist explains. 'You're eating mostly processed foods and simple carbs. Your body's growing, your brain's developing, you need variety.' She introduces Sam to the rainbow plate concept: different colors, different nutrients. Orange carrots for vision. Red tomatoes for heart health. Purple berries for brain function. Dark greens for iron. Sam gets curious and actually engaged in learning WHY each color matters.", position: "right" },
      { image: "✨", dialogue: "Three weeks later, Sam's skin starts clearing noticeably. Energy stabilizes throughout the day—no more crashes. Her mood evens out. Friends ask if she's gotten more sleep or started skincare. The answer is just better food. 'I'm eating MORE than before, not less,' Sam realizes. 'I was restricting nutrients without knowing it. And I feel amazing because my body finally has what it needs to function properly.' Confidence returns naturally.", position: "left" },
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