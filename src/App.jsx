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

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCantiqueId, setSelectedCantiqueId] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');

    // AJOUT : États pour les paramètres
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'blue');
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('fontSize') || 'medium');

  // AJOUT : Appliquer le thème au chargement
  useEffect(() => {
  const savedTheme = localStorage.getItem('theme') || 'blue';
    setTheme(savedTheme);
  }, []);


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
          title: 'Cantiques', 
          showSearch: true, 
          showMenu: true,
          onSearch: (term) => setSearchTerm(term)
        };
      case 'cantique-detail':
        return null;
      case 'prayers':
  return { 
    title: 'Prières', 
    showSearch: true, 
    showMenu: true,
    onSearch: (term) => setSearchTerm(term)
  };
        return <Prayers searchTerm={searchTerm} />;
      case 'favoris':
        return { title: 'Mes Favoris', showMenu: true };
      case 'churches':
        return { title: 'Trouver une Église', showSearch: true, showMenu: true };
      case 'about':
        return { title: 'À Propos', showMenu: true };
      case 'settings':
        return { title: 'Paramètres', showMenu: true };
      case 'cantique-language':
        return { title: 'Langue des Cantiques', showMenu: true };
      case 'instructions':
        return { title: 'Instructions', showMenu: true };
      default:
        return { title: 'JJC', showMenu: true };
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
        return <CantiqueLanguage />;
      
      case 'instructions':
        return <Instructions />;
      
      default:
        return <Home onNavigate={navigateTo} />;
    }
  };

  const headerConfig = getHeaderConfig();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar Desktop */}
      <div className="hidden lg:block">
        <Sidebar onNavigate={navigateTo} currentPage={currentPage} />
      </div>

      {/* Sidebar Mobile Overlay */}
      {showSidebar && (
        <div className="lg:hidden">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
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
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>

        {/* Bottom Navigation - Mobile Only */}
        <div className="lg:hidden bottom-nav-container">
          <BottomNav currentPage={currentPage} onNavigate={navigateTo} />
        </div>
      </div>
    </div>
  );
}

export default App;