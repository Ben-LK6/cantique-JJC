import { Book, Search, Heart, Play, Share2, Download, Settings } from 'lucide-react';
import { t } from '../data/translations';

const Instructions = () => {
  const sections = [
    {
      icon: Book,
      title: t('howToUseCantiques'),
      steps: [
        t('step1Hymns'),
        t('step2Hymns'),
        t('step3Hymns'),
        t('step4Hymns'),
        t('step5Hymns')
      ]
    },
    {
      icon: Play,
      title: t('autoScroll'),
      steps: [
        t('step1AutoScroll'),
        t('step2AutoScroll'),
        t('step3AutoScroll'),
        t('step4AutoScroll'),
        t('step5AutoScroll')
      ]
    },
    {
      icon: Settings,
      title: t('transpositionAndAudio'),
      steps: [
        t('step1Transposition'),
        t('step2Transposition'),
        t('step3Transposition'),
        t('step4Transposition'),
        t('step5Transposition'),
        t('step6Transposition'),
        t('step7Transposition')
      ]
    },
    {
      icon: Heart,
      title: t('manageFavorites'),
      steps: [
        t('step1Favorites'),
        t('step2Favorites'),
        t('step3Favorites'),
        t('step4Favorites'),
        t('step5Favorites')
      ]
    },
    {
      icon: Share2,
      title: t('shareCantique'),
      steps: [
        t('step1Share'),
        t('step2Share'),
        t('step3Share'),
        t('step4Share')
      ]
    },
    {
      icon: Settings,
      title: t('customizeApp'),
      steps: [
        t('step1Customize'),
        t('step2Customize'),
        t('step3Customize'),
        t('step4Customize'),
        t('step5Customize'),
        t('step6Customize')
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
                <span>{t('offlineWorks')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: 'var(--color-primary-600)' }} className="mt-1">✓</span>
                <span>{t('hymnsAvailable')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: 'var(--color-primary-600)' }} className="mt-1">✓</span>
                <span>{t('advancedTransposition')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: 'var(--color-primary-600)' }} className="mt-1">✓</span>
                <span>{t('audioPlayback')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: 'var(--color-primary-600)' }} className="mt-1">✓</span>
                <span>{t('colorThemes')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: 'var(--color-primary-600)' }} className="mt-1">✓</span>
                <span>{t('smartSearch')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: 'var(--color-primary-600)' }} className="mt-1">✓</span>
                <span>{t('autoScrollSmart')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: 'var(--color-primary-600)' }} className="mt-1">✓</span>
                <span>{t('favoritesSystem')}</span>
              </li>
              <li className="flex items-start gap-3">
                <span style={{ color: 'var(--color-primary-600)' }} className="mt-1">✓</span>
                <span>{t('responsiveInterface')}</span>
              </li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">❓ {t('frequentQuestions')}</h3>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-800 dark:text-white mb-1">
                  {t('needsInternet')}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('needsInternetAnswer')}
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-white mb-1">
                  {t('changeLanguage')}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('changeLanguageAnswer')}
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-white mb-1">
                  {t('useTransposition')}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('useTranspositionAnswer')}
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-white mb-1">
                  {t('howManyHymns')}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('howManyHymnsAnswer')}
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-800 dark:text-white mb-1">
                  {t('useInWorship')}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('useInWorshipAnswer')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm text-center">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{t('needHelp')}</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t('helpText')}
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