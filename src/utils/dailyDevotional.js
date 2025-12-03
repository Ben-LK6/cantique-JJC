import { getRandomVerset } from '../data/versetsTranslations';

// Générer une exhortation et prière basée sur le verset du jour
export const getDailyDevotional = () => {
  const verset = getRandomVerset();
  const language = localStorage.getItem('language') || 'fr';
  
  const devotionals = {
    // Thèmes français
    louange: {
      exhortation: "La louange n'est pas seulement une expression de gratitude, c'est un acte de foi qui proclame la grandeur de Dieu. Quand nous louons, nous élevons nos cœurs au-dessus des circonstances et nous nous connectons à la joie éternelle de Dieu.",
      priere: "Seigneur, que nos cœurs débordent de louanges pour ta bonté. Aide-nous à te louer non seulement dans les bons moments, mais aussi dans les épreuves. Que notre vie entière soit un cantique de louange à ta gloire. Amen."
    },
    amour: {
      exhortation: "L'amour de Dieu pour nous est inconditionnel et éternel. Il nous aime non pas à cause de ce que nous faisons, mais à cause de qui nous sommes : ses enfants bien-aimés. Cet amour doit transformer notre cœur et nos relations avec les autres.",
      priere: "Seigneur, merci pour ton amour parfait qui chasse toute crainte. Aide-nous à aimer comme tu nous as aimés, avec patience, bonté et pardon. Que ton amour déborde de nos cœurs vers ceux qui nous entourent. Amen."
    },
    force: {
      exhortation: "Notre force ne vient pas de nos propres capacités, mais de Christ qui nous fortifie. Dans nos faiblesses, sa puissance se manifeste parfaitement. Appuyons-nous sur lui dans chaque défi de la vie.",
      priere: "Dieu tout-puissant, dans mes faiblesses, sois ma force. Quand je suis découragé, relève-moi. Quand je doute de mes capacités, rappelle-moi que je peux tout par Christ qui me fortifie. Amen."
    },
    confiance: {
      exhortation: "La confiance en Dieu n'est pas une émotion, c'est un choix délibéré de s'appuyer sur sa fidélité. Même quand nous ne comprenons pas ses voies, nous pouvons avoir confiance en son caractère parfait et en son amour pour nous.",
      priere: "Père céleste, aide-moi à te faire confiance de tout mon cœur. Quand les chemins sont incertains, que ta Parole soit ma lumière. Enseigne-moi à m'appuyer sur toi et non sur ma propre intelligence. Amen."
    },
    joie: {
      exhortation: "La joie chrétienne n'est pas un sentiment passager, mais une réalité profonde qui vient de notre relation avec Dieu. Elle peut coexister avec la tristesse et briller même dans l'obscurité.",
      priere: "Dieu de toute consolation, merci pour la joie que tu places dans nos cœurs. Même dans les moments difficiles, aide-nous à nous réjouir en toi. Que ta joie soit notre force aujourd'hui. Amen."
    },
    paix: {
      exhortation: "La paix que Dieu nous donne n'est pas comme celle du monde. Elle demeure même au milieu des tempêtes de la vie. Cette paix vient de la confiance en sa souveraineté et en sa bonté envers nous.",
      priere: "Prince de la paix, calme les tempêtes de nos cœurs et donne-nous ta paix qui surpasse toute intelligence. Aide-nous à être des artisans de paix dans notre famille, notre communauté et notre monde. Amen."
    },
    priorités: {
      exhortation: "Dans un monde qui nous tire dans toutes les directions, Dieu nous appelle à établir des priorités claires. Chercher d'abord son royaume signifie aligner nos valeurs, nos décisions et nos actions sur sa volonté.",
      priere: "Seigneur, aide-moi à ordonner ma vie selon tes priorités. Que je cherche d'abord ton royaume et ta justice. Guide mes choix quotidiens pour qu'ils reflètent ton cœur et ta volonté. Amen."
    },
    repos: {
      exhortation: "Le repos que Jésus offre n'est pas seulement physique, c'est un repos de l'âme. Il nous invite à déposer nos fardeaux, nos inquiétudes et nos efforts pour gagner son amour. En lui, nous trouvons la paix véritable.",
      priere: "Jésus, merci de m'inviter à venir à toi avec tous mes fardeaux. Apprends-moi à me reposer en toi, à faire confiance à ta grâce et à trouver en toi le repos dont mon âme a besoin. Amen."
    },
    courage: {
      exhortation: "Le courage chrétien ne vient pas de l'absence de peur, mais de la présence de Dieu avec nous. Quand il dit 'ne crains rien', c'est parce qu'il promet d'être à nos côtés dans chaque épreuve.",
      priere: "Dieu fidèle, quand la peur m'envahit, rappelle-moi ta présence constante. Donne-moi le courage de faire ce qui est juste, de témoigner de ta bonté et de marcher dans tes voies. Amen."
    }
  };

  // Mapper les thèmes anglais vers français si nécessaire
  const themeMapping = {
    'praise': 'louange',
    'love': 'amour', 
    'strength': 'force',
    'trust': 'confiance',
    'joy': 'joie',
    'peace': 'paix',
    'priorities': 'priorités',
    'rest': 'repos',
    'courage': 'courage'
  };
  
  // Utiliser le thème français ou mapper depuis l'anglais
  const frenchTheme = language === 'fr' ? verset.theme : (themeMapping[verset.theme] || 'confiance');
  
  // Sélectionner toujours une exhortation française
  const devotional = devotionals[frenchTheme] || devotionals.confiance;

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