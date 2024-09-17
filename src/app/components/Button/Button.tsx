import { FC } from "react";
import PixelArtLoader from "../PixelArtLoading";
import { twMerge } from "tailwind-merge";
import { ButtonProps } from "./type";
import { buttonVariants } from "./constant";

export const Button: FC<ButtonProps> = ({
  className,
  children,
  size,
  intent,
  customStyle = "",
  loader = false,
  isPending,
  isProcessing,
  pendingText = "Pending...",
  processingText = "Processing...",
  ...props
}) => {
  const isIdle = !isProcessing && !isPending;

  return (
    <button
      className={twMerge(
        buttonVariants({ size, intent }),
        className,
        customStyle,
      )}
      disabled={isProcessing || isPending}
      {...props}
    >
      {isIdle && children}
      {isPending && loader && (
        <PixelArtLoader text={pendingText} textSize="2xl" />
      )}
      {isProcessing && loader && (
        <PixelArtLoader text={processingText} textSize="2xl" />
      )}
    </button>
  );
};
