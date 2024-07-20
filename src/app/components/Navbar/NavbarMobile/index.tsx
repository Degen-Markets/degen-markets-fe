import React, { useMemo } from "react";
import Link from "next/link";
import NavigationRoutes from "@/app/lib/utils/NavigationRoutes";
import NavbarMobileItem from "./NavbarMobileItem";
import { Web3Status } from "../../Dialog/Web3Status";

export const NavbarMobile: React.FC<{
  nav: boolean;
  setNav: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ nav, setNav }) => {
  const sortedRoutes = useMemo(() => {
    return [...NavigationRoutes.header.navbar].sort((a, b) => {
      if (a.comingSoon && !b.comingSoon) return 1;
      if (!a.comingSoon && b.comingSoon) return -1;
      return 0;
    });
  }, []);

  return (
    <>
      <div
        onClick={() => setNav(!nav)}
        className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900 h-dvh bg-opacity-80 z-40"
      ></div>
      <div className="flex flex-col absolute top-0 right-0 w-3/4 md:w-[40%] h-dvh bg-neutral-100 text-neutral-800 px-2 z-40 overflow-y-auto">
        <ul className="mt-12 space-y-5 ">
          {sortedRoutes.map((route) => (
            <NavbarMobileItem key={route.name} route={route} setNav={setNav} />
          ))}
        </ul>

        <div className="cursor-pointer uppercase py-4 tracking-wider text-base w-full">
          <Web3Status setNav={setNav} />
        </div>
        <div className="mt-auto bg-[#202b38] text-white">
          <div className="px-6 cursor-pointer uppercase font-oswald py-4 tracking-wider text-base">
            <Link href="https://twitter.com/DEGEN_MARKETS" target="_blank">
              <div>Twitter</div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
