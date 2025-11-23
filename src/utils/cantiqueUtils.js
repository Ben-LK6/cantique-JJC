import { cantiques } from '../data/cantiques';
import { cantiquesYoruba } from '../data/cantiquesYoruba';
import { categoriesYoruba } from '../data/categoriesYoruba';

// Fonction pour obtenir les cantiques selon la langue choisie
export const getCantiques = () => {
  const cantiqueLanguage = localStorage.getItem('cantiqueLanguage') || 'fon';
  
  if (cantiqueLanguage === 'yoruba') {
    return cantiquesYoruba;
  }
  
  return cantiques; // Par défaut, retourner les cantiques en Fon
};

// Fonction pour obtenir un cantique spécifique par ID selon la langue
export const getCantiqueById = (id) => {
  const currentCantiques = getCantiques();
  return currentCantiques.find(cantique => cantique.id === id);
};

// Fonction pour obtenir les catégories selon la langue
export const getCategories = () => {
  const cantiqueLanguage = localStorage.getItem('cantiqueLanguage') || 'fon';
  
  if (cantiqueLanguage === 'yoruba') {
    return categoriesYoruba;
  }
  
  const currentCantiques = getCantiques();
  const categories = [...new Set(currentCantiques.map(c => c.categorie))];
  return categories;
};