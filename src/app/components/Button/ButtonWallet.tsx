import { FC } from "react";
import { Button, ButtonProps } from "@/app/components/Button/Button";

export const WalletButton: FC<ButtonProps> = ({
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
      className={`lg:w-56 w-full text-white bg-gradient-to-r  from-cadet-blue-light to-cadet-blue-dark hover:from-cadet-blue-dark hover:to-cadet-blue-light  disabled:bg-neutral-500 disabled:text-prussian-dark ${className}`}
    >
      {children}
    </Button>
  );
};
