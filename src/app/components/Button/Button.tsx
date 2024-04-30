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
  const buttonSize = size === "regular" ? "h-12" : "h-10";

  return (
    <div>
      <button
        className={`text-white py-2 px-4 shadow-button-secondary flex items-center justify-center active:shadow-button-pressed ${className} ${buttonSize}`}
        {...props}
      >
        {children}
      </button>
    </div>
  );
};
