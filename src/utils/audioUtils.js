// Utilitaire pour gérer les fichiers audio des cantiques

export const getAudioFileForCantique = (numero) => {
  const paddedNumero = numero.toString().padStart(3, '0');
  return `/audio/cantique_${paddedNumero}.mp3`;
};

export const getAudioMetadata = (cantique) => {
  if (!cantique || !cantique.numero) return null;

  const paddedNumero = cantique.numero.toString().padStart(3, '0');

  return {
    audioFile: `/audio/cantique_${paddedNumero}.mp3`,
    title: cantique.titre,
    numero: paddedNumero,
    hasAudio: cantique.audio?.hasAudio ?? true,
    category: cantique.categorie,
    language: cantique.language || 'goun',
    tonality: cantique.tonalite?.note
  };
};