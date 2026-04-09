import { useState, useEffect } from 'react';
import { Heart, Music, HandHeart, HeartOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCantiques } from '../utils/cantiqueUtils';
import { getPrayers } from '../data/prayersTranslations';
import { t } from '../data/translations';

const Favorites = ({ onSelectCantique }) => {
  const [activeTab, setActiveTab] = useState('cantiques');
  const [favoriteCantiques, setFavoriteCantiques] = useState([]);
  const [favoritePrayers, setFavoritePrayers] = useState([]);

  const removeCantique = (id) => {
    const currentLang = localStorage.getItem('cantiqueLanguage') || 'fon';
    const key = `favorites_${currentLang}`;
    const ids = JSON.parse(localStorage.getItem(key) || '[]').filter(i => i !== id);
    localStorage.setItem(key, JSON.stringify(ids));
    setFavoriteCantiques(prev => prev.filter(c => c.id !== id));
  };

  const removePrayer = (id) => {
    const currentLang = localStorage.getItem('language') || 'fr';
    const key = `favoritePrayers_${currentLang}`;
    const ids = JSON.parse(localStorage.getItem(key) || '[]').filter(i => i !== id);
    localStorage.setItem(key, JSON.stringify(ids));
    setFavoritePrayers(prev => prev.filter(p => p.id !== id));
  };

  const loadFavorites = () => {
    // Charger les favoris selon la langue des cantiques
    const currentLang = localStorage.getItem('cantiqueLanguage') || 'fon';
    const cantiqueKey = `favorites_${currentLang}`;
    const cantiqueIds = JSON.parse(localStorage.getItem(cantiqueKey) || '[]');

    // Récupérer les cantiques favoris selon la langue actuelle
    const currentCantiques = getCantiques();
    const favoriteC = currentCantiques.filter(c => cantiqueIds.includes(c.id));
    setFavoriteCantiques(favoriteC);

    // Charger les prières favorites selon la langue de l'interface
    const prayerLang = localStorage.getItem('language') || 'fr';
    const prayerKey = `favoritePrayers_${prayerLang}`;
    const prayerIds = JSON.parse(localStorage.getItem(prayerKey) || '[]');
    const currentPrayers = getPrayers();
    const favoriteP = currentPrayers.filter(p => prayerIds.includes(p.id));
    setFavoritePrayers(favoriteP);
  };

  useEffect(() => {
    loadFavorites();
    
    const handleStorageChange = (e) => {
      if (e.key === 'cantiqueLanguage' || e.key === 'language') {
        loadFavorites();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-30">
        <div className="px-4 py-4 lg:px-6">
          
          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('cantiques')}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'cantiques'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📖 {t('cantiques')} ({favoriteCantiques.length})
            </button>
            <button
              onClick={() => setActiveTab('prayers')}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'prayers'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🙏 {t('prayers')} ({favoritePrayers.length})
            </button>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="p-4 lg:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Tab Cantiques */}
          {activeTab === 'cantiques' && (
            <>
              {favoriteCantiques.length > 0 ? (
                <AnimatePresence>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favoriteCantiques.map(cantique => (
                    <motion.div
                      key={cantique.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
                      onClick={() => onSelectCantique && onSelectCantique(cantique.id)}
                      className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer border-l-4"
                      style={{ borderLeftColor: 'var(--color-primary-600)' }}
                    >
                      <div className="flex items-start gap-4">
                        <div 
                          className="flex-shrink-0 w-14 h-14 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: 'var(--color-primary-100)' }}
                        >
                          <span className="font-bold text-lg" style={{ color: 'var(--color-primary-700)' }}>
                            {cantique.numero}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                              {cantique.titre}
                            </h3>
                            <motion.button
                              whileTap={{ scale: 0.8 }}
                              onClick={(e) => { e.stopPropagation(); removeCantique(cantique.id); }}
                              className="flex-shrink-0 p-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-400 hover:text-red-600 transition-colors"
                              title="Retirer des favoris"
                            >
                              <HeartOff size={16} />
                            </motion.button>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="px-2 py-1 rounded" style={{ backgroundColor: 'var(--color-primary-50)', color: 'var(--color-primary-700)' }}>
                              {cantique.categorie}
                            </span>
                            <Music size={14} />
                            <span>Tonalité: {cantique.tonalite.note}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                </AnimatePresence>
              ) : (
                <div className="text-center py-12">
                  <Heart size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg mb-2">{t('noFavoriteCantiques')}</p>
                  <p className="text-gray-400">{t('addToFavorites')}</p>
                </div>
              )}
            </>
          )}

          {/* Tab Prières */}
          {activeTab === 'prayers' && (
            <>
              {favoritePrayers.length > 0 ? (
                <AnimatePresence>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favoritePrayers.map(prayer => (
                    <motion.div
                      key={prayer.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.2 } }}
                      className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-all border-l-4"
                      style={{ borderLeftColor: 'var(--color-primary-600)' }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center">
                          <HandHeart className="text-primary-700" size={24} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">
                              {prayer.titre}
                            </h3>
                            <motion.button
                              whileTap={{ scale: 0.8 }}
                              onClick={() => removePrayer(prayer.id)}
                              className="flex-shrink-0 p-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-400 hover:text-red-600 transition-colors"
                              title="Retirer des favoris"
                            >
                              <HeartOff size={16} />
                            </motion.button>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="px-2 py-1 bg-primary-50 text-primary-700 rounded">
                              {prayer.categorie}
                            </span>
                          </div>
                          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                            {prayer.texte}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                </AnimatePresence>
              ) : (
                <div className="text-center py-12">
                  <Heart size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg mb-2">{t('noFavoritePrayers')}</p>
                  <p className="text-gray-400">{t('addPrayersToFavorites')}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;