import { HandHeart, Heart, ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getPrayers, getPrayerCategories } from '../data/prayersTranslations';
import FilterButton from '../components/common/FilterButton';
import { t } from '../data/translations';

const Prayers = ({ searchTerm }) => {
  const [selectedCategory, setSelectedCategory] = useState(t('all'));
  const [selectedPrayer, setSelectedPrayer] = useState(null);
  const [prayersData, setPrayersData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favoritePrayers') || '[]');
  });

  // Charger les prières selon la langue
  useEffect(() => {
    const loadPrayers = () => {
      const currentPrayers = getPrayers();
      const currentCategories = [t('all'), ...getPrayerCategories()];
      setPrayersData(currentPrayers);
      setCategories(currentCategories);
      setSelectedCategory(t('all'));
    };

    loadPrayers();
    
    // Écouter les changements de langue
    const handleStorageChange = (e) => {
      if (e.key === 'language') {
        loadPrayers();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Filtrer les prières
  const filteredPrayers = prayersData.filter(prayer => {
    const matchSearch = !searchTerm || prayer.titre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = selectedCategory === t('all') || prayer.categorie === selectedCategory;
    return matchSearch && matchCategory;
  });

  // Toggle favori
  const toggleFavorite = (prayerId) => {
    const newFavorites = favorites.includes(prayerId)
      ? favorites.filter(id => id !== prayerId)
      : [...favorites, prayerId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favoritePrayers', JSON.stringify(newFavorites));
  };

  // Si une prière est sélectionnée, afficher le détail
  if (selectedPrayer) {
    const isFavorite = favorites.includes(selectedPrayer.id);
    
    return (
      <div className="h-screen flex flex-col bg-gray-50 pb-20">
        {/* Header personnalisé pour le détail */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-4 shadow-lg">
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedPrayer(null)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ArrowLeft size={24} />
            </motion.button>
            <div className="flex-1">
              <h2 className="text-lg font-bold">{selectedPrayer.titre}</h2>
              <p className="text-sm text-purple-100">{selectedPrayer.categorie}</p>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleFavorite(selectedPrayer.id)}
              className={`p-2 rounded-full transition-colors ${
                isFavorite ? 'text-red-300' : 'text-white/70 hover:text-white'
              }`}
            >
              <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
            </motion.button>
          </div>
        </div>

        {/* Contenu de la prière */}
        <div className="flex-1 overflow-y-auto px-4 py-6">
          <div className="max-w-2xl mx-auto">
            {/* Logo JJC */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center mb-8"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white font-bold text-2xl">JJC</span>
              </div>
              <div className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                {selectedPrayer.categorie}
              </div>
            </motion.div>

            {/* Titre */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-center text-gray-800 mb-8"
            >
              {selectedPrayer.titre}
            </motion.h1>

            {/* Texte de la prière */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {selectedPrayer.texte}
              </p>
            </motion.div>

            {/* Amen */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center mt-8"
            >
              <p className="text-2xl font-bold text-purple-600">Amen 🙏</p>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Vue liste des prières
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Indication du filtre actif */}
      {selectedCategory !== t('all') && (
        <div className="px-4 py-3 bg-purple-50 border-b border-purple-100">
          <p className="text-sm text-purple-700 font-medium text-center">
            🙏 {t('activeFilter')} : <span className="font-bold">{selectedCategory}</span>
          </p>
        </div>
      )}

      {/* Liste des prières */}
      <div className="p-4">
        <div className="max-w-4xl mx-auto">
          {/* Compteur */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600 text-sm font-medium">
              {filteredPrayers.length} {filteredPrayers.length > 1 ? t('prayers') : 'prière'}
            </p>
            {searchTerm && (
              <p className="text-purple-600 text-sm">
                🔍 "{searchTerm}"
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPrayers.map((prayer, index) => {
              const isFavorite = favorites.includes(prayer.id);
              
              return (
                <motion.div
                  key={prayer.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedPrayer(prayer)}
                  className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all cursor-pointer border-l-4 border-purple-600 relative overflow-hidden"
                >
                  {/* Gradient Background subtil */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-50 to-transparent rounded-full -mr-16 -mt-16 opacity-50"></div>
                  
                  <div className="flex items-start gap-4 relative z-10">
                    {/* Icône avec animation */}
                    <motion.div 
                      whileHover={{ rotate: 5 }}
                      className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg"
                    >
                      <HandHeart className="text-white" size={28} />
                    </motion.div>

                    {/* Infos */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-lg font-bold text-gray-800 leading-tight line-clamp-1">
                          {prayer.titre}
                        </h3>
                        {isFavorite && (
                          <Heart size={18} className="text-red-500 flex-shrink-0" fill="currentColor" />
                        )}
                      </div>
                      <span className="inline-block px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-semibold mb-2">
                        {prayer.categorie}
                      </span>
                      <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                        {prayer.texte}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Message si aucun résultat */}
          {filteredPrayers.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HandHeart size={48} className="text-gray-300" />
              </div>
              <p className="text-gray-500 text-lg font-semibold mb-2">{t('noFavoritePrayers')}</p>
              <p className="text-gray-400 text-sm">
                {searchTerm ? `${t('noResultsFor')} "${searchTerm}"` : t('tryAnotherFilter')}
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bouton Flottant de Filtre */}
      <FilterButton 
        options={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
        color="purple"
        label={t('categories')}
      />
    </div>
  );
};

export default Prayers;