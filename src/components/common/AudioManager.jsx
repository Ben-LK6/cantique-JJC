import { useState, useRef } from 'react';
import { Upload, Music, Check, X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AudioManager = ({ onAudioImport, cantiques = [] }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = async (files) => {
    setIsUploading(true);
    const newStatus = {};

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Vérifier que c'est un fichier audio
      if (!file.type.startsWith('audio/')) {
        newStatus[file.name] = { status: 'error', message: 'Format non supporté' };
        continue;
      }

      // Extraire le numéro du cantique du nom du fichier
      const numeroMatch = file.name.match(/cantique[_-]?(\d{1,3})/i);
      if (!numeroMatch) {
        newStatus[file.name] = { status: 'error', message: 'Nom de fichier invalide. Utilisez: cantique_001.mp3' };
        continue;
      }

      const numero = numeroMatch[1].padStart(3, '0');
      
      try {
        // Simuler l'upload (ici vous ajouteriez la logique réelle d'upload)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Créer l'URL du fichier pour le lecteur audio
        const audioUrl = URL.createObjectURL(file);
        
        // Notifier le parent du nouvel audio
        if (onAudioImport) {
          onAudioImport({
            numero,
            file,
            audioUrl,
            originalName: file.name
          });
        }

        newStatus[file.name] = { 
          status: 'success', 
          message: `Ajouté au cantique n°${numero}`,
          numero 
        };
      } catch (error) {
        newStatus[file.name] = { status: 'error', message: 'Erreur lors de l\'upload' };
      }
    }

    setUploadStatus(prev => ({ ...prev, ...newStatus }));
    setIsUploading(false);
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const clearStatus = () => {
    setUploadStatus({});
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3 mb-4">
        <Music className="text-primary-600" size={24} />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
          Gestionnaire Audio
        </h3>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        Importez des fichiers audio pour les cantiques. Les fichiers seront automatiquement 
        synchronisés entre les versions goun et yoruba selon leur numéro.
      </p>

      {/* Zone de drop */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
          dragActive 
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
            : 'border-gray-300 dark:border-gray-600 hover:border-primary-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="audio/*"
          onChange={handleChange}
          className="hidden"
        />

        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <Upload className="text-gray-400" size={24} />
          </div>
          
          <div>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
              Glissez vos fichiers audio ici
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ou cliquez pour sélectionner
            </p>
          </div>

          <button
            onClick={onButtonClick}
            disabled={isUploading}
            className="px-6 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white rounded-lg transition-colors"
          >
            {isUploading ? 'Upload en cours...' : 'Sélectionner des fichiers'}
          </button>
        </div>
      </div>

      {/* Format attendu */}
      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
          Format des noms de fichiers :
        </h4>
        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <li>• cantique_001.mp3 (pour le cantique n°1)</li>
          <li>• cantique_025.mp3 (pour le cantique n°25)</li>
          <li>• cantique_100.mp3 (pour le cantique n°100)</li>
        </ul>
      </div>

      {/* Statut des uploads */}
      <AnimatePresence>
        {Object.keys(uploadStatus).length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-2"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-700 dark:text-gray-300">
                Résultats de l'import :
              </h4>
              <button
                onClick={clearStatus}
                className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Effacer
              </button>
            </div>
            
            {Object.entries(uploadStatus).map(([fileName, status]) => (
              <div
                key={fileName}
                className={`flex items-center gap-3 p-3 rounded-lg ${
                  status.status === 'success' 
                    ? 'bg-green-50 dark:bg-green-900/20' 
                    : 'bg-red-50 dark:bg-red-900/20'
                }`}
              >
                {status.status === 'success' ? (
                  <Check className="text-green-600" size={16} />
                ) : (
                  <AlertCircle className="text-red-600" size={16} />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    {fileName}
                  </p>
                  <p className={`text-xs ${
                    status.status === 'success' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {status.message}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AudioManager;