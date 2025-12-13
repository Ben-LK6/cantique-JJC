import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Heart, Music, Volume2, Play, Pause, Share2, Headphones, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCantiqueById } from '../utils/cantiqueUtils';
import { getTonalityColor, getTonalityBadgeClass, getTonalityTextClass } from '../utils/tonalityColors';
import { useTransposition } from '../hooks/useTransposition';
import { transposeNote } from '../utils/transposeUtils';

import { t } from '../data/translations';

import { getAudioMetadata } from '../utils/audioUtils';

const CantiqueDetail = ({ cantiqueId, onBack }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('fontSize') || 'medium');
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioPlaybackRate, setAudioPlaybackRate] = useState(1);
  const [showAudioControls, setShowAudioControls] = useState(false);
  const [showTransposition, setShowTransposition] = useState(false);
  const [semitones, setSemitones] = useState(0);

  const [volume, setVolume] = useState(0.7);
  const scrollIntervalRef = useRef(null);
  const scrollTimeoutRef = useRef(null);
  const cantiqueAudioRef = useRef(null);

  const cantique = getCantiqueById(cantiqueId);
  const audioData = getAudioMetadata(cantique);
  
  // Hook de transposition
  const transposition = useTransposition(cantique?.tonalite?.note || 'C', cantiqueId);

useEffect(() => {
  const savedFontSize = localStorage.getItem('fontSize') || 'medium';
  setFontSize(savedFontSize);
  
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  setIsFavorite(favorites.includes(cantiqueId));

  // Audio event listeners et effets
  const audio = cantiqueAudioRef.current;
  if (audio) {
    const handleEnded = () => setIsAudioPlaying(false);
    audio.addEventListener('ended', handleEnded);
    

    
    return () => {
      audio.removeEventListener('ended', handleEnded);
      stopAutoScroll();
    };
  }

  return () => {
    stopAutoScroll();
  };
}, [cantiqueId]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter(id => id !== cantiqueId);
    } else {
      newFavorites = [...favorites, cantiqueId];
    }
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

const playTonality = () => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    const frequencies = {
      'C': 261.63, 'D': 293.66, 'E': 329.63, 'F': 349.23,
      'G': 392.00, 'A': 440.00, 'B': 493.88
    };
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Jouer la note transposée
    const transposedNote = transposeNote(cantique.tonalite.note, semitones);
    const baseFreq = frequencies[transposedNote] || frequencies[cantique.tonalite.note] || 440;
    
    oscillator.frequency.setValueAtTime(baseFreq, audioContext.currentTime);
    oscillator.type = 'triangle';
    
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1.5);
  } catch (error) {
    console.log('Erreur audio:', error);
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
  }
};

  const toggleAutoScroll = () => {
    console.log('Toggle clicked, current state:', isAutoScrolling);
    if (isAutoScrolling) {
      stopAutoScroll();
    } else {
      startAutoScroll();
    }
  };

  const startAutoScroll = () => {
    console.log('Starting auto scroll');
    setIsAutoScrolling(true);
    
    // Défilement simple et continu
    scrollIntervalRef.current = setInterval(() => {
      // Vérifier si on a atteint la fin de la page
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Si on est proche de la fin (moins de 100px), arrêter le défilement
      if (scrollTop + windowHeight >= documentHeight - 100) {
        stopAutoScroll();
        return;
      }
      
      window.scrollBy(0, 2); // 2px à chaque fois
    }, 80); // Toutes les 80ms
  };

  const stopAutoScroll = () => {
    console.log('Stopping auto scroll');
    setIsAutoScrolling(false);
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = null;
    }
  };

const handleShare = () => {
  if (navigator.share) {
    navigator.share({
      title: `${cantique.titre} - Cantique JJC`,
      text: `Découvrez le cantique n°${cantique.numero} : ${cantique.titre}`,
      url: window.location.href,
    }).catch(err => console.log('Erreur de partage:', err));
  } else {
    navigator.clipboard.writeText(window.location.href);
    alert(t('linkCopied'));
  }
};

const toggleAudioPlay = async () => {
  const audio = cantiqueAudioRef.current;
  if (!audio || !audioData) return;

  if (isAudioPlaying) {
    audio.pause();
    setIsAudioPlaying(false);
  } else {
    try {
      await audio.play();
      setIsAudioPlaying(true);
    } catch (error) {
      console.error('Erreur audio:', error);
    }
  }
};

