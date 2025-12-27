import React, { createContext, useContext, useState, useEffect } from 'react';

export type DietaryPreference = 'vegetarian' | 'non-vegetarian' | 'eggtarian';

export interface UserPreferences {
  allergies: string[];
  dietaryPreference: DietaryPreference;
}

interface PreferencesContextType {
  preferences: UserPreferences;
  setAllergies: (allergies: string[]) => void;
  setDietaryPreference: (preference: DietaryPreference) => void;
  addAllergy: (allergy: string) => void;
  removeAllergy: (allergy: string) => void;
  isLoading: boolean;
  canEat: (ingredients: string[], recipeAllergens?: string[]) => boolean;
  canEatFood: (foodName: string, ingredients?: string[]) => boolean;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

// Common allergens list
export const COMMON_ALLERGENS = [
  'Peanuts',
  'Tree nuts',
  'Milk/Dairy',
  'Eggs',
  'Fish',
  'Shellfish',
  'Wheat/Gluten',
  'Soy',
  'Sesame',
  'Mustard',
];

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    allergies: [],
    dietaryPreference: 'non-vegetarian',
  });
  const [isLoading, setIsLoading] = useState(true);

  // Load preferences from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('user_preferences');
      if (stored) {
        const parsed = JSON.parse(stored);
        setPreferences(parsed);
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('user_preferences', JSON.stringify(preferences));
    }
  }, [preferences, isLoading]);

  const setAllergies = (allergies: string[]) => {
    setPreferences((prev) => ({
      ...prev,
      allergies,
    }));
  };

  const setDietaryPreference = (preference: DietaryPreference) => {
    setPreferences((prev) => ({
      ...prev,
      dietaryPreference: preference,
    }));
  };

  const addAllergy = (allergy: string) => {
    setPreferences((prev) => ({
      ...prev,
      allergies: [...new Set([...prev.allergies, allergy])],
    }));
  };

  const removeAllergy = (allergy: string) => {
    setPreferences((prev) => ({
      ...prev,
      allergies: prev.allergies.filter((a) => a !== allergy),
    }));
  };

  // Check if user can eat based on ingredients and dietary preference
  const canEat = (ingredients: string[], recipeAllergens: string[] = []): boolean => {
    // Check for allergens
    const hasAllergen = preferences.allergies.some((allergy) =>
      ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(allergy.toLowerCase())
      ) ||
      recipeAllergens.some((allergen) =>
        allergy.toLowerCase().includes(allergen.toLowerCase())
      )
    );

    if (hasAllergen) return false;

    // Check dietary preferences
    const ingredientsLower = ingredients.map((i) => i.toLowerCase());

    if (preferences.dietaryPreference === 'vegetarian') {
      // Vegetarians don't eat meat or fish
      const meatKeywords = ['chicken', 'beef', 'pork', 'lamb', 'fish', 'salmon', 'tuna', 'meat'];
      return !meatKeywords.some((keyword) =>
        ingredientsLower.some((ing) => ing.includes(keyword))
      );
    }

    if (preferences.dietaryPreference === 'eggtarian') {
      // Eggtarians eat eggs and dairy but no meat/fish
      const meatKeywords = ['chicken', 'beef', 'pork', 'lamb', 'fish', 'salmon', 'tuna', 'meat'];
      return !meatKeywords.some((keyword) =>
        ingredientsLower.some((ing) => ing.includes(keyword))
      );
    }

    // Non-vegetarian can eat everything (if no allergens)
    return true;
  };

  // Check if user can eat a specific food
  const canEatFood = (foodName: string, ingredients: string[] = []): boolean => {
    const foodLower = foodName.toLowerCase();

    // List of vegetarian foods
    const vegetarianFoods = [
      'carrot',
      'spinach',
      'broccoli',
      'tomato',
      'banana',
      'apple',
      'cheese',
      'avocado',
      'quinoa',
      'greek yogurt',
      'sweet potato',
    ];

    // List of non-vegetarian foods
    const nonVegetarianFoods = ['chicken', 'salmon'];

    // Eggs and egg-based foods
    const eggFoods = ['eggs'];

    // Check if food contains allergens
    const hasAllergen = preferences.allergies.some((allergy) =>
      foodLower.includes(allergy.toLowerCase())
    );

    if (hasAllergen) return false;

    // Check dietary preference
    if (preferences.dietaryPreference === 'vegetarian') {
      if (nonVegetarianFoods.some((food) => foodLower.includes(food))) return false;
      if (eggFoods.some((food) => foodLower.includes(food))) return false;
      return true;
    }

    if (preferences.dietaryPreference === 'eggtarian') {
      if (nonVegetarianFoods.some((food) => foodLower.includes(food))) return false;
      return true; // Eggtarians can eat eggs
    }

    // Non-vegetarian can eat everything
    return true;
  };

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        setAllergies,
        setDietaryPreference,
        addAllergy,
        removeAllergy,
        isLoading,
        canEat,
        canEatFood,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = (): PreferencesContextType => {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};
