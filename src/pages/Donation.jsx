import { Heart, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const Donation = () => {
  const [copied, setCopied] = useState(false);

  const donationInfo = {
    momo: '+229 XX XX XX XX',
    bank: 'JJC Church Account',
    iban: 'BJ00 0000 0000 0000 0000',
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Contenu */}
      <div className="p-4 lg:p-6">
        <div className="max-w-2xl mx-auto space-y-6">
          
          {/* Message de remerciement */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 text-white text-center">
            <Heart size={48} className="mx-auto mb-4" />
            <h1 className="text-2xl lg:text-3xl font-bold mb-3">Merci pour votre générosité !</h1>
            <p className="text-primary-100">
              Votre soutien nous aide à continuer notre mission et à développer des outils 
              pour glorifier Dieu et servir son peuple.
            </p>
          </div>

          {/* Verset */}
          <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-primary-600">
            <p className="text-gray-800 text-lg italic mb-2">
              "Que chacun donne comme il l'a résolu en son cœur, sans tristesse ni contrainte; 
              car Dieu aime celui qui donne avec joie."
            </p>
            <p className="text-gray-500 text-sm">2 Corinthiens 9:7</p>
          </div>

          {/* Mobile Money */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">📱</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Mobile Money</h3>
                <p className="text-sm text-gray-600">MTN / Moov</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
              <span className="font-mono text-lg text-gray-800">{donationInfo.momo}</span>
              <button
                onClick={() => copyToClipboard(donationInfo.momo)}
                className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
              >
                {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
              </button>
            </div>
          </div>

          {/* Virement bancaire */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🏦</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Virement Bancaire</h3>
                <p className="text-sm text-gray-600">Compte de l'église</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 mb-1">Titulaire du compte</p>
                <div className="bg-gray-50 rounded-lg p-3">
                  <span className="text-gray-800 font-medium">{donationInfo.bank}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">IBAN</p>
                <div className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                  <span className="font-mono text-gray-800">{donationInfo.iban}</span>
                  <button
                    onClick={() => copyToClipboard(donationInfo.iban)}
                    className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                  >
                    {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* En espèces */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">💵</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Don en espèces</h3>
                <p className="text-sm text-gray-600">Pendant le culte</p>
              </div>
            </div>
            <p className="text-gray-700">
              Vous pouvez également faire votre don directement lors des cultes. 
              Des enveloppes sont disponibles pour vos offrandes.
            </p>
          </div>

          {/* À quoi servent les dons */}
          <div className="bg-primary-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-primary-800 mb-4">À quoi servent vos dons ?</h3>
            <ul className="space-y-3 text-primary-700">
              <li className="flex items-start gap-3">
                <span className="text-primary-600 mt-1">✓</span>
                <span>Développement et maintenance de l'application</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-600 mt-1">✓</span>
                <span>Activités et programmes de l'église</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-600 mt-1">✓</span>
                <span>Soutien aux nécessiteux et œuvres caritatives</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-600 mt-1">✓</span>
                <span>Évangélisation et mission</span>
              </li>
            </ul>
          </div>

          {/* Message final */}
          <div className="text-center py-4">
            <p className="text-gray-600 text-lg mb-2">Que Dieu vous bénisse abondamment !</p>
            <p className="text-gray-500 text-sm">
              Chaque contribution, quelle que soit sa taille, est précieuse et appréciée.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Donation;