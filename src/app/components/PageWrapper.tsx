import { ReactNode, FC } from "react";

const PageWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="flex-1 pt-24">{children}</div>;
};

export default PageWrapper;
