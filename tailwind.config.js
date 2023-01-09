/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    colors: {
      text: '#e3e3e3',
      primary: '#3e4959',
      secondary: '#2c2d37',
      tertiary: '#1C1D22',
      transparent: 'transparent'
    },
    fontFamily: {
      nunito: '"Nunito", sans-serif'
    }
  },
  plugins: [],
}
