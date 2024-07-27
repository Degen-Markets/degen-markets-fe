import { FC, ReactNode } from "react";

const Badge: FC<{ children: ReactNode }> = ({ children }) => (
  <span className="absolute top-0 right-0 z-10 font-extrabold text-[8px] border border-black-medium rounded px-1 py-0 h-4 flex justify-center items-center text-black-medium bg-gradient-to-r from-pink-light via-vivid-medium to-yellow-light">
    {children}
  </span>
);
export default Badge;
