import { useState, useEffect } from 'react';
import { Palette, Volume2, Type, Globe, Moon, Sun, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { t } from '../data/translations';
import { applyThemeColors, changeTheme } from '../utils/themeUtils';

const Settings = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'blue');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('fontSize') || 'medium');
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'fr');
  const [audioEnabled, setAudioEnabled] = useState(() => localStorage.getItem('audioEnabled') !== 'false');
  const [showSaved, setShowSaved] = useState(false);

  // Appliquer le thème initial
  useEffect(() => {
    applyTheme(theme);
  }, []);

// Remplace TOUS les useEffect par ceux-ci :

useEffect(() => {
  if (localStorage.getItem('theme') !== theme) {
    changeTheme(theme);
    showSavedMessage();
    // Recharger immédiatement
    setTimeout(() => {
      window.location.reload();
    }, 100);
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
    showSavedMessage();
    // Recharger après 1 seconde
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}, [darkMode]);

useEffect(() => {
  if (localStorage.getItem('fontSize') !== fontSize) {
    localStorage.setItem('fontSize', fontSize);
    showSavedMessage();
    // Pas besoin de recharger pour la taille de police
  }
}, [fontSize]);

useEffect(() => {
  if (localStorage.getItem('language') !== language) {
    localStorage.setItem('language', language);
    showSavedMessage();
    // Recharger après 1 seconde pour appliquer les traductions
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
}, [language]);

useEffect(() => {
  if (localStorage.getItem('audioEnabled') !== String(audioEnabled)) {
    localStorage.setItem('audioEnabled', audioEnabled);
    showSavedMessage();
  }
}, [audioEnabled]);

  const applyTheme = applyThemeColors;

  const showSavedMessage = () => {
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 1000);
  };

  const themes = [
    { name: 'Bleu', value: 'blue', color: 'bg-blue-600' },
    { name: 'Vert', value: 'green', color: 'bg-green-600' },
    { name: 'Violet', value: 'purple', color: 'bg-purple-600' },
    { name: 'Rouge', value: 'red', color: 'bg-red-600' },
    { name: 'Orange', value: 'orange', color: 'bg-orange-600' },
    { name: 'Rose', value: 'pink', color: 'bg-pink-600' },
    { name: 'Indigo', value: 'indigo', color: 'bg-indigo-600' },
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-24">
      {/* Message de sauvegarde */}
      {showSaved && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
        >
          <CheckCircle size={20} />
          <span className="font-semibold">{t('reloading')}</span>
        </motion.div>
      )}

      {/* Contenu */}
      <div className="p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          
          {/* Thème de couleur */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-xl flex items-center justify-center">
                <Palette className="text-primary-600 dark:text-primary-400" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{t('colorTheme')}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs">{t('customizeAppearance')}</p>
              </div>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-7 gap-3">
              {themes.map(t => (
                <motion.button
                  key={t.value}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setTheme(t.value)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                    theme === t.value 
                      ? 'border-primary-600 bg-primary-50 dark:bg-gray-700 dark:border-primary-400 shadow-md' 
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full ${t.color} shadow-lg ${theme === t.value ? 'ring-4 ring-primary-200' : ''}`}></div>
                  <span className={`text-xs font-semibold ${
                    theme === t.value 
                      ? 'text-primary-600 dark:text-white' 
                      : 'text-gray-600 dark:text-gray-300'
                  }`}>
                    {t.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Mode sombre */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-xl flex items-center justify-center">
                  {darkMode ? <Moon className="text-primary-600 dark:text-primary-400" size={20} /> : <Sun className="text-primary-600 dark:text-primary-400" size={20} />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{t('darkMode')}</h3>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  darkMode ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <motion.div
                  animate={{ x: darkMode ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
                ></motion.div>
              </button>
            </div>
          </motion.div>

          {/* Taille de la police */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-xl flex items-center justify-center">
                <Type className="text-primary-600 dark:text-primary-400" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{t('fontSize')}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs">{t('forCantiques')}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {fontSizes.map(fs => (
                <motion.button
                  key={fs.value}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFontSize(fs.value)}
                  className={`py-3 px-4 rounded-xl border-2 transition-all font-semibold ${
                    fontSize === fs.value 
                      ? 'border-primary-600 bg-primary-50 dark:bg-gray-700 dark:border-primary-400 text-primary-700 dark:text-white shadow-md' 
                      : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  {fs.name}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Langue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-xl flex items-center justify-center">
                <Globe className="text-primary-600 dark:text-primary-400" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{t('interfaceLanguage')}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs">{t('frenchOrEnglish')}</p>
              </div>
            </div>
            <div className="space-y-2">
              {languages.map(lang => (
                <motion.button
                  key={lang.value}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setLanguage(lang.value)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    language === lang.value 
                      ? 'border-primary-600 bg-primary-50 dark:bg-gray-700 dark:border-primary-400 shadow-md' 
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className={`font-semibold ${
                    language === lang.value 
                      ? 'text-gray-800 dark:text-white' 
                      : 'text-gray-800 dark:text-gray-200'
                  }`}>{lang.name}</span>
                  {language === lang.value && (
                    <CheckCircle size={20} className="ml-auto text-primary-600 dark:text-primary-400" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Audio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-xl flex items-center justify-center">
                  <Volume2 className="text-primary-600 dark:text-primary-400" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{t('tonalitySound')}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">{t('enableDisableSound')}</p>
                </div>
              </div>
              <button
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  audioEnabled ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <motion.div
                  animate={{ x: audioEnabled ? 24 : 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
                ></motion.div>
              </button>
            </div>
          </motion.div>

          {/* Informations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-primary-50 to-purple-50 rounded-2xl p-6 border border-primary-100"
          >
            <h3 className="text-lg font-bold text-primary-800 mb-2">{t('appVersion')}</h3>
            <p className="text-primary-700 font-semibold">{t('appTitle')} v1.0.0</p>
            <p className="text-primary-600 text-sm mt-2">{t('lastUpdate')} : Novembre 2025</p>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Settings;