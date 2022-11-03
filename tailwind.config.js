/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Inter", '"sans serif"'],
      poppins: ["Poppins", '"sans serif"'],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
