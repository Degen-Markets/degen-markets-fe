import { FC, PropsWithChildren } from "react";
import Image from "next/image";
import Wrapper from "@/app/components/Wrapper";
import { twMerge } from "tailwind-merge";

const BetLayout: FC<
  {
    className?: string;
  } & PropsWithChildren
> = ({ children, className }) => {
  return (
    <main className="w-full">
      <Wrapper className={twMerge("", className)}>{children}</Wrapper>
    </main>
  );
};

export default BetLayout;
