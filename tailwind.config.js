/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          maroon: {
            950: '#1a0606',
            900: '#2a0a0a',
            800: '#3d1010',
            700: '#521616',
            600: '#6b1d1d',
            500: '#8b2626',
          },
          cream: {
            50: '#faf8f5',
            100: '#f5f0e8',
            200: '#ebe2d1',
            300: '#ddc9a8',
            400: '#d4b896',
            500: '#c8a679',
          },
          gold: {
            400: '#d4a574',
            500: '#c89456',
            600: '#b8833d',
            700: '#9d6f2e',
          },
          brown: {
            900: '#2b1810',
            800: '#3d2419',
            700: '#523222',
            600: '#6b4230',
          }
        }
      },
      fontFamily: {
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      },
    },
  },
  plugins: [],
};
