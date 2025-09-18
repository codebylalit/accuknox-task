/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
        ],
      },
      colors: {
        primary: "#0e1a47",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.08)",
      },
      borderRadius: {
        xl: "12px",
      },
    },
  },
  plugins: [],
};
