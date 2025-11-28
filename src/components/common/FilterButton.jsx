import { Filter, X, Check } from 'lucide-react';
import { useState } from 'react';

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
      {/* Bouton Flottant - Position fixe optimisée pour mobile */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 text-sm font-semibold active:opacity-90 transition-opacity"
        style={{
          background: 'linear-gradient(to right, var(--color-primary-500), var(--color-primary-600))',
          touchAction: 'manipulation'
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
      </button>

      {/* Overlay + Menu Popup */}
      {isOpen && (
        <>
          {/* Overlay sombre */}
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Menu Popup depuis le bas - Plus compact */}
          <div
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[70vh] overflow-hidden shadow-2xl"
            style={{
              animation: 'slideUp 0.2s ease-out'
            }}
          >
            {/* Header - Plus compact */}
            <div className="flex items-center justify-between px-5 py-4 border-b sticky top-0 bg-white">
              <h3 className="text-lg font-bold text-gray-800">{label}</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors active:bg-gray-200"
                style={{ touchAction: 'manipulation' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Options - Plus compactes */}
            <div className="overflow-y-auto max-h-[calc(70vh-60px)] p-3 pb-6">
              <div className="space-y-1.5 pb-4">
                {options.map((option) => {
                  const isSelected = selected === option;

                  return (
                    <button
                      key={option}
                      onClick={() => {
                        onSelect(option);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors text-sm active:opacity-80 ${
                        isSelected
                          ? 'shadow-md'
                          : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600'
                      }`}
                      style={isSelected ? {
                        backgroundColor: 'var(--color-primary-600)',
                        color: 'white',
                        touchAction: 'manipulation'
                      } : {
                        touchAction: 'manipulation'
                      }}
                    >
                      <span className="font-semibold">{option}</span>
                      {isSelected && (
                        <Check size={18} strokeWidth={3} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <style>{`
            @keyframes slideUp {
              from {
                transform: translateY(100%);
              }
              to {
                transform: translateY(0);
              }
            }
          `}</style>
        </>
      )}
    </>
  );
};

export default FilterButton;