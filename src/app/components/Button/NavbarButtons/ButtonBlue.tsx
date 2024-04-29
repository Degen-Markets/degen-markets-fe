import React, { FC } from "react";
import { className } from "postcss-selector-parser";
import { NavbarButtonProps } from "@/app/components/Button/NavbarButtons/ButtonGradient";

export const ButtonBlue: FC<NavbarButtonProps> = ({ children, ...props }) => (
  <button {...props} className={`px-3 ${className}`} {...props}>
    <div className="group px-3 py-2 w-[calc(100%+10px)] relative block uppercase text-neutral-50 bg-blue-dark z-10">
      <span className="absolute inset-x-[-10px] top-2.5 bottom-2.5 -z-10 text-neutral-50 bg-blue-dark "></span>
      <span className="absolute inset-x-[-6px] top-1 bottom-1 -z-10 text-neutral-50 bg-blue-dark "></span>
      {children}
    </div>
  </button>
);
