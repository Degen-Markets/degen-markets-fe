import type { Config } from "tailwindcss";
const colors = {
  main: "#0C0C1A",
  hero: "#191731",
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
  gunmetal: "#525E64",
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
    screens: {
      sm: "640px",
      md: "768px",
      tablet: "870px",
      lg: "1024px",
      desktop: "1200px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      borderRadius: {
        "4xl": "35px",
      },
      fontFamily: {
        sans: ["var(--body-font-family)", "sans-serif"],
        montserrat: ["var(--headline-font-family)", "sans-serif"],
      },
      colors: colors,
      listStyleType: {
        none: "none",
        disc: "disc",
        decimal: "decimal",
      },
      animation: {
        border: "border 4s linear infinite",
        "bounce-slow": "bounce-slow 20s infinite linear alternate",
      },
      keyframes: {
        border: {
          to: { "--border-angle": "360deg" },
        },
        "bounce-slow": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
export { colors };
