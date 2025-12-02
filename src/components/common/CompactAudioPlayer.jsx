import { useState, useRef, useEffect } from 'react';
import { Headphones, Play, Pause, RotateCcw, RotateCw } from 'lucide-react';
import { motion } from 'framer-motion';

const CompactAudioPlayer = ({ audioFile, title, numero }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => setIsPlaying(false);
    const handleLoadStart = () => setIsLoading(true);
    const handleCanPlay = () => {
      setIsLoading(false);
      setHasError(false);
    };
    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
    };
  }, [audioFile]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || hasError) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        audio.load();
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Erreur de lecture audio:', error);
        setHasError(true);
        setIsPlaying(false);
      }
    }
  };

  const changeSpeed = (newRate) => {
    const audio = audioRef.current;
    if (audio) {
      audio.playbackRate = newRate;
      setPlaybackRate(newRate);
    }
  };

  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 2];

  if (!audioFile) return null;

  return (
    <div className="relative">
      <audio ref={audioRef} src={audioFile} preload="metadata" />
      
      {/* Bouton principal avec icône casque */}
      <motion.div
        className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl p-3 shadow-lg border border-gray-200 dark:border-gray-700"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center gap-2">
          <Headphones size={20} className="text-primary-600" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Audio
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Bouton Play/Pause */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            disabled={isLoading || hasError}
            className="flex items-center justify-center w-8 h-8 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white rounded-full transition-colors"
          >
            {isLoading ? (
              <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
            ) : isPlaying ? (
              <Pause size={14} />
            ) : (
              <Play size={14} className="ml-0.5" />
            )}
          </motion.button>

          {/* Bouton contrôles de vitesse */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowControls(!showControls)}
            className="flex items-center justify-center w-8 h-8 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-full transition-colors"
          >
            <span className="text-xs font-bold">{playbackRate}x</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Contrôles de vitesse (popup) */}
      {showControls && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl p-3 shadow-xl border border-gray-200 dark:border-gray-700 z-50"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Vitesse de lecture
            </span>
            <button
              onClick={() => setShowControls(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              ×
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {speedOptions.map((speed) => (
              <motion.button
                key={speed}
                whileTap={{ scale: 0.95 }}
                onClick={() => changeSpeed(speed)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  playbackRate === speed
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                {speed}x
              </motion.button>
            ))}
          </div>

          {hasError && (
            <div className="mt-2 text-center">
              <p className="text-red-500 text-xs">Fichier audio non disponible</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default CompactAudioPlayer;