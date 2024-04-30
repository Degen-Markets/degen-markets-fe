import { FC } from "react";
import { Button, ButtonProps } from "@/app/components/Button/Button";

export const ButtonSecondary: FC<ButtonProps> = ({
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
      className={`bg-blue-dark hover:bg-[#131921] hover:shadow-button-secondary-hover active:bg-[#131921] active:shadow-button-secondary-hover disabled:bg-neutral-500 disabled:text-neutral-400 shadow-button-secondary ${className}`}
    >
      {children}
    </Button>
  );
};
