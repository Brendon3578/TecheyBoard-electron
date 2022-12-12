/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Inter", '"sans serif"'],
      poppins: ["Poppins", '"sans serif"'],
    },
  },
  plugins: [require("@tailwindcss/forms"), require("tw-elements/dist/plugin")],
};
