import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ANIME_THEMES, AnimeTheme, DEFAULT_THEME } from '@/data/animeThemes';

interface ThemeStore {
  currentTheme: AnimeTheme;
  setTheme: (themeId: string) => void;
  applyTheme: (theme: AnimeTheme) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      currentTheme: DEFAULT_THEME,
      setTheme: (themeId: string) => {
        const theme = ANIME_THEMES[themeId];
        if (theme) {
          set({ currentTheme: theme });
          applyThemeToDOM(theme);
        }
      },
      applyTheme: (theme: AnimeTheme) => {
        set({ currentTheme: theme });
        applyThemeToDOM(theme);
      },
    }),
    {
      name: 'anime-theme-store',
    }
  )
);

export function applyThemeToDOM(theme: AnimeTheme) {
  const root = document.documentElement;
  root.style.setProperty('--primary', theme.colors.primary);
  root.style.setProperty('--secondary', theme.colors.secondary);
  root.style.setProperty('--accent', theme.colors.accent);
  root.style.setProperty('--background', theme.colors.background);
  root.style.setProperty('--foreground', theme.colors.foreground);
  root.style.setProperty('--card', theme.colors.card);
  root.style.setProperty('--muted', theme.colors.muted);
  root.style.setProperty('--gradient-main', theme.gradients.main);
  root.style.setProperty('--gradient-accent', theme.gradients.accent);
  root.style.setProperty('--shadow-theme', theme.shadow);
  
  // Apply anime-specific design elements
  root.style.setProperty('--pattern-background', theme.patterns.background || 'none');
  root.style.setProperty('--pattern-overlay', theme.patterns.overlay || 'none');
  
  // Apply border style classes to body
  document.body.classList.remove('anime-border-rounded', 'anime-border-sharp', 'anime-border-dashed', 'anime-border-double');
  document.body.classList.add(`anime-border-${theme.borderStyle}`);
  
  // Apply effects
  if (theme.effects.glow) {
    document.body.classList.add('theme-glow');
  } else {
    document.body.classList.remove('theme-glow');
  }
  
  if (theme.effects.glitch) {
    document.body.classList.add('theme-glitch');
  } else {
    document.body.classList.remove('theme-glitch');
  }
  
  if (theme.effects.blur) {
    document.body.classList.add('theme-blur');
  } else {
    document.body.classList.remove('theme-blur');
  }
  
  // Apply text effects to headings
  document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((el) => {
    el.classList.remove('anime-text-shadow', 'anime-text-outline');
    if (theme.typography.textEffect === 'shadow') {
      el.classList.add('anime-text-shadow');
    } else if (theme.typography.textEffect === 'outline') {
      el.classList.add('anime-text-outline');
    }
  });
}

// Initialize theme on app load
export function initializeTheme() {
  const store = useThemeStore.getState();
  applyThemeToDOM(store.currentTheme);
}
