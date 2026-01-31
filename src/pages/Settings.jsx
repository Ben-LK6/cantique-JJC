import { useState, useEffect } from 'react';
import { Palette, Volume2, Type, Globe, Moon, Sun, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { t } from '../data/translations';
import { applyThemeColors, changeTheme } from '../utils/themeUtils';

const Settings = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'lightblue');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('fontSize') || 'medium');
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'fr');
  const [audioEnabled, setAudioEnabled] = useState(() => localStorage.getItem('audioEnabled') !== 'false');
  const [showSaved, setShowSaved] = useState(false);
  const [savedEmoji, setSavedEmoji] = useState('✨');

  // Appliquer le thème initial
  useEffect(() => {
    applyTheme(theme);
  }, []);

// Remplace TOUS les useEffect par ceux-ci :

  useEffect(() => {
    if (localStorage.getItem('theme') !== theme) {
      changeTheme(theme);
      let emoji = '🎨';
      if (theme === 'blue' || theme === 'lightblue') emoji = '💙';
      if (theme === 'green') emoji = '💚';
      if (theme === 'purple') emoji = '💜';
      if (theme === 'red') emoji = '❤️';
      if (theme === 'orange') emoji = '🧡';
      if (theme === 'pink') emoji = '💖';
      showSavedMessage(emoji);
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    if (localStorage.getItem('darkMode') !== String(darkMode)) {
      localStorage.setItem('darkMode', darkMode);
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      showSavedMessage(darkMode ? '🌙' : '☀️');
    }
  }, [darkMode]);

  useEffect(() => {
    if (localStorage.getItem('fontSize') !== fontSize) {
      localStorage.setItem('fontSize', fontSize);
      let emoji = '🔠';
      if (fontSize === 'small') emoji = '🔡';
      if (fontSize === 'medium') emoji = '🔠';
      if (fontSize === 'large') emoji = '🔤';
      showSavedMessage(emoji);
    }
  }, [fontSize]);

  useEffect(() => {
    if (localStorage.getItem('language') !== language) {
      localStorage.setItem('language', language);
      showSavedMessage(language === 'fr' ? '🇫🇷' : '🇬🇧');
    }
  }, [language]);

  useEffect(() => {
    if (localStorage.getItem('audioEnabled') !== String(audioEnabled)) {
      localStorage.setItem('audioEnabled', audioEnabled);
      showSavedMessage(audioEnabled ? '🔊' : '🔇');
    }
  }, [audioEnabled]);

  const applyTheme = applyThemeColors;

  const showSavedMessage = (emoji = '✨') => {
    setSavedEmoji(emoji);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 900);
  };

  const themes = [
    { name: 'Bleu', value: 'blue', color: 'bg-blue-600' },
    { name: 'Vert', value: 'green', color: 'bg-green-600' },
    { name: 'Violet', value: 'purple', color: 'bg-purple-600' },
    { name: 'Rouge', value: 'red', color: 'bg-red-600' },
    { name: 'Orange', value: 'orange', color: 'bg-orange-600' },
    { name: 'Rose', value: 'pink', color: 'bg-pink-600' },
    { name: 'Bleu clair', value: 'lightblue', color: 'bg-sky-600' },
  ];

  const fontSizes = [
    { name: t('small'), value: 'small' },
    { name: t('medium'), value: 'medium' },
    { name: t('large'), value: 'large' },
  ];

  const languages = [
    { name: 'Français', value: 'fr', flag: '🇫🇷' },
    { name: 'English', value: 'en', flag: '🇬🇧' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col pb-24">
      {/* Message de sauvegarde */}
      {showSaved && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 dark:bg-gray-800/90 text-green-600 dark:text-green-400 px-5 py-2 rounded-full shadow-lg flex items-center gap-2 border border-green-200 dark:border-green-700 text-2xl"
        >
          <span aria-label="Succès" title="Succès">{savedEmoji}</span>
        </motion.div>
      )}

      {/* Message d'accueil personnalisé */}
      <div className="w-full max-w-lg mx-auto pt-6 px-2 sm:px-0">
        <div className="mb-6 rounded-2xl bg-gradient-to-r from-primary-50 to-primary-100 dark:from-gray-800 dark:to-gray-700 shadow-sm border border-primary-100 dark:border-gray-700 flex items-center gap-3 px-5 py-4">
          <span className="text-3xl">⚙️</span>
          <div>
            <div className="font-bold text-lg text-primary-700 dark:text-primary-200">Paramètres de l’application Cantique</div>
            <div className="text-sm text-primary-600 dark:text-primary-300">Modifiez l’apparence, la langue ou le son selon vos besoins pour une utilisation optimale.</div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center p-0">
        <div className="w-full max-w-lg flex flex-col gap-5 py-2 px-2 sm:px-0">
          {/* Thème de couleur */}
          <section className="rounded-2xl bg-white dark:bg-gray-800 shadow border border-gray-100 dark:border-gray-700 px-5 py-4 flex flex-col gap-2">
            <div className="flex items-center gap-3 mb-2">
              <Palette className="text-primary-600 dark:text-primary-400" size={18} />
              <span className="font-semibold text-gray-800 dark:text-gray-100 text-base">{t('colorTheme')}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {themes.map(t => (
                <button
                  key={t.value}
                  onClick={() => setTheme(t.value)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all focus:outline-none ${theme === t.value ? 'border-primary-600 ring-2 ring-primary-200' : 'border-gray-200 dark:border-gray-600'}`}
                  aria-label={t.name}
                  style={{ background: `var(--color-primary-50)` }}
                >
                  <span className={`block w-5 h-5 rounded-full ${t.color}`}></span>
                </button>
              ))}
            </div>
          </section>

          {/* Mode sombre */}
          <section className="rounded-2xl bg-white dark:bg-gray-800 shadow border border-gray-100 dark:border-gray-700 px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon className="text-primary-600 dark:text-primary-400" size={18} /> : <Sun className="text-primary-600 dark:text-primary-400" size={18} />}
              <span className="font-semibold text-gray-800 dark:text-gray-100 text-base">{t('darkMode')}</span>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative w-12 h-7 rounded-full transition-colors ${darkMode ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'}`}
              aria-label="Toggle dark mode"
            >
              <motion.div
                animate={{ x: darkMode ? 20 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow"
              ></motion.div>
            </button>
          </section>

          {/* Taille de la police */}
          <section className="rounded-2xl bg-white dark:bg-gray-800 shadow border border-gray-100 dark:border-gray-700 px-5 py-4 flex flex-col gap-2">
            <div className="flex items-center gap-3 mb-2">
              <Type className="text-primary-600 dark:text-primary-400" size={18} />
              <span className="font-semibold text-gray-800 dark:text-gray-100 text-base">{t('fontSize')}</span>
            </div>
            <div className="flex gap-2">
              {fontSizes.map(fs => (
                <button
                  key={fs.value}
                  onClick={() => setFontSize(fs.value)}
                  className={`px-4 py-1.5 rounded-full border text-sm font-semibold transition-all focus:outline-none ${fontSize === fs.value ? 'bg-primary-600 text-white border-primary-600' : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200'}`}
                >
                  {fs.name}
                </button>
              ))}
            </div>
          </section>

          {/* Langue */}
          <section className="rounded-2xl bg-white dark:bg-gray-800 shadow border border-gray-100 dark:border-gray-700 px-5 py-4 flex flex-col gap-2">
            <div className="flex items-center gap-3 mb-2">
              <Globe className="text-primary-600 dark:text-primary-400" size={18} />
              <span className="font-semibold text-gray-800 dark:text-gray-100 text-base">{t('interfaceLanguage')}</span>
            </div>
            <div className="flex gap-2">
              {languages.map(lang => (
                <button
                  key={lang.value}
                  onClick={() => setLanguage(lang.value)}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-semibold transition-all focus:outline-none ${language === lang.value ? 'bg-primary-600 text-white border-primary-600' : 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200'}`}
                >
                  <span className="text-lg">{lang.flag}</span> {lang.name}
                </button>
              ))}
            </div>
          </section>

          {/* Audio */}
          <section className="rounded-2xl bg-white dark:bg-gray-800 shadow border border-gray-100 dark:border-gray-700 px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Volume2 className="text-primary-600 dark:text-primary-400" size={18} />
              <span className="font-semibold text-gray-800 dark:text-gray-100 text-base">{t('tonalitySound')}</span>
            </div>
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className={`relative w-12 h-7 rounded-full transition-colors ${audioEnabled ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'}`}
              aria-label="Toggle audio"
            >
              <motion.div
                animate={{ x: audioEnabled ? 20 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow"
              ></motion.div>
            </button>
          </section>

          {/* Informations */}
          <section className="rounded-2xl bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 border border-primary-100 dark:border-gray-700 px-5 py-4 mt-2 shadow flex flex-col gap-1">
            <h3 className="text-base font-bold text-primary-800 mb-1">{t('appVersion')}</h3>
            <p className="text-primary-700 font-semibold text-sm">{t('appTitle')} v1.0.0</p>
            <p className="text-primary-600 text-xs mt-1">{t('lastUpdate')} : Novembre 2025</p>
          </section>
          

        </div>
      </div>
    </div>
  );
};

export default Settings;