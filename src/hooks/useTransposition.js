import { useState, useCallback, useEffect } from 'react';
import { transposeNote } from '../utils/transposeUtils';

/**
 * Hook pour gérer la transposition d'une tonalité
 * Mémorise les préférences de transposition dans localStorage
 */
export const useTransposition = (originalNote, cantiqueId = null) => {
  const [semitones, setSemitones] = useState(0);
  const [transposedNote, setTransposedNote] = useState(originalNote);

  // Clé unique pour localStorage basée sur le cantique
  const storageKey = cantiqueId ? `transposition_${cantiqueId}` : null;

  // Charger la transposition sauvegardée au montage
  useEffect(() => {
    if (storageKey) {
      try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
          const value = parseInt(saved);
          setSemitones(value);
          setTransposedNote(transposeNote(originalNote, value));
        }
      } catch (error) {
        console.warn('Erreur lors du chargement de la transposition:', error);
      }
    }
  }, [originalNote, storageKey]);

  // Mise à jour de la note transposée quand les demi-tons changent
  useEffect(() => {
    setTransposedNote(transposeNote(originalNote, semitones));
  }, [semitones, originalNote]);

  const handleTranspose = useCallback((value) => {
    setSemitones(value);
    
    // Sauvegarder dans localStorage
    if (storageKey) {
      try {
        localStorage.setItem(storageKey, value.toString());
      } catch (error) {
        console.warn('Erreur lors de la sauvegarde de la transposition:', error);
      }
    }
  }, [storageKey]);

  const resetTransposition = useCallback(() => {
    setSemitones(0);
    
    if (storageKey) {
      try {
        localStorage.removeItem(storageKey);
      } catch (error) {
        console.warn('Erreur lors de la suppression de la transposition:', error);
      }
    }
  }, [storageKey]);

  return {
    semitones,
    transposedNote,
    originalNote,
    handleTranspose,
    resetTransposition,
    isTransposed: semitones !== 0
  };
};

export default useTransposition;
