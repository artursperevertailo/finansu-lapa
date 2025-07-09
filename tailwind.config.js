/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark-green': '#042f2e',
        'brand-accent': '#c7a77d',
        'brand-bg': '#f9f7f4',
        'text-main': '#1f2937',
        'text-muted': '#6b7280',
      },
      fontFamily: {
        'base': ['Manrope', 'sans-serif'],
        'heading': ['Lora', 'serif'],
      }
    },
  },
  plugins: [],
}