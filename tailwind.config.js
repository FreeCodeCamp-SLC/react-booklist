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
      },
      gridTemplateColumns: {
        layout: '250px auto',
      },
      gridTemplateRows: {
        layout: '75px auto',
      },
      height: {
        "fit": "fit-content"
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
