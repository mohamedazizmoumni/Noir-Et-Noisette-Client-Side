/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'dark-chocolate': '#3C2F2F',
        'milk-chocolate': '#8B5A2B',
        cream: '#F5E8C7',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        lora: ['"Lora"', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
        'fade-in-delayed': 'fadeIn 1s ease-in-out 0.5s',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};