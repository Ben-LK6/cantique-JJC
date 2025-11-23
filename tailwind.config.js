/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    // Couleurs primaires
    'bg-blue-600', 'bg-blue-500', 'bg-blue-700', 'text-blue-600', 'border-blue-600', 'from-blue-500', 'to-blue-600',
    'bg-green-600', 'bg-green-500', 'bg-green-700', 'text-green-600', 'border-green-600', 'from-green-500', 'to-green-600',
    'bg-purple-600', 'bg-purple-500', 'bg-purple-700', 'text-purple-600', 'border-purple-600', 'from-purple-500', 'to-purple-600',
    'bg-red-600', 'bg-red-500', 'bg-red-700', 'text-red-600', 'border-red-600', 'from-red-500', 'to-red-600',
    'bg-orange-600', 'bg-orange-500', 'bg-orange-700', 'text-orange-600', 'border-orange-600', 'from-orange-500', 'to-orange-600',
    // Tailles de police
    'text-base', 'text-lg', 'text-xl', 'text-2xl',
  ],
  theme: {
    screens: {
      'xs': '320px',
      'sm': '480px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      // Device-specific breakpoints
      'mobile-s': '320px',
      'mobile-m': '375px',
      'mobile-l': '425px',
      'tablet': '768px',
      'tablet-l': '1024px',
    },
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
        // Universal responsive spacing
        'xs-responsive': 'clamp(0.25rem, 1vw, 0.5rem)',
        'sm-responsive': 'clamp(0.5rem, 2vw, 1rem)',
        'md-responsive': 'clamp(1rem, 3vw, 1.5rem)',
        'lg-responsive': 'clamp(1.5rem, 4vw, 2rem)',
        'xl-responsive': 'clamp(2rem, 5vw, 3rem)',
      },
      height: {
        'screen-mobile': 'calc(var(--vh, 1vh) * 100)',
        'nav-universal': 'clamp(60px, 12vw, 80px)',
        'button-universal': 'clamp(44px, 10vw, 52px)',
      },
      minHeight: {
        'screen-mobile': 'calc(var(--vh, 1vh) * 100)',
        'touch-target': '44px',
      },
      fontSize: {
        'xs-responsive': 'clamp(0.75rem, 2vw, 0.875rem)',
        'sm-responsive': 'clamp(0.875rem, 2.5vw, 1rem)',
        'base-responsive': 'clamp(1rem, 3vw, 1.125rem)',
        'lg-responsive': 'clamp(1.125rem, 3.5vw, 1.25rem)',
        'xl-responsive': 'clamp(1.25rem, 4vw, 1.5rem)',
        '2xl-responsive': 'clamp(1.5rem, 5vw, 2rem)',
        '3xl-responsive': 'clamp(1.875rem, 6vw, 2.5rem)',
      },
      borderRadius: {
        'responsive': 'clamp(8px, 2vw, 12px)',
        'card-responsive': 'clamp(12px, 3vw, 16px)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-reverse': 'float-reverse 8s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
        'drift': 'drift 10s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg) scale(1)' },
          '50%': { transform: 'translateY(-15px) rotate(8deg) scale(1.05)' },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg) scale(1)' },
          '50%': { transform: 'translateY(15px) rotate(-8deg) scale(1.05)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.1)' },
        },
        drift: {
          '0%': { transform: 'translateX(0px) translateY(0px)' },
          '25%': { transform: 'translateX(15px) translateY(-10px)' },
          '50%': { transform: 'translateX(30px) translateY(0px)' },
          '75%': { transform: 'translateX(15px) translateY(10px)' },
          '100%': { transform: 'translateX(0px) translateY(0px)' },
        },
      },
    },
  },
  plugins: [],
}