import { FC, ElementType } from "react";
import Link from "next/link";
import PixelArtLoader from "../PixelArtLoading";
import { twMerge } from "tailwind-merge";
import { ButtonProps } from "./type";
import { buttonVariants } from "./constant";

interface PolymorphicButtonProps extends ButtonProps {
  as?: ElementType;
  href?: string;
}

export const Button: FC<PolymorphicButtonProps> = ({
  as: Component = "button",
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
  icon,
  href,
  ...props
}) => {
  const isIdle = !isProcessing && !isPending;

  const isLink = Component === "a" && href;

  const anchorProps = isLink ? { ...props } : {};

  return isLink ? (
    <Link
      href={href}
      passHref
      className={twMerge(
        buttonVariants({ size, intent }),
        className,
        customStyle,
      )}
      {...anchorProps}
    >
      {isIdle && icon && <span className="pr-2">{icon}</span>}
      {isIdle && children}
      {isPending && loader && (
        <PixelArtLoader text={pendingText} textSize="2xl" />
      )}
      {isProcessing && loader && (
        <PixelArtLoader text={processingText} textSize="2xl" />
      )}
    </Link>
  ) : (
    <Component
      className={twMerge(
        buttonVariants({ size, intent }),
        className,
        customStyle,
      )}
      disabled={isProcessing || isPending}
      {...props}
    >
      {isIdle && icon && <span className="pr-2">{icon}</span>}
      {isIdle && children}
      {isPending && loader && (
        <PixelArtLoader text={pendingText} textSize="2xl" />
      )}
      {isProcessing && loader && (
        <PixelArtLoader text={processingText} textSize="2xl" />
      )}
    </Component>
  );
};
