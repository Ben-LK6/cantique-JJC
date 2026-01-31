import { Search } from 'lucide-react';
import { t } from '../../data/translations';

const Header = ({ title = t('home'), showSearch = false, onSearch }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="px-4 py-4 lg:px-6">
        <div className="flex items-center justify-between">
          {/* Title */}
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800">{title}</h2>

          {/* Search Bar (si activé) */}
          {showSearch && (
            <div className="flex-1 max-w-xs ml-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                <input
                  type="text"
                  placeholder={t('easySearch')}
                  className="w-full pl-9 pr-4 py-1.5 border border-gray-200 dark:border-gray-600 rounded-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-400 transition-all duration-150 text-sm placeholder-gray-400 dark:placeholder-gray-500"
                  style={{ minHeight: '38px', fontWeight: 500, boxShadow: '0 2px 8px 0 rgba(31,38,135,0.06)' }}
                  onChange={(e) => onSearch && onSearch(e.target.value)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;