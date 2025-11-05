import { Book, Heart, Sparkles, Music, HandHeart, ChevronUp, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { cantiques } from '../data/cantiques';

const Home = ({ onNavigate }) => {
  const [showThemes, setShowThemes] = useState(false);
  
  // Récupérer les thèmes uniques avec compteurs
  const themes = cantiques.reduce((acc, cantique) => {
    const theme = cantique.theme;
    if (!acc[theme]) {
      acc[theme] = { name: theme, count: 0, emoji: getThemeEmoji(theme) };
    }
    acc[theme].count++;
    return acc;
  }, {});
  
  const themeList = Object.values(themes);
  
  function getThemeEmoji(theme) {
    const emojiMap = {
      'Louange': '🎵',
      'Adoration': '🙏',
      'Action de grâces': '🙌',
      'Prière': '💫',
      'Confiance': '💪'
    };
    return emojiMap[theme] || '🎶';
  }
  
  const handleThemeSelect = (theme) => {
    setShowThemes(false);
    onNavigate('cantiques', theme);
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

      {/* Verset du jour */}
      <div className="mx-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-blue-600 dark:text-blue-400" size={20} />
            <h3 className="text-sm font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
              Verset du jour
            </h3>
          </div>
          <p className="text-gray-800 dark:text-gray-200 text-base leading-relaxed mb-3 italic">
            "Louez l'Eternel ! Chantez à l'Eternel un cantique nouveau ! Chantez ses louanges dans l'assemblée des fidèles !"
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
            — Psaumes 149:1
          </p>
        </div>
      </div>

      {/* Overlay pour fermer le dropdown */}
      {showThemes && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowThemes(false)}
        />
      )}
      
      {/* Sélecteur de Thème */}
      <div className="mx-6 relative z-50">
        {/* Dropdown des thèmes - apparaît au-dessus */}
        {showThemes && (
          <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            {themeList.map((theme, index) => (
              <button
                key={index}
                onClick={() => handleThemeSelect(theme.name)}
                className="w-full px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left border-b border-gray-100 dark:border-gray-700 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{theme.emoji}</span>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white text-sm">{theme.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{theme.count} cantique{theme.count > 1 ? 's' : ''}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
        
        {/* Bouton flèche */}
        <button
          onClick={() => setShowThemes(!showThemes)}
          className="w-full bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 rounded-xl p-4 shadow-lg text-white transition-all flex items-center justify-center gap-2"
        >
          <Music size={20} />
          <span className="font-medium">Thèmes</span>
          {showThemes ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        </button>
      </div>
      

    </div>
  );
};

export default Home;