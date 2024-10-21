import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { ButtonProps } from "./type";
import { buttonVariants } from "./constant";
import Loader from "@/app/components/Icons/Loader";

export const Button: FC<ButtonProps> = ({
  disabled,
  className,
  children,
  size,
  intent,
  loading = false,
  loadingText = "Processing...",
  icon,
  ...props
}) => {
  const isDisabled = loading || disabled;

  return (
    <button
      className={twMerge(buttonVariants({ size, intent }), className)}
      disabled={isDisabled}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {loading && <Loader />}
        {loading ? loadingText : children}
        {!loading && icon}
      </div>
    </button>
  );
};
