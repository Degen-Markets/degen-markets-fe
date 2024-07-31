import React, { ReactNode } from "react";

const BetOutComeBox = ({
  bgImage,
  children,
}: {
  bgImage: string;
  children: ReactNode;
}) => {
  return (
    <div className="relative h-12 w-full rounded-xl border-2 flex items-center justify-center">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat bg-opacity-25 opacity-25 rounded-xl"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      />
      <div className="z-10 text-sm lg:text-lg">{children}</div>
    </div>
  );
};

export default BetOutComeBox;
