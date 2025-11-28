// Script pour ajouter automatiquement l'audio à tous les cantiques
import { cantiques } from '../data/cantiques.js';

export function addAudioToAllCantiques() {
  return cantiques.map(cantique => ({
    ...cantique,
    audio: {
      audioFile: `/audio/cantique_${cantique.numero}.mp3`,
      hasAudio: true
    }
  }));
}

// Fonction pour vérifier si un fichier audio existe
export async function checkAudioExists(audioPath) {
  try {
    const response = await fetch(audioPath, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

// Fonction pour mettre à jour seulement les cantiques qui ont vraiment un fichier audio
export async function updateCantiquesWithExistingAudio() {
  const updatedCantiques = [];
  
  for (const cantique of cantiques) {
    const audioPath = `/audio/cantique_${cantique.numero}.mp3`;
    const hasAudio = await checkAudioExists(audioPath);
    
    updatedCantiques.push({
      ...cantique,
      audio: {
        audioFile: audioPath,
        hasAudio: hasAudio
      }
    });
  }
  
  return updatedCantiques;
}