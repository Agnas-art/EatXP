# 🎯 Dietary Preferences Feature - Quick Test Guide

## ✅ What You Should See

### 1. **User Profile Avatar Button** 
- **Location**: Top-right corner of the screen (after you're logged in)
- **What it is**: A circular button with your initials
- **Action**: Click it to open the user menu

### 2. **Dietary Preferences Button in Menu**
- **Location**: Opens when you click your avatar button
- **Label**: "🔧 Dietary Preferences" (with Settings icon)
- **Action**: Click it to open the preferences modal

### 3. **Dietary Preferences Modal**
- **Title**: "Dietary Preferences"
- **Two Sections**:
  - **🍽️ Dietary Preference** - Choose one:
    - 🥬 Vegetarian (No meat, fish, or eggs)
    - 🥚 Eggtarian (No meat or fish, but eggs allowed)
    - 🍗 Non-Vegetarian (All foods allowed)
  
  - **⚠️ Allergies** - Select any of these allergens:
    - Peanuts, Tree nuts, Milk/Dairy, Eggs, Fish, Shellfish, Wheat/Gluten, Soy, Sesame, Mustard

### 4. **Food Cards - Visual Filtering**
- **Before**: All food cards visible
- **After Setting Allergies/Preferences**: 
  - Non-matching foods will have 🚫 red alert icon in top-right
  - Opacity reduced (more transparent) for foods you can't eat
  - Example: If vegetarian, chicken card becomes faded with red alert

### 5. **Food Details Page - Dietary Warnings**
- **Location**: When you click on a food card
- **Shows**:
  - 🔴 Red warning banner if food conflicts with your preferences
  - Blue info banner showing your current preferences

## 🧪 Try This:

1. **Login to the app**
2. **Click your avatar (top-right)** - You should see your profile menu
3. **Click "Dietary Preferences"** - Modal should open
4. **Select dietary option** (e.g., "Vegetarian") 
5. **Select an allergy** (e.g., "Eggs")
6. **Click "Save Preferences"**
7. **Go back to home** - Food cards should update with visual indicators
8. **Click on a food** - You should see the dietary banner

## 🐛 If You Don't See Features:

1. **Hard Refresh**: Press `Ctrl+Shift+R` to clear cache
2. **Check Login**: Make sure you're logged in (avatar should appear)
3. **Check Console**: Open DevTools (F12) and look for errors
4. **Dev Server**: Make sure the dev server is running on http://localhost:5173/EatXP/

## 📍 Key Files Modified:
- `src/context/PreferencesContext.tsx` - Context provider
- `src/components/DietaryPreferencesModal.tsx` - Settings modal
- `src/components/UserProfile.tsx` - Added button to access settings
- `src/components/HealthyFoodHeroesDetail.tsx` - Shows warnings
- `src/components/FoodCard.tsx` - Visual filtering indicators
- `src/components/RecipeCard.tsx` - Recipe filtering
- `src/App.tsx` - Provider wrapper
