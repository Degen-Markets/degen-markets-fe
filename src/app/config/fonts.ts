import { Open_Sans, Montserrat } from "next/font/google";

export const montserrat = Montserrat({
  weight: ["400", "600"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--headline-font-family",
});

export const openSans = Open_Sans({
  weight: ["400", "600"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--body-font-family",
});
