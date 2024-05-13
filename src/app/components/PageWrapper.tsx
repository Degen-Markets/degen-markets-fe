import { ReactNode, FC } from "react";

const PageWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div
      style={{ minHeight: "calc(100% - 88px)" }}
      className="py-[60px] lg:py-[120px]"
    >
      {children}
    </div>
  );
};

export default PageWrapper;
