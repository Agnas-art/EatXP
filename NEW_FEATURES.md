# EatXP - Latest Updates

## New Features Added

### 1. **Application Name Changed to EatXP**
- Updated `package.json` with new app name
- Updated `index.html` with new branding
- Updated all metadata and Open Graph tags

### 2. **Multi-Language Support (i18n)**
The application now supports 4 languages:
- **English** (en)
- **Spanish** (es)
- **French** (fr)
- **Japanese** (ja)

#### How It Works:
- Language preference is automatically detected from your browser settings
- Users can manually change the language using the **Language Selector** component
- Selected language preference is saved to `localStorage` and persists across sessions
- All UI text and translations are in `/src/i18n/locales/`

#### Implementation:
- Uses `i18next` and `react-i18next` libraries
- Configuration file: `/src/i18n/config.ts`
- Language files: `/src/i18n/locales/{en|es|fr|ja}.json`

### 3. **Language Selector Component**
A new UI component (`LanguageSelector.tsx`) allows users to easily switch between languages:
```tsx
import { LanguageSelector } from "@/components/LanguageSelector";

// Add to your navbar or settings
<LanguageSelector />
```

Features:
- Dropdown menu with flag emoji and language names
- Real-time language switching
- Persistent selection

### 4. **Voice Bot Assistant**
A fully functional voice bot (`VoiceBot.tsx`) that features:

#### Features:
- **Speech Recognition**: Click to speak - the bot listens to your voice commands
- **Text-to-Speech**: The bot responds with synthesized speech
- **Multi-language Support**: Works in all 4 supported languages
- **Interactive UI**: Shows user input and bot responses
- **Language Indicator**: Displays the current language mode

#### How to Use:
```tsx
import { VoiceBot } from "@/components/VoiceBot";

<VoiceBot />
```

#### Voice Bot Capabilities:
- Listens to user speech and converts it to text
- Processes voice commands
- Responds with spoken feedback
- Supports different languages based on selected language preference

#### Browser Requirements:
- Modern browser with Web Speech API support (Chrome, Edge, Safari, Firefox)
- Microphone permission required for speech recognition
- Speaker required for audio feedback

## File Structure

```
src/
├── components/
│   ├── LanguageSelector.tsx    (New - Language switcher)
│   ├── VoiceBot.tsx             (New - Voice assistant)
│   └── ... (existing components)
├── i18n/                        (New - Internationalization)
│   ├── config.ts               (i18n configuration)
│   └── locales/
│       ├── en.json             (English translations)
│       ├── es.json             (Spanish translations)
│       ├── fr.json             (French translations)
│       └── ja.json             (Japanese translations)
├── App.tsx                      (Updated - i18n provider added)
└── ... (existing files)
```

## Environment Setup

### Installed Dependencies:
```bash
npm install i18next react-i18next
```

### Configuration:
The app is configured to:
1. Initialize i18n on startup
2. Auto-detect browser language
3. Fall back to English if unsupported language
4. Save language preference to localStorage

## Usage Examples

### Using Translations in Components:
```tsx
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { t } = useTranslation();
  
  return <h1>{t("home.welcome")}</h1>;  // "Welcome to EatXP"
}
```

### Changing Language Programmatically:
```tsx
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { i18n } = useTranslation();
  
  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };
}
```

### Adding New Translations:
1. Add the key to all language files in `/src/i18n/locales/`
2. Use `t("key.path")` in your components

## Network Access

The application is available at:
- **Local**: `http://localhost:5173/`
- **Network**: `http://192.168.29.225:5173/`
- **Domain**: `http://EatEducation:5173/` (desktop only)

## Building & Running

```bash
# Build the application
npm run build

# Start development server
npm run dev

# Preview production build
npm run preview
```

## Browser Compatibility

- ✅ Chrome/Edge (Full support)
- ✅ Firefox (Full support)
- ✅ Safari (Full support for iOS 14+)
- ⚠️ IE11 (Not supported)

## Voice Bot Supported Languages

| Language | Code | Recognition | Synthesis |
|----------|------|-------------|-----------|
| English | en-US | ✅ | ✅ |
| Spanish | es-ES | ✅ | ✅ |
| French | fr-FR | ✅ | ✅ |
| Japanese | ja-JP | ✅ | ✅ |

## Troubleshooting

### Voice Bot Not Working:
1. Check browser console for errors
2. Ensure microphone permissions are granted
3. Verify Web Speech API is supported in your browser
4. Try a different browser if available

### Language Not Persisting:
- Check if localStorage is enabled
- Clear browser cache and try again
- Check developer console for errors

### Translation Missing:
- Ensure the translation key exists in all language files
- Check the key path in the component matches the JSON structure
- Verify the file is saved and the dev server has reloaded

## Next Steps

To integrate these components into your pages:

1. **Add Language Selector to Navigation**
   ```tsx
   import { LanguageSelector } from "@/components/LanguageSelector";
   // Add to your navbar
   ```

2. **Add Voice Bot to a Page**
   ```tsx
   import { VoiceBot } from "@/components/VoiceBot";
   // Add to your page
   ```

3. **Translate Existing Content**
   - Update translation keys in JSON files
   - Replace hardcoded strings with `t("key")`

## Support

For issues or questions about the new features, check:
- Browser console for errors
- Network tab for resource loading
- i18n configuration in `/src/i18n/config.ts`

---

**App Version**: EatXP v1.0
**Last Updated**: December 22, 2025
