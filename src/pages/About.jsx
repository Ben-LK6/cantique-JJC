import { Church, Users, Heart, Mail, Phone, Calendar, Clock } from 'lucide-react';
import { t } from '../data/translations';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">


      {/* Contenu */}
      <div className="p-4 lg:p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Logo et Nom */}
          <div 
            className="rounded-2xl p-8 text-white text-center"
            style={{
              background: 'linear-gradient(to right, var(--color-primary-600), var(--color-primary-800))'
            }}
          >
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
              <img src="/images/logo.jpeg" alt="JJC Logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-3xl font-bold mb-2">{t('appTitle')}</h1>
            <p style={{ color: 'var(--color-primary-100)' }}>{t('officialApp')}</p>
            <p style={{ color: 'var(--color-primary-200)' }} className="text-sm mt-2">{t('completeEdition')}</p>
          </div>

          {/* À propos de l'église */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Church className="text-primary-600" size={24} />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">{t('aboutJJC')}</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t('aboutJJCText')}
            </p>
          </div>

          {/* À propos de l'application */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="text-primary-600" size={24} />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">{t('ourMission')}</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              {t('modernApp')}
            </p>
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
              <p className="text-primary-800 dark:text-white font-medium mb-2">{t('featuresAvailable')}</p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-200">
                <li>✓ {t('feature275Hymns')}</li>
                <li>✓ {t('featureInstantSearch')}</li>
                <li>✓ {t('featureCategoryFilter')}</li>
                <li>✓ {t('featureTransposition')}</li>
                <li>✓ {t('featureAudioPlayback')}</li>
                <li>✓ {t('featureAutoScroll')}</li>
                <li>✓ {t('featureFavorites')}</li>
                <li>✓ {t('featureThemes')}</li>
                <li>✓ {t('featureMultilingual')}</li>
                <li>✓ {t('featureSharing')}</li>
                <li>✓ {t('featureOffline')}</li>
                <li>✓ {t('featurePrayers')}</li>
              </ul>
            </div>
          </div>

          {/* Créateurs */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Users className="text-primary-600" size={24} />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">{t('creators')}</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">B</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">{t('mainDeveloper')}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{t('designDevelopment')}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Développée avec React 19, Vite, Tailwind CSS et Framer Motion. Optimisée pour mobile et desktop avec support PWA complet.
              </p>
            </div>
          </div>

          {/* Programme du culte */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="text-primary-600" size={24} />
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">{t('worshipSchedule')}</h3>
            </div>
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4 mb-4">
              <h4 className="font-bold text-lg mb-3 flex items-center gap-2 text-primary-800 dark:text-primary-200">
                <Church size={18} />
                {t('gankpodoTemple')}
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Clock size={16} className="mt-1 flex-shrink-0 text-primary-600 dark:text-primary-400" />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{t('sunday')}</p>
                    <div className="text-sm text-gray-600 dark:text-gray-200 space-y-1">
                      <p>{t('sundaySchool')}</p>
                      <p>{t('sundayWorship')}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={16} className="mt-1 flex-shrink-0 text-primary-600 dark:text-primary-400" />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{t('mondayPrayer')}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-200">{t('mondayPrayerTime')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={16} className="mt-1 flex-shrink-0 text-primary-600 dark:text-primary-400" />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{t('tuesdayStudy')}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-200">{t('tuesdayBibleStudy')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={16} className="mt-1 flex-shrink-0 text-primary-600 dark:text-primary-400" />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{t('fridaySpecial')}</p>
                    <div className="text-sm text-gray-600 dark:text-gray-200 space-y-1">
                      <p><span className="font-medium">{t('firstFriday')}</span></p>
                      <p className="ml-4">{t('fastingPrayer')}</p>
                      <p className="ml-4">{t('nightPrayer')}</p>
                      <p><span className="font-medium">{t('otherFridays')}</span></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">{t('contactSupport')}</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-gray-400 dark:text-gray-500" />
                <a href="mailto:contact@jjc.org" className="text-primary-600 dark:text-primary-400 hover:underline">
                  contact@jjc.org
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-gray-400 dark:text-gray-500" />
                <a href="tel:+229XXXXXXXX" className="text-primary-600 dark:text-primary-400 hover:underline">
                  +229 XX XX XX XX
                </a>
              </div>
            </div>
          </div>

          {/* Verset */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border-l-4 border-primary-600">
            <p className="text-gray-800 dark:text-gray-200 text-lg italic mb-2">
              "{t('bibleVerse')}"
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{t('psalm150')}</p>
          </div>

          {/* Copyright */}
          <div className="text-center py-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {t('copyright')}
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">
              {t('madeWith')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;