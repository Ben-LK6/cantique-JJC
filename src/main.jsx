import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// localStorage sécurisé pour mobile
const safeGetItem = (key, defaultValue) => {
  try {
    return localStorage.getItem(key) || defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

// Appliquer le thème sauvegardé au chargement
const savedTheme = safeGetItem('theme', 'blue');
document.documentElement.setAttribute('data-theme', savedTheme);

// Appliquer le mode sombre
const savedDarkMode = safeGetItem('darkMode', 'false') === 'true';
if (savedDarkMode) {
  document.documentElement.classList.add('dark');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)