import { useState, useEffect } from 'react';
import { ArrowLeft, Music, Play, Pause, Download, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import AudioManager from '../components/common/AudioManager';
import { cantiques } from '../data/cantiques';
import { cantiquesYoruba } from '../data/cantiquesYoruba';
import { getAudioMetadata } from '../utils/audioUtils';

const AudioAdmin = ({ onBack }) => {
  const [audioFiles, setAudioFiles] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [playingAudio, setPlayingAudio] = useState(null);

  // Combiner tous les cantiques pour l'affichage
  const allCantiques = [
    ...cantiques.map(c => ({ ...c, language: 'goun' })),
    ...cantiquesYoruba.map(c => ({ ...c, language: 'yoruba' }))
  ];

  const handleAudioImport = (audioData) => {
    const { numero, audioUrl, originalName } = audioData;
    
    setAudioFiles(prev => ({
      ...prev,
      [numero]: {
        url: audioUrl,
        fileName: originalName,
        imported: true,
        timestamp: new Date().toISOString()
      }
    }));

    // Ici, vous pourriez sauvegarder dans localStorage ou envoyer au serveur
    const savedAudios = JSON.parse(localStorage.getItem('importedAudios') || '{}');
    savedAudios[numero] = {
      fileName: originalName,
      imported: true,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('importedAudios', JSON.stringify(savedAudios));
  };

  const handlePlayAudio = (numero) => {
    if (playingAudio === numero) {
      setPlayingAudio(null);
    } else {
      setPlayingAudio(numero);
    }
  };

  const handleDeleteAudio = (numero) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce fichier audio ?')) {
      setAudioFiles(prev => {
        const newFiles = { ...prev };
        delete newFiles[numero];
        return newFiles;
      });

      // Supprimer du localStorage
      const savedAudios = JSON.parse(localStorage.getItem('importedAudios') || '{}');
      delete savedAudios[numero];
      localStorage.setItem('importedAudios', JSON.stringify(savedAudios));
    }
  };

  // Charger les fichiers audio sauvegardés
  useEffect(() => {
    const savedAudios = JSON.parse(localStorage.getItem('importedAudios') || '{}');
    setAudioFiles(savedAudios);
  }, []);

  // Filtrer les cantiques selon la langue sélectionnée
  const filteredCantiques = selectedLanguage === 'all' 
    ? allCantiques 
    : allCantiques.filter(c => c.language === selectedLanguage);

  // Grouper par numéro pour éviter les doublons
  const cantiquesByNumero = filteredCantiques.reduce((acc, cantique) => {
    if (!acc[cantique.numero]) {
      acc[cantique.numero] = [];
    }
    acc[cantique.numero].push(cantique);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white px-4 py-4 sticky top-0 z-40 shadow-lg">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-colors backdrop-blur-sm"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <div>
            <h1 className="text-xl font-bold">Gestionnaire Audio</h1>
            <p className="text-sm text-primary-100">
              Importez et gérez les fichiers audio des cantiques
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 max-w-6xl mx-auto">
        {/* Gestionnaire d'import */}
        <div className="mb-8">
          <AudioManager onAudioImport={handleAudioImport} cantiques={allCantiques} />
        </div>

        {/* Filtres */}
        <div className="mb-6">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedLanguage('all')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedLanguage === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Tous les cantiques
            </button>
            <button
              onClick={() => setSelectedLanguage('goun')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedLanguage === 'goun'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Cantiques Goun
            </button>
            <button
              onClick={() => setSelectedLanguage('yoruba')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedLanguage === 'yoruba'
                  ? 'bg-primary-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Cantiques Yoruba
            </button>
          </div>
        </div>

        {/* Liste des cantiques */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Cantiques avec Audio
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {Object.keys(audioFiles).length} fichier(s) audio importé(s)
            </p>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {Object.entries(cantiquesByNumero)
              .sort(([a], [b]) => parseInt(a) - parseInt(b))
              .map(([numero, cantiquesGroup]) => {
                const hasAudio = audioFiles[numero];
                const gounCantique = cantiquesGroup.find(c => c.language === 'goun');
                const yorubaCantique = cantiquesGroup.find(c => c.language === 'yoruba');

                return (
                  <div key={numero} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                          <span className="text-white font-bold">{numero}</span>
                        </div>
                        
                        <div className="flex-1">
                          {gounCantique && (
                            <div className="mb-1">
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded mr-2">
                                Goun
                              </span>
                              <span className="font-medium text-gray-800 dark:text-white">
                                {gounCantique.titre}
                              </span>
                            </div>
                          )}
                          {yorubaCantique && (
                            <div>
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded mr-2">
                                Yoruba
                              </span>
                              <span className="font-medium text-gray-800 dark:text-white">
                                {yorubaCantique.titre}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {hasAudio ? (
                          <>
                            <div className="text-xs text-green-600 dark:text-green-400 mr-2">
                              Audio disponible
                            </div>
                            <button
                              onClick={() => handlePlayAudio(numero)}
                              className="p-2 bg-primary-100 hover:bg-primary-200 dark:bg-primary-900 dark:hover:bg-primary-800 text-primary-600 rounded-lg transition-colors"
                            >
                              {playingAudio === numero ? <Pause size={16} /> : <Play size={16} />}
                            </button>
                            <button
                              onClick={() => handleDeleteAudio(numero)}
                              className="p-2 bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-600 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </>
                        ) : (
                          <div className="text-xs text-gray-400">
                            Aucun audio
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioAdmin;