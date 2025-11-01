import { Church, Users, Heart, Mail, Phone } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">


      {/* Contenu */}
      <div className="p-4 lg:p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Logo et Nom */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white text-center">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary-600 font-bold text-4xl">JJC</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Cantique JJC</h1>
            <p className="text-primary-100">Application officielle de cantiques</p>
            <p className="text-primary-200 text-sm mt-2">Version 1.0.0</p>
          </div>

          {/* À propos de l'église */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Church className="text-primary-600" size={24} />
              <h3 className="text-xl font-bold text-gray-800">À propos de JJC</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              L'église JJC (Jésus-Christ Joie et Consolation) est une communauté chrétienne 
              dédiée à l'adoration de Dieu et au service du prochain. Nous croyons en la 
              puissance de la louange et de la prière pour transformer les vies et glorifier 
              le Seigneur.
            </p>
          </div>

          {/* À propos de l'application */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Heart className="text-primary-600" size={24} />
              <h3 className="text-xl font-bold text-gray-800">Notre Mission</h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Cette application a été créée pour faciliter l'accès aux cantiques de l'église JJC, 
              permettant à chacun de louer Dieu à tout moment et en tout lieu. Que vous soyez au 
              culte, à la maison ou en déplacement, accédez facilement à vos cantiques préférés.
            </p>
            <div className="bg-primary-50 rounded-lg p-4">
              <p className="text-primary-800 font-medium mb-2">Fonctionnalités :</p>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Accès hors ligne à tous les cantiques</li>
                <li>✓ Recherche facile par numéro ou titre</li>
                <li>✓ Défilement automatique des paroles</li>
                <li>✓ Tonalité de chaque cantique</li>
                <li>✓ Prières quotidiennes</li>
                <li>✓ Localisation des églises JJC</li>
              </ul>
            </div>
          </div>

          {/* Créateurs */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Users className="text-primary-600" size={24} />
              <h3 className="text-xl font-bold text-gray-800">Créateurs</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">B</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Développeur Principal</p>
                  <p className="text-sm text-gray-600">Conception & Développement</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                Développé avec ❤️ pour la gloire de Dieu et le service de l'église JJC
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Contact & Support</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail size={20} className="text-gray-400" />
                <a href="mailto:contact@jjc.org" className="text-primary-600 hover:underline">
                  contact@jjc.org
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={20} className="text-gray-400" />
                <a href="tel:+229XXXXXXXX" className="text-primary-600 hover:underline">
                  +229 XX XX XX XX
                </a>
              </div>
            </div>
          </div>

          {/* Verset */}
          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-primary-600">
            <p className="text-gray-800 text-lg italic mb-2">
              "Que tout ce qui respire loue l'Éternel! Louez l'Éternel!"
            </p>
            <p className="text-gray-500 text-sm">Psaume 150:6</p>
          </div>

          {/* Copyright */}
          <div className="text-center py-4">
            <p className="text-gray-500 text-sm">
              © 2025 Église JJC. Tous droits réservés.
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Made with ❤️ for God's glory
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;