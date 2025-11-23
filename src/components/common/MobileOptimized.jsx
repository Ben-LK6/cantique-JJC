import { useEffect } from 'react';

// Hook mobile simplifié pour éviter les crashes
export const useMobileOptimization = () => {
  useEffect(() => {
    // Juste gérer la hauteur du viewport de façon sécurisée
    const setVH = () => {
      try {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      } catch (e) {
        // Ignorer les erreurs
      }
    };
    
    setVH();
    window.addEventListener('resize', setVH);
    
    return () => {
      window.removeEventListener('resize', setVH);
    };
  }, []);
};

// Composant bouton universel pour tous les appareils
export const UniversalButton = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary',
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'btn-universal focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500 dark:border-primary-400 dark:text-primary-400',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-800'
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Composant carte universel pour tous les appareils
export const UniversalCard = ({ 
  children, 
  onClick, 
  className = '', 
  hoverable = true,
  ...props 
}) => {
  const baseClasses = 'card-universal dark:bg-gray-800 dark:border-gray-700';
  const hoverClasses = hoverable ? 'cursor-pointer' : '';
  
  return (
    <div
      onClick={onClick}
      className={`${baseClasses} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Composant input universel pour tous les appareils
export const UniversalInput = ({ 
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  icon,
  ...props 
}) => {
  const baseClasses = 'input-universal dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-400 dark:focus:border-primary-400';
  
  return (
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <div className="icon-md">{icon}</div>
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${baseClasses} ${icon ? 'pl-12' : ''} ${className}`}
        {...props}
      />
    </div>
  );
};

// Composant pour le loading mobile
export const MobileLoader = ({ size = 'medium', className = '' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };
  
  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 border-t-primary-600 ${sizeClasses[size]} ${className}`} />
  );
};

// Composant pour les skeleton loaders
export const MobileSkeleton = ({ className = '', lines = 1, height = 'h-4' }) => {
  return (
    <div className={`animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className={`skeleton ${height} bg-gray-200 dark:bg-gray-700 rounded mb-2 last:mb-0`} />
      ))}
    </div>
  );
};

// Composant conteneur universel
export const UniversalContainer = ({ children, className = '', ...props }) => {
  return (
    <div className={`universal-container ${className}`} {...props}>
      {children}
    </div>
  );
};

// Composant texte responsive universel
export const UniversalText = ({ children, size = 'base', className = '', ...props }) => {
  const sizeClasses = {
    xs: 'text-xs-responsive',
    sm: 'text-sm-responsive',
    base: 'text-base-responsive',
    lg: 'text-lg-responsive',
    xl: 'text-xl-responsive',
    '2xl': 'text-2xl-responsive',
    '3xl': 'text-3xl-responsive'
  };
  
  return (
    <span className={`${sizeClasses[size]} ${className}`} {...props}>
      {children}
    </span>
  );
};

export default {
  useMobileOptimization,
  UniversalButton,
  UniversalCard,
  UniversalInput,
  UniversalContainer,
  UniversalText,
  MobileLoader,
  MobileSkeleton
};