const changeAudioSpeed = (rate) => {
  const audio = cantiqueAudioRef.current;
  if (audio) {
    audio.playbackRate = rate * Math.pow(2, semitones / 12);
    setAudioPlaybackRate(rate);
  }
};



const changeVolume = (newVolume) => {
  setVolume(newVolume);
  const audio = cantiqueAudioRef.current;
  if (audio) {
    audio.volume = newVolume;
  }
};


  if (!cantique) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">{t('cantiqueNotFound')}</p>
          <button onClick={onBack} className="text-pink-600 font-semibold">
            {t('back')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Audio du cantique */}
      {audioData && <audio ref={cantiqueAudioRef} src={audioData.audioFile} preload="metadata" />}

      {/* Header */}
      <div className="bg-gradient-to-br from-pink-600 to-pink-800 text-white px-4 py-4 sticky top-0 z-40 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onBack}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors backdrop-blur-sm"
            >
              <ArrowLeft size={20} />
            </motion.button>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold truncate">{cantique.titre}</h2>
              <p className="text-sm text-pink-100">N° {cantique.numero}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleFavorite}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors backdrop-blur-sm"
            >
              <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
            </motion.button>
          </div>
        </div>
      </div>


      {/* Boutons d'action flottants */}
      <div className="fixed right-4 bottom-20 lg:bottom-8 z-40 space-y-3">
        {/* Défilement Auto */}
        <button
          onClick={toggleAutoScroll}
          className={`p-4 rounded-full shadow-2xl transition-all ${
            isAutoScrolling 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-pink-600 hover:bg-pink-700'
          } text-white`}
          title={isAutoScrolling ? t('stopScrolling') : t('startScrolling')}
        >
          {isAutoScrolling ? <Pause size={24} /> : <Play size={24} />}
        </button>

        {/* Partage */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={handleShare}
          className="p-4 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-2xl transition-all"
          title={t('share')}
        >
          <Share2 size={24} />
        </motion.button>
      </div>

      {/* Contenu */}
      <div className="p-4 pb-32 lg:pb-16">
        <div className="max-w-3xl mx-auto">
          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">{cantique.numero}</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800 dark:text-white">{cantique.titre}</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{cantique.theme}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2">
              {/* Contrôles Audio */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <Music size={14} className={getTonalityTextClass(cantique.tonalite.note)} />
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${getTonalityBadgeClass(transposeNote(cantique.tonalite.note, semitones))}`}>
                    {transposeNote(cantique.tonalite.note, semitones)}
                  </span>
                </div>
                
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={playTonality}
                  className="flex items-center gap-1 px-2 py-1 bg-pink-100 hover:bg-pink-200 dark:bg-pink-900 dark:hover:bg-pink-800 text-pink-700 dark:text-pink-300 rounded-md transition-colors"
                >
                  <Volume2 size={13} />
                  <span className="text-[10px] font-medium">Tonalité</span>
                </motion.button>
                
                {audioData && (
                  <>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleAudioPlay}
                      className={`p-1.5 rounded-md transition-colors ${
                        isAudioPlaying 
                            ? 'bg-red-100 hover:bg-red-200 text-red-600 dark:bg-red-900 dark:text-red-300'
                              : 'bg-green-100 hover:bg-green-200 text-green-600 dark:bg-green-900 dark:text-green-300'
                      }`}
                    >
                      {isAudioPlaying ? <Pause size={13} /> : <Headphones size={13} />}
                    </motion.button>
                    
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                      {audioPlaybackRate}x
                    </span>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        const audio = cantiqueAudioRef.current;
                        if (audio) {
                          audio.currentTime = 0;
                          audio.play();
                          setIsAudioPlaying(true);
                        }
                      }}
                      className="p-1.5 bg-pink-100 hover:bg-pink-200 text-pink-600 dark:bg-pink-900 dark:text-pink-300 rounded-md transition-colors"
                      title="Recommencer le chant"
                    >
                      <svg width="13" height="13" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4v5h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M19 11a8 8 0 11-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowAudioControls(!showAudioControls)}
                      className="p-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-md transition-colors"
                    >
                      <Settings size={13} />
                    </motion.button>
                  </>
                )}
              </div>
            </div>
            
            {/* Panneau de contrôles avancés */}
            <div className="relative">
            <AnimatePresence>
            {showAudioControls && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowAudioControls(false)}
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
                />
                
                {/* Popup */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  className="absolute top-full right-0 mt-2 w-[200px] p-3 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50"
                >
                <div className="space-y-2">
                  {/* Volume */}
                  <div>
                    <h4 className="text-[10px] font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Volume</h4>
                    <div className="grid grid-cols-3 gap-1">
                      {[0.3, 0.5, 0.7, 1].map(vol => (
                        <button
                          key={vol}
                          onClick={() => changeVolume(vol)}
                          className={`px-2 py-1 text-[10px] rounded-md transition-colors ${
                                Math.abs(volume - vol) < 0.1
                                  ? 'bg-pink-600 text-white'
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                              }`}
                        >
                          {vol === 0.3 ? '🔈' : vol === 0.5 ? '🔉' : vol === 0.7 ? '🔊' : '📢'}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Vitesse de lecture */}
                  <div>
                    <h4 className="text-[10px] font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Vitesse</h4>
                    <div className="grid grid-cols-3 gap-1">
                      {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                        <button
                          key={rate}
                          onClick={() => changeAudioSpeed(rate)}
                          className={`px-2 py-1 text-[10px] rounded-md transition-colors ${
                            audioPlaybackRate === rate
                                ? 'bg-pink-600 text-white'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Transposition */}
                  {cantique?.tonalite?.note && (
                    <div>
                      <h4 className="text-[10px] font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Transposition</h4>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            const newValue = Math.max(-6, semitones - 1);
                            setSemitones(newValue);
                            const audio = cantiqueAudioRef.current;
                            if (audio) {
                              audio.preservesPitch = false;
                              audio.playbackRate = audioPlaybackRate * Math.pow(2, newValue / 12);
                            }
                          }}
                          disabled={semitones <= -6}
                          className="w-7 h-7 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm font-bold transition"
                          title="Bémol (-1/2 ton)"
                        >
                          ♭
                        </button>

                        <div className="flex items-center gap-1 min-w-[50px] justify-center">
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            {transposeNote(cantique.tonalite.note, semitones)}
                          </span>
                          {semitones !== 0 && (
                            <span className="text-[10px] text-gray-500 dark:text-gray-400">
                              ({semitones > 0 ? '+' : ''}{semitones})
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => {
                            const newValue = Math.min(6, semitones + 1);
                            setSemitones(newValue);
                            const audio = cantiqueAudioRef.current;
                            if (audio) {
                              audio.preservesPitch = false;
                              audio.playbackRate = audioPlaybackRate * Math.pow(2, newValue / 12);
                            }
                          }}
                          disabled={semitones >= 6}
                          className="w-7 h-7 rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-sm font-bold transition"
                          title="Dièse (+1/2 ton)"
                        >
                          ♯
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
              </>
            )}
            </AnimatePresence>
            </div>

          </motion.div>



          {/* Paroles */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md">
            <div className="space-y-6">
              {cantique.paroles && cantique.paroles.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className={`cantique-text text-gray-800 dark:text-gray-200 leading-relaxed ${
                    fontSize === 'small' ? 'text-base' : fontSize === 'large' ? 'text-2xl' : 'text-lg'
                  }`}>
                    {cantique.paroles.map((ligne, index) => {
                      // Détecter si c'est le début d'un couplet (commence par un chiffre suivi d'un point)
                      const verseMatch = ligne.trim().match(/^(\d+\.)(.*)/);
                      const isEmpty = ligne.trim() === '';
                      // Détecter les refrains (lignes qui commencent par des espaces)
                      const isRefrain = ligne.startsWith('    ') && ligne.trim() !== '';
                      
                      return (
                        <div key={index}>
                          {/* Ajouter un espace avant chaque nouveau couplet (sauf le premier) */}
                          {verseMatch && index > 0 && (
                            <div className="h-6"></div>
                          )}
                          <p className={`${
                            isEmpty ? 'h-2' : 'mb-1'
                          } ${
                            isRefrain ? 'italic text-gray-600 dark:text-gray-300 pl-4' : ''
                          }`}>
                            {verseMatch ? (
                              <>
                                <span className="font-bold text-gray-900 dark:text-white">{verseMatch[1]}</span>
                                <span>{verseMatch[2]}</span>
                              </>
                            ) : (
                              ligne
                            )}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ) : (
                <div className="text-center py-8">
                  <Music size={48} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">{t('lyricsNotAvailable')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CantiqueDetail;