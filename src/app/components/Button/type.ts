import { VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactElement } from "react";
import { ButtonIntentType, ButtonSizeType, buttonVariants } from "./constant";

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

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  intent: ButtonIntentType;
  className?: string;
  size?: ButtonSizeType;
  label: string;
  icon?: ReactElement;
  href?: string;
  hideLabelOnMobile?: boolean;
}
