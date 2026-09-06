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
          crimson: 'rgb(var(--color-brand-crimson) / <alpha-value>)',
          crimsonDark: 'rgb(var(--color-brand-crimson-dark) / <alpha-value>)',
          crimsonLight: 'rgb(var(--color-brand-crimson-light) / <alpha-value>)',
          navy: 'rgb(var(--color-brand-navy) / <alpha-value>)',
          navyDark: 'rgb(var(--color-brand-navy-dark) / <alpha-value>)',
          navyLight: 'rgb(var(--color-brand-navy-light) / <alpha-value>)',
          gold: 'rgb(var(--color-brand-gold) / <alpha-value>)',
          goldLight: 'rgb(var(--color-brand-gold-light) / <alpha-value>)',
          paper: 'rgb(var(--color-brand-paper) / <alpha-value>)',
          cream: 'rgb(var(--color-brand-cream) / <alpha-value>)',
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
        'glow-crimson': '0 0 25px -5px rgb(var(--color-brand-crimson) / 0.4)',
        'glow-navy': '0 0 25px -5px rgb(var(--color-brand-navy) / 0.4)',
        'card-elevated': '0 10px 30px -5px rgb(var(--color-brand-navy) / 0.08), 0 4px 10px -3px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 20px 40px -10px rgb(var(--color-brand-navy) / 0.15), 0 8px 16px -4px rgba(0, 0, 0, 0.06)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
