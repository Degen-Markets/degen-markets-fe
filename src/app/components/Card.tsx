import { FC, HTMLAttributes, PropsWithChildren, ReactElement } from "react";
import { twMerge } from "tailwind-merge";

interface CardHeadingProps {
  icon?: ReactElement;
  bordered?: boolean;
  className?: string;
}

const CardHeading: FC<CardHeadingProps & PropsWithChildren> = ({
  children,
  icon,
  bordered = true,
  className,
}) => {
  return (
    <div
      className={twMerge(
        "flex gap-x-2 text-xl lg:text-3xl font-bold pb-4 border-black-dark w-full",
        bordered && "mb-8 border-b",
        className,
      )}
    >
      {icon && <div className="flex-shrink-0">{icon}</div>}
      <span className="drop-shadow-md">{children}</span>
    </div>
  );
};

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Card: FC<CardProps & PropsWithChildren> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        "flex flex-col items-start bg-blue-light bg-opacity-20 py-4 px-6 lg:py-6 lg:px-8",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { Card, CardHeading };
