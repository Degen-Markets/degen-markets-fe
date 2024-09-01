import { PropsWithChildren } from "react";
import cx from "classnames";

interface Props extends PropsWithChildren {
  className?: string;
  isHome?: boolean;
}

const Wrapper = ({ children, className, isHome = false }: Props) => {
  return (
    <div
      className={twMerge(
        "md:mx-auto md:max-w-screen-xl lg:max-w-screen-2xl px-4 lg:px-6",
        {
          "my-20 bg-gradient-to-t from-purple-light to-black-medium pb-40":
            isHome,
        },
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Wrapper;
