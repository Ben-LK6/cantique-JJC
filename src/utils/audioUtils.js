// Fonction pour jouer une tonalité
export const playTonality = (note) => {
  const audioEnabled = localStorage.getItem('audioEnabled') !== 'false';
  
  if (!audioEnabled) {
    return;
  }

  // Fréquences des notes (en Hz)
  const frequencies = {
    'C': 261.63,
    'C#': 277.18,
    'D': 293.66,
    'D#': 311.13,
    'E': 329.63,
    'F': 349.23,
    'F#': 369.99,
    'G': 392.00,
    'G#': 415.30,
    'A': 440.00,
    'A#': 466.16,
    'B': 493.88,
  };

  const frequency = frequencies[note] || 440;

  // Créer le contexte audio
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
  // Créer un oscillateur
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  // Configuration
  oscillator.frequency.value = frequency;
  oscillator.type = 'sine'; // Type de son : sine, square, sawtooth, triangle
  
  // Envelope (fade in/out)
  const now = audioContext.currentTime;
  gainNode.gain.setValueAtTime(0, now);
  gainNode.gain.linearRampToValueAtTime(0.3, now + 0.1); // Fade in
  gainNode.gain.linearRampToValueAtTime(0, now + 1.5); // Fade out
  
  // Jouer le son
  oscillator.start(now);
  oscillator.stop(now + 1.5);
  
  // Nettoyer après
  setTimeout(() => {
    audioContext.close();
  }, 2000);
};

// Fonction pour créer un son de notification
export const playNotificationSound = () => {
  const audioEnabled = localStorage.getItem('audioEnabled') !== 'false';
  
  if (!audioEnabled) {
    return;
  }

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = 800;
  oscillator.type = 'sine';
  
  const now = audioContext.currentTime;
  gainNode.gain.setValueAtTime(0.2, now);
  gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
  
  oscillator.start(now);
  oscillator.stop(now + 0.2);
  
  setTimeout(() => {
    audioContext.close();
  }, 300);
};