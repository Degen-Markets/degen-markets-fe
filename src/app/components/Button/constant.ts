import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  "flex items-center justify-center rounded-full py-2 px-2 md:px-4 text-white text-base disabled:bg-opacity-50 disabled:text-opacity-50 disabled:pointer-events-none",
  {
    variants: {
      intent: {
        main: "bg-primary hover:bg-primary-light active:bg-primary-light text-main",
        primary:
          "bg-primary hover:bg-primary-light active:bg-primary-light text-main",
        outlineWhite:
          "bg-transparent border-2 border-white hover:bg-white active:bg-white hover:text-main active:text-main",
        outline:
          "bg-transparent border-2 border-primary hover:bg-primary active:bg-primary hover:text-main active:text-main text-primary active:text-main",
        secondary: "bg-secondary hover:bg-opacity-80 active:bg-opacity-80",
        danger:
          "bg-danger text-main hover:bg-danger-light active:bg-danger-light",
        success:
          "bg-success text-main hover:bg-bg-success-light active:bg-success-light",
        transparent: "hover:bg-neutral-950/10 active:bg-neutral-950/10",
      },
      size: {
        regular: "text-lg md:text-xl",
        small: "text-md md:text-lg py-1",
      },
    },
    defaultVariants: {
      intent: "main",
      size: "regular",
    },
  },
);
