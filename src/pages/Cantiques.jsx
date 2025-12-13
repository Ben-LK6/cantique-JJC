import { Music, Volume2 } from 'lucide-react';
import { useState, useEffect, useMemo, useRef } from 'react';
import { getCantiques, getCategories, clearCache } from '../utils/cantiqueUtils';
import { getTonalityBadgeClass, getTonalityTextClass } from '../utils/tonalityColors';
// FilterButton replaced by a compact Home-style categories control on this page
import { getAudioMetadata } from '../utils/audioUtils';
import { t } from '../data/translations';

const Cantiques = ({ onSelectCantique, searchTerm, selectedTheme: preSelectedTheme }) => {
  const [selectedTheme, setSelectedTheme] = useState(preSelectedTheme || t('all'));
  const [cantiques, setCantiques] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Charger les cantiques selon la langue choisie
  useEffect(() => {
    const loadCantiques = () => {
      setIsLoading(true);
      const currentCantiques = getCantiques();
      const currentCategories = getCategories();
      setCantiques(currentCantiques);
      setCategories([t('all'), ...currentCategories]);
      setIsLoading(false);
    };

    loadCantiques();
    
    // Écouter les changements de langue
    const handleStorageChange = (e) => {
      if (e.key === 'cantiqueLanguage') {
        clearCache(); // Vider le cache lors du changement de langue
        loadCantiques();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Utiliser toutes les catégories disponibles
  const allCategories = categories;
  
  // Mettre à jour le thème sélectionné si un thème est passé depuis l'accueil
  useEffect(() => {
    if (preSelectedTheme && preSelectedTheme !== selectedTheme) {
      setSelectedTheme(preSelectedTheme);
    }
  }, [preSelectedTheme]);

  // Filtrer les cantiques avec useMemo pour optimiser les performances
  const filteredCantiques = useMemo(() => {
    return cantiques.filter(cantique => {
      const matchSearch = !searchTerm || 
        cantique.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cantique.numero.includes(searchTerm);
      
      const matchCategorie = !selectedTheme || selectedTheme === t('all') || cantique.categorie === selectedTheme;
      
      return matchSearch && matchCategorie;
    });
  }, [cantiques, searchTerm, selectedTheme]);

  const currentLanguage = localStorage.getItem('cantiqueLanguage') || 'fon';
  const languageLabel = currentLanguage === 'yoruba' ? t('yoruba') + ' 🇳🇬' : t('fon') + ' 🇧🇯';

  const [showCategories, setShowCategories] = useState(false);
  const categoriesRef = useRef(null);

  // Close categories menu when clicking outside (mobile friendly)
  useEffect(() => {
    function handleOutside(e) {
      if (showCategories && categoriesRef.current && !categoriesRef.current.contains(e.target)) {
        setShowCategories(false);
      }
    }

    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
    };
  }, [showCategories]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Indication de la langue */}
      <div 
        className="px-4 py-2 border-b"
        style={{
          background: 'linear-gradient(to right, #fdf2f8, #fce7f3)',
          borderColor: '#fbcfe8'
        }}
      >
        <p className="text-xs font-medium text-center" style={{ color: '#be185d' }}>
          🌍 {t('language')}: <span className="font-bold">{languageLabel}</span>
        </p>
      </div>
      
      {/* Indication du filtre actif */}
      {selectedTheme !== t('all') && (
        <div 
          className="px-4 py-3 border-b"
          style={{
            backgroundColor: '#fdf2f8',
            borderColor: '#fce7f3'
          }}
        >
          <p className="text-sm font-medium text-center" style={{ color: '#be185d' }}>
            📚 {t('activeFilter')} : <span className="font-bold">{selectedTheme}</span>
          </p>
        </div>
      )}

      {/* Liste des cantiques */}
      <div className="p-4">
        <div className="max-w-4xl mx-auto">
          {/* Compteur */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600 text-sm font-medium">
              {filteredCantiques.length} {filteredCantiques.length > 1 ? t('cantiques_plural') : t('cantique')}
            </p>
            {searchTerm && (
              <p className="text-sm" style={{ color: '#db2777' }}>
                🔍 "{searchTerm}"
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCantiques.map((cantique, index) => (
              <div
                key={cantique.id}
                onClick={() => onSelectCantique(cantique.id)}
                className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow cursor-pointer border-l-4"
                style={{ borderLeftColor: '#db2777' }}
              >
                {/* Gradient Background subtil */}
                  <div 
                  className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 opacity-50"
                  style={{
                    background: `linear-gradient(to bottom right, #fdf2f8, transparent)`
                  }}
                ></div>
                
                <div className="flex items-start gap-4 relative z-10">

                  {/* Infos */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span 
                        className="px-2 py-1 text-white rounded-lg text-sm font-bold"
                        style={{ backgroundColor: '#db2777' }}
                      >
                        {cantique.numero}
                      </span>
                      <h3 className="text-lg font-bold text-gray-800 leading-tight line-clamp-2">
                        {cantique.titre}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: '#fdf2f8',
                          color: '#be185d'
                        }}
                      >
                        {cantique.categorie}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Music size={14} className={getTonalityTextClass(cantique.tonalite.note)} />
                          <span className={`px-2 py-1 rounded-full text-xs font-bold ${getTonalityBadgeClass(cantique.tonalite.note)}`}>
                            {cantique.tonalite.note}
                          </span>
                        </div>
                        {getAudioMetadata(cantique) && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/20 rounded-full">
                            <Volume2 size={12} className="text-green-600 dark:text-green-400" />
                            <span className="text-xs font-medium text-green-600 dark:text-green-400">Audio</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message si aucun résultat (seulement après chargement) */}
          {!isLoading && filteredCantiques.length === 0 && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music size={48} className="text-gray-300" />
              </div>
              <p className="text-gray-500 text-lg font-semibold mb-2">{t('noCantiquesFound')}</p>
              <p className="text-gray-400 text-sm">
                {searchTerm ? `${t('noResultsFor')} "${searchTerm}"` : t('tryAnotherFilter')}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Petit bouton catégories (design identique à l'accueil) */}
      <div className="fixed z-50" style={{ right: '1rem', bottom: '5rem' }}>
        <div className="relative" ref={categoriesRef}>
          <button
            onClick={() => setShowCategories(!showCategories)}
            aria-expanded={showCategories}
            aria-label={t ? t('categories') : 'Catégories'}
            className="px-3 py-2 rounded-lg bg-white border border-pink-100 shadow-sm flex items-center gap-2 text-pink-700 hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-pink-200"
          >
            <span className="text-lg">🎶</span>
            <span className="text-sm font-semibold">{t ? t('categories') : 'Catégories'}</span>
            <span className="ml-2 text-pink-500">{showCategories ? '▾' : '▴'}</span>
          </button>

          {showCategories && (
            <div
              className="mt-1 w-60 mx-auto bg-white rounded-2xl shadow-xl border border-pink-50 max-h-64 overflow-auto z-50 p-0 text-sm absolute left-1/2 transform -translate-x-1/2"
              style={{ bottom: 'calc(100% + 10px)' }}
            >
              <div className="divide-y divide-pink-50">
                {allCategories.map((categorie, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedTheme(categorie);
                      setShowCategories(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-pink-800 text-left hover:bg-pink-50 focus:bg-pink-50"
                  >
                    <div className="w-8 h-8 rounded-md bg-pink-50 flex items-center justify-center text-sm">🎵</div>
                    <div className="flex-1">
                      <div className="font-medium">{categorie}</div>
                    </div>
                    <div className="text-xs text-pink-400">›</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cantiques;