import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import ja from './locales/ja.json';
import hi from './locales/hi.json';
import bn from './locales/bn.json';
import ta from './locales/ta.json';
import te from './locales/te.json';
import mr from './locales/mr.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
  fr: { translation: fr },
  ja: { translation: ja },
  hi: { translation: hi },
  bn: { translation: bn },
  ta: { translation: ta },
  te: { translation: te },
  mr: { translation: mr },
};

// Get saved language from localStorage or use browser language
const getSavedLanguage = () => {
  const saved = localStorage.getItem('language');
  if (saved) return saved;
  
  const browserLang = navigator.language.split('-')[0];
  return ['en', 'es', 'fr', 'ja', 'hi', 'bn', 'ta', 'te', 'mr'].includes(browserLang) ? browserLang : 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: getSavedLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
