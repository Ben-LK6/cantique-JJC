import { useState, useEffect } from 'react';
import { Palette, Volume2, Type, Globe, Moon, Sun } from 'lucide-react';

const Settings = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'blue');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('fontSize') || 'medium');
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'fr');
  const [audioEnabled, setAudioEnabled] = useState(() => localStorage.getItem('audioEnabled') !== 'false');

  // Sauvegarder dans localStorage
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('audioEnabled', audioEnabled);
  }, [audioEnabled]);

  const themes = [
    { name: 'Bleu', value: 'blue', color: 'bg-blue-600' },
    { name: 'Vert', value: 'green', color: 'bg-green-600' },
    { name: 'Violet', value: 'purple', color: 'bg-purple-600' },
    { name: 'Rouge', value: 'red', color: 'bg-red-600' },
    { name: 'Orange', value: 'orange', color: 'bg-orange-600' },
  ];

  const fontSizes = [
    { name: 'Petit', value: 'small' },
    { name: 'Moyen', value: 'medium' },
    { name: 'Grand', value: 'large' },
  ];

  const languages = [
    { name: 'Français', value: 'fr', flag: '🇫🇷' },
    { name: 'English', value: 'en', flag: '🇬🇧' },
    { name: 'Español', value: 'es', flag: '🇪🇸' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">


      {/* Contenu */}
      <div className="p-4 lg:p-6">
        <div className="max-w-3xl mx-auto space-y-4">
          
          {/* Thème de couleur */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="text-primary-600" size={24} />
              <h3 className="text-lg font-bold text-gray-800">Couleur du thème</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">Choisissez la couleur principale de l'application</p>
            <div className="grid grid-cols-5 gap-3">
              {themes.map(t => (
                <button
                  key={t.value}
                  onClick={() => setTheme(t.value)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                    theme === t.value ? 'border-primary-600 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full ${t.color}`}></div>
                  <span className="text-xs text-gray-700">{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mode sombre */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {darkMode ? <Moon className="text-primary-600" size={24} /> : <Sun className="text-primary-600" size={24} />}
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Mode sombre</h3>
                  <p className="text-gray-600 text-sm">Activer le thème sombre</p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  darkMode ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    darkMode ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></div>
              </button>
            </div>
          </div>

          {/* Taille de la police */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Type className="text-primary-600" size={24} />
              <h3 className="text-lg font-bold text-gray-800">Taille de la police</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">Ajustez la taille du texte des cantiques</p>
            <div className="grid grid-cols-3 gap-3">
              {fontSizes.map(fs => (
                <button
                  key={fs.value}
                  onClick={() => setFontSize(fs.value)}
                  className={`py-3 px-4 rounded-lg border-2 transition-all ${
                    fontSize === fs.value 
                      ? 'border-primary-600 bg-primary-50 text-primary-700' 
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {fs.name}
                </button>
              ))}
            </div>
          </div>

          {/* Langue */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="text-primary-600" size={24} />
              <h3 className="text-lg font-bold text-gray-800">Langue</h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">Choisissez la langue de l'application</p>
            <div className="space-y-2">
              {languages.map(lang => (
                <button
                  key={lang.value}
                  onClick={() => setLanguage(lang.value)}
                  className={`w-full flex items-center gap-3 p-4 rounded-lg border-2 transition-all ${
                    language === lang.value 
                      ? 'border-primary-600 bg-primary-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="text-gray-800 font-medium">{lang.name}</span>
                  {language === lang.value && (
                    <span className="ml-auto text-primary-600">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Audio */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 className="text-primary-600" size={24} />
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Son de tonalité</h3>
                  <p className="text-gray-600 text-sm">Activer le son lors de l'ouverture d'un cantique</p>
                </div>
              </div>
              <button
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  audioEnabled ? 'bg-primary-600' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    audioEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}
                ></div>
              </button>
            </div>
          </div>

          {/* Informations */}
          <div className="bg-primary-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-primary-800 mb-2">Version de l'application</h3>
            <p className="text-primary-700">Cantique JJC v1.0.0</p>
            <p className="text-primary-600 text-sm mt-2">Dernière mise à jour : Novembre 2025</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;