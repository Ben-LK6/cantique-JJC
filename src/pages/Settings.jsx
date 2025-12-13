import { useState, useEffect } from 'react';
import { Palette, Volume2, Type, Globe, Moon, Sun, CheckCircle } from 'lucide-react';
// framer-motion removed for a static, professional look
import { t } from '../data/translations';
import { applyThemeColors, changeTheme } from '../utils/themeUtils';

const Settings = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'indigo');
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
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
          <CheckCircle size={20} />
          <span className="font-semibold">{t('reloading')}</span>
        </div>
      )}

      {/* Contenu */}
      <div className="p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          
          {/* Theme selection removed - design is fixed to the app palette */}

          {/* Mode sombre */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-50 dark:bg-pink-900/20 rounded-xl flex items-center justify-center">
                  {darkMode ? <Moon className="text-pink-600 dark:text-pink-300" size={20} /> : <Sun className="text-pink-600 dark:text-pink-300" size={20} />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{t('darkMode')}</h3>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  darkMode ? 'bg-pink-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>
          </div>

          {/* Taille de la police */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-pink-50 dark:bg-pink-900/20 rounded-xl flex items-center justify-center">
                <Type className="text-pink-600 dark:text-pink-300" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{t('fontSize')}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs">{t('forCantiques')}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {fontSizes.map((fs) => (
                <button
                  key={fs.value}
                  onClick={() => setFontSize(fs.value)}
                  className={`py-3 px-4 rounded-xl border-2 transition-all font-semibold ${
                    fontSize === fs.value 
                      ? 'border-pink-600 bg-pink-50 dark:bg-gray-700 dark:border-pink-400 text-pink-700 dark:text-white shadow-md' 
                      : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  {fs.name}
                </button>
              ))}
            </div>
          </div>

          {/* Langue */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-pink-50 dark:bg-pink-900/20 rounded-xl flex items-center justify-center">
                <Globe className="text-pink-600 dark:text-pink-300" size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{t('interfaceLanguage')}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs">{t('frenchOrEnglish')}</p>
              </div>
            </div>
            <div className="space-y-2">
              {languages.map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => setLanguage(lang.value)}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    language === lang.value 
                      ? 'border-pink-600 bg-pink-50 dark:bg-gray-700 dark:border-pink-400 shadow-md' 
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
                      <CheckCircle size={20} className="ml-auto text-pink-600 dark:text-pink-300" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Audio */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-pink-50 dark:bg-pink-900/20 rounded-xl flex items-center justify-center">
                  <Volume2 className="text-pink-600 dark:text-pink-300" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{t('tonalitySound')}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">{t('enableDisableSound')}</p>
                </div>
              </div>
              <button
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  audioEnabled ? 'bg-pink-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${audioEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
              </button>
            </div>
          </div>

          {/* Informations */}
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-6 border border-pink-100">
            <h3 className="text-lg font-bold text-pink-800 mb-2">{t('appVersion')}</h3>
            <p className="text-pink-700 font-semibold">{t('appTitle')} v1.0.0</p>
            <p className="text-pink-600 text-sm mt-2">{t('lastUpdate')} : Novembre 2025</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;