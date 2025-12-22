import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Plus, SkipBack } from "lucide-react";

interface AnimeMangaBuilderProps {
  onBack?: () => void;
}

const LESSON_TOPICS = [
  "Benefits of Vegetables",
  "Protein Sources",
  "Healthy Snacks",
  "Meal Planning",
  "Food Groups",
  "Hydration Importance",
];

const MANGA_PANELS = [
  {
    title: "Introduction",
    description: "Meet the main character learning about food",
  },
  {
    title: "The Challenge",
    description: "A nutrition problem to solve",
  },
  {
    title: "Discovery",
    description: "Learning the healthy solution",
  },
  {
    title: "Victory",
    description: "Success through good nutrition choices",
  },
];

export const AnimeMangaBuilder = ({ onBack }: AnimeMangaBuilderProps) => {
  const { t } = useTranslation();
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [mangaPanels, setMangaPanels] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [createdManga, setCreatedManga] = useState<
    Array<{ title: string; lesson: string; panels: string[] }>
  >([]);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateManga = () => {
    if (title.trim() && selectedLesson && mangaPanels.length > 0) {
      const newManga = {
        title,
        lesson: selectedLesson,
        panels: mangaPanels,
      };
      setCreatedManga([...createdManga, newManga]);
      setTitle("");
      setSelectedLesson(null);
      setMangaPanels([]);
      setIsCreating(false);
    }
  };

  const togglePanel = (panelName: string) => {
    if (mangaPanels.includes(panelName)) {
      setMangaPanels(mangaPanels.filter((p) => p !== panelName));
    } else {
      setMangaPanels([...mangaPanels, panelName]);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-pink-600 flex items-center gap-2">
          <BookOpen className="w-8 h-8" />
          Anime Manga Builder
        </h2>
        <Button onClick={onBack} variant="outline" size="sm">
          <SkipBack className="w-4 h-4" /> Back
        </Button>
      </div>

      {!isCreating ? (
        <div className="space-y-6">
          {/* Created Manga List */}
          {createdManga.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-4">Your Created Manga</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {createdManga.map((manga, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="p-4 border-2 border-pink-300 rounded-lg bg-pink-50"
                  >
                    <p className="text-lg font-bold text-pink-700">{manga.title}</p>
                    <p className="text-sm text-gray-600 mb-2">
                      Lesson: {manga.lesson}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {manga.panels.map((panel, pIdx) => (
                        <span
                          key={pIdx}
                          className="text-xs bg-pink-200 text-pink-800 px-2 py-1 rounded"
                        >
                          {panel}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Create New Button */}
          <Button
            onClick={() => setIsCreating(true)}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-6 text-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Manga Story
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Manga Creator Form */}
          <Card className="p-6">
            <h3 className="text-2xl font-bold mb-4">Create Your Food Manga</h3>

            {/* Title Input */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Your Manga Title
              </label>
              <input
                type="text"
                placeholder="e.g., The Quest for Healthy Eating"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
              />
            </div>

            {/* Lesson Selection */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Choose a Lesson Topic
              </label>
              <div className="grid grid-cols-2 gap-2">
                {LESSON_TOPICS.map((lesson) => (
                  <button
                    key={lesson}
                    onClick={() => setSelectedLesson(lesson)}
                    className={`p-3 rounded-lg font-semibold transition-all ${
                      selectedLesson === lesson
                        ? "bg-pink-500 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {lesson}
                  </button>
                ))}
              </div>
            </div>

            {/* Manga Panels Selection */}
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">
                Select Story Panels (min 2)
              </label>
              <div className="space-y-3">
                {MANGA_PANELS.map((panel) => (
                  <label
                    key={panel.title}
                    className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-pink-300 hover:bg-pink-50 transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={mangaPanels.includes(panel.title)}
                      onChange={() => togglePanel(panel.title)}
                      className="w-4 h-4 rounded mr-3"
                    />
                    <div>
                      <p className="font-semibold">{panel.title}</p>
                      <p className="text-sm text-gray-600">{panel.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Preview */}
            {title && selectedLesson && mangaPanels.length > 0 && (
              <Card className="p-4 bg-blue-50 mb-4 border-blue-300">
                <p className="text-sm text-gray-700">
                  <strong>Preview:</strong> Your manga"{title}" will teach about{" "}
                  {selectedLesson} with {mangaPanels.length} story panels!
                </p>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => {
                  setIsCreating(false);
                  setTitle("");
                  setSelectedLesson(null);
                  setMangaPanels([]);
                }}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateManga}
                disabled={!title.trim() || !selectedLesson || mangaPanels.length < 2}
                className="bg-pink-600 hover:bg-pink-700 text-white disabled:opacity-50"
              >
                Create Manga
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
