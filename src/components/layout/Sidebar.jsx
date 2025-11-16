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
    <aside className="h-full w-72 bg-white shadow-2xl overflow-y-auto">
        {/* Logo / Header */}
        <div className="p-6 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
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
        <nav className="p-4">
          {menuItems.map((item, index) => {
            const isActive = currentPage === item.path;
            return (
              <button
                key={index}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all mb-2 ${
                  isActive 
                    ? 'bg-primary-600 text-white shadow-md' 
                    : 'text-gray-700 hover:bg-primary-50 hover:text-primary-600'
                }`}
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 w-full p-4 text-center text-xs text-gray-500 border-t bg-gray-50">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img src="/images/logo.jpeg" alt="JJC Logo" className="w-full h-full object-cover" />
            </div>
          </div>
          <p className="font-semibold text-gray-700">Église JJC</p>
          <p className="mt-1">{t('copyright')}</p>
          <p className="mt-2 text-primary-600">{t('madeWith')}</p>
        </div>
      </aside>
  );
};

export default Sidebar;