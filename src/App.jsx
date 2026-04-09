import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
import { initializeTheme, applyThemeColors } from './utils/themeUtils';
import useWakeLock from './hooks/useWakeLock';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCantiqueId, setSelectedCantiqueId] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('');
  const [navCount, setNavCount] = useState(0);
  const [history, setHistory] = useState([]);

  // États pour le swipe
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [slideDirection, setSlideDirection] = useState(0); // -1 = left, 1 = right, 0 = none
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // localStorage sécurisé
  const safeGetItem = (key, defaultValue) => {
    if (typeof window === 'undefined') return defaultValue;
    try {
      return window.localStorage?.getItem(key) || defaultValue;
    } catch {
      return defaultValue;
    }
  };
  
  const safeSetItem = (key, value) => {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage?.setItem(key, value);
    } catch {
      // Ignorer silencieusement
    }
  };

  // États pour les paramètres
  const [theme, setTheme] = useState(() => safeGetItem('theme', 'lightblue'));
  const [fontSize, setFontSize] = useState(() => safeGetItem('fontSize', 'medium'));
  const [darkMode, setDarkMode] = useState(() => safeGetItem('darkMode', 'false') === 'true');

  // Optimisations mobiles
  useMobileOptimization();
  useWakeLock();

  // Appliquer le thème et mode sombre au chargement
  useEffect(() => {
    initializeTheme();
    const savedTheme = safeGetItem('theme', 'lightblue');
    const savedDarkMode = safeGetItem('darkMode', 'false') === 'true';
    
    setTheme(savedTheme);
    setDarkMode(savedDarkMode);
  }, []);

  // Appliquer le thème quand il change
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    applyThemeColors(theme);
    safeSetItem('theme', theme);
  }, [theme]);

  // Gestion du swipe horizontal pour les pages principales
  const minSwipeDistance = 80; // Distance minimale pour changer de page
  const dragThreshold = 30; // Seuil pour commencer à voir l'animation

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(false);
  };

  const onTouchMove = (e) => {
    const currentTouch = e.targetTouches[0].clientX;
    setTouchEnd(currentTouch);
    
    if (touchStart) {
      const distance = currentTouch - touchStart;
      
      // Vérifier si on est sur une page swipable
      const swipablePages = ['home', 'cantique-language', 'settings'];
      const currentIndex = swipablePages.indexOf(currentPage);
      
      if (currentIndex === -1) return;
      
      // Empêcher le drag si on est aux extrémités
      if ((currentIndex === 0 && distance > 0) || 
          (currentIndex === swipablePages.length - 1 && distance < 0)) {
        return;
      }
      
      // Activer le dragging seulement si on dépasse le seuil
      if (Math.abs(distance) > dragThreshold) {
        setIsDragging(true);
        // Réduire le mouvement pour un effet plus naturel (30% de la distance)
        setDragOffset(distance * 0.3);
      }
    }
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setDragOffset(0);
      setIsDragging(false);
      return;
    }
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    // Ordre des pages swipables
    const swipablePages = ['home', 'cantique-language', 'settings'];
    const currentIndex = swipablePages.indexOf(currentPage);
    
    // Réinitialiser le drag
    setDragOffset(0);
    setIsDragging(false);
    
    // Ne pas permettre le swipe si on n'est pas sur une page swipable
    if (currentIndex === -1) return;
    
    if (isLeftSwipe && currentIndex < swipablePages.length - 1) {
      // Swipe vers la gauche -> page suivante
      setSlideDirection(1);
      navigateTo(swipablePages[currentIndex + 1]);
    } else if (isRightSwipe && currentIndex > 0) {
      // Swipe vers la droite -> page précédente
      setSlideDirection(-1);
      navigateTo(swipablePages[currentIndex - 1]);
    }
  };

  // Variants pour les animations de page
  const pageVariants = {
    enter: (direction) => ({
      x: direction < 0 ? '-100%' : '100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  const pageTransition = {
    type: 'tween',
    ease: 'easeOut',
    duration: 0.3
  };


  const navigateTo = (page, themeFilter = '') => {
    setHistory(prev => [...prev, { page: currentPage, searchTerm, selectedTheme }]);
    setCurrentPage(page);
    setSelectedCantiqueId(null);
    setShowSidebar(false);
    setSearchTerm('');
    setSelectedTheme(themeFilter);
    setNavCount(c => c + 1);
  };

  const openCantique = (id) => {
    setHistory(prev => [...prev, { page: currentPage, searchTerm, selectedTheme }]);
    setSelectedCantiqueId(id);
    setCurrentPage('cantique-detail');
  };

  const goBack = () => {
    const prev = history[history.length - 1];
    if (!prev) return;
    setHistory(h => h.slice(0, -1));
    setCurrentPage(prev.page);
    setSearchTerm(prev.searchTerm);
    setSelectedTheme(prev.selectedTheme);
    setSelectedCantiqueId(null);
  };

  const backToCantiques = () => goBack();

  const getHeaderConfig = () => {
    switch (currentPage) {
      case 'home':
        return { title: t('home'), showMenu: true, icon: '🏠' };
      case 'cantiques':
        return { 
          title: t('cantiques'), 
          showSearch: true, 
          showMenu: true,
          onSearch: (term) => setSearchTerm(term),
          onSearchClose: () => setSearchTerm(''),
          icon: '📖'
        };
      case 'cantique-detail':
        return null;
      case 'prayers':
        return { 
          title: t('prayers'), 
          showSearch: true, 
          showMenu: true,
          onSearch: (term) => setSearchTerm(term),
          onSearchClose: () => setSearchTerm(''),
          icon: '🙏'
        };
      case 'favoris':
        return { title: t('myFavorites'), showMenu: true, icon: '❤️' };
      case 'churches':
        return { title: t('findChurch'), showSearch: true, showMenu: true, icon: '⛪' };
      case 'about':
        return { title: t('about'), showMenu: true, icon: 'ℹ️' };
      case 'settings':
        return { title: t('settings'), showMenu: true, icon: '⚙️' };
      case 'cantique-language':
        return { title: t('cantiqueLanguageTitle'), showMenu: true, icon: '🌍' };
      case 'instructions':
        return { title: t('instructions'), showMenu: true, icon: '📋' };
      default:
        return { title: t('appTitle'), showMenu: true, icon: '🎵' };
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={navigateTo} />;
      
      case 'cantiques':
        return <Cantiques key={navCount} onSelectCantique={openCantique} searchTerm={searchTerm} selectedTheme={selectedTheme} />;
      
      case 'cantique-detail':
        return <CantiqueDetail cantiqueId={selectedCantiqueId} onBack={goBack} />;
      
      case 'prayers':
        return <Prayers />;
      
      case 'favoris':
        return <Favorites key={navCount} onSelectCantique={openCantique} />;
      
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
            className="fixed inset-0 bg-black bg-opacity-50 z-30 touch-target"
            onClick={() => setShowSidebar(false)}
          />
          <div className="fixed top-0 left-0 h-full z-40">
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
        <main 
          className="flex-1 overflow-hidden relative lg:overflow-y-auto lg:pb-0"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <AnimatePresence mode="wait" custom={slideDirection}>
            <motion.div
              key={currentPage}
              custom={slideDirection}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={pageTransition}
              style={{
                x: isDragging ? dragOffset : undefined
              }}
              className={`absolute inset-0 scroll-container pb-nav-compact lg:pb-0 lg:relative ${currentPage === 'home' ? 'overflow-y-hidden' : 'overflow-y-auto'}`}
            >
              <div className="min-h-full">
                {renderPage()}
              </div>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Bottom Navigation - Mobile Only - Sur toutes les pages */}
        <div className="lg:hidden bottom-nav-container safe-area-bottom">
          <BottomNav currentPage={currentPage} onNavigate={navigateTo} />
        </div>
      </div>
    </div>
  );
}

export default App;