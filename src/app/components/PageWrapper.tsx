import { ReactNode } from "react";

const PageWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div
      className="flex w-full items-center justify-center"
      style={{ minHeight: "calc(100% - 88px)" }}
    >
      {children}
    </div>
  );
};

export default PageWrapper;
