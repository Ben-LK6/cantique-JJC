import { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, Pause, Trash2, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { t } from '../../data/translations';
import { saveAudioRecording, getAudioRecording, deleteAudioRecording } from '../../utils/audioStorage';

const AudioRecorder = ({ cantiqueId, onSave }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [hasExistingAudio, setHasExistingAudio] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    // Vérifier s'il y a déjà un enregistrement pour ce cantique
    const existingAudio = getAudioRecording(cantiqueId);
    if (existingAudio) {
      setAudioUrl(existingAudio);
      setHasExistingAudio(true);
    }
  }, [cantiqueId]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      
      mediaRecorder.onstop = async () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        setAudioBlob(blob);
        setAudioUrl(url);
        
        // Sauvegarder avec l'utilitaire
        try {
          const audioData = await saveAudioRecording(cantiqueId, blob);
          setHasExistingAudio(true);
          onSave && onSave(audioData);
        } catch (error) {
          console.error('Erreur lors de la sauvegarde:', error);
          alert('Erreur lors de la sauvegarde de l\'enregistrement');
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Erreur d\'accès au microphone:', error);
      alert(t('microphoneError'));
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const deleteAudio = () => {
    if (deleteAudioRecording(cantiqueId)) {
      setAudioUrl(null);
      setAudioBlob(null);
      setHasExistingAudio(false);
      setIsPlaying(false);
    } else {
      alert('Erreur lors de la suppression de l\'enregistrement');
    }
  };

  const downloadAudio = () => {
    if (audioUrl) {
      const a = document.createElement('a');
      a.href = audioUrl;
      a.download = `cantique_${cantiqueId}.wav`;
      a.click();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2 mb-3">
        <Mic size={20} className="text-primary-600" />
        <h3 className="font-semibold text-gray-800 dark:text-white">{t('audioRecording')}</h3>
      </div>

      {/* Audio player caché */}
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          onEnded={() => setIsPlaying(false)}
          onLoadedMetadata={() => {
            // Audio chargé
          }}
        />
      )}

      {/* Contrôles d'enregistrement */}
      <div className="flex items-center gap-3 mb-3">
        {!isRecording && !hasExistingAudio && (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={startRecording}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            <Mic size={16} />
            {t('record')}
          </motion.button>
        )}

        {isRecording && (
          <>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={stopRecording}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              <Square size={16} />
              {t('stop')}
            </motion.button>
            <div className="flex items-center gap-2 text-red-500">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-mono">{formatTime(recordingTime)}</span>
            </div>
          </>
        )}
      </div>

      {/* Contrôles de lecture */}
      {audioUrl && !isRecording && (
        <div className="flex items-center gap-2 flex-wrap">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={isPlaying ? pauseAudio : playAudio}
            className="flex items-center gap-2 px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            {isPlaying ? t('pause') : t('listen')}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={downloadAudio}
            className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Download size={16} />
            {t('download')}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={deleteAudio}
            className="flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <Trash2 size={16} />
            {t('delete')}
          </motion.button>

          {!isRecording && (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={startRecording}
              className="flex items-center gap-2 px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors"
            >
              <Mic size={16} />
              {t('newRecording')}
            </motion.button>
          )}
        </div>
      )}

      {hasExistingAudio && (
        <p className="text-xs text-green-600 dark:text-green-400 mt-2">
          ✓ {t('recordingSaved')}
        </p>
      )}
    </div>
  );
};

export default AudioRecorder;