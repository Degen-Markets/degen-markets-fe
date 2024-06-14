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
      <div className="absolute top-[200px] right-0 -z-[1] hidden sm:block">
        <Image src={rightImage} width={300} height={300} alt="Bull" />
      </div>
      <div className="absolute top-[200px] left-0 -z-[1] hidden sm:block">
        <Image src="/left-cloud.png" width={574} height={208} alt="Bull" />
      </div>
      <div className="absolute top-[700px] right-0 -z-[1] hidden sm:block">
        <Image src="/right-cloud.png" width={346} height={198} alt="Bull" />
      </div>
      <div className="absolute top-[700px] left-0 -z-[1] hidden sm:block">
        <Image src={leftImage} width={300} height={300} alt="Bear" />
      </div>
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
