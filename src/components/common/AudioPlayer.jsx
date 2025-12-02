import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { t } from '../../data/translations';
import { transposeNote } from '../../utils/transposeUtils';

const AudioPlayer = ({ audioFile, title, numero, tonalite }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [semitones, setSemitones] = useState(0);

  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
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

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
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
        // Pour Safari iOS: charger explicitement avant de jouer
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

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || hasError) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = newVolume;
      setVolume(newVolume);
      setIsMuted(newVolume === 0);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!audioFile) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
      <audio ref={audioRef} src={audioFile} preload="metadata" />
      
      <div className="flex items-center gap-2 mb-3">
        <Volume2 size={20} className="text-primary-600" />
        <h3 className="font-semibold text-gray-800 dark:text-white">
          {numero ? `Cantique n°${numero}` : 'Lecture audio'}
        </h3>
        {title && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">
            {title}
          </p>
        )}
      </div>

      {hasError ? (
        <div className="text-center py-4">
          <p className="text-red-500 text-sm">Fichier audio non disponible</p>
        </div>
      ) : (
        <>
          {/* Contrôles principaux */}
          <div className="flex items-center gap-4 mb-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              disabled={isLoading}
              className="flex items-center justify-center w-12 h-12 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white rounded-full transition-colors"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : isPlaying ? (
                <Pause size={20} />
              ) : (
                <Play size={20} className="ml-0.5" />
              )}
            </motion.button>

            <div className="flex-1">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
              
              {/* Barre de progression */}
              <div 
                className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full cursor-pointer"
                onClick={handleSeek}
              >
                <div 
                  className="h-full bg-primary-600 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Contrôles de volume, vitesse et transposition */}
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX size={16} className="text-gray-600 dark:text-gray-400" />
                ) : (
                  <Volume2 size={16} className="text-gray-600 dark:text-gray-400" />
                )}
              </button>
              
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 h-1 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 dark:text-gray-400 min-w-[35px]">
                Vitesse:
              </span>
              <select
                value={playbackRate}
                onChange={(e) => {
                  const rate = parseFloat(e.target.value);
                  setPlaybackRate(rate);
                  if (audioRef.current) {
                    audioRef.current.playbackRate = rate * Math.pow(2, semitones / 12);
                  }
                }}
                className="text-xs bg-gray-200 dark:bg-gray-700 border-0 rounded px-2 py-1 text-gray-700 dark:text-gray-300"
              >
                <option value={0.5}>0.5x</option>
                <option value={0.75}>0.75x</option>
                <option value={1}>1x</option>
                <option value={1.25}>1.25x</option>
                <option value={1.5}>1.5x</option>
              </select>
            </div>

            {/* Contrôle de transposition intégré */}
            {tonalite?.note && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-600 dark:text-gray-400 min-w-[20px]">
                  Ton:
                </span>
                
                <button
                  onClick={() => {
                    const newValue = Math.max(-6, semitones - 1);
                    setSemitones(newValue);
                    if (audioRef.current) {
                      audioRef.current.preservesPitch = false;
                      audioRef.current.playbackRate = playbackRate * Math.pow(2, newValue / 12);
                    }
                  }}
                  disabled={semitones <= -6}
                  className="w-6 h-6 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-xs font-bold transition"
                  title="Bémol (-1/2 ton)"
                >
                  ♭
                </button>

                <div className="flex items-center gap-1 min-w-[40px] justify-center">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    {transposeNote(tonalite.note, semitones)}
                  </span>
                  {semitones !== 0 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      ({semitones > 0 ? '+' : ''}{semitones})
                    </span>
                  )}
                </div>

                <button
                  onClick={() => {
                    const newValue = Math.min(6, semitones + 1);
                    setSemitones(newValue);
                    if (audioRef.current) {
                      audioRef.current.preservesPitch = false;
                      audioRef.current.playbackRate = playbackRate * Math.pow(2, newValue / 12);
                    }
                  }}
                  disabled={semitones >= 6}
                  className="w-6 h-6 rounded bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-xs font-bold transition"
                  title="Dièse (+1/2 ton)"
                >
                  ♯
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AudioPlayer;