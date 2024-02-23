/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "anti-frame": {
          "0%": {
            transform: 'rotate(0deg)',
          },
          "100%": {
            transform: 'rotate(-360deg)',
          },
        },
      },
      animation: {
        'anit-spin': "anti-frame 1s linear infinite"
      }
    },
    screens: {
      'screen-l-1': '300px',
      'screen-l-3': '450px',
      'screen-l-5': '600px',
      'screen-l-7': '750px',
      'screen-l-9': '900px',
      'screen-l-11': '1050',
    }
  },
  plugins: [],
}

