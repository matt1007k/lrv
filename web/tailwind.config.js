const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        thead: ["13px", "21px"],
        base: ["15px", "22px"],
      },
      width: {
        wrap: "1200px",
      },
      colors: {
        "gray-custom": "#132C56",
        "gray-secondary": "#295183",
        "gray-light": "#557CAC",
      },
    },
  },
  variants: {
    extend: {
      display: ["hover", "focus", "group-hover"],
      backgroundColor: ["disabled"],
      textColor: ["disabled"],
      cursor: ["disabled"],
      opacity: ["disabled"],
      cursor: ["disabled"],
    },
  },
  plugins: [],
};
