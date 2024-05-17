import { PropsWithChildren } from "react";
import cx from "classnames";

interface Props extends PropsWithChildren {
  className?: string;
}

const Wrapper = ({ children, className }: Props) => {
  return (
    <div className="w-full">
      <div className={cx("mx-auto  max-w-screen-xl px-4 lg:px-6", className)}>
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
