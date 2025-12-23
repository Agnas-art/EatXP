# Anime Character Background Implementation

## Overview
The application now features dynamic anime character backgrounds that adapt based on the user's anime preference and selected character. This creates a more immersive and personalized learning experience.

## Features Implemented

### 1. **AnimeCharacterBackground Component** 
**Location:** `src/components/AnimeCharacterBackground.tsx`

A new reusable component that displays anime character images as backgrounds with the following features:
- **Dynamic Character Selection**: Displays characters based on user preference
- **Smooth Animations**: Includes floating/levitation animations powered by Framer Motion
- **Theme Integration**: Character backgrounds match the current theme colors
- **Glow Effects**: Optional glowing effects that sync with theme settings
- **Gradient Overlay**: Smooth gradient overlays ensure content remains readable
- **Responsive Positioning**: Supports left, center, and right positioning
- **Opacity Control**: Adjustable opacity to prevent overshadowing content

### 2. **Enhanced Index Page** 
**Location:** `src/pages/Index.tsx`

- Integrated `AnimeCharacterBackground` into the main home screen
- Background displays the user's selected character from their profile
- Positioned on the right side with subtle animations
- Opacity set to 12% to maintain content readability
- Background updates automatically when the user changes their character preference

### 3. **Updated Theme Selector** 
**Location:** `src/components/AnimeThemeSelector.tsx`

Enhanced the theme selector with:
- **Character Preview Cards**: Each theme card now displays a preview of the anime character background
- **Smart Character Matching**: Automatically matches theme with corresponding anime character
- **Larger Preview Cards**: Theme cards are now 256px tall to better showcase character images
- **Character Name Display**: Shows the character name alongside the theme
- **Background Info Section**: Educational information about anime character backgrounds
- **Visual Integration**: Theme colors and character images create cohesive visual experience

## User Flow

### Character Selection
1. User clicks the **Character Selector** button in the header
2. Selects their preferred anime character
3. Character is saved to user profile (`characterId`)
4. Background automatically updates on the main page

### Theme Selection
1. User clicks the **Theme Selector** button in the header
2. Sees theme cards with anime character background previews
3. Selects a theme to change both:
   - Application color scheme and effects
   - Associated anime character background
4. Theme preference is saved and applied globally

### Background Customization
The background appears with:
- **Floating Animation**: Smooth Y-axis movement (6-second cycle)
- **Glow Effect**: When enabled in theme (3-second pulse)
- **Gradient Fade**: Left-to-right gradient ensures content readability
- **Drop Shadow**: Enhanced shadow for depth and separation
- **Responsive Scaling**: Adjusts size based on screen size

## Technical Details

### Component Props
```typescript
interface AnimeCharacterBackgroundProps {
  characterId?: string;      // Character ID (defaults to "naruto")
  opacity?: number;          // Background opacity (0-1, default 0.15)
  scale?: number;            // Image scale multiplier (default 1)
  position?: "left" | "center" | "right"; // Positioning (default "right")
  animate?: boolean;         // Enable floating animation (default true)
}
```

### Animation Variants
- **Float Animation**: Subtle vertical movement (±20px over 6 seconds)
- **Glow Pulse**: Color-matched glow effect (20-40px range over 3 seconds)
- **Fade-in**: Initial opacity animation (1-second transition)

### Integration Points
- Uses existing `useThemeStore()` for theme colors
- Uses user's `characterId` from `AuthContext`
- Compatible with all existing theme styles
- Responsive design supports all screen sizes

## Benefits

1. **Enhanced User Engagement**: Anime characters create emotional connection
2. **Visual Personalization**: Backgrounds reflect user's anime preferences
3. **Consistency**: Backgrounds align with selected theme
4. **Accessibility**: Opacity and gradient overlays maintain readability
5. **Performance**: Lazy loading and optimized animations
6. **Responsive**: Works seamlessly on mobile and desktop

## Character Support

The following anime characters are available as backgrounds:
- 🧡 Naruto (Naruto)
- ❤️ Tanjiro (Demon Slayer)
- 💪 Deku (My Hero Academia)
- ⚔️ Eren (Attack on Titan)
- ✨ Yuji (Jujutsu Kaisen)
- ⚡ Goku (Dragon Ball)
- 🏴‍☠️ Luffy (One Piece)
- 🌙 Kaneki (Tokyo Ghoul)

Each character has a real anime character image sourced from MyAnimeList.

## Files Modified

1. **src/pages/Index.tsx**
   - Added `AnimeCharacterBackground` import
   - Integrated background component in main layout
   - Background uses user's selected character

2. **src/components/AnimeThemeSelector.tsx**
   - Added character preview to theme cards
   - Enhanced UI with larger cards (h-64)
   - Added character name display
   - Added background information section

## Files Created

1. **src/components/AnimeCharacterBackground.tsx**
   - New component for managing character backgrounds
   - Handles animations, positioning, and theming
   - Fully reusable and configurable

## Future Enhancements

Potential improvements could include:
- Parallax scrolling effects
- Character switching animations
- Multiple character combinations
- Dynamic background based on user activity/mood
- Customizable opacity per user preference
- Seasonal character rotations
