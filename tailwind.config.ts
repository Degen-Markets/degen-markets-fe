import type { Config } from "tailwindcss";
const colors = {
  main: "#0C0C1A",
  primary: "#8F7CFF",
  "primary-light": "#A596FF",
  secondary: "#FFCA8F",
  "secondary-light": "#FFDEAA",
  danger: "#FF5C5C",
  "danger-light": "#FF7A7A",
  success: "#3FDA8D",
  "success-light": "#6EE7A9",
  "lavender-blue": "#A6B1D6",
  "steel-gray": "#212131",
  gold: "#E4D493",
  silver: "#D2AB6D",
  bronze: "#DCDCDC",
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        "4xl": "35px",
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      colors: colors,
    },
  },
  plugins: [],
};

export default config;
export { colors };
