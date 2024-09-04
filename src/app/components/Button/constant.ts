import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "text-white rounded-lg py-2 px-2 md:px-4 flex items-center justify-center uppercase font-bold",
  {
    variants: {
      intent: {
        main: "text-white rounded-lg bg-black-medium hover:bg-black-dark active:bg-black-dark disabled:bg-opacity-50 disabled:text-opacity-50  py-2 px-2 md:px-4 flex items-center justify-center disabled:text-white uppercase font-bold",
        primary: "bg-purple-medium hover:bg-purple-600 active:bg-purple-600",
        secondary: "bg-blue-dark hover:bg-[#131921] active:bg-[#131921]",
        danger:
          "bg-red-light text-black-medium hover:bg-red-main active:bg-red-main",
        success:
          "bg-green-light text-black-medium hover:bg-green-main active:bg-green-main ",
        transparent: "hover:bg-neutral-950/10 active:bg-neutral-950/10",
        gradient:
          "bg-gradient-to-r from-pink-light to bg-yellow-light hover:from-yellow-light hover:to-pink-light active:from-yellow-light active:to-pink-light",
        wallet:
          "lg:w-56 w-full font-semibold rounded-full text-white bg-gradient-to-r border from-pink-light via-vivid-medium to-yellow-light",
      },
      size: {
        regular: "h-10 md:h-12",
        small: "h-8 md:h-10",
      },
    },
    defaultVariants: {
      intent: "main",
      size: "regular",
    },
  },
);
