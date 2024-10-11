import type { Config } from "tailwindcss";
const colors = {
  main: "#0C0C1A",
  primary: "#8F7CFF",
  "lavender-blue": "#A6B1D6",
  "steel-gray": "#212131",
  gold: "#E4D493",
  silver: "#D2AB6D",
  bronze: "#DCDCDC",
  black: {
    medium: "#202B38",
    dark: "#1A222C",
    main: "#000000",
    light: "#1A2734",
  },
  blue: {
    light: "#5A799E",
    medium: "#2387B6",
    dark: "rgb(34, 43, 55)",
    twitter: "#1C98E9",
    secondary: "#2b3a4d",
    grayishBlue: "#14222F",
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
    light: "#AB9FF1",
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
    medium: "#F1A495",
    dark: "#FF8A8A",
  },
  koromiko: {
    light: "#FFDCA7",
    dark: "#FCBF63",
  },
  green: {
    light: "#4FD3C4",
    main: "#22c55e", // text-green-500
    dark: "#3C6B5A",
  },
  red: {
    light: "#FC997C",
    main: "#ef4444", // text-red-500
  },
  cadet: {
    blue: {
      light: "#a9b8ca",
      dark: "#4475af",
    },
  },
  orange: {
    main: "#F8652E",
  },
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        text: "5px 3px 3px #000000",
        lightText: "2px 3px 0px #00000047",
      },
      borderRadius: {
        "4xl": "35px",
      },
      rotate: {
        "27": "27deg",
      },
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      backgroundImage: {
        "olive-to-blue-gradient":
          "linear-gradient(90deg, #A1AB2A 20%, #95A33D 40%, #899B51 60%, #899B51 80%, #5A799E 100%)",
        "teal-to-blue-gradient":
          "linear-gradient(90deg, #4FD3C4 20%, #52BDBB 40%, #53B1B6 60%, #55A6B1 80%, #5A799E 100%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: colors,
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
export { colors };
