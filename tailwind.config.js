/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          crimson: '#B31942',
          crimsonDark: '#8B1032',
          crimsonLight: '#E63956',
          navy: '#0A3161',
          navyDark: '#051B38',
          navyLight: '#16488A',
          gold: '#EAB308',
          goldLight: '#FDE047',
          paper: '#F8FAFC',
          cream: '#FFFBF5',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        fraunces: ['Fraunces', 'serif'],
        rokkitt: ['Rokkitt', 'serif']
      },
      boxShadow: {
        'glow-crimson': '0 0 25px -5px rgba(179, 25, 66, 0.4)',
        'glow-navy': '0 0 25px -5px rgba(10, 49, 97, 0.4)',
        'card-elevated': '0 10px 30px -5px rgba(10, 49, 97, 0.08), 0 4px 10px -3px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 20px 40px -10px rgba(10, 49, 97, 0.15), 0 8px 16px -4px rgba(0, 0, 0, 0.06)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
