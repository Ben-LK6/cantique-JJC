import { Music } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import cantiquesData from '../data/cantiques.json';
import FilterButton from '../components/common/FilterButton';

const Cantiques = ({ onSelectCantique, searchTerm }) => {
  const [selectedTheme, setSelectedTheme] = useState('Tous');

  // Récupérer les thèmes uniques
  const themes = ['Tous', ...new Set(cantiquesData.map(c => c.theme))];

  // Filtrer les cantiques
  const filteredCantiques = cantiquesData.filter(cantique => {
    const matchSearch = !searchTerm || 
      cantique.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cantique.numero.includes(searchTerm);
    
    const matchTheme = selectedTheme === 'Tous' || cantique.theme === selectedTheme;
    
    return matchSearch && matchTheme;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Indication du filtre actif */}
      {selectedTheme !== 'Tous' && (
        <div className="px-4 py-3 bg-primary-50 border-b border-primary-100">
          <p className="text-sm text-primary-700 font-medium text-center">
            📚 Filtre actif : <span className="font-bold">{selectedTheme}</span>
          </p>
        </div>
      )}

      {/* Liste des cantiques */}
      <div className="p-4">
        <div className="max-w-4xl mx-auto">
          {/* Compteur */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600 text-sm font-medium">
              {filteredCantiques.length} cantique{filteredCantiques.length > 1 ? 's' : ''}
            </p>
            {searchTerm && (
              <p className="text-primary-600 text-sm">
                🔍 "{searchTerm}"
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCantiques.map((cantique, index) => (
              <motion.div
                key={cantique.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectCantique(cantique.id)}
                className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all cursor-pointer border-l-4 border-primary-600 relative overflow-hidden"
              >
                {/* Gradient Background subtil */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-50 to-transparent rounded-full -mr-16 -mt-16 opacity-50"></div>
                
                <div className="flex items-start gap-4 relative z-10">
                  {/* Numéro avec animation */}
                  <motion.div 
                    whileHover={{ rotate: 5 }}
                    className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg"
                  >
                    <span className="text-white font-bold text-xl">
                      {cantique.numero}
                    </span>
                  </motion.div>

                  {/* Infos */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight line-clamp-2">
                      {cantique.titre}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-semibold">
                        {cantique.theme}
                      </span>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Music size={14} />
                        <span className="text-xs font-medium">{cantique.tonalite.note}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Message si aucun résultat */}
          {filteredCantiques.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music size={48} className="text-gray-300" />
              </div>
              <p className="text-gray-500 text-lg font-semibold mb-2">Aucun cantique trouvé</p>
              <p className="text-gray-400 text-sm">
                {searchTerm ? `Aucun résultat pour "${searchTerm}"` : 'Essayez un autre filtre'}
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bouton Flottant de Filtre */}
      <FilterButton 
        options={themes}
        selected={selectedTheme}
        onSelect={setSelectedTheme}
        color="primary"
        label="Thèmes"
      />
    </div>
  );
};

export default Cantiques;