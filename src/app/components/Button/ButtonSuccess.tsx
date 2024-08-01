import { FC } from "react";
import { Button, ButtonProps } from "@/app/components/Button/Button";

export const ButtonSuccess: FC<ButtonProps> = ({
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
      className={`bg-green-light text-black-medium hover:bg-green-main active:bg-green-main disabled:bg-opacity-50 disabled:text-opacity-50 w-full ${className}`}
    >
      {children}
    </Button>
  );
};
