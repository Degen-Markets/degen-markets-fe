import React from "react";
import { CrossIcon, HamburgerIcon } from "@/app/components/Icons";
import { NavbarDesktop } from "./Navbar/NavbarDesktop";
import { NavbarMobile } from "./Navbar/NavbarMobile";

const Navbar: React.FC<{
  nav: boolean;
  setNav: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ nav, setNav }) => {
  return (
    <>
      <NavbarDesktop />
      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer z-50 md:hidden ml-auto"
      >
        {nav ? (
          <div className="text-black-medium">
            <CrossIcon />
          </div>
        ) : (
          <div>
            <HamburgerIcon />
          </div>
        )}
      </div>
      {nav && <NavbarMobile nav={nav} setNav={setNav} />}
    </>
  );
};

export default Navbar;
