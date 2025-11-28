import { Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';

const AudioIndicator = ({ hasAudio, size = 16, className = '' }) => {
  if (!hasAudio) return null;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`inline-flex items-center justify-center ${className}`}
      title="Audio disponible"
    >
      <Volume2 
        size={size} 
        className="text-primary-600 dark:text-primary-400" 
      />
    </motion.div>
  );
};

export default AudioIndicator;