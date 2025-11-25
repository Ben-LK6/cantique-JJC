import { ArrowLeft, Search, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
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
  return (
    <div className="nav-theme sticky top-0 z-40 shadow-lg">
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
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2.5 bg-white/20 hover:bg-white/30 rounded-xl transition-colors backdrop-blur-sm"
            >
              <Search size={20} className="text-white" strokeWidth={2.5} />
            </motion.button>
          )}
          
          <div className="flex items-center gap-2">
            {rightButtons}
          </div>
        </div>

        {/* Search Bar - Apparaît seulement quand l'icône est cliquée */}
        {showSearch && isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-300" size={18} />
              <input
                type="text"
                placeholder={t('easySearch')}
                className="w-full pl-11 pr-4 py-3 bg-white/10 backdrop-blur-md text-white placeholder-primary-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/20 transition-all border border-white/20"
                onChange={(e) => onSearch && onSearch(e.target.value)}
                autoFocus
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ModernHeader;