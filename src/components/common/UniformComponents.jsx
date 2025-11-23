// Composants uniformes pour garantir le même affichage sur tous les appareils

export const UniformButton = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary',
  disabled = false,
  ...props 
}) => {
  const variantClasses = {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white',
    secondary: 'uniform-bg-gray-100 hover:bg-gray-200 uniform-text-gray-900',
    outline: 'uniform-border border-primary-600 text-primary-600 hover:bg-primary-50'
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`uniform-btn ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const UniformCard = ({ 
  children, 
  onClick, 
  className = '',
  ...props 
}) => {
  return (
    <div
      onClick={onClick}
      className={`uniform-card ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const UniformInput = ({ 
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  ...props 
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`uniform-input ${className}`}
      {...props}
    />
  );
};

export const UniformText = ({ 
  children, 
  size = 'base', 
  className = '',
  ...props 
}) => {
  const sizeClass = `uniform-text-${size}`;
  
  return (
    <span className={`${sizeClass} ${className}`} {...props}>
      {children}
    </span>
  );
};

export const UniformContainer = ({ 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <div className={`uniform-container ${className}`} {...props}>
      {children}
    </div>
  );
};

export const UniformGrid = ({ 
  children, 
  cols = 1,
  className = '',
  ...props 
}) => {
  const gridClass = `uniform-grid-${cols}`;
  
  return (
    <div className={`${gridClass} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const UniformNav = ({ 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <nav className={`uniform-nav ${className}`} {...props}>
      {children}
    </nav>
  );
};

export const UniformBottomNav = ({ 
  children, 
  className = '',
  ...props 
}) => {
  return (
    <div className={`uniform-bottom-nav ${className}`} {...props}>
      {children}
    </div>
  );
};

export default {
  UniformButton,
  UniformCard,
  UniformInput,
  UniformText,
  UniformContainer,
  UniformGrid,
  UniformNav,
  UniformBottomNav
};