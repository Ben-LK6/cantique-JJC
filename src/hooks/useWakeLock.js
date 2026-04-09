import { useEffect } from 'react';

const useWakeLock = () => {
  useEffect(() => {
    let wakeLock = null;

    const acquire = async () => {
      try {
        if ('wakeLock' in navigator) {
          wakeLock = await navigator.wakeLock.request('screen');
        }
      } catch {
        // Silencieux si refusé (batterie faible, etc.)
      }
    };

    // Réacquérir quand la page redevient visible (ex: retour depuis une autre app)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') acquire();
    };

    acquire();
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      wakeLock?.release();
    };
  }, []);
};

export default useWakeLock;
