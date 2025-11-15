// Cache pour éviter de recharger les mêmes fichiers
const cache = {
  cantiques: null,
  prieres: null
};

// Utilitaire pour charger les cantiques depuis les fichiers texte
export const loadCantique = async (numero) => {
  try {
    const response = await fetch(`/cantiques/${numero.padStart(3, '0')}.txt`);
    if (!response.ok) {
      throw new Error(`Cantique ${numero} non trouvé`);
    }
    
    const text = await response.text();
    return parseCantique(text, numero);
  } catch (error) {
    console.error('Erreur chargement cantique:', error);
    return null;
  }
};

// Parser le contenu du fichier texte
const parseCantique = (text, numero) => {
  const lines = text.split('\n');
  const metadata = {};
  const paroles = [];
  
  let isParoles = false;
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    if (trimmed === '---') {
      isParoles = true;
      continue;
    }
    
    if (!isParoles) {
      // Parser les métadonnées
      if (trimmed.includes(':')) {
        const [key, value] = trimmed.split(':').map(s => s.trim());
        metadata[key.toLowerCase()] = value;
      }
    } else {
      // Ajouter les paroles (ignorer les lignes vides)
      if (trimmed) {
        paroles.push(trimmed);
      }
    }
  }
  
  return {
    id: parseInt(numero),
    numero: numero.padStart(3, '0'),
    titre: metadata.titre || 'Sans titre',
    categorie: metadata.categorie || 'Hokọnamẹ',
    langue: 'fr',
    paroles,
    tonalite: {
      note: metadata.tonalite || 'C',
      audioFile: `/audio/tonalite-${metadata.tonalite || 'C'}.mp3`
    }
  };
};

// Charger la liste des cantiques disponibles
export const loadCantiquesList = async () => {
  const cantiques = [];
  
  // Essayer de charger les cantiques de 001 à 100
  for (let i = 1; i <= 100; i++) {
    const numero = i.toString().padStart(3, '0');
    const cantique = await loadCantique(numero);
    
    if (cantique) {
      cantiques.push(cantique);
    }
  }
  
  return cantiques;
};

// Charger une prière depuis un fichier texte
export const loadPriere = async (numero) => {
  try {
    const response = await fetch(`/prieres/${numero.padStart(3, '0')}.txt`);
    if (!response.ok) {
      throw new Error(`Prière ${numero} non trouvée`);
    }
    
    const text = await response.text();
    return parsePriere(text, numero);
  } catch (error) {
    console.error('Erreur chargement prière:', error);
    return null;
  }
};

// Parser le contenu du fichier prière
const parsePriere = (text, numero) => {
  const lines = text.split('\n');
  const metadata = {};
  const contenu = [];
  
  let isContenu = false;
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    if (trimmed === '---') {
      isContenu = true;
      continue;
    }
    
    if (!isContenu) {
      if (trimmed.includes(':')) {
        const [key, value] = trimmed.split(':').map(s => s.trim());
        metadata[key.toLowerCase()] = value;
      }
    } else {
      if (trimmed) {
        contenu.push(trimmed);
      }
    }
  }
  
  return {
    id: parseInt(numero),
    numero: numero.padStart(3, '0'),
    titre: metadata.titre || 'Sans titre',
    categorie: metadata.categorie || 'Hokọnamẹ',
    contenu
  };
};

// Charger la liste des prières disponibles
export const loadPrieresList = async () => {
  const prieres = [];
  
  for (let i = 1; i <= 50; i++) {
    const numero = i.toString().padStart(3, '0');
    const priere = await loadPriere(numero);
    
    if (priere) {
      prieres.push(priere);
    }
  }
  
  return prieres;
};