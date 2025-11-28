// Utilitaire pour synchroniser les fichiers audio entre les cantiques goun et yoruba

/**
 * Synchronise les métadonnées audio entre les cantiques de différentes langues
 * Si un audio est ajouté pour le cantique 1 goun, il sera automatiquement 
 * disponible pour le cantique 1 yoruba
 */

export const syncAudioBetweenLanguages = (numero) => {
  return {
    audioFile: `/audio/cantique_${numero}.mp3`,
    hasAudio: true,
    // Métadonnées partagées entre les langues
    shared: true
  };
};

/**
 * Vérifie si un fichier audio existe pour un numéro donné
 * Cette fonction sera utilisée pour vérifier dynamiquement la disponibilité
 */
export const checkAudioAvailability = async (numero) => {
  try {
    const audioPath = `/audio/cantique_${numero}.mp3`;
    const response = await fetch(audioPath, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
};

/**
 * Obtient les métadonnées audio synchronisées pour un cantique
 * Utilisé par tous les cantiques (goun, yoruba, supplémentaires)
 */
export const getSharedAudioMetadata = (numero, titre = '') => {
  const paddedNumero = numero.toString().padStart(3, '0');
  
  return {
    audioFile: `/audio/cantique_${paddedNumero}.mp3`,
    title: titre,
    numero: paddedNumero,
    hasAudio: true, // Sera vérifié dynamiquement
    shared: true // Indique que cet audio est partagé entre les langues
  };
};

/**
 * Met à jour automatiquement tous les cantiques avec les mêmes numéros
 * quand un nouveau fichier audio est ajouté
 */
export const updateAudioForAllLanguages = (numero, audioData) => {
  // Cette fonction sera appelée quand de nouveaux fichiers audio sont importés
  // Elle mettra à jour automatiquement les cantiques goun, yoruba et supplémentaires
  
  const updateData = {
    ...audioData,
    lastUpdated: new Date().toISOString(),
    syncedLanguages: ['goun', 'yoruba', 'supplementaires']
  };
  
  return updateData;
};

/**
 * Génère les contrôles audio pour un cantique
 * Inclut les boutons play/pause et les pistes audio
 */
export const generateAudioControls = (numero, titre) => {
  const audioMetadata = getSharedAudioMetadata(numero, titre);
  
  return {
    ...audioMetadata,
    controls: {
      play: true,
      pause: true,
      volume: true,
      progress: true,
      download: false // Peut être activé selon les besoins
    }
  };
};