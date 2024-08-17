/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:"#1474AF",
        primary_hover:"#0c517b"
      }
    },
  },
  plugins: [],
}

