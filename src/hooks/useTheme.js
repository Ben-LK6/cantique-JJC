import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'blue');

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'theme') {
        setTheme(e.newValue || 'blue');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return theme;
};