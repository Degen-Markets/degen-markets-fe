import React, { useEffect } from "react";
import { NavbarDesktop } from "./Navbar/NavbarDesktop";
import { NavbarMobile } from "./Navbar/NavbarMobile";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

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
          <XMarkIcon width={30} className="text-white" />
        ) : (
          <Bars3Icon width={30} />
        )}
      </div>
      {nav && <NavbarMobile nav={nav} setNav={setNav} />}
    </>
  );
};

export default Navbar;
