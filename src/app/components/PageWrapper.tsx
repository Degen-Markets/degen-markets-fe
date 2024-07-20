import { ReactNode, FC } from "react";

const PageWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="flex-1 pt-4 lg:py-24 w-full">{children}</div>;
};

export default PageWrapper;
