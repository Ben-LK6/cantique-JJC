import { motion } from 'framer-motion';
import { Book, HandHeart, Heart, MapPin, Sparkles, Music, Search } from 'lucide-react';

const Home = ({ onNavigate }) => {
  const quickActions = [
    { icon: Book, label: 'Cantiques', path: 'cantiques', color: 'from-blue-500 to-blue-600', emoji: '📖' },
    { icon: HandHeart, label: 'Prières', path: 'prayers', color: 'from-purple-500 to-purple-600', emoji: '🙏' },
    { icon: Heart, label: 'Favoris', path: 'favoris', color: 'from-red-500 to-red-600', emoji: '❤️' },
    { icon: MapPin, label: 'Églises', path: 'churches', color: 'from-green-500 to-green-600', emoji: '⛪' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-24 overflow-hidden relative">
      {/* Cercles décoratifs en arrière-plan */}
      <div className="absolute top-20 right-10 w-40 h-40 bg-primary-200 rounded-full blur-3xl opacity-30"></div>
      <div className="absolute top-60 left-5 w-60 h-60 bg-purple-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-40 right-5 w-48 h-48 bg-blue-200 rounded-full blur-3xl opacity-25"></div>

      {/* Hero Section Simple */}
      <div className="relative z-10 pt-8 pb-6 px-6 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="mb-4"
        >
          {/* Logo Église - Grande ronde */}
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center shadow-2xl border-4 border-white relative">
            <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
            <div className="relative text-center">
              <span className="text-white font-bold text-4xl">JJC</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
            Cantiques JJC
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-200">
            Louez le Seigneur avec joie
          </p>
        </motion.div>
      </div>

      {/* Actions Rapides en Cercles */}
      <div className="px-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-6"
        >
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            
            return (
              <motion.div
                key={action.path + index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate(action.path)}
                className="flex flex-col items-center cursor-pointer"
              >
                {/* Cercle avec icône */}
                <div className={`w-20 h-20 bg-gradient-to-br ${action.color} rounded-full flex items-center justify-center shadow-xl mb-2 relative`}>
                  <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                  <span className="text-3xl relative z-10">{action.emoji}</span>
                </div>
                
                {/* Label */}
              <span className="text-xs font-semibold text-gray-700 dark:text-white drop-shadow-lg">
                {action.label}
              </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Verset du jour - Card élégante */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mx-6 mb-6"
      >
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 relative overflow-hidden">
          {/* Décoration */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary-100 to-purple-100 rounded-full -mr-12 -mt-12 opacity-50"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="text-primary-600" size={20} />
              <h3 className="text-sm font-bold text-primary-600 uppercase tracking-wide">
                Verset du jour
              </h3>
            </div>
            <p className="text-gray-800 text-base leading-relaxed mb-3 italic">
              "Louez l'Eternel ! Chantez à l'Eternel un cantique nouveau ! Chantez ses louanges dans l'assemblée des fidèles !"
            </p>
            <p className="text-gray-500 text-sm font-semibold">
              — Psaumes 149:1
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
        className="mx-6"
      >
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-6 shadow-xl text-white">
          <div className="flex items-center justify-around">
            <div className="text-center">
              <Music size={24} className="mx-auto mb-2 opacity-80" />
              <div className="text-3xl font-bold mb-1">10</div>
              <div className="text-xs text-primary-100">Cantiques</div>
            </div>
            <div className="w-px h-16 bg-white/30"></div>
            <div className="text-center">
              <HandHeart size={24} className="mx-auto mb-2 opacity-80" />
              <div className="text-3xl font-bold mb-1">3</div>
              <div className="text-xs text-primary-100">Prières</div>
            </div>
            <div className="w-px h-16 bg-white/30"></div>
            <div className="text-center">
              <Heart size={24} className="mx-auto mb-2 opacity-80" fill="currentColor" />
              <div className="text-3xl font-bold mb-1">•</div>
              <div className="text-xs text-primary-100">Favoris</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;