/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brutalBlack: '#000000',
        brutalWhite: '#F4F4F4',
        brutalGray: '#1C1C1C'
      },
      fontSize: {
        'micro': ['0.65rem', { lineHeight: '1.2', letterSpacing: '0.05em', textTransform: 'uppercase' }],
      },
      fontFamily: {
        // A classic, rigid sans-serif is essential for the brutalist look
        sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'], 
      }
    },
  },
  plugins: [],
}