// Collection de versets bibliques pour le verset du jour
export const versets = [
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
    texte: "Voici, je me tiens à la porte, et je frappe. Si quelqu'un entend ma voix et ouvre la porte, j'entrerai chez lui.",
    reference: "Apocalypse 3:20",
    theme: "invitation"
  },
  {
    id: 10,
    texte: "Il n'y a de salut en aucun autre ; car il n'y a sous le ciel aucun autre nom qui ait été donné parmi les hommes, par lequel nous devions être sauvés.",
    reference: "Actes 4:12",
    theme: "salut"
  },
  {
    id: 11,
    texte: "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos.",
    reference: "Matthieu 11:28",
    theme: "repos"
  },
  {
    id: 12,
    texte: "Car mes pensées ne sont pas vos pensées, Et vos voies ne sont pas mes voies, Dit l'Éternel.",
    reference: "Ésaïe 55:8",
    theme: "sagesse"
  },
  {
    id: 13,
    texte: "Tout ce que vous demanderez avec foi par la prière, vous le recevrez.",
    reference: "Matthieu 21:22",
    theme: "prière"
  },
  {
    id: 14,
    texte: "L'Éternel combattra pour vous ; et vous, gardez le silence.",
    reference: "Exode 14:14",
    theme: "combat"
  },
  {
    id: 15,
    texte: "Ne crains rien, car je suis avec toi ; Ne promène pas des regards inquiets, car je suis ton Dieu.",
    reference: "Ésaïe 41:10",
    theme: "courage"
  },
  {
    id: 16,
    texte: "Celui qui demeure sous l'abri du Très-Haut Repose à l'ombre du Tout-Puissant.",
    reference: "Psaumes 91:1",
    theme: "protection"
  },
  {
    id: 17,
    texte: "Rendez grâces en toutes choses, car c'est à votre égard la volonté de Dieu en Jésus-Christ.",
    reference: "1 Thessaloniciens 5:18",
    theme: "reconnaissance"
  },
  {
    id: 18,
    texte: "Si nous confessons nos péchés, il est fidèle et juste pour nous les pardonner, et pour nous purifier de toute iniquité.",
    reference: "1 Jean 1:9",
    theme: "pardon"
  },
  {
    id: 19,
    texte: "Approchez-vous de Dieu, et il s'approchera de vous.",
    reference: "Jacques 4:8",
    theme: "proximité"
  },
  {
    id: 20,
    texte: "Car l'Éternel, ton Dieu, est au milieu de toi, comme un héros qui sauve ; Il fera de toi sa plus grande joie.",
    reference: "Sophonie 3:17",
    theme: "joie"
  }
];

// Fonction pour obtenir un verset aléatoire
export const getRandomVerset = () => {
  const randomIndex = Math.floor(Math.random() * versets.length);
  return versets[randomIndex];
};

// Fonction pour obtenir la couleur du thème
export const getThemeColor = (theme) => {
  const colors = {
    louange: 'from-purple-500 to-purple-600',
    amour: 'from-red-500 to-pink-600',
    force: 'from-orange-500 to-red-600',
    confiance: 'from-blue-500 to-blue-600',
    joie: 'from-yellow-500 to-orange-500',
    paix: 'from-green-500 to-teal-600',
    priorités: 'from-indigo-500 to-purple-600',
    invitation: 'from-pink-500 to-rose-600',
    salut: 'from-emerald-500 to-green-600',
    repos: 'from-cyan-500 to-blue-500',
    sagesse: 'from-violet-500 to-purple-600',
    prière: 'from-blue-600 to-indigo-600',
    combat: 'from-red-600 to-orange-600',
    courage: 'from-amber-500 to-orange-600',
    protection: 'from-teal-500 to-cyan-600',
    reconnaissance: 'from-lime-500 to-green-500',
    pardon: 'from-rose-500 to-pink-600',
    proximité: 'from-sky-500 to-blue-500'
  };
  return colors[theme] || 'from-blue-500 to-blue-600';
};