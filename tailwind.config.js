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
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
};
