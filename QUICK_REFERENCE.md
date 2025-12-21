# 🎌 Quick Reference - Anime Features

## 🎨 Available Anime Themes

| Theme | Colors | Vibe |
|-------|--------|------|
| **Naruto** | Orange & Blue | Action/Adventure |
| **Demon Slayer** | Red & Purple | Dark Fantasy |
| **My Hero Academia** | Red & Blue | Heroic Energy |
| **Attack on Titan** | Green & Brown | Tactical |
| **Jujutsu Kaisen** | Purple & Magenta | Supernatural |
| **Dragon Ball** | Orange & Yellow | Classic Adventure |
| **One Piece** | Red & Navy | Pirate Adventure |
| **Tokyo Ghoul** | Dark Red & Black | Urban Dark |

## 🎤 Voice Commands

### Navigation Commands
- "Play games" → Open games hub
- "Games" → Open games hub
- "Read comics" → Open comic stories
- "Comics" → Open comic stories
- "Stories" → Open comic stories
- "Go home" → Return to home
- "Home" → Return to home
- "Back" → Return home

### Theme Commands
- "Change theme" → Open theme selector
- "Theme" → Open theme selector

## 🖱️ UI Controls

### Header Controls (left to right):
1. **FoodMascot + Title** - App branding
2. **Palette Icon** ← Theme Selector
3. **Microphone Icon** ← Voice Control
4. **Change Age Button** - Age selection

## 🚀 Getting Started

1. **Start the app:**
   ```bash
   npm run dev
   ```

2. **Open in browser:**
   - Local: http://localhost:8080/
   - Network: http://192.168.29.225:8080/

3. **Select age group** - Choose your age category

4. **Pick anime theme** - Click palette icon in header

5. **Use voice control** - Click microphone and speak commands

## 💾 Data Persistence

- **Theme selection** → Saved in browser localStorage
- **Persists across:** Browser restarts, page reloads, sessions

## 🔊 Voice Recognition Tips

- Works best in **Chrome/Edge/Brave browsers**
- Click microphone once to start listening
- Click again to stop listening
- Check browser permissions if no audio devices appear

## 📊 Component Structure

```
App
├── Index (home page)
│   ├── VoiceControlButton (microphone)
│   ├── AnimeThemeSelector (palette)
│   ├── FoodMascot
│   ├── AgeSelector
│   ├── GamesHub
│   ├── ComicStories
│   └── Recipe components
└── Theme Provider (useThemeStore)
```

## 🎯 Key Features

✅ 8 anime themes with custom color schemes  
✅ Real-time voice recognition & transcription  
✅ Automatic voice command detection  
✅ Smooth theme transitions  
✅ LocalStorage persistence  
✅ Full TypeScript support  
✅ Mobile responsive design  

## 🐛 Troubleshooting

**Microphone not working?**
- Check browser permissions
- Ensure https (or localhost)
- Works best in Chrome/Edge

**Theme not changing?**
- Clear browser cache
- Check localStorage is enabled
- Refresh page

**Voice commands not working?**
- Speak clearly and pause between commands
- Use exact keywords
- Check browser console for errors
