import { HandHeart, BookOpen, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getDailyDevotional } from '../utils/dailyDevotional';
import { t } from '../data/translations';

const Prayers = () => {
  const [devotional, setDevotional] = useState(null);

  useEffect(() => {
    setDevotional(getDailyDevotional());
  }, []);

  if (!devotional) return <div>Chargement...</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="p-4">
        <div className="max-w-2xl mx-auto">
          {/* Date */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <div className="flex items-center justify-center gap-2 text-primary-600 mb-2">
              <Calendar size={20} />
              <span className="font-medium">{devotional.date}</span>
            </div>
          </motion.div>

          {/* Verset du jour */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl p-6 shadow-xl text-white mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={20} />
              <h3 className="font-bold uppercase tracking-wide text-sm">Verset du jour</h3>
            </div>
            <p className="text-lg italic leading-relaxed mb-4">
              "{devotional.verset.texte}"
            </p>
            <p className="text-primary-100 font-semibold">
              — {devotional.verset.reference}
            </p>
          </motion.div>

          {/* Exhortation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg mb-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <HandHeart className="text-primary-600" size={24} />
              Exhortation
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {devotional.exhortation}
            </p>
          </motion.div>

          {/* Prière */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">🙏 Prière</h3>
            <p className="text-gray-700 leading-relaxed italic mb-4">
              {devotional.priere}
            </p>
            <div className="text-center">
              <span className="text-2xl font-bold text-primary-600">Amen</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Prayers;