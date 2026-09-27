/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f2f0ff",
          100: "#e6e1ff",
          200: "#c9bfff",
          300: "#a794ff",
          400: "#8768ff",
          500: "#6d3fff",
          600: "#5a26f0",
          700: "#4a1dc4",
          800: "#3c1a9c",
          900: "#2f1878",
        },
      },
      fontFamily: {
        display: ["'Poppins'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
    },
  },
  plugins: [],
};
