import { ButtonHTMLAttributes, FC } from "react";
import PixelArtLoader from "../PixelArtLoading";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  customStyle?: string;
  size: "regular" | "small";
  loader?: boolean;
  isPending?: boolean;
  isProcessing?: boolean;
  pendingText?: string;
  processingText?: string;
}

export const Button: FC<ButtonProps> = ({
  className,
  children,
  size,
  customStyle = "",
  loader = false,
  isPending,
  isProcessing,
  pendingText = "Pending...",
  processingText = "Processing...",
  ...props
}) => {
  const buttonSize = size === "regular" ? "h-10 md:h-12" : "h-8 md:h-10";
  const isIdle = !isProcessing && !isPending;

  return (
    <button
      className={twMerge(
        "text-white bg-black-medium  hover:bg-black-dark active:bg-black-dark disabled:bg-opacity-50 disabled:text-opacity-50  py-2 px-2 md:px-4 flex items-center justify-center disabled:text-white",
        className,
        buttonSize,
      )}
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
