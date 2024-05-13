import { FC, PropsWithChildren } from "react";
import cx from "classnames";

const Heading: FC<{ className?: string } & PropsWithChildren> = ({
  children,
  className,
}) => {
  return (
    <div className={cx("relative text-white w-[80%] md:w-auto", className)}>
      {children}
    </div>
  );
};

const Headline: FC<
  { className?: string; variant?: "light" | "dark" } & PropsWithChildren
> = ({ children, className, variant = "dark" }) => {
  return (
    <div className={cx("relative text-3xl md:text-8xl", className)}>
      <div
        className={cx(
          " py-8 px-6 text-center",
          { "pixel-art-border-lg-dark bg-blue-dark ": variant === "dark" },
          { "pixel-art-border-lg-light bg-white ": variant === "light" },
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
        "bg-blue-dark  p-2 border-4 border-purple-medium inline-block -translate-y-1/2",
        className,
        {
          "absolute mt-0 left-[50%] -translate-x-[50%] -top-[20px] -translate-y-1/2":
            isTop,
        },
      )}
    >
      {children}
    </div>
  );
};

export { Heading, Headline, SubHeadline };
