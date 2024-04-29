import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        blue: {
          medium: "#2387B6",
          dark: "rgb(34, 43, 55)",
        },
        yellow: {
          light: "#fcedbd",
          dark: "#E9BF2D",
        },
        pink: {
          light: "#f4b6ec",
        },
        purple: {
          medium: "#8D68E6",
        },
      },
      boxShadow: {
        black:
          "4px 0px 0px 0px rgba(0,0,255,1), 0px 4px 0px 0px rgba(0,0,255,1), -4px 0px 0px 0px rgba(0,0,255,1), 0px -4px 0px 0px rgba(0,0,255,1), inset -8px -8px rgba(0,0,0,0.01)",
        button:
          "4px 0px 0px 0px rgba(0,0,0,1), 0px 4px 0px 0px rgba(0,0,0,1), -4px 0px 0px 0px rgba(0,0,0,1), 0px -4px 0px 0px rgba(0,0,0,1), inset -8px -8px rgba(0,0,0,0.1)",
        "button-pressed":
          "4px 0px 0px 0px rgba(0,0,0,1), 0px 4px 0px 0px rgba(0,0,0,1), -4px 0px 0px 0px rgba(0,0,0,1), 0px -4px 0px 0px rgba(0,0,0,1), inset 8px 8px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
