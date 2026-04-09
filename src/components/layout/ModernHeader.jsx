import { ArrowLeft, Search, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { t } from '../../data/translations';

const ModernHeader = ({ 
  title, 
  subtitle, 
  onBack, 
  showSearch, 
  onSearch,
  onSearchClose,
  showMenu,
  onMenuClick,
  rightButtons,
  icon
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // Synchroniser la valeur locale avec le searchTerm global si besoin
  const [searchValue, setSearchValue] = useState('');
  return (
    <div className="nav-theme sticky top-0 z-50 shadow-lg">
      <div className="px-4 py-4">
        {/* Top Row */}
        <div className="flex items-center justify-between mb-3">
          {/* Left Side */}
          <div className="flex items-center gap-3 flex-1">
            {onBack ? (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onBack}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors backdrop-blur-sm"
              >
                <ArrowLeft size={20} className="text-white" />
              </motion.button>
            ) : showMenu ? (
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onMenuClick}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors backdrop-blur-sm lg:hidden"
              >
                <Menu size={20} className="text-white" />
              </motion.button>
            ) : null}
            
            <div className="flex-1">
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                {icon && <span className="text-2xl">{icon}</span>}
                {title}
              </h1>
              {subtitle && (
                <p className="text-xs text-primary-100">{subtitle}</p>
              )}
            </div>
          </div>

          {/* Right Side */}
          {showSearch && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                if (isSearchOpen) {
                  setSearchValue('');
                  onSearch && onSearch('');
                  onSearchClose && onSearchClose();
                }
              }}
              className={`p-2.5 rounded-xl transition-all backdrop-blur-sm ${
                isSearchOpen 
                  ? 'bg-white/30 hover:bg-white/40' 
                  : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              {isSearchOpen ? (
                <X size={20} className="text-white" strokeWidth={2.5} />
              ) : (
                <Search size={20} className="text-white" strokeWidth={2.5} />
              )}
            </motion.button>
          )}
          
          <div className="flex items-center gap-2">
            {rightButtons}
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {showSearch && isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="overflow-hidden mt-2"
            >
              <div className="relative flex items-center">
                <Search className="absolute left-3.5 text-white/50" size={15} />
                <input
                  type="text"
                  value={searchValue}
                  placeholder={t('easySearch')}
                  className="w-full pl-9 pr-9 py-2 bg-white/15 backdrop-blur-md text-white placeholder-white/50 rounded-full text-sm focus:outline-none focus:bg-white/25 transition-all border border-white/20"
                  onChange={e => {
                    const val = e.target.value;
                    setSearchValue(val);
                    onSearch && onSearch(val);
                  }}
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                />
                {searchValue && (
                  <button
                    onClick={() => {
                      setSearchValue('');
                      onSearch && onSearch('');
                    }}
                    className="absolute right-3 text-white/60 hover:text-white transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ModernHeader;