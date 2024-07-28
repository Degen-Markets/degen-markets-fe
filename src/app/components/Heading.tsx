import { FC, PropsWithChildren } from "react";
import cx from "classnames";

const Heading: FC<{ className?: string } & PropsWithChildren> = ({
  children,
  className,
}) => {
  return (
    <div className={cx("relative text-white md:mx-5", className)}>
      {children}
    </div>
  );
};

const Headline: FC<
  {
    className?: string;
    variant?: "light" | "dark";
    size?: "regular" | "compact";
    textShadow?: boolean;
  } & PropsWithChildren
> = ({
  children,
  className,
  variant = "dark",
  size = "regular",
  textShadow = true,
}) => {
  return (
    <div className={cx("relative text-4xl md:text-6xl font-bold", className)}>
      <div
        className={cx(
          "text-center uppercase",
          {
            "py-8 px-6": variant === "dark" && size === "regular",
          },
          {
            "bg-white text-prussian-dark border rounded-xl  py-8 px-6":
              variant === "light" && size === "regular",
          },
          {
            "bg-prussian-dark border rounded-xl py-2 px-1":
              variant === "dark" && size === "compact",
          },
          {
            "bg-white text-prussian-dark py-2 px-1":
              variant === "light" && size === "compact",
          },
          {
            "drop-shadow-text": textShadow,
          },
        )}
      >
        {children}
      </div>
    </div>
  );
};

const SubHeadline: FC<
  { className?: string; isTop?: boolean } & PropsWithChildren
> = ({ children, className, isTop }) => {
  return (
    <div
      className={cx(
        "absolute p-2 border font-bold text-sm rounded-xl inline-block -translate-y-1/5 -translate-x-1/2  bg-blue-light bg-opacity-20",
        className,
        {
          "absolute mt-0 left-[50%] -translate-x-[50%] -top-5 -translate-y-1/2 rounded-t-none":
            isTop,
        },
      )}
    >
      {children}
    </div>
  );
};

export { Heading, Headline, SubHeadline };
