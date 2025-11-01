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
    },
  },
  plugins: [],
}