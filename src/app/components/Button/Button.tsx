import { FC } from "react";
import Link from "next/link";
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
  href, // Add href prop to support links
  ...props
}) => {
  const isIdle = !isProcessing && !isPending;
  const buttonContent = (
    <>
      {isIdle && children}
      {isPending && loader && (
        <PixelArtLoader text={pendingText} textSize="2xl" />
      )}
      {isProcessing && loader && (
        <PixelArtLoader text={processingText} textSize="2xl" />
      )}
    </>
  );

  const mergedClasses = twMerge(
    buttonVariants({ size, intent }),
    className,
    customStyle,
  );

  return href ? (
    <Link href={href}>
      <button
        className={mergedClasses}
        disabled={isProcessing || isPending}
        {...props}
      >
        {buttonContent}
      </button>
    </Link>
  ) : (
    <button
      className={mergedClasses}
      disabled={isProcessing || isPending}
      {...props}
    >
      {buttonContent}
    </button>
  );
};
