/**
 * Utilitaire pour la transposition de tonalités par demi-ton
 */

// Notes chromatiques (12 demi-tons)
const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Variantes de notes (bémol)
const NOTE_VARIANTS = {
  'C': 0,
  'Db': 1,
  'C#': 1,
  'D': 2,
  'Eb': 3,
  'D#': 3,
  'E': 4,
  'F': 5,
  'Gb': 6,
  'F#': 6,
  'G': 7,
  'Ab': 8,
  'G#': 8,
  'A': 9,
  'Bb': 10,
  'A#': 10,
  'B': 11
};

/**
 * Transpose une note de musique par un nombre de demi-tons
 * @param {string} note - La note originale (ex: 'C', 'D#', 'Bb')
 * @param {number} semitones - Nombre de demi-tons à transposer (positif = monter, négatif = descendre)
 * @returns {string} La note transposée
 */
export const transposeNote = (note, semitones) => {
  if (!note || typeof note !== 'string') {
    return note;
  }

  // Normaliser la note
  const normalizedNote = note.trim();
  
  // Obtenir l'index de la note
  let noteIndex = NOTE_VARIANTS[normalizedNote];
  if (noteIndex === undefined) {
    return normalizedNote; // Retourner la note originale si non reconnue
  }

  // Calculer la nouvelle note
  const newIndex = (noteIndex + semitones) % 12;
  const finalIndex = newIndex < 0 ? 12 + newIndex : newIndex;

  return NOTES[finalIndex];
};

/**
 * Crée un label lisible pour la transposition
 * @param {number} semitones - Nombre de demi-tons
 * @returns {string} Label formaté (ex: '+2 demi-tons', '-1 demi-ton')
 */
export const getTranspositionLabel = (semitones) => {
  if (semitones === 0) return 'Original';
  
  const sign = semitones > 0 ? '+' : '';
  const tone = Math.abs(semitones) === 1 ? 'demi-ton' : 'demi-tons';
  
  return `${sign}${semitones} ${tone}`;
};

/**
 * Obtient la plage de transposition recommandée
 * @returns {number[]} Tableau avec min et max de demi-tons
 */
export const getTranspositionRange = () => {
  return [-12, 12]; // ±12 demi-tons (une octave)
};

/**
 * Obtient tous les demi-tons disponibles pour la transposition
 * @returns {number[]} Tableau des valeurs de demi-tons
 */
export const getAvailableSemitones = () => {
  const [min, max] = getTranspositionRange();
  const semitones = [];
  for (let i = min; i <= max; i++) {
    semitones.push(i);
  }
  return semitones;
};

/**
 * Obtient les tonalités les plus communes à partir d'une tonalité de base
 * @param {string} baseNote - La note de base
 * @returns {object} Objet avec les transpositions populaires
 */
export const getCommonTranspositions = (baseNote) => {
  return {
    down12: transposeNote(baseNote, -12),
    down7: transposeNote(baseNote, -7),
    down5: transposeNote(baseNote, -5),
    down2: transposeNote(baseNote, -2),
    original: baseNote,
    up2: transposeNote(baseNote, 2),
    up5: transposeNote(baseNote, 5),
    up7: transposeNote(baseNote, 7),
    up12: transposeNote(baseNote, 12)
  };
};

export default {
  transposeNote,
  getTranspositionLabel,
  getTranspositionRange,
  getAvailableSemitones,
  getCommonTranspositions
};
