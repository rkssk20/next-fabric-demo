/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/atoms/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '498px',
        'md': '528px',
        'lg': '768px',
        'xl': '1056px',
      },
      backgroundImage:{
        'opacity-pattern': 'linear-gradient(45deg, #e3e3e3 25%, transparent 25%), linear-gradient(-45deg, #e3e3e3 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e3e3e3 75%), linear-gradient(-45deg, transparent 75%, #e3e3e3 75%)'
      },
      backgroundPosition: {
        'opacity-position': '0 0, 0 25px, 25px -25px, -25px 0px'
      },
      backgroundSize: {
        'opacity-size': '5px 5px'
      }
    },
  },
  plugins: [],
}