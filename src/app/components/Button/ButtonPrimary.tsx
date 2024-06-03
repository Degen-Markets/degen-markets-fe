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
      className={`bg-purple-medium text-white hover:bg-purple-600 active:bg-purple-600 disabled:bg-opacity-50 disabled:text-opacity-50 ${className}`}
    >
      {children}
    </Button>
  );
};
