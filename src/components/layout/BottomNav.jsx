import { Home, Book, HandHeart, Settings, Globe } from 'lucide-react';  // Changé Heart par Globe
import { motion } from 'framer-motion';

const BottomNav = ({ currentPage, onNavigate }) => {
  const navItems = [
    { icon: Home, label: 'Accueil', path: 'home' },
    { icon: HandHeart, label: 'Prières', path: 'prayers' },
    { icon: Globe, label: 'Langue des cantiques', path: 'langues' },
    { icon: Settings, label: 'Paramètres', path: 'settings' },
  ];

  return (
    <div className="w-full">
      <div className="relative">
        {/* Barre principale - Bleu dégradé */}
        <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 shadow-2xl">
          <div className="flex items-center justify-around px-3 py-4 relative">
            {navItems.map((item, index) => {


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


      </div>
    </div>
  );
};

export default BottomNav;