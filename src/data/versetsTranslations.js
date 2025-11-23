// Système de traductions pour les versets du jour
export const versetsTranslations = {
  fr: [
    {
      id: 1,
      texte: "Louez l'Eternel ! Chantez à l'Eternel un cantique nouveau ! Chantez ses louanges dans l'assemblée des fidèles !",
      reference: "Psaumes 149:1",
      theme: "louange"
    },
    {
      id: 2,
      texte: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.",
      reference: "Jean 3:16",
      theme: "amour"
    },
    {
      id: 3,
      texte: "Je puis tout par celui qui me fortifie.",
      reference: "Philippiens 4:13",
      theme: "force"
    },
    {
      id: 4,
      texte: "L'Éternel est mon berger : je ne manquerai de rien.",
      reference: "Psaumes 23:1",
      theme: "confiance"
    },
    {
      id: 5,
      texte: "Remets ton sort à l'Éternel, et il te soutiendra, Il ne laissera jamais chanceler le juste.",
      reference: "Psaumes 55:22",
      theme: "confiance"
    },
    {
      id: 6,
      texte: "Réjouissez-vous toujours dans le Seigneur ; je le répète, réjouissez-vous.",
      reference: "Philippiens 4:4",
      theme: "joie"
    },
    {
      id: 7,
      texte: "Que votre cœur ne se trouble point. Croyez en Dieu, et croyez en moi.",
      reference: "Jean 14:1",
      theme: "paix"
    },
    {
      id: 8,
      texte: "Cherchez premièrement le royaume et la justice de Dieu ; et toutes ces choses vous seront données par-dessus.",
      reference: "Matthieu 6:33",
      theme: "priorités"
    },
    {
      id: 9,
      texte: "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.",
      reference: "Matthieu 11:28",
      theme: "repos"
    },
    {
      id: 10,
      texte: "Ne crains rien, car je suis avec toi ; Ne promène pas des regards inquiets, car je suis ton Dieu.",
      reference: "Ésaïe 41:10",
      theme: "courage"
    }
  ],
  
  en: [
    {
      id: 1,
      texte: "Praise the Lord! Sing to the Lord a new song! Sing His praises in the assembly of the faithful!",
      reference: "Psalm 149:1",
      theme: "praise"
    },
    {
      id: 2,
      texte: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
      reference: "John 3:16",
      theme: "love"
    },
    {
      id: 3,
      texte: "I can do all things through Christ who strengthens me.",
      reference: "Philippians 4:13",
      theme: "strength"
    },
    {
      id: 4,
      texte: "The Lord is my shepherd, I lack nothing.",
      reference: "Psalm 23:1",
      theme: "trust"
    },
    {
      id: 5,
      texte: "Cast your cares on the Lord and he will sustain you; he will never let the righteous be shaken.",
      reference: "Psalm 55:22",
      theme: "trust"
    },
    {
      id: 6,
      texte: "Rejoice in the Lord always. I will say it again: Rejoice!",
      reference: "Philippians 4:4",
      theme: "joy"
    },
    {
      id: 7,
      texte: "Do not let your hearts be troubled. You believe in God; believe also in me.",
      reference: "John 14:1",
      theme: "peace"
    },
    {
      id: 8,
      texte: "But seek first his kingdom and his righteousness, and all these things will be given to you as well.",
      reference: "Matthew 6:33",
      theme: "priorities"
    },
    {
      id: 9,
      texte: "Come to me, all you who are weary and burdened, and I will give you rest.",
      reference: "Matthew 11:28",
      theme: "rest"
    },
    {
      id: 10,
      texte: "Do not fear, for I am with you; do not be dismayed, for I am your God.",
      reference: "Isaiah 41:10",
      theme: "courage"
    }
  ]
};

// Fonction pour obtenir le verset du jour (basé sur la date)
export const getRandomVerset = () => {
  const language = localStorage.getItem('language') || 'fr';
  const versets = versetsTranslations[language] || versetsTranslations.fr;
  
  // Utiliser la date du jour comme seed pour avoir le même verset toute la journée
  const today = new Date();
  const dateString = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  
  // Créer un hash simple de la date pour obtenir un index
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convertir en 32bit integer
  }
  
  // Utiliser le hash pour obtenir un index dans la plage des versets
  const index = Math.abs(hash) % versets.length;
  return versets[index];
};

// Fonction pour forcer un nouveau verset (bouton refresh)
export const getNewRandomVerset = () => {
  const language = localStorage.getItem('language') || 'fr';
  const versets = versetsTranslations[language] || versetsTranslations.fr;
  const randomIndex = Math.floor(Math.random() * versets.length);
  return versets[randomIndex];
};

// Fonction pour obtenir la couleur du thème (mise à jour avec les thèmes anglais)
export const getThemeColor = (theme) => {
  const colors = {
    // Français
    louange: 'from-purple-500 to-purple-600',
    amour: 'from-red-500 to-pink-600',
    force: 'from-orange-500 to-red-600',
    confiance: 'from-blue-500 to-blue-600',
    joie: 'from-yellow-500 to-orange-500',
    paix: 'from-green-500 to-teal-600',
    priorités: 'from-indigo-500 to-purple-600',
    
    // Français (ajouts)
    repos: 'from-cyan-500 to-blue-500',
    courage: 'from-amber-500 to-orange-600',
    
    // Anglais
    praise: 'from-purple-500 to-purple-600',
    love: 'from-red-500 to-pink-600',
    strength: 'from-orange-500 to-red-600',
    trust: 'from-blue-500 to-blue-600',
    joy: 'from-yellow-500 to-orange-500',
    peace: 'from-green-500 to-teal-600',
    priorities: 'from-indigo-500 to-purple-600',
    rest: 'from-cyan-500 to-blue-500',
    courage: 'from-amber-500 to-orange-600'
  };
  return colors[theme] || 'from-blue-500 to-blue-600';
};