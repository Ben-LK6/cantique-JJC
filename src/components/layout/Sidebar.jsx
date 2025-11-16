import { Home, Book, Heart, MapPin, Info, Settings, HandHeart } from 'lucide-react';

const Sidebar = ({ onNavigate, currentPage }) => {

  const menuItems = [
    { icon: Home, label: 'Accueil', path: 'home' },
    { icon: Book, label: 'Cantiques', path: 'cantiques' },
    { icon: HandHeart, label: 'Prières', path: 'prayers' },
    { icon: Heart, label: 'Favoris', path: 'favoris' },
    { icon: MapPin, label: 'Trouver une église', path: 'churches' },
    { icon: Info, label: 'Instructions', path: 'instructions' },
    { icon: Info, label: 'À propos', path: 'about' },
    { icon: Settings, label: 'Paramètres', path: 'settings' },
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
              <h1 className="text-xl font-bold">Cantique JJC</h1>
              <p className="text-xs text-primary-100">v1.0.0</p>
            </div>
          </div>
          <p className="text-sm text-primary-100">Cantiques & Prières</p>
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
          <p className="mt-1">© 2025 - Tous droits réservés</p>
          <p className="mt-2 text-primary-600">Made with ❤️ for God's glory</p>
        </div>
      </aside>
  );
};

export default Sidebar;