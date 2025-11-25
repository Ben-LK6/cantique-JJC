import { Filter, X, Check } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FilterButton = ({ options, selected, onSelect, color = 'primary', label = 'Filtrer' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const colorVariants = {
    primary: {
      button: 'from-primary-500 to-primary-600',
      badge: 'bg-white text-primary-600',
      selected: 'bg-primary-600 text-white',
      hover: 'hover:bg-primary-50'
    },
    purple: {
      button: 'from-purple-500 to-purple-600',
      badge: 'bg-white text-purple-600',
      selected: 'bg-purple-600 text-white',
      hover: 'hover:bg-purple-50'
    }
  };

  const colors = colorVariants[color] || colorVariants.primary;

  return (
    <>
      {/* Bouton Flottant - Plus petit */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed right-4 bottom-24 z-40 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 text-sm font-semibold"
        style={{
          background: 'linear-gradient(to right, var(--color-primary-500), var(--color-primary-600))'
        }}
      >
        <Filter size={16} />
        <span>{label}</span>
        {selected !== 'Tous' && selected !== 'Toutes' && (
          <span 
            className="text-xs px-1.5 py-0.5 rounded-full font-bold"
            style={{
              backgroundColor: 'white',
              color: 'var(--color-primary-600)'
            }}
          >
            1
          </span>
        )}
      </motion.button>

      {/* Overlay + Menu Popup */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay sombre */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />

            {/* Menu Popup depuis le bas - Plus compact */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-20 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[65vh] overflow-hidden shadow-2xl mb-2"
            >
              {/* Header - Plus compact */}
              <div className="flex items-center justify-between px-5 py-4 border-b sticky top-0 bg-white">
                <h3 className="text-lg font-bold text-gray-800">{label}</h3>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Options - Plus compactes */}
              <div className="overflow-y-auto max-h-[calc(70vh-60px)] p-3 pb-6">
                <div className="space-y-1.5 pb-4">
                  {options.map((option, index) => {
                    const isSelected = selected === option;
                    
                    return (
                      <motion.button
                        key={option}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          onSelect(option);
                          setIsOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all text-sm ${
                          isSelected
                            ? 'shadow-md'
                            : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
                        }`}
                        style={isSelected ? {
                          backgroundColor: 'var(--color-primary-600)',
                          color: 'white'
                        } : {}}
                      >
                        <span className="font-semibold">{option}</span>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring' }}
                          >
                            <Check size={18} strokeWidth={3} />
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default FilterButton;