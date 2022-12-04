/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'acapulco': {
          DEFAULT: '#82BDA4',
          '50': '#FAFCFB',
          '100': '#EDF5F2',
          '200': '#D2E7DE',
          '300': '#B7D9CB',
          '400': '#9DCBB7',
          '500': '#82BDA4',
          '600': '#5DAA89',
          '700': '#47876C',
          '800': '#34634F',
          '900': '#213E32'
        },
      },
      fontFamily: {
        IMB: ['IBM Plex Mono', 'monospace']
      }
    },
  },
  plugins: [],
}
