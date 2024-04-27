import { FC } from "react";
import { Button, ButtonProps } from "@/app/components/Button/Button";

export const ButtonPrimary: FC<ButtonProps> = ({
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
      className={`bg-purple-500 hover:bg-purple-600 active:bg-purple-600 disabled:bg-neutral-500 disabled:text-neutral-400 ${className}`}
    >
      {children}
    </Button>
  );
};
