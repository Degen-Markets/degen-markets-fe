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
          main: "#FFE14D",
          light: "#F9DD71",
          dark: "#E9BF2D",
        },
        pink: {
          light: "#ED72BF",
        },
        purple: {
          light: "#C0A6FE",
          medium: "#8E68E5",
        },
        indigo: {
          medium: "#5662D4",
        },
        prussian: {
          dark: "#003A55",
        },
        pippin: "#FFE6E6",
        vivid: {
          light: "#FFE6E6",
          dark: "#FF8A8A",
        },
        koromiko: {
          light: "#FFDCA7",
          dark: "#FCBF63",
        },
        green: {
          light: "#5EC269",
          main: "#5EC269",
        },
        red: {
          main: "#F21212",
        },
        cadet: {
          blue: {
            light: "#a9b8ca",
            dark: "#4475af",
          },
        },
      },
      boxShadow: {
        black:
          "4px 0px 0px 0px rgba(0,0,255,1), 0px 4px 0px 0px rgba(0,0,255,1), -4px 0px 0px 0px rgba(0,0,255,1), 0px -4px 0px 0px rgba(0,0,255,1), inset -8px -8px rgba(0,0,0,0.01)",
        button:
          "4px 0px 0px 0px #003A55, 0px 4px 0px 0px #003A55, -4px 0px 0px 0px #003A55, 0px -4px 0px 0px #003A55, inset -8px -8px rgba(0,0,0,0.1)",
        "button-pressed":
          "4px 0px 0px 0px rgba(0,0,0,1), 0px 4px 0px 0px rgba(0,0,0,1), -4px 0px 0px 0px rgba(0,0,0,1), 0px -4px 0px 0px rgba(0,0,0,1), inset 8px 8px rgba(0,0,0,0.1)",
        "button-secondary":
          "4px 0px 0px 0px rgba(34, 43, 55,1), 0px 4px 0px 0px rgba(34, 43, 55,1), -4px 0px 0px 0px rgba(34, 43, 55,1), 0px -4px 0px 0px rgba(34, 43, 55,1), inset -8px -8px rgba(34, 43, 55,0.1)",
        "button-secondary-hover":
          "4px 0px 0px 0px rgba(19, 25, 33, 1), 0px 4px 0px 0px rgba(19, 25, 33, 1), -4px 0px 0px 0px rgba(19, 25, 33,1), 0px -4px 0px 0px rgba(19, 25, 33, 1), inset -8px -8px rgba(19, 25, 33, 0.1);",
      },
    },
  },
  plugins: [],
};
export default config;
