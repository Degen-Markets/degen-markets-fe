import { VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactElement } from "react";
import { buttonVariants } from "./constant";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  customStyle?: string;
  loader?: boolean;
  isPending?: boolean;
  isProcessing?: boolean;
  pendingText?: string;
  processingText?: string;
  icon?: ReactElement;
}
