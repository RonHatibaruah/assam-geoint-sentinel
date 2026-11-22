/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        assam: {
          dark: '#0f172a',
          emerald: '#059669',
          gold: '#d97706',
          teal: '#0d9488',
        }
      }
    },
  },
  plugins: [],
}
