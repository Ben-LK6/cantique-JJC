import { useState, useEffect } from 'react';
import BottomNav from './components/layout/BottomNav';
import ModernHeader from './components/layout/ModernHeader';
import Sidebar from './components/layout/Sidebar';
import Home from './pages/Home';
import Cantiques from './pages/Cantiques';
import CantiqueDetail from './pages/CantiqueDetail';
import Prayers from './pages/Prayers';
import Favorites from './pages/Favorites';
import FindChurch from './pages/FindChurch';
import About from './pages/About';
import Settings from './pages/Settings';
import CantiqueLanguage from './pages/CantiqueLanguage';
import Instructions from './pages/Instructions';
import { t } from './data/translations';
import { useMobileOptimization } from './components/common/MobileOptimized';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCantiqueId, setSelectedCantiqueId] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');

  // Fonction sécurisée pour localStorage
  const safeLocalStorage = {
    getItem: (key) => {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        console.warn('localStorage not available:', e);
        return null;
      }
    },
    setItem: (key, value) => {
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        console.warn('localStorage not available:', e);
      }
    }
  };

  // États pour les paramètres
  const [theme, setTheme] = useState(() => safeLocalStorage.getItem('theme') || 'blue');
  const [fontSize, setFontSize] = useState(() => safeLocalStorage.getItem('fontSize') || 'medium');
  const [darkMode, setDarkMode] = useState(() => safeLocalStorage.getItem('darkMode') === 'true');

  // Optimisations mobiles
  useMobileOptimization();

  // Appliquer le thème et mode sombre au chargement
  useEffect(() => {
    const savedTheme = safeLocalStorage.getItem('theme') || 'blue';
    const savedDarkMode = safeLocalStorage.getItem('darkMode') === 'true';
    
    setTheme(savedTheme);
    setDarkMode(savedDarkMode);
    
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Appliquer le thème quand il change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    safeLocalStorage.setItem('theme', theme);
  }, [theme]);


  const navigateTo = (page, themeFilter = '') => {
    setCurrentPage(page);
    setSelectedCantiqueId(null);
    setShowSidebar(false);
    setSearchTerm('');
    setSelectedTheme(themeFilter);
  };

  const openCantique = (id) => {
    setSelectedCantiqueId(id);
    setCurrentPage('cantique-detail');
  };

  const backToCantiques = () => {
    setSelectedCantiqueId(null);
    setCurrentPage('cantiques');
  };

  const getHeaderConfig = () => {
    switch (currentPage) {
      case 'home':
        return null;
      case 'cantiques':
        return { 
          title: t('cantiques'), 
          showSearch: true, 
          showMenu: true,
          onSearch: (term) => setSearchTerm(term)
        };
      case 'cantique-detail':
        return null;
      case 'prayers':
        return { 
          title: t('prayers'), 
          showSearch: true, 
          showMenu: true,
          onSearch: (term) => setSearchTerm(term)
        };
      case 'favoris':
        return { title: t('myFavorites'), showMenu: true };
      case 'churches':
        return { title: t('findChurch'), showSearch: true, showMenu: true };
      case 'about':
        return { title: t('about'), showMenu: true };
      case 'settings':
        return { title: t('settings'), showMenu: true };
      case 'cantique-language':
        return { title: t('cantiqueLanguageTitle'), showMenu: true };
      case 'instructions':
        return { title: t('instructions'), showMenu: true };
      default:
        return { title: t('appTitle'), showMenu: true };
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={navigateTo} />;
      
      case 'cantiques':
        return <Cantiques onSelectCantique={openCantique} searchTerm={searchTerm} selectedTheme={selectedTheme} />;
      
      case 'cantique-detail':
        return <CantiqueDetail cantiqueId={selectedCantiqueId} onBack={backToCantiques} />;
      
      case 'prayers':
        return <Prayers />;
      
      case 'favoris':
        return <Favorites onSelectCantique={openCantique} />;
      
      case 'churches':
        return <FindChurch />;
      
      case 'about':
        return <About />;
      
      case 'settings':
        return <Settings />;
      
      case 'cantique-language':
        return <CantiqueLanguage onNavigate={navigateTo} />;
      
      case 'instructions':
        return <Instructions />;
      
      default:
        return <Home onNavigate={navigateTo} />;
    }
  };

  const headerConfig = getHeaderConfig();

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden safe-area-top safe-area-left safe-area-right">
      {/* Sidebar Desktop */}
      <div className="hidden lg:block">
        <Sidebar onNavigate={navigateTo} currentPage={currentPage} />
      </div>

      {/* Sidebar Mobile Overlay */}
      {showSidebar && (
        <div className="lg:hidden">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 touch-target"
            onClick={() => setShowSidebar(false)}
          />
          <div className="fixed top-0 left-0 h-full z-50">
            <Sidebar onNavigate={navigateTo} currentPage={currentPage} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        {headerConfig && (
          <ModernHeader 
            {...headerConfig}
            onMenuClick={() => setShowSidebar(!showSidebar)}
          />
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto scroll-container pb-16 lg:pb-0">
          <div className="min-h-full">
            {renderPage()}
          </div>
        </main>

        {/* Bottom Navigation - Mobile Only */}
        <div className="lg:hidden bottom-nav-container safe-area-bottom">
          <BottomNav currentPage={currentPage} onNavigate={navigateTo} />
        </div>
      </div>
    </div>
  );
}

export default App;