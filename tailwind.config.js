/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#0FCFEC",

          "secondary": "#19D3AE",

          "accent": "#3A4256",

          "neutral": "#1A748A",

          "base-100": "#FFF",
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
