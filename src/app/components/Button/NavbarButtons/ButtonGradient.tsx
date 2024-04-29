import React, { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { className } from "postcss-selector-parser";

export interface NavbarButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const NavbarButton: FC<NavbarButtonProps> = ({ children, ...props }) => (
  <button {...props} className={`px-3 ${className}`} {...props}>
    <div className="group px-3 py-2 w-[calc(100%+10px)] relative block uppercase text-neutral-950 bg-gradient-to-l from-pink-light to-yellow-light hover:from-yellow-light hover:to-pink-light z-10">
      <span className="absolute inset-x-[-10px] top-2.5 bottom-2.5 -z-10 bg-gradient-to-l from-pink-light to-yellow-light group-hover:from-yellow-light group-hover:to-pink-light"></span>
      <span className="absolute inset-x-[-6px] top-1 bottom-1 -z-10 bg-gradient-to-l from-pink-light to-yellow-light group-hover:from-yellow-light group-hover:to-pink-light"></span>
      {children}
    </div>
  </button>
);
