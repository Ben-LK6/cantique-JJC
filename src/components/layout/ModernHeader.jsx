import { ArrowLeft, Search, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { t } from '../../data/translations';

const ModernHeader = ({ 
  title, 
  subtitle, 
  onBack, 
  showSearch, 
  onSearch,
  showMenu,
  onMenuClick,
  rightButtons
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const popoverRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isSearchOpen) return;
    const onDocClick = (e) => {
      if (!popoverRef.current) return;
      if (!popoverRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [isSearchOpen]);

  useEffect(() => {
    if (!isSearchOpen) return;
    // small timeout to ensure popover is mounted before focusing
    const t = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        // trigger initial search / refresh of list (empty string will show all)
        onSearch && onSearch(searchValue || '');
      }
    }, 60);
    return () => clearTimeout(t);
  }, [isSearchOpen]);
  return (
    <div className="nav-theme fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="px-4 py-4 relative">
        {/* Top Row */}
        <div className="flex items-center justify-between mb-3">
          {/* Left Side */}
          <div className="flex items-center gap-3 flex-1">
            {onBack ? (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onBack}
                className="header-icon-btn p-0 bg-white/14"
              >
                <ArrowLeft size={20} className="text-white" />
              </motion.button>
            ) : showMenu ? (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onMenuClick}
                className="header-icon-btn p-0 bg-gradient-to-br from-pink-500 to-pink-600 lg:hidden"
              >
                <div className="w-full h-full flex items-center justify-center rounded-lg">
                  <Menu size={20} className="text-white" strokeWidth={2.2} />
                </div>
              </motion.button>
            ) : null}
            
            <div className="flex-1">
              <h1 className="header-font text-2xl md:text-3xl lg:text-4xl font-extrabold text-white flex items-center gap-2 leading-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm text-pink-100 mt-1">{subtitle}</p>
              )}
            </div>
          </div>

          {/* Right Side */}
          {showSearch && (
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="header-icon-btn bg-white/12"
              title={t('search')}
            >
              <Search size={20} className="text-pink-100" strokeWidth={2.2} />
            </motion.button>
          )}
          
          <div className="flex items-center gap-2">
            {rightButtons}
          </div>
        </div>

        {/* Search Bar - Apparaît seulement quand l'icône est cliquée */}
        {showSearch && isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute right-4 top-full mt-1 -translate-y-2 z-50 w-72 sm:w-80 max-w-full"
            ref={popoverRef}
          >
            <div className="bg-white rounded-3xl shadow-2xl border border-pink-50 p-1">
              <div className="flex items-center gap-2 px-3 py-2">
                <Search className="text-pink-400" size={18} />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchValue}
                  placeholder={t('easySearch')}
                  className="flex-1 bg-transparent text-pink-700 placeholder-pink-300 focus:outline-none text-sm"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      onSearch && onSearch(searchValue);
                    }
                    if (e.key === 'Escape') {
                      setIsSearchOpen(false);
                    }
                  }}
                  onChange={(e) => {
                    const v = e.target.value;
                    setSearchValue(v);
                    onSearch && onSearch(v);
                  }}
                  autoFocus
                />
                <button
                  aria-label="Close search"
                  onClick={() => setIsSearchOpen(false)}
                  className="p-1.5 rounded-lg text-pink-500 hover:bg-pink-50"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ModernHeader;