import { FC, PropsWithChildren } from "react";
import Image from "next/image";
import Wrapper from "@/app/components/Wrapper";
import { twMerge } from "tailwind-merge";

const BetLayout: FC<
  {
    className?: string;
    leftImage?: string;
    rightImage?: string;
  } & PropsWithChildren
> = ({
  children,
  className,
  leftImage = "/bear.png",
  rightImage = "/bull.png",
}) => {
  return (
    <main className="w-full">
      <Wrapper
        className={twMerge(
          "lg:max-w-screen-md min-h-[calc(100vh-424px)]",
          className,
        )}
      >
        {children}
      </Wrapper>
    </main>
  );
};

export default BetLayout;
