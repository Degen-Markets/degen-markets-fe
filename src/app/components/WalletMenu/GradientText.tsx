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
      className={`bg-clip-text text-transparent bg-gradient-to-r from-pink-light via-vivid-medium to-yellow-light ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default GradientText;
