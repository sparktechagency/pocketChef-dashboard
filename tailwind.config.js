/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F28705",
        secondary: "#FCF1E7",
        button: "#A63005",
      },
    },
  },
  plugins: [],
};
