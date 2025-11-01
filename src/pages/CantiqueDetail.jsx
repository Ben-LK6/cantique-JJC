import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Heart, Share2, Download, Play, Pause, Volume2 } from 'lucide-react';
import { playTonality } from '../utils/audioUtils';
import { exportCantiqueToPDF } from '../utils/pdfExport';

const CantiqueDetail = ({ cantiqueId, onBack }) => {
  const [cantique, setCantique] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(50);
  const [isPlaying, setIsPlaying] = useState(false);
  const contentRef = useRef(null);
  const scrollIntervalRef = useRef(null);

  // Charger le cantique
  useEffect(() => {
    import('../data/cantiques.json').then(data => {
      const found = data.default.find(c => c.id === cantiqueId);
      setCantique(found);
    });

    // Vérifier si c'est un favori
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.includes(cantiqueId));
  }, [cantiqueId]);

  // Fonction de défilement automatique
  const startAutoScroll = () => {
    if (isScrolling) {
      clearInterval(scrollIntervalRef.current);
      setIsScrolling(false);
    } else {
      setIsScrolling(true);
      scrollIntervalRef.current = setInterval(() => {
        if (contentRef.current) {
          contentRef.current.scrollTop += 1;
          
          // Arrêter si on arrive en bas
          if (contentRef.current.scrollTop >= contentRef.current.scrollHeight - contentRef.current.clientHeight) {
            clearInterval(scrollIntervalRef.current);
            setIsScrolling(false);
          }
        }
      }, scrollSpeed);
    }
  };

  // Nettoyer l'interval
  useEffect(() => {
    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, []);

// Jouer la tonalité
const playTonalitySound = () => {
  if (cantique && cantique.tonalite) {
    setIsPlaying(true);
    playTonality(cantique.tonalite.note);
    setTimeout(() => setIsPlaying(false), 1500);
  }
};
  // Toggle favori
  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (isFavorite) {
      const newFavorites = favorites.filter(id => id !== cantiqueId);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    } else {
      favorites.push(cantiqueId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  // Partager
  const handleShare = async () => {
    if (navigator.share && cantique) {
      try {
        await navigator.share({
          title: `Cantique ${cantique.numero} - ${cantique.titre}`,
          text: `Découvrez le cantique "${cantique.titre}" de l'église JJC`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Partage annulé');
      }
    } else {
      alert('Partage bientôt disponible !');
    }
  };

  if (!cantique) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-30">
        <div className="px-4 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-gray-800">
              Cantique {cantique.numero}
            </h2>
            <p className="text-sm text-gray-600">{cantique.titre}</p>
          </div>
          <button
            onClick={toggleFavorite}
            className={`p-2 rounded-lg transition-colors ${
              isFavorite ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Contrôles */}
        <div className="px-4 pb-4 flex gap-2 overflow-x-auto">
          <button
            onClick={playTonalitySound}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              isPlaying
                ? 'bg-primary-600 text-white'
                : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
            }`}
          >
            <Volume2 size={18} />
            <span>Tonalité: {cantique.tonalite.note}</span>
          </button>

          <button
            onClick={startAutoScroll}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              isScrolling
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {isScrolling ? <Pause size={18} /> : <Play size={18} />}
            <span>{isScrolling ? 'Pause' : 'Défilement auto'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors whitespace-nowrap"
          >
            <Share2 size={18} />
            <span>Partager</span>
          </button>

          <button
            onClick={() => exportCantiqueToPDF(cantique)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors whitespace-nowrap"
          >
            <Download size={18} />
            <span>PDF</span>
          </button>
        </div>
      </div>

      {/* Contenu - Paroles */}
      <div
        ref={contentRef}
        className="flex-1 overflow-y-auto px-4 py-6 lg:px-8"
      >
        <div className="max-w-2xl mx-auto">
          {/* Logo JJC */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">JJC</span>
            </div>
            <div className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
              {cantique.theme}
            </div>
          </div>

          {/* Titre */}
          <h1 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-8">
            {cantique.titre}
          </h1>

          {/* Paroles */}
          <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8">
            {cantique.paroles.map((ligne, index) => (
              <p
                key={index}
                className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-4 text-center"
              >
                {ligne}
              </p>
            ))}
          </div>

          {/* Espace en bas pour le scroll */}
          <div className="h-32"></div>
        </div>
      </div>
    </div>
  );
};

export default CantiqueDetail;