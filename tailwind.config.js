module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        caret: {
          '50%': { background: 'transparent' },
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
