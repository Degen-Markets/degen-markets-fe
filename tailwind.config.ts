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
      },
    },
  },
  plugins: [],
};
export default config;
