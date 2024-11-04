import { VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactElement } from "react";
import { ButtonIntentType, ButtonSizeType, buttonVariants } from "./constants";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  customStyle?: string;
  loading?: boolean;
  loadingText?: string;
  icon?: ReactElement;
  hideLabelOnMobile?: boolean;
  href?: string;
}

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  intent: ButtonIntentType;
  className?: string;
  size?: ButtonSizeType;
  label: string;
  icon?: ReactElement;
  href?: string;
  hideLabelOnMobile?: boolean;
}
