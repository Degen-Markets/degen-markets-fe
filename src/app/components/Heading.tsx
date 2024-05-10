import { FC, PropsWithChildren } from "react";
import cx from "classnames";

const Heading: FC<
  { className?: string; color?: string } & PropsWithChildren
> = ({ children, className }) => {
  return (
    <div className={cx("relative text-white w-[80%] md:w-auto", className)}>
      {children}
    </div>
  );
};

const Headline: FC<
  { className?: string; color?: string } & PropsWithChildren
> = ({ children, className, color = "blue-dark" }) => {
  return (
    <div className={cx("relative text-3xl md:text-8xl", className)}>
      <div
        className={`eight-bit-border-20 border-white  py-8 px-6 text-center bg-${color}`}
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
        "bg-blue-dark  p-2 border-2 border-purple-medium inline-block -translate-y-1/2",
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
