/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '120': '500px',
      },
      fontSize: {
        'custom': '21px', // Custom text size
      },
    },
  },
  plugins: [],
}
