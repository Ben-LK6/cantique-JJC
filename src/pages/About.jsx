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
            <p style={{ color: 'var(--color-primary-100)' }}>Application officielle de cantiques</p>
            <p style={{ color: 'var(--color-primary-200)' }} className="text-sm mt-2">Version 2.0.0 - Édition Complète</p>
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
              Application moderne de cantiques pour l'église JJC, conçue pour enrichir votre expérience de louange et de prière avec des fonctionnalités avancées.
            </p>
            <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
              <p className="text-primary-800 dark:text-primary-300 font-medium mb-2">Fonctionnalités disponibles :</p>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li>✓ 275 cantiques en Goun et Yoruba</li>
                <li>✓ Recherche instantanée par numéro ou titre</li>
                <li>✓ Filtrage par catégories thématiques</li>
                <li>✓ Transposition musicale (±6 demi-tons)</li>
                <li>✓ Lecture audio des tonalités</li>
                <li>✓ Défilement automatique des paroles</li>
                <li>✓ Système de favoris personnalisé</li>
                <li>✓ 7 thèmes de couleurs + mode sombre</li>
                <li>✓ Interface multilingue (Français/Anglais)</li>
                <li>✓ Partage de cantiques</li>
                <li>✓ Fonctionne 100% hors ligne</li>
                <li>✓ Prières quotidiennes</li>
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
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Programme du culte</h3>
            </div>
            <div 
              className="rounded-lg p-4 mb-4"
              style={{ backgroundColor: 'var(--color-primary-50)' }}
            >
              <h4 
                className="font-bold text-lg mb-3 flex items-center gap-2"
                style={{ color: 'var(--color-primary-800)' }}
              >
                <Church size={18} />
                Temple de Gankpodo
              </h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Clock size={16} style={{ color: 'var(--color-primary-600)' }} className="mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">Dimanche</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">8h30 - 9h30 : École de dimanche des enfants</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={16} style={{ color: 'var(--color-primary-600)' }} className="mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">Lundi</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">6h00 - 7h00 : Prière pour la semaine</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={16} style={{ color: 'var(--color-primary-600)' }} className="mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">Mardi</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">20h00 - 21h30 : Étude biblique</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock size={16} style={{ color: 'var(--color-primary-600)' }} className="mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">Vendredi</p>
                    <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                      <p><span className="font-medium">Premier vendredi :</span></p>
                      <p className="ml-4">• 10h00 - 18h00 : Jeûne et prière</p>
                      <p className="ml-4">• 00h00 - 05h00 : Prière de nuit</p>
                      <p><span className="font-medium">Autres vendredis :</span> Prière 20h00 - 21h30</p>
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
              "Que tout ce qui respire loue l'Éternel! Louez l'Éternel!"
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Psaume 150:6</p>
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