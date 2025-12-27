import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Check } from "lucide-react";
import { usePreferences, COMMON_ALLERGENS, DietaryPreference } from "@/context/PreferencesContext";

interface DietaryPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DietaryPreferencesModal = ({ isOpen, onClose }: DietaryPreferencesModalProps) => {
  const { preferences, setAllergies, setDietaryPreference } = usePreferences();
  const [selectedAllergies, setSelectedAllergies] = useState<Set<string>>(
    new Set(preferences.allergies)
  );
  const [selectedDietaryPref, setSelectedDietaryPref] = useState<DietaryPreference>(
    preferences.dietaryPreference
  );

  const toggleAllergy = (allergy: string) => {
    const updated = new Set(selectedAllergies);
    if (updated.has(allergy)) {
      updated.delete(allergy);
    } else {
      updated.add(allergy);
    }
    setSelectedAllergies(updated);
  };

  const handleSave = () => {
    setAllergies(Array.from(selectedAllergies));
    setDietaryPreference(selectedDietaryPref);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-card border border-border rounded-2xl shadow-xl z-50 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Dietary Preferences</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="p-1 rounded-lg hover:bg-primary/10 transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Dietary Preference Section */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <span className="text-2xl">🍽️</span>
                  <span>Dietary Preference</span>
                </h3>
                <p className="text-sm text-muted-foreground">
                  Choose your dietary preference to personalize recipes and food recommendations
                </p>

                <div className="space-y-2">
                  {[
                    {
                      value: "vegetarian" as DietaryPreference,
                      label: "Vegetarian",
                      description: "No meat, fish, or eggs",
                      emoji: "🥬",
                    },
                    {
                      value: "eggtarian" as DietaryPreference,
                      label: "Eggtarian",
                      description: "No meat or fish, but eggs allowed",
                      emoji: "🥚",
                    },
                    {
                      value: "non-vegetarian" as DietaryPreference,
                      label: "Non-Vegetarian",
                      description: "All foods including meat and fish",
                      emoji: "🍗",
                    },
                  ].map((option) => (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedDietaryPref(option.value)}
                      className={`w-full p-4 rounded-xl border-2 transition-all ${
                        selectedDietaryPref === option.value
                          ? "border-primary bg-primary/10"
                          : "border-border bg-background hover:border-primary/50"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{option.emoji}</span>
                        <div className="flex-1 text-left">
                          <div className="font-semibold text-foreground">{option.label}</div>
                          <div className="text-sm text-muted-foreground">{option.description}</div>
                        </div>
                        {selectedDietaryPref === option.value && (
                          <Check className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Allergies Section */}
              <div className="space-y-3 pt-4 border-t border-border">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <span className="text-2xl">⚠️</span>
                  <span>Allergies</span>
                </h3>
                <p className="text-sm text-muted-foreground">
                  Select any allergies to filter out unsafe recipes and ingredients
                </p>

                <div className="grid grid-cols-2 gap-2">
                  {COMMON_ALLERGENS.map((allergy) => (
                    <motion.button
                      key={allergy}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => toggleAllergy(allergy)}
                      className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                        selectedAllergies.has(allergy)
                          ? "border-destructive bg-destructive/10 text-destructive"
                          : "border-border bg-background hover:border-border/80"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span>{allergy}</span>
                        {selectedAllergies.has(allergy) && (
                          <Check className="w-4 h-4" />
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>

                {selectedAllergies.size > 0 && (
                  <div className="mt-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <p className="text-sm text-destructive">
                      <strong>{selectedAllergies.size}</strong> allergen
                      {selectedAllergies.size !== 1 ? "s" : ""} selected. We'll filter recipes
                      accordingly.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-card border-t border-border p-6 flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="flex-1 px-4 py-3 rounded-lg border border-border text-foreground hover:bg-background transition-colors font-medium"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                className="flex-1 px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
              >
                Save Preferences
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
