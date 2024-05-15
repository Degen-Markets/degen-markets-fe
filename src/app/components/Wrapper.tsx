import { PropsWithChildren } from "react";
import cx from "classnames";

interface Props extends PropsWithChildren {
  className?: string;
}

const Wrapper = ({ children, className }: Props) => {
  return (
    <div className={cx("w-full", className)}>
      <div className="mx-auto flex max-w-screen-xl flex-wrap px-4 lg:px-6 items-center justify-between">
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
