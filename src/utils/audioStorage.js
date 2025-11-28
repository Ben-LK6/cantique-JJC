// Utilitaires pour gérer le stockage des enregistrements audio

export const saveAudioRecording = (cantiqueId, audioBlob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        localStorage.setItem(`audio_${cantiqueId}`, reader.result);
        // Sauvegarder aussi les métadonnées
        const metadata = {
          cantiqueId,
          timestamp: Date.now(),
          size: audioBlob.size,
          type: audioBlob.type
        };
        localStorage.setItem(`audio_meta_${cantiqueId}`, JSON.stringify(metadata));
        resolve(reader.result);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(audioBlob);
  });
};

export const getAudioRecording = (cantiqueId) => {
  try {
    return localStorage.getItem(`audio_${cantiqueId}`);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'audio:', error);
    return null;
  }
};

export const deleteAudioRecording = (cantiqueId) => {
  try {
    localStorage.removeItem(`audio_${cantiqueId}`);
    localStorage.removeItem(`audio_meta_${cantiqueId}`);
    return true;
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'audio:', error);
    return false;
  }
};

export const getAudioMetadata = (cantiqueId) => {
  try {
    const metadata = localStorage.getItem(`audio_meta_${cantiqueId}`);
    return metadata ? JSON.parse(metadata) : null;
  } catch (error) {
    console.error('Erreur lors de la récupération des métadonnées:', error);
    return null;
  }
};

export const getAllAudioRecordings = () => {
  const recordings = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('audio_meta_')) {
        const cantiqueId = key.replace('audio_meta_', '');
        const metadata = getAudioMetadata(cantiqueId);
        if (metadata) {
          recordings.push({
            cantiqueId,
            ...metadata,
            hasAudio: !!getAudioRecording(cantiqueId)
          });
        }
      }
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de tous les enregistrements:', error);
  }
  return recordings.sort((a, b) => b.timestamp - a.timestamp);
};

export const getTotalAudioSize = () => {
  let totalSize = 0;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('audio_')) {
        const value = localStorage.getItem(key);
        if (value) {
          totalSize += value.length;
        }
      }
    }
  } catch (error) {
    console.error('Erreur lors du calcul de la taille totale:', error);
  }
  return totalSize;
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};