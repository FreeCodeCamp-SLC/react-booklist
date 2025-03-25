const twElements = require('tw-elements/dist/plugin.cjs');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        booklistRed: {
          light: '#ec3333',
          DEFAULT: '#e02224',
          dark: '#ca1e20',
        },
        booklistBlue: {
          light: '#2675ae',
          DEFAULT: '#195885',
          dark: '#14496e',
        },
        blackTransparent: 'rgba(0, 0, 0, 0.50)',
      },
      gridTemplateColumns: {
        layout: '250px auto',
      },
      gridTemplateRows: {
        layout: '75px auto',
      },
      height: {
        fit: 'fit-content',
      },
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '850px',
      // => @media (min-width: 768px) { ... }

      lg: '1130px',
      // => @media (min-width: 1024px) { ... }

      xl: '1400px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  content: [
    './src/**/*.{html,js}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  plugins: [twElements],
};
