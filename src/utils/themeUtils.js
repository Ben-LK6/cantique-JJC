// Utilitaire pour gérer les thèmes et couleurs
export const applyThemeColors = (themeName) => {
  const themes = {
    blue: {
      50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 500: '#3b82f6',
      600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af'
    },
    green: {
      50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 500: '#22c55e',
      600: '#16a34a', 700: '#15803d', 800: '#166534'
    },
    purple: {
      50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 500: '#a855f7',
      600: '#9333ea', 700: '#7e22ce', 800: '#6b21a8'
    },
    red: {
      50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 500: '#f87171',
      600: '#ef4444', 700: '#dc2626', 800: '#b91c1c'
    },
    orange: {
      50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 500: '#fb923c',
      600: '#f97316', 700: '#ea580c', 800: '#c2410c'
    },
    pink: {
      50: '#fdf2f8', 100: '#fce7f3', 200: '#fbcfe8', 500: '#ec4899',
      600: '#db2777', 700: '#be185d', 800: '#9d174d'
    },
    lightblue: {
      50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 500: '#0ea5e9',
      600: '#0284c7', 700: '#0369a1', 800: '#075985'
    }
  };
  
  const themeColors = themes[themeName] || themes.blue;
  Object.entries(themeColors).forEach(([shade, color]) => {
    document.documentElement.style.setProperty(`--color-primary-${shade}`, color);
  });
};

// Initialiser le thème au chargement
export const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme') || 'blue';
  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  
  document.documentElement.setAttribute('data-theme', savedTheme);
  applyThemeColors(savedTheme);
  
  if (savedDarkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

// Changer de thème
export const changeTheme = (themeName) => {
  localStorage.setItem('theme', themeName);
  document.documentElement.setAttribute('data-theme', themeName);
  applyThemeColors(themeName);
  
  // Forcer la mise à jour de tous les éléments
  const elements = document.querySelectorAll('[class*="primary"]');
  elements.forEach(el => {
    el.style.display = 'none';
    el.offsetHeight;
    el.style.display = '';
  });
};