import { cantiques } from '../data/cantiques';
import { cantiquesYoruba } from '../data/cantiquesYoruba';

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
  const currentCantiques = getCantiques();
  const categories = [...new Set(currentCantiques.map(c => c.theme))];
  return categories;
};