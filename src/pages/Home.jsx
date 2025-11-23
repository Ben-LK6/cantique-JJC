import { Book, Heart, Sparkles, Music, HandHeart, ChevronUp, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getCantiques, getCategories } from '../utils/cantiqueUtils';
import { getRandomVerset, getThemeColor } from '../data/versetsTranslations';
import { t } from '../data/translations';

const Home = ({ onNavigate }) => {
  const [showCategories, setShowCategories] = useState(false);
  const [currentVerset, setCurrentVerset] = useState(null);
  const [cantiques, setCantiques] = useState([]);
  const [categoriesData, setCategoriesData] = useState({});

  // Charger un verset aléatoire au montage du composant
  useEffect(() => {
    setCurrentVerset(getRandomVerset());
    loadCantiques();
  }, []);

  // Fonction pour charger les cantiques selon la langue
  const loadCantiques = () => {
    const currentCantiques = getCantiques();
    setCantiques(currentCantiques);
    
    // Récupérer les catégories uniques avec compteurs
    const data = currentCantiques.reduce((acc, cantique) => {
      const categorie = cantique.categorie;
      if (!acc[categorie]) {
        acc[categorie] = { name: categorie, count: 0, emoji: getCategorieEmoji(categorie) };
      }
      acc[categorie].count++;
      return acc;
    }, {});
    setCategoriesData(data);
  };


  
  // Recharger le verset quand la langue change et timer pour minuit
  useEffect(() => {
    const handleLanguageChange = (e) => {
      if (e.key === 'language') {
        setCurrentVerset(getRandomVerset());
      }
    };
    
    // Timer pour changer le verset à minuit
    const setupMidnightTimer = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const timeUntilMidnight = tomorrow.getTime() - now.getTime();
      
      const timer = setTimeout(() => {
        setCurrentVerset(getRandomVerset());
        // Configurer le timer pour le jour suivant
        setupMidnightTimer();
      }, timeUntilMidnight);
      
      return timer;
    };
    
    const midnightTimer = setupMidnightTimer();
    
    window.addEventListener('storage', handleLanguageChange);
    
    return () => {
      window.removeEventListener('storage', handleLanguageChange);
      clearTimeout(midnightTimer);
    };
  }, []);
  
  const categoriesList = Object.values(categoriesData);

  // Écouter les changements de langue des cantiques
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'cantiqueLanguage') {
        loadCantiques();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  function getCategorieEmoji(categorie) {
    const emojiMap = {
      'Oylọ': '🎵',
      'Opẹ': '🙏',
      'Pipa': '🎶',
      'Wedagbe': '💫',
      'Hokọnamẹ': '💪',
      'Azọn Jiwheyẹwhe tọn': '⚙️',
      'Owanyi Jiwheyẹwhe tọn': '❤️',
      'Adọgbo po todido po': '🌆',
      'Whlẹpọn po awhangba yisenọ tọn po': '🌟',
      'Huhlọn Jiwheyẹwhe tọn': '💪',
      'Odẹ': '🙏',
      'Yopovu lẹ': '👶',
      'Afọnńu': '🌅',
      'Tenu': '🌆',
      'Alọwle': '👰',
      'Jaya': '🎉',
      'Kọndopọ wiwe': '📜'
    };
    return emojiMap[categorie] || '🎶';
  }
  
  const handleCategorieSelect = (categorie) => {
    setShowCategories(false);
    onNavigate('cantiques', categorie);
  };
  const quickActions = [
    { icon: Book, label: t('cantiques'), path: 'cantiques', color: 'from-blue-500 to-blue-600', emoji: '📖' },
    { icon: Heart, label: t('favorites'), path: 'favoris', color: 'from-red-500 to-red-600', emoji: '❤️' },
  ];

  return (
    <div className="h-full relative overflow-hidden pb-24">
      {/* Fond avec dégradé et éléments musicaux */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900">
        {/* Clés de sol flottantes avec animations */}
        <div className="absolute top-10 left-8 text-blue-200 dark:text-blue-800 opacity-30 transform rotate-12 animate-float">
          <svg width="40" height="60" viewBox="0 0 24 36" fill="currentColor">
            <path d="M12 0C8.5 0 6 2.5 6 6c0 2 1 3.8 2.5 5L6 14c-1.5 1.5-2 3.5-2 5.5 0 3.5 2.5 6.5 6 6.5s6-3 6-6.5c0-2-0.5-4-2-5.5l-2.5-3c1.5-1.2 2.5-3 2.5-5C14 2.5 11.5 0 8 0z"/>
          </svg>
        </div>
        <div className="absolute top-32 right-12 text-purple-200 dark:text-purple-800 opacity-25 transform -rotate-6 animate-float-reverse">
          <svg width="35" height="50" viewBox="0 0 24 36" fill="currentColor">
            <path d="M12 0C8.5 0 6 2.5 6 6c0 2 1 3.8 2.5 5L6 14c-1.5 1.5-2 3.5-2 5.5 0 3.5 2.5 6.5 6 6.5s6-3 6-6.5c0-2-0.5-4-2-5.5l-2.5-3c1.5-1.2 2.5-3 2.5-5C14 2.5 11.5 0 8 0z"/>
          </svg>
        </div>
        <div className="absolute bottom-40 left-16 text-pink-200 dark:text-pink-800 opacity-20 transform rotate-45 animate-drift">
          <svg width="30" height="45" viewBox="0 0 24 36" fill="currentColor">
            <path d="M12 0C8.5 0 6 2.5 6 6c0 2 1 3.8 2.5 5L6 14c-1.5 1.5-2 3.5-2 5.5 0 3.5 2.5 6.5 6 6.5s6-3 6-6.5c0-2-0.5-4-2-5.5l-2.5-3c1.5-1.2 2.5-3 2.5-5C14 2.5 11.5 0 8 0z"/>
          </svg>
        </div>
        <div className="absolute top-64 left-4 text-indigo-200 dark:text-indigo-800 opacity-15 transform -rotate-12 animate-pulse-soft">
          <svg width="25" height="35" viewBox="0 0 24 36" fill="currentColor">
            <path d="M12 0C8.5 0 6 2.5 6 6c0 2 1 3.8 2.5 5L6 14c-1.5 1.5-2 3.5-2 5.5 0 3.5 2.5 6.5 6 6.5s6-3 6-6.5c0-2-0.5-4-2-5.5l-2.5-3c1.5-1.2 2.5-3 2.5-5C14 2.5 11.5 0 8 0z"/>
          </svg>
        </div>
        <div className="absolute bottom-20 right-8 text-cyan-200 dark:text-cyan-800 opacity-25 transform rotate-30 animate-float">
          <svg width="45" height="65" viewBox="0 0 24 36" fill="currentColor">
            <path d="M12 0C8.5 0 6 2.5 6 6c0 2 1 3.8 2.5 5L6 14c-1.5 1.5-2 3.5-2 5.5 0 3.5 2.5 6.5 6 6.5s6-3 6-6.5c0-2-0.5-4-2-5.5l-2.5-3c1.5-1.2 2.5-3 2.5-5C14 2.5 11.5 0 8 0z"/>
          </svg>
        </div>
        
        {/* Notes de musique avec animations */}
        <div className="absolute top-20 right-20 text-blue-300 dark:text-blue-700 opacity-40 animate-pulse-soft">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="6" cy="18" r="3"/>
            <circle cx="18" cy="14" r="3"/>
            <path d="M9 18V6l12-3v12"/>
          </svg>
        </div>
        <div className="absolute top-48 right-4 text-purple-300 dark:text-purple-700 opacity-35 animate-drift">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="6" cy="18" r="3"/>
            <circle cx="18" cy="14" r="3"/>
            <path d="M9 18V6l12-3v12"/>
          </svg>
        </div>
        <div className="absolute bottom-32 left-20 text-pink-300 dark:text-pink-700 opacity-30 animate-float-reverse">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="6" cy="18" r="3"/>
            <circle cx="18" cy="14" r="3"/>
            <path d="M9 18V6l12-3v12"/>
          </svg>
        </div>
        
        {/* Plus de clés de sol au lieu des portées */}
        <div className="absolute bottom-1/4 right-1/3 text-teal-400 dark:text-teal-600 opacity-45 transform -rotate-45 animate-drift drop-shadow-md">
          <svg width="36" height="54" viewBox="0 0 24 36" fill="currentColor">
            <path d="M12 0C8.5 0 6 2.5 6 6c0 2 1 3.8 2.5 5L6 14c-1.5 1.5-2 3.5-2 5.5 0 3.5 2.5 6.5 6 6.5s6-3 6-6.5c0-2-0.5-4-2-5.5l-2.5-3c1.5-1.2 2.5-3 2.5-5C14 2.5 11.5 0 8 0z"/>
          </svg>
        </div>
        <div className="absolute top-2/3 left-1/4 text-amber-400 dark:text-amber-600 opacity-35 transform rotate-135 animate-float drop-shadow-md">
          <svg width="28" height="42" viewBox="0 0 24 36" fill="currentColor">
            <path d="M12 0C8.5 0 6 2.5 6 6c0 2 1 3.8 2.5 5L6 14c-1.5 1.5-2 3.5-2 5.5 0 3.5 2.5 6.5 6 6.5s6-3 6-6.5c0-2-0.5-4-2-5.5l-2.5-3c1.5-1.2 2.5-3 2.5-5C14 2.5 11.5 0 8 0z"/>
          </svg>
        </div>
        
        {/* Cercles décoratifs avec animations */}
        <div className="absolute top-16 left-1/2 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-900 dark:to-purple-900 rounded-full opacity-20 blur-xl animate-pulse-soft"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-pink-200 to-orange-200 dark:from-pink-900 dark:to-orange-900 rounded-full opacity-15 blur-lg animate-drift"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-cyan-200 to-blue-200 dark:from-cyan-900 dark:to-blue-900 rounded-full opacity-25 blur-md animate-float"></div>
      </div>
      
      {/* Contenu principal */}
      <div className="relative z-10">
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
            {t('appTitle')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {t('appSubtitle')}
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
                {/* Header avec icône */}
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={20} className="text-white" />
                  <h3 className="text-sm font-bold text-white uppercase tracking-wide">
                    {t('verseOfDay')}
                  </h3>
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
          <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden max-h-80 overflow-y-auto z-50">
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
          <span className="font-medium">{t('categories')}</span>
          {showCategories ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        </button>
      </div>
      

      </div>
    </div>
  );
};

export default Home;