// Utilitaire pour gérer les thèmes et couleurs
export const applyThemeColors = (themeName) => {
  const themes = {
    blue: {
      50: '#eff6ff', 100: '#dbeafe', 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa', 500: '#3b82f6',
      600: '#2563eb', 700: '#1d4ed8', 800: '#1e40af'
    },
    green: {
      50: '#f0fdf4', 100: '#dcfce7', 200: '#bbf7d0', 300: '#86efac', 400: '#4ade80', 500: '#22c55e',
      600: '#16a34a', 700: '#15803d', 800: '#166534'
    },
    purple: {
      50: '#faf5ff', 100: '#f3e8ff', 200: '#e9d5ff', 300: '#d8b4fe', 400: '#c084fc', 500: '#a855f7',
      600: '#9333ea', 700: '#7e22ce', 800: '#6b21a8'
    },
    red: {
      50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#fca5a5', 400: '#f87171', 500: '#ef4444',
      600: '#dc2626', 700: '#b91c1c', 800: '#991b1b'
    },
    orange: {
      50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74', 400: '#fb923c', 500: '#f97316',
      600: '#ea580c', 700: '#c2410c', 800: '#9a3412'
    },
    pink: {
      50: '#fdf2f8', 100: '#fce7f3', 200: '#fbcfe8', 300: '#f9a8d4', 400: '#f472b6', 500: '#ec4899',
      600: '#db2777', 700: '#be185d', 800: '#9d174d'
    },
    lightblue: {
      50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc', 400: '#38bdf8', 500: '#0ea5e9',
      600: '#0284c7', 700: '#0369a1', 800: '#075985'
    }
  };
  
  const themeColors = themes[themeName] || themes.lightblue;
  Object.entries(themeColors).forEach(([shade, color]) => {
    document.documentElement.style.setProperty(`--color-primary-${shade}`, color);
  });
};

// Initialiser le thème au chargement
export const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme') || 'lightblue';
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