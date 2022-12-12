/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        brand: '#75efff',
        background: '#101c31',
        textPrimary: '#fff',
        borderPrimary: '#ccc',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    // ...
  ],
};
