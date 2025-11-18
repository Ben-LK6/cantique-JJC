import { Home, Book, HandHeart, Settings, Globe } from 'lucide-react';  // Changé Heart par Globe
import { motion } from 'framer-motion';

const BottomNav = ({ currentPage, onNavigate }) => {
  const navItems = [
    { icon: Home, label: 'Accueil', path: 'home' },
    { icon: HandHeart, label: 'Prières', path: 'prayers' },
    null, // Espace central pour Cantiques
    { icon: Globe, label: 'Langue des cantiques', path: 'langues' },  // Changé de Heart/Favoris/favoris à Globe/Langue des cantiques/langues
    { icon: Settings, label: 'Paramètres', path: 'settings' },
  ];

  return (
    <div className="w-full">
      <div className="relative">
        {/* Barre principale - Bleu dégradé */}
        <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 shadow-2xl">
          <div className="flex items-center justify-around px-3 py-4 relative">
            {navItems.map((item, index) => {
              if (!item) {
                return <div key="spacer" className="w-14"></div>;
              }

              const isActive = currentPage === item.path;
              const Icon = item.icon;
              
              return (
                <motion.button
                  key={item.path}
                  onClick={() => onNavigate(item.path)}
                  className={`flex flex-col items-center justify-center min-w-[60px] py-2 px-2 rounded-2xl transition-all ${
                    isActive ? 'bg-white/20 backdrop-blur-sm' : ''
                  }`}
                  whileTap={{ scale: 0.9 }}
                >
                  <motion.div
                    animate={{ 
                      scale: isActive ? 1.1 : 1,
                      y: isActive ? -2 : 0
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon 
                      size={24} 
                      className={`${isActive ? 'text-white drop-shadow-lg' : 'text-primary-200'}`}
                      strokeWidth={isActive ? 3 : 2}
                    />
                  </motion.div>
                  <span className={`text-xs mt-1.5 font-bold ${
                    isActive ? 'text-white' : 'text-primary-200'
                  }`}>
                    {item.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Bouton Central Flottant - Cantiques */}
        <div className="absolute left-1/2 bottom-8 transform -translate-x-1/2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('cantiques')}
            className="relative"
          >
            {/* Cercles animés de pulsation */}
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.4, 0, 0.4]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-blue-400 rounded-full blur-xl"
            ></motion.div>
            
            {/* Bouton principal avec dégradé et ombre */}
            <div className="relative w-24 h-24 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-full shadow-2xl flex flex-col items-center justify-center border-4 border-white">
              <div className="flex flex-col items-center">
                <Book size={24} className="text-white drop-shadow-lg mb-0.5" strokeWidth={2.5} />
                <span className="text-white text-xs font-bold drop-shadow-lg tracking-tight leading-none">
                  Cantiques
                </span>
              </div>
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;