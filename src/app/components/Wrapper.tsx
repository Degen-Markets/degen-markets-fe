import { PropsWithChildren } from "react";
import cx from "classnames";
import { twMerge } from "tailwind-merge";

interface Props extends PropsWithChildren {
  className?: string;
  isHome?: boolean;
}

const Wrapper = ({ children, className }: Props) => {
  return (
    <div
      className={twMerge(
        "md:mx-auto md:max-w-screen-xl lg:max-w-screen-2xl px-4 lg:px-12",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Wrapper;
