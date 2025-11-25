import { useState, useEffect } from 'react';
import { Languages, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { t } from '../data/translations';

const CantiqueLanguage = ({ onNavigate }) => {
  const [cantiqueLanguage, setCantiqueLanguage] = useState(() => 
    localStorage.getItem('cantiqueLanguage') || 'fon'
  );
  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('cantiqueLanguage') !== cantiqueLanguage) {
      localStorage.setItem('cantiqueLanguage', cantiqueLanguage);
      showSavedMessage();
      
      // Déclencher un événement pour informer les autres composants
      window.dispatchEvent(new StorageEvent('storage', {
        key: 'cantiqueLanguage',
        newValue: cantiqueLanguage
      }));
      
      // Naviguer automatiquement vers les cantiques après un délai réduit
      if (onNavigate) {
        setTimeout(() => {
          onNavigate('cantiques');
        }, 300);
      }
    }
  }, [cantiqueLanguage, onNavigate]);

  const showSavedMessage = () => {
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  const cantiqueLanguages = [
    { 
      name: t('fon'), 
      value: 'fon', 
      flag: '🇧🇯',
      description: t('cantiquesInFon')
    },
    { 
      name: t('yoruba'), 
      value: 'yoruba', 
      flag: '🇳🇬',
      description: t('cantiquesInYoruba')
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Message de sauvegarde */}
      {showSaved && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
        >
          <CheckCircle size={20} />
          <span className="font-semibold">{t('languageSaved')}</span>
        </motion.div>
      )}

      {/* Contenu */}
      <div className="p-4">
        <div className="max-w-2xl mx-auto">
          
          {/* Header */}
          <div 
            className="rounded-2xl p-6 text-white text-center mb-6"
            style={{
              background: 'linear-gradient(to right, var(--color-primary-600), var(--color-primary-800))'
            }}
          >
            <Languages size={48} className="mx-auto mb-3" />
            <h1 className="text-2xl font-bold mb-2">{t('cantiqueLanguageTitle')}</h1>
            <p style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              {t('chooseLanguageForCantiques')}
            </p>
          </div>

          {/* Sélection de langue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-md"
          >
            <div className="space-y-4">
              {cantiqueLanguages.map(lang => (
                <motion.button
                  key={lang.value}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCantiqueLanguage(lang.value)}
                  className={`w-full flex items-center gap-4 p-5 rounded-xl border-2 transition-all ${
                    cantiqueLanguage === lang.value 
                      ? 'shadow-md' 
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  style={cantiqueLanguage === lang.value ? {
                    borderColor: 'var(--color-primary-600)',
                    backgroundColor: 'var(--color-primary-50)'
                  } : {}}
                >
                  <div className="text-4xl">{lang.flag}</div>
                  <div className="flex-1 text-left">
                    <h3 
                      className="text-lg font-bold"
                      style={{
                        color: cantiqueLanguage === lang.value ? 'var(--color-primary-700)' : undefined
                      }}
                    >
                      {lang.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{lang.description}</p>
                  </div>
                  {cantiqueLanguage === lang.value && (
                    <CheckCircle size={24} style={{ color: 'var(--color-primary-600)' }} />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Information */}
          <div 
            className="mt-6 rounded-xl p-4 border"
            style={{
              backgroundColor: 'var(--color-primary-50)',
              borderColor: 'var(--color-primary-200)'
            }}
          >
            <div className="flex items-start gap-3">
              <div className="text-xl" style={{ color: 'var(--color-primary-600)' }}>ℹ️</div>
              <div>
                <h4 className="font-semibold mb-1" style={{ color: 'var(--color-primary-800)' }}>{t('information')}</h4>
                <p className="text-sm" style={{ color: 'var(--color-primary-700)' }}>
                  {t('cantiqueLanguageInfo')}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CantiqueLanguage;