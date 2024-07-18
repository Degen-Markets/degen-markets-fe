import React from "react";
import Link from "next/link";
import { Button, ButtonSecondary } from "@/app/components/Button";
import { CrossIcon, HamburgerIcon } from "@/app/components/Icons";
import { Web3Status } from "./Dialog/Web3Status";
import NavigationRoutes from "../lib/utils/NavigationRoutes";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

const Navbar: React.FC<{
  nav: boolean;
  setNav: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ nav, setNav }) => {
  return (
    <>
      <div className="hidden w-full gap-x-4 md:flex items-center md:justify-center lg:justify-between">
        <ul className="flex items-center space-x-10">
          {NavigationRoutes.header.navbar.map((route) => (
            <li
              key={route.name}
              className={
                route.comingSoon
                  ? " opacity-35 cursor-not-allowed relative"
                  : ""
              }
            >
              {route.comingSoon ? (
                <div className="flex justify-center items-center space-x-2 relative">
                  <Image
                    src={route.icon}
                    alt={route.icon}
                    width={30}
                    height={30}
                  />
                  <p className="font-bold uppercase drop-shadow lg:text-xl xl:text-2xl">
                    {route.name}
                  </p>
                  <span className="absolute -top-1 -right-5 z-10 text-[8px] border rounded px-1 py-0 h-4 flex justify-center items-center   bg-gradient-to-r from-[#ED71BF] via-[#F1A495] to-[#F9DB72]">
                    Soon
                  </span>
                </div>
              ) : (
                <Link href={route.route}>
                  <div className="flex justify-center items-center space-x-2">
                    <Image
                      src={route.icon}
                      alt={route.icon}
                      width={30}
                      height={30}
                    />
                    <p className="font-bold uppercase drop-shadow lg:text-xl xl:text-2xl">
                      {route.name}
                    </p>
                  </div>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer z-10 md:hidden ml-auto"
      >
        {nav ? (
          <div className="text-black">
            <CrossIcon />
          </div>
        ) : (
          <div className="">
            <HamburgerIcon />
          </div>
        )}
      </div>

      {nav && (
        <>
          <div
            onClick={() => setNav(!nav)}
            className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900 h-full bg-opacity-80"
          ></div>
          <div className="flex flex-col absolute top-0 right-0 w-3/4 md:w-[40%] h-full bg-neutral-100 text-neutral-800">
            <ul className="mt-16 space-y-5 px-2">
              {NavigationRoutes.header.navbar.map((route) => (
                <li key={route.name}>
                  <div className="bg-blue-dark hover:bg-[#131921] px-3 py-2 w-fit rounded-full text-white">
                    <Link
                      href={route.route}
                      className="flex justify-center items-center space-x-2"
                    >
                      <Image
                        src={route.icon}
                        alt={route.icon}
                        width={30}
                        height={30}
                      />
                      <p className="font-bold uppercase">{route.name}</p>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>

            <div className="px-2 cursor-pointer uppercase py-4 tracking-wider text-base w-fit">
              <Web3Status setNav={setNav} className="py-5 px-3" />
            </div>
            <div className="mt-auto bg-blue-dark text-white">
              <div className="px-6 cursor-pointer uppercase font-oswald py-4 tracking-wider text-base">
                <Link href="https://twitter.com/DEGEN_MARKETS" target="_blank">
                  <div>Twitter</div>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
