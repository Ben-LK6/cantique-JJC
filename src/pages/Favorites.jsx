import { useState, useEffect } from 'react';
import { Heart, Music, HandHeart } from 'lucide-react';
import { getCantiques } from '../utils/cantiqueUtils';
import { prieres } from '../data/prieres';

const Favorites = ({ onSelectCantique }) => {
  const [activeTab, setActiveTab] = useState('cantiques');
  const [favoriteCantiques, setFavoriteCantiques] = useState([]);
  const [favoritePrayers, setFavoritePrayers] = useState([]);

  const loadFavorites = () => {
    // Charger les favoris depuis localStorage
    const cantiqueIds = JSON.parse(localStorage.getItem('favorites') || '[]');
    const prayerIds = JSON.parse(localStorage.getItem('favoritePrayers') || '[]');

    // Récupérer les cantiques favoris selon la langue actuelle
    const currentCantiques = getCantiques();
    const favoriteC = currentCantiques.filter(c => cantiqueIds.includes(c.id));
    setFavoriteCantiques(favoriteC);

    // Récupérer les prières favorites
    const favoriteP = prieres.filter(p => prayerIds.includes(p.id));
    setFavoritePrayers(favoriteP);
  };

  useEffect(() => {
    loadFavorites();
    
    // Écouter les changements de langue
    const handleStorageChange = (e) => {
      if (e.key === 'cantiqueLanguage' || e.key === 'favorites') {
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
              📖 Cantiques ({favoriteCantiques.length})
            </button>
            <button
              onClick={() => setActiveTab('prayers')}
              className={`flex-1 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'prayers'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🙏 Prières ({favoritePrayers.length})
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favoriteCantiques.map(cantique => (
                    <div
                      key={cantique.id}
                      onClick={() => onSelectCantique && onSelectCantique(cantique.id)}
                      className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer border-l-4 border-primary-600"
                    >
                      <div className="flex items-start gap-4">
                        {/* Numéro */}
                        <div className="flex-shrink-0 w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center">
                          <span className="text-primary-700 font-bold text-lg">
                            {cantique.numero}
                          </span>
                        </div>

                        {/* Infos */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">
                              {cantique.titre}
                            </h3>
                            <Heart size={18} className="text-red-500 flex-shrink-0" fill="currentColor" />
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="px-2 py-1 bg-primary-50 text-primary-700 rounded">
                              {cantique.categorie}
                            </span>
                            <Music size={14} />
                            <span>Tonalité: {cantique.tonalite.note}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Heart size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg mb-2">Aucun cantique favori</p>
                  <p className="text-gray-400">Ajoutez des cantiques à vos favoris en cliquant sur le ❤️</p>
                </div>
              )}
            </>
          )}

          {/* Tab Prières */}
          {activeTab === 'prayers' && (
            <>
              {favoritePrayers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favoritePrayers.map(prayer => (
                    <div
                      key={prayer.id}
                      className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer border-l-4 border-primary-600"
                    >
                      <div className="flex items-start gap-4">
                        {/* Icône */}
                        <div className="flex-shrink-0 w-14 h-14 bg-primary-100 rounded-lg flex items-center justify-center">
                          <HandHeart className="text-primary-700" size={24} />
                        </div>

                        {/* Infos */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">
                              {prayer.titre}
                            </h3>
                            <Heart size={18} className="text-red-500 flex-shrink-0" fill="currentColor" />
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
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Heart size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg mb-2">Aucune prière favorite</p>
                  <p className="text-gray-400">Ajoutez des prières à vos favoris en cliquant sur le ❤️</p>
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