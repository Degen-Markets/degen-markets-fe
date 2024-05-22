import { FC } from "react";
import { Button, ButtonProps } from "@/app/components/Button/Button";

export const ButtonGradient: FC<ButtonProps> = ({
  className,
  children,
  size,
  customStyle = "",
  ...props
}) => {
  return (
    <Button
      size={size}
      {...props}
      className={`bg-gradient-to-r from-pink-light to bg-yellow-light hover:from-yellow-light hover:to-pink-light active:from-yellow-light active:to-pink-light disabled:bg-neutral-500 disabled:text-neutral-400 !text-neutral-900 ${className}`}
    >
      {children}
    </Button>
  );
};
