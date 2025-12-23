# How to See the Anime Character Background Changes

## Quick Start - 3 Steps

### Step 1: Stop Any Running Dev Server
If you have a development server running, press `Ctrl+C` in the terminal to stop it.

### Step 2: Restart the Development Server
Run this command in the project directory:
```bash
npm run dev
# OR if you use bun
bun run dev
# OR if you use yarn
yarn dev
```

### Step 3: Hard Refresh Your Browser
- Press `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- This clears the cache and loads the latest changes

---

## What You Should See

Once the app loads:

1. **Log in** to your account
2. **Navigate to the home page** after logging in
3. **On the right side of the screen**, you'll see a **faded anime character image**:
   - The character matches your selected anime preference
   - It has a **smooth floating animation** (gently moving up and down)
   - There's a **gradient fade** from right to left for smooth integration
   - The character appears **behind all content** with ~12% opacity

---

## Customization Options

### Change the Character Visible in Background
1. Click the **👥 Character icon** in the header
2. Select a different anime character
3. The **background instantly updates** to show the new character

### Change the Theme
1. Click the **🎨 Palette icon** in the header
2. Select a different anime theme
3. The **character background updates** along with the color scheme

---

## Troubleshooting

### If You Still Can't See the Background:

1. **Check Browser Console for Errors**
   - Press `F12` to open DevTools
   - Click the **Console** tab
   - Look for any red error messages
   - Share these errors for debugging

2. **Verify Character Has an Image**
   - Open DevTools → Console
   - Type: `localStorage.getItem('auth_user')` 
   - Check if `characterId` is set

3. **Clear All Caches**
   ```bash
   # Stop the dev server (Ctrl+C)
   # Clear browser cache:
   # - Windows: Ctrl+Shift+Delete
   # - Mac: Cmd+Shift+Delete
   # Then restart: npm run dev
   ```

4. **Check Network Tab**
   - DevTools → Network tab
   - Reload page
   - Look for failed image loads
   - Character images come from MyAnimeList CDN

---

## Expected Behavior

| Action | Result |
|--------|--------|
| Login | Background appears with default Naruto character |
| Select different character | Background changes to that character immediately |
| Change theme | Background updates with theme colors |
| Scroll page | Background stays fixed in place (parallax effect) |
| Hover/click content | Works normally (background is non-interactive) |

---

## Technical Details

### Files Modified:
1. `src/components/AnimeCharacterBackground.tsx` - Background component
2. `src/pages/Index.tsx` - Home page integration
3. `src/components/AnimeThemeSelector.tsx` - Theme previews

### How It Works:
- Uses **fixed positioning** to stay in place while you scroll
- **z-index: 0** places it behind all content (header has z-index: 40)
- **Opacity: 12%** makes it subtle and non-distracting
- **Framer Motion** provides smooth animations
- **Gradient overlay** ensures text remains readable

---

## Still Having Issues?

Please provide:
1. Screenshot of what you see
2. Browser console errors (F12 → Console)
3. Your character selection (check header icon)
4. The anime theme you selected

This will help debug the issue quickly!
