import { Filter, X, Check } from 'lucide-react';
import { useState, useRef, useLayoutEffect, useEffect } from 'react';

const FilterButton = ({ options = [], selected, onSelect = () => {}, color = 'primary', label = 'Filtrer' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [popupStyle, setPopupStyle] = useState({});
  const btnRef = useRef(null);

  const updatePopupPosition = () => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const popupWidth = Math.min(window.innerWidth * 0.9, 340);
    const left = rect.left + rect.width / 2 - popupWidth / 2;
    const boundedLeft = Math.max(8, Math.min(left, window.innerWidth - popupWidth - 8));
    const bottom = window.innerHeight - rect.top + 8;

    setPopupStyle({
      position: 'fixed',
      left: `${boundedLeft}px`,
      bottom: `${bottom}px`,
      minWidth: 240,
      maxWidth: 340,
      width: '90vw',
      borderRadius: '1.25rem',
      boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
      background: 'rgba(255,255,255,0.9)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      overflow: 'hidden',
      maxHeight: '44vh',
      border: '1px solid rgba(0,0,0,0.06)',
      zIndex: 9999,
    });
  };

  useLayoutEffect(() => {
    if (isOpen) updatePopupPosition();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onResize = () => updatePopupPosition();
    const onScroll = () => updatePopupPosition();
    const onKey = (e) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('resize', onResize);
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <>
      <div className="relative">
        {selected && !['Tous', 'Toutes', 'All'].includes(selected) && (
          <div className="absolute -top-9 left-0 bg-white/95 backdrop-blur-sm px-2 py-0.5 rounded-md shadow-md border animate-fade-in max-w-[150px]" style={{ borderColor: 'var(--color-primary-400)' }}>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0" style={{ backgroundColor: 'var(--color-primary-500)' }} />
              <span className="text-[10px] font-bold truncate" style={{ color: 'var(--color-primary-700)' }}>{selected}</span>
            </div>
          </div>
        )}

        <button
          ref={btnRef}
          onClick={() => setIsOpen(true)}
          className="text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 text-sm font-semibold active:opacity-90 transition-all hover:shadow-xl"
          style={{ background: 'linear-gradient(to right, var(--color-primary-500), var(--color-primary-600))', touchAction: 'manipulation' }}
        >
          <Filter size={16} />
          <span>{(selected && !['Tous', 'Toutes', 'All'].includes(selected)) ? selected : label}</span>
          {selected && !['Tous', 'Toutes', 'All'].includes(selected) && (
            <span className="text-xs px-1.5 py-0.5 rounded-full font-bold" style={{ backgroundColor: 'white', color: 'var(--color-primary-600)' }}>1</span>
          )}
        </button>
      </div>

      {isOpen && (
        <>
          <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" />

          <div style={popupStyle} className="animate-fade-in">
            <div className="flex items-center justify-between px-4 py-2 border-b bg-white/80 dark:bg-gray-900/80">
              <h3 className="text-base font-bold text-gray-800">{label}</h3>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 rounded-full transition-colors active:bg-gray-200" style={{ touchAction: 'manipulation' }}>
                <X size={18} />
              </button>
            </div>

            <div className="overflow-y-auto p-2" style={{ maxHeight: 'calc(44vh - 44px)' }}>
              <div className="space-y-1 pb-2">
                {options.map((option) => {
                  const isSelected = selected === option;
                  return (
                    <button
                      key={option}
                      onClick={() => handleSelect(option)}
                      className={`w-full flex items-center justify-between px-4 py-2 rounded-xl text-base font-medium transition-all ${isSelected ? 'bg-primary-600 text-white shadow' : 'bg-white/90 dark:bg-gray-900/80 text-gray-900 dark:text-white hover:bg-primary-50/60 dark:hover:bg-primary-900/30'}`}
                      style={{ touchAction: 'manipulation', transition: 'background 0.18s, box-shadow 0.18s' }}
                    >
                      <span className="truncate">{option}</span>
                      {isSelected && <Check size={16} strokeWidth={3} />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FilterButton;

