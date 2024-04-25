import { FC, PropsWithChildren } from "react";
import cx from "classnames";

const Heading: FC<{ className?: string } & PropsWithChildren> = ({
  children,
  className,
}) => {
  return <div className={cx("relative text-white", className)}>{children}</div>;
};

const Headline: FC<{ className?: string } & PropsWithChildren> = ({
  children,
  className,
}) => {
  return (
    <div className={cx("relative", className)}>
      <div
        className={`eight-bit-border-20 bg-blue-dark py-8 text-8xl px-6 text-center`}
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
        "bg-blue-dark  p-2 border-2 border-pink-light inline-block mt-8 ",
        className,
        {
          "absolute mt-0 left-[50%] -translate-x-[50%] -top-[50%] translate-y-[calc(50%-10px)]":
            isTop,
        },
      )}
    >
      {children}
    </div>
  );
};

export { Heading, Headline, SubHeadline };
