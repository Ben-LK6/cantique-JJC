import { Book, Heart, Sparkles, Music, HandHeart, ChevronUp, ChevronDown, RefreshCw } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cantiques } from '../data/cantiques';
import { categories } from '../data/categoriesMapping';
import { getRandomVerset, getThemeColor } from '../data/versets';

const Home = ({ onNavigate }) => {
  const [showCategories, setShowCategories] = useState(false);
  const [currentVerset, setCurrentVerset] = useState(null);

  // Charger un verset aléatoire au montage du composant
  useEffect(() => {
    setCurrentVerset(getRandomVerset());
  }, []);

  // Fonction pour changer de verset
  const refreshVerset = () => {
    setCurrentVerset(getRandomVerset());
  };
  
  // Récupérer les catégories uniques avec compteurs
  const categoriesData = cantiques.reduce((acc, cantique) => {
    const categorie = cantique.categorie;
    if (!acc[categorie]) {
      acc[categorie] = { name: categorie, count: 0, emoji: getCategorieEmoji(categorie) };
    }
    acc[categorie].count++;
    return acc;
  }, {});
  
  const categoriesList = Object.values(categoriesData);
  
  function getCategorieEmoji(categorie) {
    const emojiMap = {
      'Oylọ': '🎵',
      'Opẹ': '🙏',
      'Pipa': '🎶',
      'Wedagbe': '💫',
      'Hokọnamẹ': '💪',
      'Azọn Jiwheyẹwhe tọn': '⚙️',
      'Owanyi Jiwheyẹwhe tọn': '❤️'
    };
    return emojiMap[categorie] || '🎶';
  }
  
  const handleCategorieSelect = (categorie) => {
    setShowCategories(false);
    onNavigate('cantiques', categorie);
  };
  const quickActions = [
    { icon: Book, label: 'Cantiques', path: 'cantiques', color: 'from-blue-500 to-blue-600', emoji: '📖' },
    { icon: Heart, label: 'Favoris', path: 'favoris', color: 'from-red-500 to-red-600', emoji: '❤️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 pb-24">
      {/* Hero Section */}
      <div className="pt-12 pb-8 px-6 text-center">
        {/* Logo */}
        <div className="mb-6">
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-lg">
            <img src="/images/logo.jpeg" alt="JJC Logo" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Cantiques JJC
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Louez le Seigneur avec joie
          </p>
        </div>
      </div>

      {/* Actions Principales */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            
            return (
              <div
                key={action.path + index}
                onClick={() => onNavigate(action.path)}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border border-gray-100 dark:border-gray-700"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mb-4 mx-auto`}>
                  <span className="text-2xl">{action.emoji}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
                  {action.label}
                </h3>
              </div>
            );
          })}
        </div>
      </div>

      {/* Verset du jour - Carte améliorée */}
      {currentVerset && (
        <div className="mx-6 mb-8">
          <div className="relative overflow-hidden">
            {/* Carte avec dégradé basé sur le thème */}
            <div className={`bg-gradient-to-br ${getThemeColor(currentVerset.theme)} rounded-2xl p-6 shadow-xl text-white relative`}>
              {/* Motif décoratif en arrière-plan */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
                <div className="w-full h-full rounded-full bg-white/30 transform translate-x-8 -translate-y-8"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-24 h-24 opacity-10">
                <div className="w-full h-full rounded-full bg-white/40 transform -translate-x-4 translate-y-4"></div>
              </div>
              
              {/* Contenu de la carte */}
              <div className="relative z-10">
                {/* Header avec icône et bouton refresh */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles size={20} className="text-white" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                      Verset du jour
                    </h3>
                  </div>
                  <button
                    onClick={refreshVerset}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    title="Nouveau verset"
                  >
                    <RefreshCw size={16} className="text-white" />
                  </button>
                </div>
                
                {/* Texte du verset */}
                <div className="mb-4">
                  <p className="text-white text-base leading-relaxed italic font-medium">
                    "{currentVerset.texte}"
                  </p>
                </div>
                
                {/* Référence */}
                <div className="flex items-center justify-between">
                  <p className="text-white/90 text-sm font-semibold">
                    — {currentVerset.reference}
                  </p>
                  <div className="px-3 py-1 bg-white/20 rounded-full">
                    <span className="text-xs font-medium text-white capitalize">
                      {currentVerset.theme}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Overlay pour fermer le dropdown */}
      {showCategories && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowCategories(false)}
        />
      )}
      
      {/* Sélecteur de Catégorie */}
      <div className="mx-6 relative z-50">
        {/* Dropdown des catégories - apparaît au-dessus */}
        {showCategories && (
          <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden max-h-80 overflow-y-auto">
            {categoriesList.map((categorie, index) => (
              <button
                key={index}
                onClick={() => handleCategorieSelect(categorie.name)}
                className="w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left border-b border-gray-100 dark:border-gray-700 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{categorie.emoji}</span>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm">{categorie.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{categorie.count} cantique{categorie.count > 1 ? 's' : ''}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
        
        {/* Bouton flèche */}
        <button
          onClick={() => setShowCategories(!showCategories)}
          className="w-full bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 rounded-xl p-4 shadow-lg text-white transition-all flex items-center justify-center gap-2"
        >
          <Music size={20} />
          <span className="font-medium">Catégories</span>
          {showCategories ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        </button>
      </div>
      

    </div>
  );
};

export default Home;