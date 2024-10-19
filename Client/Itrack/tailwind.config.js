/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        Blue : '#0F4471'
      },
      fontSize: {
        'custom': '21px',
      },
      width: {
        '120': '500px',
      },
    },
  },
  plugins: [],
}
