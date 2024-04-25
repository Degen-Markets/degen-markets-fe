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
    <div className={cx("relative bg-blue-dark text-center", className)}>
      <div
        className={`bg-blue-dark py-12 inline-block text-8xl px-6 after:absolute after:bg-inherit after:h-[80%] after:w-4 after:-right-4 after:top-[50%] after:translate-y-[-50%] before:absolute before:bg-inherit before:h-[80%] before:w-4 before:-left-4 before:top-[50%] before:translate-y-[-50%]`}
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
          "absolute mt-0 left-[50%] -translate-x-[50%] -top-[50%] translate-y-[70%] ":
            isTop,
        },
      )}
    >
      {children}
    </div>
  );
};

export { Heading, Headline, SubHeadline };
