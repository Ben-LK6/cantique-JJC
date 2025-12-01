import { getRandomVerset } from '../data/versetsTranslations';

// Générer une exhortation et prière basée sur le verset du jour
export const getDailyDevotional = () => {
  const verset = getRandomVerset();
  
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
    },
    
    // Thèmes anglais (traductions)
    praise: {
      exhortation: "Praise is not just an expression of gratitude, it's an act of faith that proclaims God's greatness. When we praise, we lift our hearts above circumstances and connect to God's eternal joy.",
      priere: "Lord, may our hearts overflow with praise for your goodness. Help us to praise you not only in good times, but also in trials. May our entire life be a song of praise to your glory. Amen."
    },
    love: {
      exhortation: "God's love for us is unconditional and eternal. He loves us not because of what we do, but because of who we are: his beloved children. This love must transform our hearts and our relationships with others.",
      priere: "Lord, thank you for your perfect love that casts out all fear. Help us to love as you have loved us, with patience, kindness and forgiveness. May your love overflow from our hearts to those around us. Amen."
    },
    strength: {
      exhortation: "Our strength doesn't come from our own abilities, but from Christ who strengthens us. In our weaknesses, his power is made perfect. Let us lean on him in every challenge of life.",
      priere: "Almighty God, in my weaknesses, be my strength. When I am discouraged, lift me up. When I doubt my abilities, remind me that I can do all things through Christ who strengthens me. Amen."
    },
    trust: {
      exhortation: "Trust in God is not an emotion, it's a deliberate choice to rely on his faithfulness. Even when we don't understand his ways, we can trust in his perfect character and his love for us.",
      priere: "Heavenly Father, help me to trust you with all my heart. When paths are uncertain, may your Word be my light. Teach me to lean on you and not on my own understanding. Amen."
    },
    joy: {
      exhortation: "Christian joy is not a fleeting feeling, but a deep reality that comes from our relationship with God. It can coexist with sadness and shine even in darkness.",
      priere: "God of all comfort, thank you for the joy you place in our hearts. Even in difficult times, help us to rejoice in you. May your joy be our strength today. Amen."
    },
    peace: {
      exhortation: "The peace that God gives us is not like that of the world. It remains even in the midst of life's storms. This peace comes from trusting in his sovereignty and his goodness toward us.",
      priere: "Prince of peace, calm the storms in our hearts and give us your peace that surpasses all understanding. Help us to be peacemakers in our family, our community and our world. Amen."
    },
    priorities: {
      exhortation: "In a world that pulls us in all directions, God calls us to establish clear priorities. Seeking first his kingdom means aligning our values, decisions and actions with his will.",
      priere: "Lord, help me to order my life according to your priorities. May I seek first your kingdom and your righteousness. Guide my daily choices so they reflect your heart and your will. Amen."
    },
    rest: {
      exhortation: "The rest that Jesus offers is not just physical, it's rest for the soul. He invites us to lay down our burdens, our worries and our efforts to earn his love. In him, we find true peace.",
      priere: "Jesus, thank you for inviting me to come to you with all my burdens. Teach me to rest in you, to trust in your grace and to find in you the rest my soul needs. Amen."
    },
    courage: {
      exhortation: "Christian courage doesn't come from the absence of fear, but from God's presence with us. When he says 'do not fear', it's because he promises to be by our side in every trial.",
      priere: "Faithful God, when fear overwhelms me, remind me of your constant presence. Give me courage to do what is right, to witness to your goodness and to walk in your ways. Amen."
    }
  };

  // Sélectionner une exhortation basée sur le thème exact du verset
  const devotional = devotionals[verset.theme] || devotionals.confiance;

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