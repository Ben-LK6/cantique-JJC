import { motion } from 'framer-motion';

const TabsFilter = ({ tabs, activeTab, onTabChange, color = 'primary' }) => {
  const colorVariants = {
    primary: {
      active: 'bg-primary-600 text-white',
      inactive: 'text-gray-600 hover:text-primary-600 hover:bg-primary-50',
      indicator: 'bg-primary-600'
    },
    purple: {
      active: 'bg-purple-600 text-white',
      inactive: 'text-gray-600 hover:text-purple-600 hover:bg-purple-50',
      indicator: 'bg-purple-600'
    },
    blue: {
      active: 'bg-blue-600 text-white',
      inactive: 'text-gray-600 hover:text-blue-600 hover:bg-blue-50',
      indicator: 'bg-blue-600'
    }
  };

  const colors = colorVariants[color] || colorVariants.primary;

  return (
    <div className="bg-white border-b sticky top-[72px] lg:top-0 z-30 shadow-sm">
      <div className="flex overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          
          return (
            <button
              key={tab}
              onClick={() => onTabChange(tab)}
              className={`relative px-6 py-4 font-semibold text-sm whitespace-nowrap transition-all ${
                isActive ? colors.active : colors.inactive
              } ${isActive ? 'rounded-t-xl' : ''}`}
            >
              {/* Label */}
              <span className="relative z-10">{tab}</span>
              
              {/* Indicator animé en bas */}
              {isActive && (
                <motion.div
                  layoutId={`tab-indicator-${color}`}
                  className={`absolute bottom-0 left-0 right-0 h-1 ${colors.indicator}`}
                  initial={false}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabsFilter;