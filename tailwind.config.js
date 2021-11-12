module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        caret: {
          '50%': { borderColor: 'transparent' },
        },
      },
      animation: {
        caret: 'caret 1s steps(1) infinite',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
