import plugin from "tailwindcss/plugin";

const pixelArtBorderPlugin = plugin(function ({ addUtilities }) {
  addUtilities({
    ".pixel-art-border-lg-light": {
      boxShadow: `
        20px 0 white,
        -20px 0 white,
        0 -20px white,
        0 20px white
      `,
      margin: `20px auto`,
    },
    ".pixel-art-border-lg-dark": {
      boxShadow: `
        20px 0 #222b37,
        -20px 0 #222b37,
        0 -20px #222b37,
        0 20px #222b37
      `,
      margin: `20px auto`,
    },
  });
});
export default pixelArtBorderPlugin;
