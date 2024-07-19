import { FC } from "react";
import { Button, ButtonProps } from "@/app/components/Button/Button";

export const ButtonDanger: FC<ButtonProps> = ({
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
      className={`bg-red-light text-black-medium hover:bg-red-main active:bg-red-main disabled:bg-opacity-50 disabled:text-opacity-50 ${className}`}
    >
      {children}
    </Button>
  );
};
