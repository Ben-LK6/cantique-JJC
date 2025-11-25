// Utilitaire pour associer les couleurs aux tonalités musicales
export const getTonalityColor = (note) => {
  // Utiliser le thème actuel pour toutes les tonalités
  return {
    bgClass: 'bg-primary-500',
    textClass: 'text-primary-600',
    color: 'var(--color-primary-500)'
  };
};

// Fonction pour appliquer le thème basé sur la tonalité
export const applyTonalityTheme = (note) => {
  const tonality = getTonalityColor(note);
  
  // Appliquer le thème correspondant
  if (tonality.theme && ['blue', 'green', 'purple', 'red', 'orange'].includes(tonality.theme)) {
    localStorage.setItem('theme', tonality.theme);
    document.documentElement.setAttribute('data-theme', tonality.theme);
  }
  
  return tonality;
};

// Obtenir la couleur d'arrière-plan pour une tonalité
export const getTonalityBadgeClass = (note) => {
  return 'bg-primary-500 text-white';
};

// Obtenir la couleur de texte pour une tonalité
export const getTonalityTextClass = (note) => {
  return 'text-primary-600';
};