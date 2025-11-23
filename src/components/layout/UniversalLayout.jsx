import { useEffect, useState } from 'react';

// Hook pour détecter le type d'appareil
export const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState('mobile');
  
  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isLandscape = width > height;
      
      if (width < 480) {
        setDeviceType('mobile-small');
      } else if (width < 768) {
        setDeviceType('mobile-large');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
      
      // Ajuster les variables CSS pour l'appareil
      document.documentElement.style.setProperty('--device-width', `${width}px`);
      document.documentElement.style.setProperty('--device-height', `${height}px`);
      document.documentElement.style.setProperty('--is-landscape', isLandscape ? '1' : '0');
    };
    
    detectDevice();
    window.addEventListener('resize', detectDevice);
    window.addEventListener('orientationchange', detectDevice);
    
    return () => {
      window.removeEventListener('resize', detectDevice);
      window.removeEventListener('orientationchange', detectDevice);
    };
  }, []);
  
  return deviceType;
};

// Composant de layout universel
export const UniversalLayout = ({ 
  children, 
  header, 
  footer, 
  sidebar,
  className = '',
  ...props 
}) => {
  const deviceType = useDeviceType();
  
  const getLayoutClasses = () => {
    const baseClasses = 'flex h-screen-mobile bg-gray-50 overflow-hidden';
    const deviceClasses = {
      'mobile-small': 'flex-col',
      'mobile-large': 'flex-col',
      'tablet': 'flex-col lg:flex-row',
      'desktop': 'flex-row'
    };
    
    return `${baseClasses} ${deviceClasses[deviceType]} ${className}`;
  };
  
  return (
    <div className={getLayoutClasses()} {...props}>
      {/* Sidebar pour desktop/tablet */}
      {sidebar && deviceType !== 'mobile-small' && deviceType !== 'mobile-large' && (
        <div className="hidden lg:block">
          {sidebar}
        </div>
      )}
      
      {/* Contenu principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        {header && (
          <div className="nav-universal">
            {header}
          </div>
        )}
        
        {/* Contenu */}
        <main className="flex-1 overflow-y-auto scroll-container">
          <div className="universal-container min-h-full">
            {children}
          </div>
        </main>
        
        {/* Footer/Bottom Nav */}
        {footer && (
          <div className="bottom-nav-universal">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

// Composant de grille responsive universelle
export const UniversalGrid = ({ 
  children, 
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'md',
  className = '',
  ...props 
}) => {
  const gapClasses = {
    xs: 'gap-xs-responsive',
    sm: 'gap-sm-responsive', 
    md: 'gap-md-responsive',
    lg: 'gap-lg-responsive',
    xl: 'gap-xl-responsive'
  };
  
  const gridClasses = `
    grid 
    grid-cols-${cols.mobile} 
    md:grid-cols-${cols.tablet} 
    lg:grid-cols-${cols.desktop}
    ${gapClasses[gap]}
    ${className}
  `;
  
  return (
    <div className={gridClasses} {...props}>
      {children}
    </div>
  );
};

// Composant de section responsive
export const UniversalSection = ({ 
  children, 
  padding = 'md',
  className = '',
  ...props 
}) => {
  const paddingClasses = {
    xs: 'pad-xs',
    sm: 'pad-sm',
    md: 'pad-md', 
    lg: 'pad-lg',
    xl: 'pad-xl'
  };
  
  return (
    <section className={`${paddingClasses[padding]} ${className}`} {...props}>
      {children}
    </section>
  );
};

// Composant de navigation responsive
export const UniversalNav = ({ 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <nav className={`nav-universal ${className}`} {...props}>
      {children}
    </nav>
  );
};

export default {
  useDeviceType,
  UniversalLayout,
  UniversalGrid,
  UniversalSection,
  UniversalNav
};