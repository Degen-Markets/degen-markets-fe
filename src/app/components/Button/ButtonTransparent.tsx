import { FC } from "react";
import { Button, ButtonProps } from "@/app/components/Button/Button";

export const ButtonTransparent: FC<ButtonProps> = ({
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
      className={`disabled:border-neutral-500 disabled:text-neutral-400 hover:bg-neutral-950/10 active:bg-neutral-950/10 ${className}`}
    >
      {children}
    </Button>
  );
};
