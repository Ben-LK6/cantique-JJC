// Configuration audio pour l'application Cantique JJC

export const AUDIO_CONFIG = {
  // Formats supportés
  SUPPORTED_FORMATS: [
    'audio/mpeg', // MP3
    'audio/wav',  // WAV
    'audio/ogg',  // OGG
    'audio/mp4',  // M4A
    'audio/aac'   // AAC
  ],

  // Extensions de fichiers acceptées
  SUPPORTED_EXTENSIONS: ['.mp3', '.wav', '.ogg', '.m4a', '.aac'],

  // Taille maximale des fichiers (en bytes)
  MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB

  // Paramètres par défaut du lecteur
  DEFAULT_PLAYER_SETTINGS: {
    volume: 0.8,
    preload: 'metadata',
    autoplay: false,
    loop: false,
    muted: false
  },

  // Configuration de la synchronisation
  SYNC_SETTINGS: {
    // Délai avant de considérer qu'un fichier n'existe pas (ms)
    TIMEOUT: 5000,
    
    // Nombre de tentatives de rechargement
    RETRY_ATTEMPTS: 3,
    
    // Délai entre les tentatives (ms)
    RETRY_DELAY: 1000
  },

  // Messages d'erreur
  ERROR_MESSAGES: {
    FILE_NOT_FOUND: 'Fichier audio non trouvé',
    UNSUPPORTED_FORMAT: 'Format audio non supporté',
    FILE_TOO_LARGE: 'Fichier trop volumineux',
    NETWORK_ERROR: 'Erreur de réseau',
    PLAYBACK_ERROR: 'Erreur de lecture',
    PERMISSION_DENIED: 'Permission refusée'
  },

  // Chemins des fichiers
  PATHS: {
    AUDIO_DIR: '/audio/',
    BACKUP_DIR: '/audio/backup/',
    TEMP_DIR: '/audio/temp/'
  },

  // Convention de nommage
  NAMING_CONVENTION: {
    PREFIX: 'cantique_',
    SUFFIX: '.mp3',
    NUMBER_PADDING: 3, // 001, 002, etc.
    SEPARATOR: '_'
  },

  // Qualité audio recommandée
  QUALITY_SETTINGS: {
    BITRATE: {
      MIN: 96,      // kbps
      RECOMMENDED: 128,
      MAX: 320
    },
    SAMPLE_RATE: {
      MIN: 22050,   // Hz
      RECOMMENDED: 44100,
      MAX: 48000
    },
    CHANNELS: {
      MONO: 1,
      STEREO: 2
    }
  },

  // Fonctionnalités activées
  FEATURES: {
    DOWNLOAD: false,        // Téléchargement des fichiers
    SPEED_CONTROL: false,   // Contrôle de vitesse
    EQUALIZER: false,       // Égaliseur
    PLAYLIST: false,        // Listes de lecture
    OFFLINE_MODE: false,    // Mode hors ligne
    LYRICS_SYNC: false      // Synchronisation des paroles
  },

  // Paramètres de cache
  CACHE_SETTINGS: {
    ENABLED: true,
    MAX_SIZE: 100 * 1024 * 1024, // 100MB
    EXPIRY_TIME: 24 * 60 * 60 * 1000, // 24 heures
    CLEANUP_INTERVAL: 60 * 60 * 1000   // 1 heure
  },

  // Analytics (si activé)
  ANALYTICS: {
    ENABLED: false,
    TRACK_PLAY_COUNT: false,
    TRACK_DURATION: false,
    TRACK_COMPLETION: false
  }
};

// Fonction pour valider un fichier audio
export const validateAudioFile = (file) => {
  const errors = [];

  // Vérifier le type MIME
  if (!AUDIO_CONFIG.SUPPORTED_FORMATS.includes(file.type)) {
    errors.push(AUDIO_CONFIG.ERROR_MESSAGES.UNSUPPORTED_FORMAT);
  }

  // Vérifier la taille
  if (file.size > AUDIO_CONFIG.MAX_FILE_SIZE) {
    errors.push(AUDIO_CONFIG.ERROR_MESSAGES.FILE_TOO_LARGE);
  }

  // Vérifier l'extension
  const extension = '.' + file.name.split('.').pop().toLowerCase();
  if (!AUDIO_CONFIG.SUPPORTED_EXTENSIONS.includes(extension)) {
    errors.push(AUDIO_CONFIG.ERROR_MESSAGES.UNSUPPORTED_FORMAT);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Fonction pour générer le nom de fichier selon la convention
export const generateAudioFileName = (numero) => {
  const paddedNumero = numero.toString().padStart(AUDIO_CONFIG.NAMING_CONVENTION.NUMBER_PADDING, '0');
  return `${AUDIO_CONFIG.NAMING_CONVENTION.PREFIX}${paddedNumero}${AUDIO_CONFIG.NAMING_CONVENTION.SUFFIX}`;
};

// Fonction pour extraire le numéro du nom de fichier
export const extractNumeroFromFileName = (fileName) => {
  const regex = new RegExp(`${AUDIO_CONFIG.NAMING_CONVENTION.PREFIX}(\\d+)`);
  const match = fileName.match(regex);
  return match ? parseInt(match[1], 10) : null;
};

// Fonction pour obtenir les paramètres du lecteur
export const getPlayerSettings = (customSettings = {}) => {
  return {
    ...AUDIO_CONFIG.DEFAULT_PLAYER_SETTINGS,
    ...customSettings
  };
};

export default AUDIO_CONFIG;