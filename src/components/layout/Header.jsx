import { Search } from 'lucide-react';
import { t } from '../../data/translations';

const Header = ({ title = t('home'), showSearch = false, onSearch }) => {
  return (
    <header className="bg-gradient-to-r from-pink-50 via-pink-100 to-white border-b border-pink-200 shadow-md sticky top-0 z-30">
      <div className="px-4 py-3 lg:px-6">
        <div className="flex items-center justify-between gap-4">
          {/* Logo + Title */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-pink-200">
              <img src="/images/logo.jpeg" alt="JJC Logo" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg lg:text-2xl font-extrabold text-pink-700 tracking-tight">{title}</h1>
              <p className="text-xs text-pink-500 leading-tight">Chants & Prières</p>
            </div>
          </div>

          {/* Search Bar (centered if activé) */}
          {showSearch ? (
            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400" size={20} />
                <input
                  type="text"
                  placeholder={t('easySearch')}
                  className="w-full pl-10 pr-4 py-2 border border-pink-100 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  onChange={(e) => onSearch && onSearch(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="flex-1" />
          )}

          {/* Right slot (keeps spacing consistent, reserved for future actions) */}
          <div className="flex items-center gap-2">
            {/* Placeholder for action icons - kept minimal for professional look */}
            <div className="w-9 h-9 rounded-lg bg-white/60 flex items-center justify-center text-pink-600 shadow-sm hidden sm:flex">J</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;