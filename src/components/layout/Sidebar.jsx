import { Home, Book, Heart, MapPin, Info, Settings, HandHeart, Languages } from 'lucide-react';
import { t } from '../../data/translations';

const Sidebar = ({ onNavigate, currentPage }) => {

  const menuItems = [
    { icon: Home, label: t('home'), path: 'home' },
    { icon: Book, label: t('cantiques'), path: 'cantiques' },
    { icon: HandHeart, label: t('prayers'), path: 'prayers' },
    { icon: Heart, label: t('favorites'), path: 'favoris' },
    { icon: MapPin, label: t('findChurch'), path: 'churches' },
    { icon: Languages, label: t('cantiqueLanguage'), path: 'cantique-language' },
    { icon: Info, label: t('instructions'), path: 'instructions' },
    { icon: Info, label: t('about'), path: 'about' },
    { icon: Settings, label: t('settings'), path: 'settings' },
  ];

  const handleNavigation = (path) => {
    onNavigate(path);
  };

  return (
    <aside className="h-full w-72 bg-white dark:bg-gray-800 shadow-2xl flex flex-col">
        {/* Logo / Header */}
        <div className="p-6 bg-gradient-to-br from-primary-600 to-primary-800 dark:from-gray-700 dark:to-gray-900 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-16 h-16 rounded-full overflow-hidden">
              <img src="/images/logo.jpeg" alt="JJC Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-xl font-bold">{t('appTitle')}</h1>
              <p className="text-xs text-primary-100">v1.0.0</p>
            </div>
          </div>
          <p className="text-sm text-primary-100">{t('cantiques')} & {t('prayers')}</p>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 overflow-y-auto">
          {menuItems.map((item, index) => {
            const isActive = currentPage === item.path;
            return (
              <button
                key={index}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-2 menu-item ${
                  isActive 
                    ? 'bg-primary-600 text-white shadow-md' 
                    : 'text-gray-700 dark:text-gray-200 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer compact */}
        <div className="mt-auto p-2 text-center text-xs text-gray-500 dark:text-gray-400 border-t bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="flex justify-center mb-1">
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <img src="/images/logo.jpeg" alt="JJC Logo" className="w-full h-full object-cover" />
            </div>
          </div>
          <p className="text-xs font-medium text-gray-600 dark:text-gray-300">JJC</p>
        </div>
      </aside>
  );
};

export default Sidebar;