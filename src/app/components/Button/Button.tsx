import { ButtonHTMLAttributes, FC } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  customStyle?: string;
  size: "regular" | "small";
}

export const Button: FC<ButtonProps> = ({
  className,
  children,
  size,
  customStyle = "",
  ...props
}) => {
  const buttonSize = size === "regular" ? "h-10 md:h-12" : "h-8 md:h-10";

  return (
    <button
      className={`text-white py-2 px-2 md:px-4 shadow-button flex items-center justify-center active:shadow-button-pressed my-auto ${className} ${buttonSize}`}
      {...props}
    >
      {children}
    </button>
  );
};
