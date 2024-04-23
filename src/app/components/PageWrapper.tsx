import { ReactNode } from "react";

const PageWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div style={{ minHeight: "calc(100% - 88px)" }}>{children}</div>;
};

export default PageWrapper;
