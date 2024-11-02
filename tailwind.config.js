/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-bg': "url('/src/assets/cover.png')",
      },
      colors: {
        'custom-red': '#8B0000', // Add your custom background color here
      },
    },
  },
  plugins: [],
}
