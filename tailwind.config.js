/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        'mercury-ripple-wave': 'mercury-ripple-wave 1.8s infinite linear',
        'mercury-ripple-wave': 'mercury-ripple-wave 1.8s infinite linear',
        'mercury-ripple-wave': 'mercury-ripple-wave 1.8s infinite linear',
      },
      keyframes: {
        'mercury-ripple-wave': {
          '0%': {
            transform: 'translate(-50%, -50%) scale(0.2)',
            opacity: '1',
          },
          '100%': {
            transform: 'translate(-50%, -50%) scale(15)',
            opacity: '0',
          },
        },
        'mercury-ripple-wave': {
          '0%': {
            transform: 'translate(-50%, -50%) scale(0.2)',
            opacity: '1',
          },
          '100%': {
            transform: 'translate(-50%, -50%) scale(15)',
            opacity: '0',
          },
        },
        'mercury-ripple-wave': {
          '0%': {
            transform: 'translate(-50%, -50%) scale(0.2)',
            opacity: '1',
          },
          '100%': {
            transform: 'translate(-50%, -50%) scale(15)',
            opacity: '0',
          },
        },
      },},
  },
  plugins: [],
}
