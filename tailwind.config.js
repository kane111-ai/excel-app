/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#1b2430',
        graphite: '#2c3540',
        steel: {
          50: '#eef2f5',
          100: '#d6dee5',
          200: '#adbdc9',
          300: '#849cad',
          400: '#5c7b91',
          500: '#3f5f75',
          600: '#2f4a5c',
          700: '#243a48',
          800: '#1a2933',
          900: '#101a20',
        },
        amberline: '#e0a458',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Hiragino Sans"', '"Yu Gothic"', 'sans-serif'],
        mono: ['"SF Mono"', '"Consolas"', 'monospace'],
      },
    },
  },
  plugins: [],
};
