import React, { ReactNode } from "react";

const GradientText = ({
  children,
  className,
  ...props
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={` bg-clip-text text-transparent bg-gradient-to-r from-[#ED71BF] via-[#F1A495] to-[#F9DB72] ${className} `}
      {...props}
    >
      {children}
    </div>
  );
};

export default GradientText;
