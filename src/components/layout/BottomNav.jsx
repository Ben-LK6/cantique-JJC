import { Home, Settings, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { t } from '../../data/translations';

const BottomNav = ({ currentPage, onNavigate }) => {
  const navItems = [
    { icon: Home, label: t('home'), path: 'home' },
    null, // Espace central pour Langue des cantiques
    { icon: Settings, label: t('settings'), path: 'settings' },
  ];

  return (
    <div className="w-full">
      <div className="relative">
        {/* Barre principale - Bleu dégradé */}
        <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 shadow-2xl">
          <div className="flex items-center justify-around px-3 py-2 relative">
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
                  className={`flex flex-col items-center justify-center min-w-[50px] py-1.5 px-2 rounded-xl transition-all menu-item ${
                    isActive ? 'bg-white/20 dark:bg-white/10 backdrop-blur-sm' : ''
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
                      size={20} 
                      className={`${isActive ? 'text-white drop-shadow-lg' : 'text-primary-200 dark:text-primary-300'}`}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                  </motion.div>
                  <span className={`text-xs mt-1 font-semibold ${
                    isActive ? 'text-white' : 'text-primary-200 dark:text-primary-300'
                  }`}>
                    {item.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Bouton Central Flottant - Langue des cantiques */}
        <div className="absolute left-1/2 bottom-6 transform -translate-x-1/2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onNavigate('cantique-language')}
            className="relative"
          >
            {/* Cercles animés de pulsation */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0, 0.3]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-blue-400 rounded-full blur-lg"
            ></motion.div>
            
            {/* Bouton principal avec dégradé et ombre */}
            <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-full shadow-xl flex flex-col items-center justify-center border-3 border-white">
              <div className="flex flex-col items-center">
                <Globe size={20} className="text-white drop-shadow-lg mb-0.5" strokeWidth={2.5} />
                <span className="text-white text-xs font-bold drop-shadow-lg tracking-tight leading-none">
                  {t('cantiqueLanguage')}
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