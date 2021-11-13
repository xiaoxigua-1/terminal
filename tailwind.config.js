module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        caret: {
          '50%': {
            background: 'transparent',
            color: '#ffff',
          },
        },
      },
      animation: {
        caret: 'caret 1s steps(1) infinite',
      },
      minWidth: {
        2: '0.5rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
