/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './app/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        leaf: '#1F7A4D',
        marigold: '#F5A524',
        ink: '#17201A',
        millet: '#F8F3E7',
      },
    },
  },
  plugins: [],
};
