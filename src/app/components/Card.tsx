import { FC, HTMLAttributes, PropsWithChildren, ReactElement } from "react";
import { twMerge } from "tailwind-merge";

interface CardHeadingProps {
  icon?: ReactElement;
}

const CardHeading: FC<CardHeadingProps & PropsWithChildren> = ({
  children,
  icon,
}) => {
  return (
    <div className="flex gap-x-2 text-xl lg:text-4xl font-bold pb-4 mb-8 border-b border-black-dark w-full">
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
