import { Home, Settings, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { t } from '../../data/translations';
import { createPortal } from 'react-dom';

const BottomNav = ({ currentPage, onNavigate }) => {
  const navItems = [
    { icon: Home, label: t('home'), path: 'home' },
    null, // Espace central pour Langue des cantiques
    { icon: Settings, label: t('settings'), path: 'settings' },
  ];

  const nav = (
    <div
      className="fixed bottom-0 left-0 right-0 z-[99999] backdrop-blur-sm border-t border-white/10"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 12px)', position: 'fixed' }}
    >
      <div className="relative">
        {/* Barre principale - rose dégradé */}
        <div className="nav-theme shadow-2xl">
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
                          className={`${isActive ? 'text-white drop-shadow-lg' : 'text-pink-200 dark:text-pink-300'}`}
                      strokeWidth={isActive ? 2.5 : 2}
                    />
                  </motion.div>
                       <span className={`text-xs mt-1 font-semibold ${
                         isActive ? 'text-white' : 'text-pink-200 dark:text-pink-300'
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
              className="absolute inset-0 nav-pulse-theme rounded-full blur-lg"
            ></motion.div>
            
            {/* Bouton principal avec dégradé et ombre */}
            <div className="relative w-20 h-20 nav-button-theme rounded-full shadow-xl flex flex-col items-center justify-center border-3 border-white">
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

  if (typeof document !== 'undefined') {
    return createPortal(nav, document.body);
  }

  return nav;
};

export default BottomNav;