import { ChevronUp, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { getCantiques, getCategories } from '../utils/cantiqueUtils';
import { categories as allCategories } from '../data/categoriesMapping';
import { getRandomVerset } from '../data/versetsTranslations';
import { t } from '../data/translations';

const Home = ({ onNavigate }) => {
  const [showCategories, setShowCategories] = useState(false);
  const [currentVerset, setCurrentVerset] = useState(null);
  const [cantiques, setCantiques] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const categoriesRef = useRef(null);

  // Charger un verset aléatoire au montage du composant
  useEffect(() => {
    setCurrentVerset(getRandomVerset());
    loadCantiques();
  }, []);

  // Fonction pour charger les cantiques selon la langue
  const loadCantiques = () => {
    const current = getCantiques();
    setCantiques(current);

    // Construire une liste de catégories avec comptes (emoji placeholder)
    try {
      // On récupère d'abord les catégories selon la logique existante
      let cats = getCategories() || [];
      // Si pour une raison la liste retournée est incomplète, utilise la liste complète
      if (Array.isArray(allCategories) && cats.length < allCategories.length) {
        cats = allCategories;
      }
      const list = cats.map((name) => {
        const count = current.filter((c) => c.categorie === name).length;
        return { name, count, emoji: '🎵' };
      });
      setCategoriesList(list);
    } catch (e) {
      setCategoriesList([]);
    }
  };

  const handleCategorieSelect = (name) => {
    setShowCategories(false);
    // Navigue vers la liste des cantiques en passant la catégorie sélectionnée
    if (onNavigate) onNavigate('cantiques', name);
  };

  // Close categories menu when clicking outside
  useEffect(() => {
    function handleOutside(e) {
      if (showCategories && categoriesRef.current && !categoriesRef.current.contains(e.target)) {
        setShowCategories(false);
      }
    }

    document.addEventListener('mousedown', handleOutside);
    document.addEventListener('touchstart', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      document.removeEventListener('touchstart', handleOutside);
    };
  }, [showCategories]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-pink-100 to-pink-200 flex flex-col items-center pb-20">
      {/* Logo */}
      <div className="mt-8 mb-2 relative">
        <div className="mx-auto flex items-center justify-center rounded-full shadow-md relative transition-transform scale-110">
          <img
            src="/images/logo.jpeg"
            alt="JJC Logo"
            className="object-cover rounded-full border-2 border-white shadow-md w-48 h-48"
          />
        </div>
      </div>

      {/* Titre */}
      <h1 className="text-2xl font-bold text-pink-700 mb-1 tracking-tight">Cantiques JJC</h1>

      {/* Actions principales: circular colored buttons with label inside, slightly lowered */}
      <div className="w-full max-w-sm mx-auto flex items-center justify-center gap-10 px-4 mb-6 mt-3">
        <button
          onClick={() => onNavigate && onNavigate('cantiques')}
          aria-label="Cantiques"
          className="flex flex-col items-center justify-center w-28 h-28 rounded-full bg-pink-50 border-2 border-pink-200 text-pink-700 shadow-lg transform translate-y-2 hover:translate-y-0 hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-200"
        >
          <span aria-hidden className="text-4xl">📖</span>
          <span className="text-sm font-bold mt-1">Cantiques</span>
        </button>

        <button
          onClick={() => onNavigate && onNavigate('favoris')}
          aria-label="Favoris"
          className="flex flex-col items-center justify-center w-28 h-28 rounded-full bg-pink-50 border-2 border-pink-200 text-pink-700 shadow-lg transform translate-y-2 hover:translate-y-0 hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-200"
        >
          <span aria-hidden className="text-4xl">❤️</span>
          <span className="text-sm font-bold mt-1">Favoris</span>
        </button>
      </div>

      {/* Categories control moved below the verse (rendered later) */}

      {/* Verset du jour — professional compact card */}
      {currentVerset && (
        <div className="w-full max-w-sm mx-auto bg-white/95 rounded-3xl shadow-xl ring-1 ring-pink-50 p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-1.5 h-10 rounded-full bg-pink-200 mt-1" />
            <div className="flex-1">
              <div className="text-center text-pink-700 text-lg italic font-semibold leading-relaxed mb-3">{currentVerset.texte}</div>
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span className="font-medium">— {currentVerset.reference}</span>
                <span className="bg-pink-100 text-pink-600 rounded-full px-2 py-0.5 text-xs">{currentVerset.theme}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Catégories: small pill selector shown after the verse */}
      <div className="w-full flex justify-center mb-8 mt-6">
        <div className="relative" ref={categoriesRef}>
          <button
            onClick={() => setShowCategories(!showCategories)}
            aria-expanded={showCategories}
            aria-label={t ? t('categories') : 'Catégories'}
            className="px-4 py-2 rounded-lg bg-white border border-pink-100 shadow-sm flex items-center gap-2 text-pink-700 hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-pink-200"
          >
            <span className="text-lg">🎶</span>
            <span className="text-sm font-semibold">{t ? t('categories') : 'Catégories'}</span>
            <span className="ml-2 text-pink-500">{showCategories ? <ChevronDown size={16} /> : <ChevronUp size={16} />}</span>
          </button>

          {showCategories && (
            <div
              className="mt-1 w-60 mx-auto bg-white rounded-2xl shadow-xl border border-pink-50 max-h-64 overflow-auto z-50 p-0 text-sm absolute left-1/2 transform -translate-x-1/2"
              style={{ bottom: 'calc(100% + 10px)' }}
            >
              <div className="divide-y divide-pink-50">
                {categoriesList.map((categorie, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCategorieSelect(categorie.name)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-pink-800 text-left hover:bg-pink-50 focus:bg-pink-50"
                  >
                    <div className="w-8 h-8 rounded-md bg-pink-50 flex items-center justify-center text-sm">{categorie.emoji}</div>
                    <div className="flex-1">
                      <div className="font-medium">{categorie.name}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{categorie.count} cantiques</div>
                    </div>
                    <div className="text-xs text-pink-400">›</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;