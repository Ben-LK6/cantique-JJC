import { Music, Volume2 } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { getCantiques, getCategories, clearCache } from '../utils/cantiqueUtils';
import { getTonalityBadgeClass, getTonalityTextClass } from '../utils/tonalityColors';
import FilterButton from '../components/common/FilterButton';
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

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Indication de la langue */}
      <div 
        className="px-4 py-2 border-b"
        style={{
          background: 'linear-gradient(to right, var(--color-primary-50), var(--color-primary-100))',
          borderColor: 'var(--color-primary-200)'
        }}
      >
        <p className="text-xs font-medium text-center" style={{ color: 'var(--color-primary-700)' }}>
          🌍 {t('language')}: <span className="font-bold">{languageLabel}</span>
        </p>
      </div>
      
      {/* Indication du filtre actif */}
      {selectedTheme !== t('all') && (
        <div 
          className="px-4 py-3 border-b"
          style={{
            backgroundColor: 'var(--color-primary-50)',
            borderColor: 'var(--color-primary-100)'
          }}
        >
          <p className="text-sm font-medium text-center" style={{ color: 'var(--color-primary-700)' }}>
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
              <p className="text-sm" style={{ color: 'var(--color-primary-600)' }}>
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
                style={{ borderLeftColor: 'var(--color-primary-600)' }}
              >
                {/* Gradient Background subtil */}
                <div 
                  className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 opacity-50"
                  style={{
                    background: `linear-gradient(to bottom right, var(--color-primary-50), transparent)`
                  }}
                ></div>
                
                <div className="flex items-start gap-4 relative z-10">

                  {/* Infos */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span 
                        className="px-2 py-1 text-white rounded-lg text-sm font-bold"
                        style={{ backgroundColor: 'var(--color-primary-600)' }}
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
                          backgroundColor: 'var(--color-primary-50)',
                          color: 'var(--color-primary-700)'
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

      {/* Bouton Flottant de Filtre - Position fixe mobile */}
      <div className="fixed right-4 bottom-20 lg:bottom-4 z-50">
        <FilterButton 
          options={allCategories}
          selected={selectedTheme}
          onSelect={setSelectedTheme}
          color="primary"
          label={t('categories')}
        />
      </div>
    </div>
  );
};

export default Cantiques;