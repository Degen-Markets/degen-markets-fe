import React, { useEffect } from "react";
import { IoClose, IoMenu } from "react-icons/io5";

import { NavbarDesktop } from "./Navbar/NavbarDesktop";
import { NavbarMobile } from "./Navbar/NavbarMobile";

const Navbar: React.FC<{
  nav: boolean;
  setNav: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ nav, setNav }) => {
  useEffect(() => {
    if (nav) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    // Clean up the effect when the component unmounts
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [nav]);

  return (
    <>
      <NavbarDesktop />
      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer z-10 md:hidden ml-auto"
      >
        {nav ? (
          <IoClose size={30} className="text-black-medium" />
        ) : (
          <IoMenu size={30} />
        )}
      </div>
      {nav && <NavbarMobile nav={nav} setNav={setNav} />}
    </>
  );
};

export default Navbar;
