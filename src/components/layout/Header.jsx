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
            <div className="flex-1 max-w-md ml-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder={t('easySearch')}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
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