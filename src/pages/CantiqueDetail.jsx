import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Heart, Music, Volume2, Play, Pause, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getCantiqueById } from '../utils/cantiqueUtils';
import { t } from '../data/translations';

const CantiqueDetail = ({ cantiqueId, onBack }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [fontSize, setFontSize] = useState(() => localStorage.getItem('fontSize') || 'medium');
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const scrollIntervalRef = useRef(null);
  const audioRef = useRef(null);

  const cantique = getCantiqueById(cantiqueId);

useEffect(() => {
  const savedFontSize = localStorage.getItem('fontSize') || 'medium';
  setFontSize(savedFontSize);
  
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  setIsFavorite(favorites.includes(cantiqueId));

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
  // Créer un contexte audio et jouer la tonalité
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Fréquences des notes
    const frequencies = {
      'C': 261.63, 'D': 293.66, 'E': 329.63, 'F': 349.23,
      'G': 392.00, 'A': 440.00, 'B': 493.88
    };
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequencies[cantique.tonalite.note] || 440, audioContext.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1.5);
  } catch (error) {
    console.log('Erreur audio:', error);
    // Fallback: vibration si disponible
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
      window.scrollBy(0, 2); // 2px à chaque fois
    }, 80); // Toutes les 80ms
    
    // Arrêter automatiquement après 60 secondes
    setTimeout(() => {
      if (isAutoScrolling) {
        stopAutoScroll();
      }
    }, 60000);
  };

  const stopAutoScroll = () => {
    console.log('Stopping auto scroll');
    setIsAutoScrolling(false);
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

const handleShare = () => {
  // On gérera le partage plus tard
  if (navigator.share) {
    navigator.share({
      title: `${cantique.titre} - Cantique JJC`,
      text: `Découvrez le cantique n°${cantique.numero} : ${cantique.titre}`,
      url: window.location.href,
    }).catch(err => console.log('Erreur de partage:', err));
  } else {
    // Fallback : copier dans le presse-papier
    navigator.clipboard.writeText(window.location.href);
    alert(t('linkCopied'));
  }
};
  if (!cantique) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">{t('cantiqueNotFound')}</p>
          <button onClick={onBack} className="text-primary-600 font-semibold">
            {t('back')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Audio caché pour la tonalité */}
      <audio ref={audioRef} src={cantique.tonalite.audioFile} />

      {/* Header */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white px-4 py-4 sticky top-0 z-40 shadow-lg">
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
              <p className="text-sm text-primary-100">N° {cantique.numero}</p>
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
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={playTonality}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors backdrop-blur-sm"
            >
              <Volume2 size={20} />
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
              : 'bg-primary-600 hover:bg-primary-700'
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
      <div className="p-4 pb-20 lg:pb-8">
        <div className="max-w-3xl mx-auto">
          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-md mb-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">{cantique.numero}</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800 dark:text-white">{cantique.titre}</h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{cantique.theme}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Music size={16} className="text-primary-600" />
                <span className="font-medium">{t('tonality')}: {cantique.tonalite.note}</span>
              </div>
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
                  <div className={`cantique-text text-gray-800 dark:text-gray-200 leading-relaxed space-y-3 ${
                    fontSize === 'small' ? 'text-base' : fontSize === 'large' ? 'text-2xl' : 'text-lg'
                  }`}>
                    {cantique.paroles.map((ligne, index) => (
                      <p key={index}>{ligne}</p>
                    ))}
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