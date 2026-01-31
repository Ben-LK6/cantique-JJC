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

        {/* Search Bar - Apparaît seulement quand l'icône est cliquée */}
        <AnimatePresence>
          {showSearch && isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60" size={18} />
                <input
                  type="text"
                  value={searchValue}
                  placeholder={t('easySearch')}
                  className="w-full pl-11 pr-4 py-3.5 bg-white/95 backdrop-blur-md text-gray-800 placeholder-gray-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-white shadow-lg transition-all border-2 border-white/50"
                  onChange={e => {
                    const val = e.target.value;
                    setSearchValue(val);
                    onSearch && onSearch(val);
                  }}
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ModernHeader;