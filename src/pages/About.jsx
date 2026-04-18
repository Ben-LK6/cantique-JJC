import React from 'react';

const About = () => {
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
            <h1 className="text-2xl lg:text-3xl font-bold mb-3 text-center">
              À propos de nous
            </h1>
            <p className="text-center text-primary-100">
              Découvrez notre mission, notre vision et nos valeurs fondamentales.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Notre Identité</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              L’Église Évangélique Jéhovah par Jésus-Christ (JJC) est une communauté de foi dédiée à la proclamation de l’Évangile et à l’édification du corps du Christ. Fondée sur les valeurs de sainteté, de prière et de fraternité, elle rassemble des croyants animés par le désir de vivre une spiritualité authentique et de témoigner de l’amour de Dieu dans leur quotidien.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Notre Mission</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Notre engagement repose sur trois piliers fondamentaux :
            </p>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li><span className="font-semibold">La Proclamation :</span> Partager la Bonne Nouvelle du salut en Jésus-Christ avec compassion et clarté.</li>
              <li><span className="font-semibold">La Formation :</span> Enseigner les vérités bibliques pour permettre à chaque fidèle de grandir dans sa foi et d’affermir son caractère chrétien.</li>
              <li><span className="font-semibold">Le Service :</span> Manifester la charité chrétienne par des actions concrètes au sein de notre communauté et envers notre prochain.</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Notre Vision</h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Nous aspirons à être une église dynamique et accueillante, un lieu de refuge et de restauration où chaque âme peut rencontrer Dieu, découvrir ses dons spirituels et s’épanouir dans sa destinée divine. Notre vision est celle d’une communauté unie, portée par la puissance de la prière et l’obéissance aux Saintes Écritures.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Nos Valeurs Fondamentales</h2>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 space-y-2">
              <li><span className="font-semibold">L’Autorité de la Parole :</span> La Bible comme guide suprême de notre foi.</li>
              <li><span className="font-semibold">L’Amour Fraternel :</span> Vivre l’unité et la solidarité entre les membres.</li>
              <li><span className="font-semibold">L’Adoration :</span> Célébrer la grandeur de Dieu en esprit et en vérité.</li>
              <li><span className="font-semibold">L’Intégrité :</span> Refléter les valeurs du Royaume de Dieu dans tous les aspects de la vie.</li>
            </ul>
          </div>

          <div 
            className="rounded-xl p-6"
            style={{ backgroundColor: 'var(--color-primary-50)' }}
          >
            <h3 
              className="text-lg font-bold mb-4"
              style={{ color: 'var(--color-primary-800)' }}
            >💡 Versets Bibliques</h3>
            <p className="text-gray-800 dark:text-gray-200 text-lg italic mb-2">
              « Allez, faites de toutes les nations des disciples, les baptisant au nom du Père, du Fils et du Saint-Esprit. » — Matthieu 28 :19
            </p>
            <p className="text-gray-800 dark:text-gray-200 text-lg italic mb-2">
              « Je cours vers le but pour remporter le prix de la vocation céleste de Dieu en Jésus-Christ. » — Philippiens 3:14
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;