import { FC, ReactNode } from "react";

const PageWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="flex-1 w-full">{children}</div>;
};

export default PageWrapper;
