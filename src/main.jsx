import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Appliquer le thème sauvegardé au chargement
const savedTheme = localStorage.getItem('theme') || 'blue';
document.documentElement.setAttribute('data-theme', savedTheme);

// Appliquer le mode sombre
const savedDarkMode = localStorage.getItem('darkMode') === 'true';
if (savedDarkMode) {
  document.documentElement.classList.add('dark');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)