import React, { useMemo, useState } from "react";
import Link from "next/link";
import { Button, ButtonSecondary } from "@/app/components/Button";
import { CrossIcon, HamburgerIcon } from "@/app/components/Icons";
import { Web3Status } from "./Dialog/Web3Status";
import NavigationRoutes from "../lib/utils/NavigationRoutes";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { IoIosArrowDown } from "react-icons/io";

const Navbar: React.FC<{
  nav: boolean;
  setNav: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ nav, setNav }) => {
  // Sort the routes to display comingSoon=true items first
  const sortedRoutes = useMemo(() => {
    return [...NavigationRoutes.header.navbar].sort((a, b) => {
      if (a.comingSoon && !b.comingSoon) return 1;
      if (!a.comingSoon && b.comingSoon) return -1;
      return 0;
    });
  }, []);

  return (
    <>
      <div className="hidden w-full gap-x-4 md:flex items-center md:justify-center lg:justify-between p-3">
        <ul className="flex items-center space-x-10">
          {sortedRoutes.map((route) => (
            <li key={route.name} className="relative group">
              {route.comingSoon ? (
                <div
                  className={twMerge(
                    "flex justify-center items-center space-x-2 relative",
                    route.comingSoon && "opacity-35 cursor-not-allowed",
                  )}
                >
                  <Image
                    src={route.icon}
                    alt={route.icon}
                    width={30}
                    height={30}
                  />
                  <p className="font-bold uppercase drop-shadow lg:text-xl xl:text-2xl">
                    {route.name}
                  </p>
                  <span className="absolute -top-1 -right-5 z-10 text-[8px] border border-black rounded px-1 py-0 h-4 flex justify-center items-center text-black bg-gradient-to-r from-[#ED71BF] via-[#F1A495] to-[#F9DB72]">
                    Soon
                  </span>
                </div>
              ) : (
                <div className="relative group">
                  <div className="flex justify-center items-center space-x-2 cursor-pointer">
                    <Image
                      src={route.icon}
                      alt={route.icon}
                      width={30}
                      height={30}
                    />
                    <p className="font-bold uppercase drop-shadow lg:text-xl xl:text-2xl">
                      {route.name}
                    </p>
                    <IoIosArrowDown className="flex-shrink-0" />
                  </div>
                  {Array.isArray(route.route) ? (
                    <ul className="absolute top-6 w-64 hidden group-hover:block bg-white text-black rounded-md shadow-lg mt-2 z-20 text-lg font-semibold">
                      {route.route.map(
                        ({ routeName, link, gameComingSoon }) => {
                          return gameComingSoon ? (
                            <>
                              <li
                                key={routeName}
                                className={twMerge(
                                  "hover:bg-gray-200 rounded-md w-full text-center py-1",
                                  gameComingSoon &&
                                    "opacity-35 cursor-not-allowed",
                                )}
                              >
                                <div className="flex items-center justify-center">
                                  <div className="block px-2 py-2 uppercase whitespace-nowrap">
                                    {routeName}
                                  </div>
                                  {gameComingSoon && (
                                    <Image
                                      src="/navIcons/lock.svg"
                                      className="invert"
                                      alt={routeName}
                                      width={20}
                                      height={20}
                                    />
                                  )}
                                </div>
                              </li>
                            </>
                          ) : (
                            <li
                              key={routeName}
                              className="hover:bg-gray-200 rounded-md w-full text-center py-1"
                            >
                              <Link
                                href={link}
                                className="flex items-center justify-center"
                              >
                                <div className="block px-2 py-2 uppercase whitespace-nowrap">
                                  {routeName}
                                </div>
                                {gameComingSoon && (
                                  <Image
                                    src="/navIcons/lock.svg"
                                    className="invert"
                                    alt={routeName}
                                    width={20}
                                    height={20}
                                  />
                                )}
                              </Link>
                            </li>
                          );
                        },
                      )}
                    </ul>
                  ) : (
                    <ul className="absolute top-6 w-64 hidden group-hover:block bg-white text-black rounded-md shadow-lg mt-2 z-20 text-lg font-semibold">
                      {Object.entries(route.route).map(([key, value]) => (
                        <li
                          key={key}
                          className="hover:bg-gray-200 rounded-md w-full text-center"
                        >
                          <Link href={value}>
                            <div className="block px-4 py-2 uppercase  whitespace-nowrap">
                              {key}
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
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
              {sortedRoutes.map((route) => (
                <li
                  key={route.name}
                  className={
                    route.comingSoon
                      ? "opacity-35 w-full rounded-lg bg-[#202b38] cursor-not-allowed relative"
                      : ""
                  }
                >
                  {route.comingSoon ? (
                    <div className="flex justify-center items-center space-x-2  hover:bg-[#131921] px-3 py-2   text-white">
                      <Image
                        src={route.icon}
                        alt={route.icon}
                        width={30}
                        height={30}
                      />
                      <p className="font-bold uppercase drop-shadow lg:text-xl xl:text-2xl">
                        {route.name}
                      </p>
                      <span className="absolute top-0 -right-0 z-10 text-[8px] border rounded px-1 py-0 h-4 flex justify-center items-center bg-gradient-to-r from-[#ED71BF] via-[#F1A495] to-[#F9DB72]">
                        Soon
                      </span>
                    </div>
                  ) : typeof route.route === "string" ? (
                    <Link href={route.route}>
                      <div className="flex justify-center items-center space-x-2 bg-[#202b38] hover:bg-[#131921] px-3 py-2 rounded-lg text-white">
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
                  ) : (
                    <div className="relative group  bg-[#202b38] rounded-lg ">
                      <div className="flex justify-center items-center space-x-2 cursor-pointer group-hover:bg-[#131921] px-3 py-2 rounded-lg text-white">
                        <div className="w-full">
                          <div className="font-bold uppercase drop-shadow lg:text-xl xl:text-2xl transition-all ease-in duration-300 group-hover:h-auto overflow-hidden flex justify-center items-center space-x-2">
                            <Image
                              src={route.icon}
                              alt={route.icon}
                              width={30}
                              height={30}
                            />
                            <p>{route.name}</p>
                            <IoIosArrowDown className="ml-2" />
                          </div>
                          <ul className="hidden group-hover:block text-white border-t shadow-lg mt-2 z-20 opacity-0 group-hover:opacity-100 transition-all ease-in duration-300 w-full">
                            {Array.isArray(route.route) ? (
                              route.route.map(
                                ({ link, routeName, gameComingSoon }) => {
                                  return gameComingSoon ? (
                                    <li
                                      key={routeName}
                                      className={twMerge(
                                        "hover:bg-gray-200 hover:text-black rounded-md w-full text-center",
                                        gameComingSoon &&
                                          "opacity-35 cursor-not-allowed",
                                      )}
                                    >
                                      <div className="flex items-center justify-center">
                                        <div className="block px-4 py-2 uppercase">
                                          {routeName}
                                        </div>
                                        {gameComingSoon && (
                                          <Image
                                            src="/navIcons/lock.svg"
                                            alt={routeName}
                                            width={20}
                                            height={20}
                                          />
                                        )}
                                      </div>
                                    </li>
                                  ) : (
                                    <li
                                      key={routeName}
                                      className={twMerge(
                                        "hover:bg-gray-200 hover:text-black rounded-md w-full text-center",
                                      )}
                                    >
                                      <Link
                                        href={link}
                                        className="flex items-center justify-center"
                                      >
                                        <div className="block px-4 py-2 uppercase">
                                          {routeName}
                                        </div>
                                        {gameComingSoon && (
                                          <Image
                                            src="/navIcons/lock.svg"
                                            alt={routeName}
                                            width={20}
                                            height={20}
                                          />
                                        )}
                                      </Link>
                                    </li>
                                  );
                                },
                              )
                            ) : (
                              <>
                                <ul className="hidden group-hover:block text-white rounded-md shadow-lg mt-2 z-20 opacity-0 group-hover:opacity-100 transition-all ease-in duration-300 w-full">
                                  {Object.entries(route.route).map(
                                    ([key, value]) => (
                                      <li
                                        key={key}
                                        className="hover:bg-gray-200 hover:text-black rounded-md w-full text-center"
                                      >
                                        <Link href={value}>
                                          <div className="block px-4 py-2 uppercase">
                                            {key}
                                          </div>
                                        </Link>
                                      </li>
                                    ),
                                  )}
                                </ul>
                              </>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            <div className="px-2 cursor-pointer uppercase py-4 tracking-wider text-base w-fit">
              <Web3Status setNav={setNav} className="py-5 px-3" />
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
      )}
    </>
  );
};

export default Navbar;
