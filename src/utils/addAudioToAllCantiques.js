// Script utilitaire pour ajouter automatiquement le système audio à tous les cantiques
// Ce script peut être exécuté pour mettre à jour tous les cantiques existants

import { cantiques } from '../data/cantiques.js';
import { cantiquesYoruba } from '../data/cantiquesYoruba.js';

// Fonction pour ajouter les métadonnées audio à un cantique
const addAudioToCantique = (cantique, language = 'goun') => {
  if (cantique.audio) {
    return cantique; // Déjà configuré
  }

  const paddedNumero = cantique.numero.toString().padStart(3, '0');
  
  return {
    ...cantique,
    language: cantique.language || language,
    audio: {
      audioFile: `/audio/cantique_${paddedNumero}.mp3`,
      title: cantique.titre,
      numero: paddedNumero,
      hasAudio: true,
      shared: true // Audio partagé entre les langues
    }
  };
};

// Fonction pour générer le code mis à jour des cantiques goun
export const generateUpdatedGounCantiques = () => {
  const updatedCantiques = cantiques.map(cantique => 
    addAudioToCantique(cantique, 'goun')
  );

  const code = `// Cantiques - Ajoutez simplement un nouvel objet pour ajouter un cantique
import { getCategorieByNumero } from './categoriesMapping.js';

// Fonction pour obtenir les métadonnées audio d'un cantique
export const getAudioMetadata = (numero, titre = '') => {
  const paddedNumero = numero.toString().padStart(3, '0');
  return {
    audioFile: \`/audio/cantique_\${paddedNumero}.mp3\`,
    title: titre,
    numero: paddedNumero,
    hasAudio: true, // Sera vérifié dynamiquement lors de l'import des fichiers
    shared: true // Audio partagé entre goun et yoruba
  };
};

export const cantiques = [
${updatedCantiques.map(cantique => `  {
    id: ${cantique.id},
    numero: "${cantique.numero}",
    titre: "${cantique.titre}",
    categorie: "${cantique.categorie}",
    audio: getAudioMetadata("${cantique.numero}", "${cantique.titre}"),
    paroles: ${JSON.stringify(cantique.paroles, null, 6)},
    tonalite: ${JSON.stringify(cantique.tonalite)}
  }`).join(',\n')}
];`);

  return code;
};

// Fonction pour générer le code mis à jour des cantiques yoruba
export const generateUpdatedYorubaCantiques = () => {
  const updatedCantiques = cantiquesYoruba.map(cantique => 
    addAudioToCantique(cantique, 'yoruba')
  );

  const code = `// Cantiques en Yoruba - Ajoutez simplement un nouvel objet pour ajouter un cantique
import { getSharedAudioMetadata } from '../utils/audioSync.js';

// Fonction pour obtenir les métadonnées audio synchronisées avec les cantiques goun
const getYorubaAudioMetadata = (numero, titre) => {
  return getSharedAudioMetadata(numero, titre);
};

export const cantiquesYoruba = [
${updatedCantiques.map(cantique => `  {
    id: ${cantique.id},
    numero: "${cantique.numero}",
    titre: "${cantique.titre}",
    categorie: "${cantique.categorie}",
    language: "yoruba",
    audio: getYorubaAudioMetadata("${cantique.numero}", "${cantique.titre}"),
    paroles: ${JSON.stringify(cantique.paroles, null, 6)},
    tonalite: ${JSON.stringify(cantique.tonalite)}
  }`).join(',\n')}
];`);

  return code;
};

// Fonction pour afficher les statistiques
export const getAudioStats = () => {
  const gounWithAudio = cantiques.filter(c => c.audio).length;
  const yorubaWithAudio = cantiquesYoruba.filter(c => c.audio).length;
  
  return {
    totalGoun: cantiques.length,
    totalYoruba: cantiquesYoruba.length,
    gounWithAudio,
    yorubaWithAudio,
    percentageGoun: Math.round((gounWithAudio / cantiques.length) * 100),
    percentageYoruba: Math.round((yorubaWithAudio / cantiquesYoruba.length) * 100)
  };
};

// Fonction pour vérifier la cohérence des numéros entre goun et yoruba
export const checkNumberConsistency = () => {
  const gounNumbers = new Set(cantiques.map(c => c.numero));
  const yorubaNumbers = new Set(cantiquesYoruba.map(c => c.numero));
  
  const missingInYoruba = [...gounNumbers].filter(num => !yorubaNumbers.has(num));
  const missingInGoun = [...yorubaNumbers].filter(num => !gounNumbers.has(num));
  
  return {
    missingInYoruba,
    missingInGoun,
    isConsistent: missingInYoruba.length === 0 && missingInGoun.length === 0
  };
};

// Fonction principale pour mettre à jour tous les fichiers
export const updateAllCantiqueFiles = () => {
  const stats = getAudioStats();
  const consistency = checkNumberConsistency();
  
  console.log('Statistiques Audio:', stats);
  console.log('Cohérence des numéros:', consistency);
  
  if (!consistency.isConsistent) {
    console.warn('Attention: Incohérence détectée dans les numéros de cantiques');
    console.warn('Manquants en Yoruba:', consistency.missingInYoruba);
    console.warn('Manquants en Goun:', consistency.missingInGoun);
  }
  
  return {
    gounCode: generateUpdatedGounCantiques(),
    yorubaCode: generateUpdatedYorubaCantiques(),
    stats,
    consistency
  };
};