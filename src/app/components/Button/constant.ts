import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "flex items-center justify-center rounded-full py-2 px-2 md:px-4 text-white text-base disabled:bg-opacity-50 disabled:text-opacity-50 disabled:pointer-events-none",
  {
    variants: {
      intent: {
        main: "bg-black-medium hover:bg-black-dark active:bg-black-dark uppercase font-bold",
        primary:
          "bg-primary hover:bg-purple-600 active:bg-purple-600 text-main",
        outline:
          "bg-transparent border-2 border-white hover:bg-white active:bg-white hover:text-main active:text-main",
        secondary: "bg-blue-dark hover:bg-[#131921] active:bg-[#131921]",
        danger:
          "bg-red-light text-black-medium hover:bg-red-main active:bg-red-main",
        success:
          "bg-green-light text-black-medium hover:bg-green-main active:bg-green-main",
        transparent: "hover:bg-neutral-950/10 active:bg-neutral-950/10",
        gradient:
          "bg-gradient-to-r from-pink-light to-yellow-light hover:from-yellow-light hover:to-pink-light active:from-yellow-light active:to-pink-light",
        wallet:
          "w-full lg:w-56 font-semibold rounded-full text-white bg-gradient-to-r from-pink-light via-vivid-medium to-yellow-light",
      },
      size: {
        regular: "text-lg md:text-xl",
        small: "text-md md:text-lg",
      },
    },
    defaultVariants: {
      intent: "main",
      size: "regular",
    },
  },
);
