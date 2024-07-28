import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "text-prussian-dark py-2 px-2 md:px-4 shadow-button flex items-center justify-center active:shadow-button-pressed disabled:text-white",
  {
    variants: {
      size: {
        regular: "h-10 md:h-12",
        small: "h-8 md:h-10",
      },
      variant: {
        gradient:
          "bg-gradient-to-r from-pink-light to bg-yellow-light hover:from-yellow-light hover:to-pink-light active:from-yellow-light active:to-pink-light disabled:bg-neutral-500 disabled:text-prussian-dark",
        primary:
          "bg-purple-medium text-white hover:bg-purple-600 active:bg-purple-600 disabled:bg-opacity-50 disabled:text-opacity-50",
        secondary:
          "bg-blue-dark hover:bg-[#131921] hover:shadow-button-secondary-hover active:bg-[#131921] active:shadow-button-secondary-hover disabled:bg-neutral-500 disabled:text-neutral-400 shadow-button-secondary text-white",
        transparent:
          "disabled:border-neutral-500 disabled:text-neutral-400 hover:bg-neutral-950/10 active:bg-neutral-950/10",
        wallet:
          "lg:w-56 w-full text-white bg-gradient-to-r from-cadet-blue-light to-cadet-blue-dark hover:from-cadet-blue-dark hover:to-cadet-blue-light disabled:bg-neutral-500 disabled:text-prussian-dark",
        success:
          "bg-green-light text-black-medium hover:bg-green-main active:bg-green-main disabled:bg-opacity-50 disabled:text-opacity-50",
        danger:
          "bg-red-light text-black-medium hover:bg-red-main active:bg-red-main disabled:bg-opacity-50 disabled:text-opacity-50 ",
      },
    },
    defaultVariants: {
      size: "regular",
    },
  },
);
