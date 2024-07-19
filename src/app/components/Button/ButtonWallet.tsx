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
      className={`lg:w-56 w-full font-semibold rounded-full text-white bg-gradient-to-r border from-pink-light via-vivid-medium to-yellow-light ${className}`}
    >
      {children}
    </Button>
  );
};
