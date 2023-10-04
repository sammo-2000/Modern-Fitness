/** @type {import('tailwindcss').Config} */
export default {
  content: ["./views/**/*.ejs"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5e1ff',
          100: '#d7b3ff',
          200: '#b785ff',
          300: '#9961ff',
          400: '#7d3cff',
          500: '#651eff',
          600: '#5915e6',
          700: '#4d10bf',
          800: '#410b99',
          900: '#340573',
        },
      },
    },
    fontFamily: {
      montserrat: ['Montserrat', 'sans'],
      Lora: ['Lora', 'serif'],
    },
  },
  plugins: [],
}

