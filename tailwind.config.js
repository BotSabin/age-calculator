/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins']
      },
      colors: {
        purple: 'hsl(259, 100%, 65%)',
        lightr: 'hsl(0, 100%, 67%)',
        offw: 'hsl(0, 0%, 94%)',
        lightg: 'hsl(0, 0%, 86%)',
        smokey: 'hsl(0, 1%, 44%)',
        offb: 'hsl(0, 0%, 8%)'
      }
    },
  },
  plugins: [],
}