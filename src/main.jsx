import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// localStorage sécurisé pour mobile
const safeGetItem = (key, defaultValue) => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    return window.localStorage?.getItem(key) || defaultValue;
  } catch {
    return defaultValue;
  }
};

// Appliquer le thème sauvegardé au chargement
const savedTheme = safeGetItem('theme', 'blue');
if (document?.documentElement) {
  document.documentElement.setAttribute('data-theme', savedTheme);
}

// Appliquer le mode sombre
const savedDarkMode = safeGetItem('darkMode', 'false') === 'true';
if (savedDarkMode && document?.documentElement) {
  document.documentElement.classList.add('dark');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)