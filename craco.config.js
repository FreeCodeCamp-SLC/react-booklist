module.exports = {
  eslint: {
    enable: false,
    mode: 'extends' || 'file',

  },
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
}
