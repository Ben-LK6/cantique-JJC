// Système de traductions pour les prières
export const prayersTranslations = {
  fr: [
    {
      id: 1,
      titre: "Prière du matin",
      categorie: "Matin",
      texte: "Seigneur, en ce nouveau jour que tu me donnes, je te rends grâce pour ta bonté et ta fidélité. Guide mes pas aujourd'hui, que mes paroles et mes actions te glorifient. Accorde-moi la sagesse pour faire face aux défis de ce jour. Au nom de Jésus, Amen."
    },
    {
      id: 2,
      titre: "Prière du soir",
      categorie: "Soir",
      texte: "Père céleste, je te remercie pour ce jour que tu m'as accordé. Pardonne-moi mes fautes et mes manquements. Protège ma famille et mes proches durant cette nuit. Que ton repos soit sur nous. Au nom de Jésus, Amen."
    },
    {
      id: 3,
      titre: "Prière d'action de grâces",
      categorie: "Action de grâces",
      texte: "Éternel Dieu, je t'offre mes louanges et mes actions de grâces. Merci pour ta grâce, ton amour et ta protection. Merci pour les bénédictions visibles et invisibles. Tu es digne de toute gloire. Au nom de Jésus, Amen."
    },
    {
      id: 4,
      titre: "Prière pour la famille",
      categorie: "Famille",
      texte: "Père céleste, je te confie ma famille. Bénis chacun de ses membres, protège-les et guide-les dans tes voies. Que ton amour règne dans notre foyer et que ta paix demeure parmi nous. Au nom de Jésus, Amen."
    },
    {
      id: 5,
      titre: "Prière pour la sagesse",
      categorie: "Sagesse",
      texte: "Seigneur, accorde-moi la sagesse pour prendre les bonnes décisions. Éclaire mon intelligence et guide mes pensées. Que je puisse discerner ta volonté et marcher selon tes voies. Au nom de Jésus, Amen."
    }
  ],
  
  en: [
    {
      id: 1,
      titre: "Morning Prayer",
      categorie: "Morning",
      texte: "Lord, on this new day that you give me, I thank you for your goodness and faithfulness. Guide my steps today, may my words and actions glorify you. Grant me wisdom to face the challenges of this day. In Jesus' name, Amen."
    },
    {
      id: 2,
      titre: "Evening Prayer",
      categorie: "Evening",
      texte: "Heavenly Father, I thank you for this day you have granted me. Forgive me my faults and shortcomings. Protect my family and loved ones during this night. May your rest be upon us. In Jesus' name, Amen."
    },
    {
      id: 3,
      titre: "Prayer of Thanksgiving",
      categorie: "Thanksgiving",
      texte: "Eternal God, I offer you my praise and thanksgiving. Thank you for your grace, your love and your protection. Thank you for the visible and invisible blessings. You are worthy of all glory. In Jesus' name, Amen."
    },
    {
      id: 4,
      titre: "Prayer for Family",
      categorie: "Family",
      texte: "Heavenly Father, I entrust my family to you. Bless each of its members, protect them and guide them in your ways. May your love reign in our home and may your peace dwell among us. In Jesus' name, Amen."
    },
    {
      id: 5,
      titre: "Prayer for Wisdom",
      categorie: "Wisdom",
      texte: "Lord, grant me wisdom to make the right decisions. Enlighten my understanding and guide my thoughts. May I discern your will and walk according to your ways. In Jesus' name, Amen."
    }
  ]
};

// Fonction pour obtenir les prières selon la langue
export const getPrayers = () => {
  const language = localStorage.getItem('language') || 'fr';
  return prayersTranslations[language] || prayersTranslations.fr;
};

// Fonction pour obtenir les catégories de prières selon la langue
export const getPrayerCategories = () => {
  const prayers = getPrayers();
  return [...new Set(prayers.map(prayer => prayer.categorie))];
};