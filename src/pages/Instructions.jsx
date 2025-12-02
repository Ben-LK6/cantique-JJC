import { Book, Search, Heart, Play, Share2, Download, Settings, MapPin } from 'lucide-react';
import { t } from '../data/translations';

const Instructions = () => {
  const sections = [
    {
      icon: Book,
      title: "Comment utiliser les Cantiques",
      steps: [
        "Cliquez sur 'Cantiques' dans le menu principal",
        "Utilisez la barre de recherche pour trouver un cantique par numéro ou titre",
        "Filtrez par thème (Louange, Adoration, etc.)",
        "Cliquez sur un cantique pour l'ouvrir et voir les paroles complètes"
      ]
    },
    {
      icon: Play,
      title: "Défilement Automatique",
      steps: [
        "Ouvrez un cantique",
        "Cliquez sur le bouton 'Défilement auto' en haut",
        "Les paroles défileront automatiquement",
        "Cliquez sur 'Pause' pour arrêter le défilement",
        "Vous pouvez ajuster la vitesse dans les paramètres"
      ]
    },
    {
      icon: Heart,
      title: "Gérer vos Favoris",
      steps: [
        "Ouvrez un cantique ou une prière",
        "Cliquez sur l'icône ❤️ en haut à droite",
        "Le cantique/prière sera ajouté à vos favoris",
        "Accédez à vos favoris via le menu 'Favoris'",
        "Cliquez à nouveau sur ❤️ pour retirer des favoris"
      ]
    },
    {
      icon: Share2,
      title: "Partager un Cantique",
      steps: [
        "Ouvrez le cantique que vous souhaitez partager",
        "Cliquez sur le bouton 'Partager'",
        "Choisissez l'application (WhatsApp, Facebook, etc.)",
        "Le cantique sera partagé avec vos contacts"
      ]
    },
    {
      icon: Download,
      title: "Télécharger en PDF",
      steps: [
        "Ouvrez un cantique",
        "Cliquez sur le bouton 'PDF'",
        "Le cantique sera téléchargé en format PDF",
        "Vous pourrez l'imprimer ou le sauvegarder"
      ]
    },
    {
      icon: MapPin,
      title: "Trouver une Église",
      steps: [
        "Cliquez sur 'Trouver une église' dans le menu",
        "Utilisez la recherche pour filtrer par ville",
        "Consultez les adresses et horaires des cultes",
        "Cliquez sur 'Itinéraire' pour ouvrir Google Maps",
        "Cliquez sur 'Appeler' pour contacter l'église"
      ]
    },
    {
      icon: Settings,
      title: "Personnaliser l'Application",
      steps: [
        "Allez dans 'Paramètres' via le menu",
        "Choisissez votre couleur préférée",
        "Activez/Désactivez le mode sombre",
        "Ajustez la taille de la police",
        "Changez la langue de l'application",
        "Activez/Désactivez le son de tonalité"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">


      <div className="p-4 lg:p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          
          <div 
            className="rounded-2xl p-8 text-white"
            style={{
              background: 'linear-gradient(to right, var(--color-primary-600), var(--color-primary-800))'
            }}
          >
            <h1 className="text-2xl lg:text-3xl font-bold mb-3">
              {t('userGuide')}
            </h1>
            <p style={{ color: 'var(--color-primary-100)' }}>
              {t('discoverFeatures')}
            </p>
          </div>

          {sections.map((section, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'var(--color-primary-100)' }}
                >
                  <section.icon style={{ color: 'var(--color-primary-700)' }} size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">{section.title}</h3>
              </div>
              <ol className="space-y-2 ml-4">
                {section.steps.map((step, stepIndex) => (
                  <li key={stepIndex} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                    <span 
                      className="flex-shrink-0 w-6 h-6 text-white rounded-full flex items-center justify-center text-sm font-semibold"
                      style={{ backgroundColor: 'var(--color-primary-600)' }}
                    >
                      {stepIndex + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}

          <div 
            className="rounded-xl p-6"
            style={{ backgroundColor: 'var(--color-primary-50)' }}
          >
            <h3 
              className="text-lg font-bold mb-4"
              style={{ color: 'var(--color-primary-800)' }}
            >💡 {t('tipsAndTricks')}</h3>
            <ul 
              className="space-y-3"
              style={{ color: 'var(--color-primary-700)' }}
            >
              <li className="flex items-start gap-3">
                <span style={{ color: 'var(--color-primary-600)' }} className="mt-1">✓</span>
                <span>L'application fonctionne hors ligne ! Téléchargez-la une fois et utilisez-la partout.</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: 'var(--color-primary-600)' }} className="mt-1">✓</span>
                <span>Ajoutez vos cantiques favoris pour un accès rapide pendant les cultes.</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: 'var(--color-primary-600)' }} className="mt-1">✓</span>
                <span>Utilisez la recherche rapide en tapant le numéro du cantique directement.</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: 'var(--color-primary-600)' }} className="mt-1">✓</span>
                <span>Ajustez la taille de police pour une meilleure lisibilité selon vos besoins.</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: 'var(--color-primary-600)' }} className="mt-1">✓</span>
                <span>Partagez vos cantiques préférés avec vos frères et sœurs en Christ !</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">❓ {t('frequentQuestions')}</h3>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-800 dark:text-white mb-1">
                  L'application nécessite-t-elle internet ?
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Non ! Une fois téléchargée, l'application fonctionne entièrement hors ligne.
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-white mb-1">
                  Comment ajouter de nouveaux cantiques ?
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Les cantiques sont mis à jour régulièrement. Assurez-vous d'avoir la dernière version de l'application.
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-white mb-1">
                  Puis-je utiliser l'application pendant le culte ?
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Absolument ! C'est l'un des objectifs principaux de l'application. Mettez votre téléphone en mode silencieux.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm text-center">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{t('needHelp')}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Si vous avez des questions ou rencontrez des problèmes, n'hésitez pas à nous contacter.
            </p>
            <button 
              className="inline-block px-6 py-3 text-white rounded-lg transition-colors"
              style={{ backgroundColor: 'var(--color-primary-600)' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-primary-700)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-primary-600)'}
            >
              {t('contactSupport')}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Instructions;