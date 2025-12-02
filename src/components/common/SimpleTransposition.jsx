import { motion } from 'framer-motion';
import { transposeNote, getAvailableSemitones } from '../../utils/transposeUtils';

const SimpleTransposition = ({ originalNote, semitones, onTranspose, audioRef }) => {
  const transposedNote = transposeNote(originalNote, semitones);
  const availableSemitones = getAvailableSemitones();
  const canDecrease = semitones > availableSemitones[0];
  const canIncrease = semitones < availableSemitones[availableSemitones.length - 1];

  const handleTranspose = (delta) => {
    const newSemitones = semitones + delta;
    if (newSemitones >= availableSemitones[0] && newSemitones <= availableSemitones[availableSemitones.length - 1]) {
      onTranspose(newSemitones);
      
      // Appliquer la transposition à l'audio immédiatement via Web Audio API
      if (audioRef?.current) {
        applyAudioTransposition(audioRef.current, newSemitones);
      }
    }
  };

  const applyAudioTransposition = (audioElement, semitones) => {
    try {
      // Créer un contexte Audio si nécessaire
      if (!audioElement.audioContext) {
        const context = new (window.AudioContext || window.webkitAudioContext)();
        const source = context.createMediaElementAudioSource(audioElement);
        const pitchShift = context.createBiquadFilter();
        source.connect(pitchShift);
        pitchShift.connect(context.destination);
        audioElement.audioContext = context;
      }

      // Utiliser playbackRate pour une transposition simple
      // 2^(semitones/12) = ratio de vitesse pour la hauteur
      const ratio = Math.pow(2, semitones / 12);
      audioElement.playbackRate = ratio;
    } catch (e) {
      console.warn('Transposition audio non supportée:', e);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-600 dark:text-gray-400 font-medium whitespace-nowrap">Tonalité:</span>
      
      {/* Bouton Bémol (baisse) */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        disabled={!canDecrease}
        onClick={() => handleTranspose(-1)}
        className={`w-8 h-8 rounded-md flex items-center justify-center text-sm font-bold transition-all ${
          canDecrease
            ? 'bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white cursor-pointer'
            : 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
        }`}
        title="Baisser d'un demi-ton"
      >
        ♭
      </motion.button>

      {/* Affichage Note Original → Transposée */}
      <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md min-w-[80px] justify-center">
        <span className={`text-sm font-bold ${
          semitones === 0
            ? 'text-gray-700 dark:text-gray-300'
            : 'text-indigo-600 dark:text-indigo-400'
        }`}>
          {originalNote}
        </span>
        {semitones !== 0 && (
          <>
            <span className="text-xs text-gray-500">→</span>
            <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
              {transposedNote}
            </span>
            <span className="text-xs text-gray-500 ml-1">
              {semitones > 0 ? `+${semitones}` : semitones}
            </span>
          </>
        )}
      </div>

      {/* Bouton Dièse (hausse) */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        disabled={!canIncrease}
        onClick={() => handleTranspose(1)}
        className={`w-8 h-8 rounded-md flex items-center justify-center text-sm font-bold transition-all ${
          canIncrease
            ? 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white cursor-pointer'
            : 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
        }`}
        title="Augmenter d'un demi-ton"
      >
        ♯
      </motion.button>

      {/* Bouton Réinitialiser (affiche seulement si transposé) */}
      {semitones !== 0 && (
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            onTranspose(0);
            if (audioRef?.current) {
              audioRef.current.playbackRate = 1;
            }
          }}
          className="text-xs px-2 py-1 rounded-md bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 transition-colors"
          title="Réinitialiser à la tonalité originale"
        >
          ✕
        </motion.button>
      )}
    </div>
  );
};

export default SimpleTransposition;
