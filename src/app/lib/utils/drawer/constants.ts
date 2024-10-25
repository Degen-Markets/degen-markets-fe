import { cva } from "class-variance-authority";

export const drawerVariants = cva(
  "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] bg-steel-gray px-5 md:px-10 pt-2 pb-4",
  {
    variants: {
      variant: {
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const drawerOverlayVariants = cva(
  "fixed inset-0 z-50 transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in",
  {
    variants: {
      variant: {
        default: "bg-main/10 backdrop-blur-lg",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);
