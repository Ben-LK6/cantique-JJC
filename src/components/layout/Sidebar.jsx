import { Home, Book, Heart, MapPin, Info, Settings, Gift, HandHeart, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Sidebar = ({ onNavigate, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Accueil', path: 'home' },
    { icon: Book, label: 'Cantiques', path: 'cantiques' },
    { icon: HandHeart, label: 'Prières', path: 'prayers' },
    { icon: Heart, label: 'Favoris', path: 'favoris' },
    { icon: MapPin, label: 'Trouver une église', path: 'churches' },
    { icon: Info, label: 'Instructions', path: 'instructions' },
    { icon: Info, label: 'À propos', path: 'about' },
    { icon: Gift, label: 'Faire un don', path: 'donation' },
    { icon: Settings, label: 'Paramètres', path: 'settings' },
  ];

  const handleNavigation = (path) => {
    onNavigate(path);
    setIsOpen(false);
  };

  return (
    <>
      {/* Bouton Menu Mobile - TOUJOURS VISIBLE */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-3 bg-primary-600 text-white rounded-xl shadow-lg lg:hidden hover:bg-primary-700 transition-colors"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay pour mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-40 transform transition-transform duration-300 overflow-y-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static
        `}
      >
        {/* Logo / Header */}
        <div className="p-6 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-primary-600 font-bold text-xl">JJC</span>
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
          <p className="font-semibold text-gray-700">Église JJC</p>
          <p className="mt-1">© 2025 - Tous droits réservés</p>
          <p className="mt-2 text-primary-600">Made with ❤️ for God's glory</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;