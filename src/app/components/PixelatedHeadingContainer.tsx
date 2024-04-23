import React, { PropsWithChildren, ReactNode } from "react";

const PixelatedHeadingContainer: React.FC<
  { classNames: string } & PropsWithChildren
> = ({ children, classNames }) => {
  return (
    <div className={`relative bg-blue-dark py-20 ${classNames}`}>
      <div className="text-center py-2">
        <div className="absolute items-center top-[50%] translate-y-[calc(50%-150px)] bg-blue-dark w-[calc(100%+32px)] h-[150px] left-[50%] -translate-x-[50%]">
          <div className="text-8xl flex items-center h-full justify-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PixelatedHeadingContainer;
