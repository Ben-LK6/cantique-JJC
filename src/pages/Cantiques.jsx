import { Music } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getCantiques, getCategories } from '../utils/cantiqueUtils';
import FilterButton from '../components/common/FilterButton';
import { t } from '../data/translations';

const Cantiques = ({ onSelectCantique, searchTerm, selectedTheme: preSelectedTheme }) => {
  const [selectedTheme, setSelectedTheme] = useState(preSelectedTheme || t('all'));
  const [cantiques, setCantiques] = useState([]);
  const [categories, setCategories] = useState([]);

  // Charger les cantiques selon la langue choisie
  useEffect(() => {
    const loadCantiques = () => {
      const currentCantiques = getCantiques();
      const currentCategories = getCategories();
      setCantiques(currentCantiques);
      setCategories([t('all'), ...currentCategories]);
    };

    loadCantiques();
    
    // Écouter les changements de langue
    const handleStorageChange = (e) => {
      if (e.key === 'cantiqueLanguage') {
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

  // Filtrer les cantiques
  const filteredCantiques = cantiques.filter(cantique => {
    const matchSearch = !searchTerm || 
      cantique.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cantique.numero.includes(searchTerm);
    
    const matchCategorie = !selectedTheme || selectedTheme === t('all') || cantique.categorie === selectedTheme;
    
    return matchSearch && matchCategorie;
  });

  const currentLanguage = localStorage.getItem('cantiqueLanguage') || 'fon';
  const languageLabel = currentLanguage === 'yoruba' ? t('yoruba') + ' 🇳🇬' : t('fon') + ' 🇧🇯';

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Indication de la langue */}
      <div className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100">
        <p className="text-xs text-blue-700 font-medium text-center">
          🌍 {t('language')}: <span className="font-bold">{languageLabel}</span>
        </p>
      </div>
      
      {/* Indication du filtre actif */}
      {selectedTheme !== t('all') && (
        <div className="px-4 py-3 bg-primary-50 border-b border-primary-100">
          <p className="text-sm text-primary-700 font-medium text-center">
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
              <p className="text-primary-600 text-sm">
                🔍 "{searchTerm}"
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCantiques.map((cantique, index) => (
              <div
                key={cantique.id}
                onClick={() => onSelectCantique(cantique.id)}
                className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-primary-600"
              >
                {/* Gradient Background subtil */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-50 to-transparent rounded-full -mr-16 -mt-16 opacity-50"></div>
                
                <div className="flex items-start gap-4 relative z-10">

                  {/* Infos */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-primary-600 text-white rounded-lg text-sm font-bold">
                        {cantique.numero}
                      </span>
                      <h3 className="text-lg font-bold text-gray-800 leading-tight line-clamp-2">
                        {cantique.titre}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-semibold">
                        {cantique.categorie}
                      </span>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Music size={14} />
                        <span className="text-xs font-medium">{cantique.tonalite.note}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message si aucun résultat */}
          {filteredCantiques.length === 0 && (
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

      {/* Bouton Flottant de Filtre */}
      <FilterButton 
        options={allCategories}
        selected={selectedTheme}
        onSelect={setSelectedTheme}
        color="primary"
        label={t('categories')}
      />
    </div>
  );
};

export default Cantiques;