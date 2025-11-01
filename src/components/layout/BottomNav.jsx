import { Home, Book, MessageCircle, Gift, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const BottomNav = ({ currentPage, onNavigate }) => {
  const navItems = [
    { icon: Home, label: 'Accueil', path: 'home' },
    { icon: Book, label: 'Cantiques', path: 'cantiques' },
    null, // Espace central
    { icon: Gift, label: 'Don', path: 'donation' },
    { icon: Settings, label: 'Paramètres', path: 'settings' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
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

        {/* Bouton Central Flottant - ULTRA WOW avec pulsation */}
        <div className="absolute left-1/2 bottom-8 transform -translate-x-1/2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onNavigate('prayers')}
            className="relative"
          >
            {/* Cercles animés de pulsation */}
            <motion.div
              animate={{ 
                scale: [1, 1.4, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-purple-400 rounded-full blur-xl"
            ></motion.div>
            
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 0, 0.7]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
              className="absolute inset-0 bg-purple-500 rounded-full blur-lg"
            ></motion.div>
            
            {/* Bouton principal avec dégradé et ombre */}
            <div className="relative w-20 h-20 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 rounded-full shadow-2xl flex items-center justify-center border-4 border-white">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <MessageCircle size={32} className="text-white drop-shadow-lg" strokeWidth={2.5} />
              </motion.div>
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;