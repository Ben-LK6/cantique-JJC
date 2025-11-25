import { getRandomVerset } from '../data/versetsTranslations';

// Générer une exhortation et prière basée sur le verset du jour
export const getDailyDevotional = () => {
  const verset = getRandomVerset();
  
  const devotionals = {
    espoir: {
      exhortation: "Bien-aimés, dans les moments difficiles de la vie, souvenons-nous que notre espoir ne repose pas sur les circonstances, mais sur les promesses fidèles de Dieu. Il est notre refuge et notre force, un secours qui ne manque jamais dans la détresse.",
      priere: "Père céleste, merci pour ton amour inébranlable et tes promesses fidèles. Dans les épreuves, aide-nous à garder les yeux fixés sur toi. Fortifie notre foi et remplis nos cœurs de ton espoir éternel. Au nom de Jésus, Amen."
    },
    amour: {
      exhortation: "L'amour de Dieu pour nous est inconditionnel et éternel. Il nous aime non pas à cause de ce que nous faisons, mais à cause de qui nous sommes : ses enfants bien-aimés. Cet amour doit transformer notre cœur et nos relations avec les autres.",
      priere: "Seigneur, merci pour ton amour parfait qui chasse toute crainte. Aide-nous à aimer comme tu nous as aimés, avec patience, bonté et pardon. Que ton amour déborde de nos cœurs vers ceux qui nous entourent. Amen."
    },
    paix: {
      exhortation: "La paix que Dieu nous donne n'est pas comme celle du monde. Elle demeure même au milieu des tempêtes de la vie. Cette paix vient de la confiance en sa souveraineté et en sa bonté envers nous.",
      priere: "Prince de la paix, calme les tempêtes de nos cœurs et donne-nous ta paix qui surpasse toute intelligence. Aide-nous à être des artisans de paix dans notre famille, notre communauté et notre monde. Amen."
    },
    foi: {
      exhortation: "La foi n'est pas l'absence de doutes, mais la confiance en Dieu malgré les incertitudes. Elle nous permet de voir au-delà des circonstances présentes et de nous appuyer sur les promesses éternelles de Dieu.",
      priere: "Père, augmente notre foi. Quand nous doutons, rappelle-nous ta fidélité. Quand nous vacillons, affermis nos pas. Aide-nous à marcher par la foi et non par la vue. Au nom de Jésus, Amen."
    },
    joie: {
      exhortation: "La joie chrétienne n'est pas un sentiment passager, mais une réalité profonde qui vient de notre relation avec Dieu. Elle peut coexister avec la tristesse et briller même dans l'obscurité.",
      priere: "Dieu de toute consolation, merci pour la joie que tu places dans nos cœurs. Même dans les moments difficiles, aide-nous à nous réjouir en toi. Que ta joie soit notre force aujourd'hui. Amen."
    }
  };

  // Sélectionner une exhortation basée sur le thème du verset
  const devotional = devotionals[verset.theme] || devotionals.espoir;

  return {
    verset,
    exhortation: devotional.exhortation,
    priere: devotional.priere,
    date: new Date().toLocaleDateString('fr-FR', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  };
};