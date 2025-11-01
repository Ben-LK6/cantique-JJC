import { useState } from 'react';
import { Search, MapPin, Phone, Mail, Clock } from 'lucide-react';
import churchesData from '../data/churches.json';

const FindChurch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChurches = churchesData.filter(church =>
    church.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    church.ville.toLowerCase().includes(searchTerm.toLowerCase()) ||
    church.pays.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm sticky top-0 z-30">
        <div className="px-4 py-4 lg:px-6">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4">
            Trouver une Église JJC
          </h2>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher par ville ou nom..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="p-4 lg:p-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-600 mb-4">
            {filteredChurches.length} église(s) trouvée(s)
          </p>

          <div className="space-y-4">
            {filteredChurches.map(church => (
              <div
                key={church.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <MapPin className="text-primary-700" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {church.nom}
                    </h3>
                    <p className="text-gray-600">
                      {church.ville}, {church.pays}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pl-16">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-gray-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-700">{church.adresse}</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-gray-400 flex-shrink-0" />
                    <a href={`tel:${church.telephone}`} className="text-primary-600 hover:underline">
                      {church.telephone}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-gray-400 flex-shrink-0" />
                    <a href={`mailto:${church.email}`} className="text-primary-600 hover:underline">
                      {church.email}
                    </a>
                  </div>

                  <div className="pt-3 border-t">
                    <div className="flex items-start gap-3 mb-2">
                      <Clock size={18} className="text-gray-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">Horaires des cultes :</p>
                        {church.horaires.map((horaire, index) => (
                          <div key={index} className="flex gap-2 text-gray-700 mb-1">
                            <span className="font-medium">{horaire.jour}:</span>
                            <span>{horaire.heure}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-4 pt-4 border-t">
                  <button className="flex-1 py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                    📍 Itinéraire
                  </button>
                  <button className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    📞 Appeler
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredChurches.length === 0 && (
            <div className="text-center py-12">
              <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg mb-2">Aucune église trouvée</p>
              <p className="text-gray-400">Essayez de rechercher par ville</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindChurch;