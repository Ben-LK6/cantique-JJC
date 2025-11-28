import { cantiques } from '../data/cantiques';
import { cantiquesYoruba } from '../data/cantiquesYoruba';
import { categories } from '../data/categoriesMapping';
import { categoriesYoruba } from '../data/categoriesYoruba';

// Cache pour éviter les recalculs
let cachedData = {
  fon: { cantiques: null, categories: null },
  yoruba: { cantiques: null, categories: null }
};

// Fonction pour obtenir les cantiques selon la langue choisie
export const getCantiques = () => {
  const cantiqueLanguage = localStorage.getItem('cantiqueLanguage') || 'fon';
  
  // Utiliser le cache si disponible
  if (cachedData[cantiqueLanguage].cantiques) {
    return cachedData[cantiqueLanguage].cantiques;
  }
  
  let result;
  if (cantiqueLanguage === 'yoruba') {
    result = cantiquesYoruba;
  } else {
    result = cantiques;
  }
  
  // Mettre en cache
  cachedData[cantiqueLanguage].cantiques = result;
  return result;
};

// Fonction pour obtenir un cantique spécifique par ID selon la langue
export const getCantiqueById = (id) => {
  const currentCantiques = getCantiques();
  return currentCantiques.find(cantique => cantique.id === id);
};

// Fonction pour obtenir les catégories selon la langue
export const getCategories = () => {
  const cantiqueLanguage = localStorage.getItem('cantiqueLanguage') || 'fon';

  // Utiliser le cache si disponible
  if (cachedData[cantiqueLanguage].categories) {
    return cachedData[cantiqueLanguage].categories;
  }

  let result;
  if (cantiqueLanguage === 'yoruba') {
    result = categoriesYoruba;
  } else {
    // Utiliser la liste des catégories du fichier mapping (dans l'ordre défini)
    const currentCantiques = getCantiques();

    // Filtrer les catégories pour ne garder que celles qui ont au moins un cantique
    result = categories.filter(categorie => {
      return currentCantiques.some(cantique => cantique.categorie === categorie);
    });
  }

  // Mettre en cache
  cachedData[cantiqueLanguage].categories = result;
  return result;
};

// Fonction pour vider le cache (utile lors du changement de langue)
export const clearCache = () => {
  cachedData = {
    fon: { cantiques: null, categories: null },
    yoruba: { cantiques: null, categories: null }
  };
};