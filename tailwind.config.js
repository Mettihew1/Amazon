/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ← Tracks all JS/JSX files in src/
    "./src/components/Banner.jsx" // ← Explicitly include your banner
  ],
  theme: {
    extend: {
      height: {
        'banner': '300px', // ← Now you can use `h-banner` class
      }
    },
  },
  plugins: [],
}