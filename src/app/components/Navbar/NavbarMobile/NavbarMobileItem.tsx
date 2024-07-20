import React from "react";
import Link from "next/link";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { NavItem } from "@/app/lib/utils/NavigationRoutes";
import NavbarMobileSubItems from "./NavbarMobileSubItems";
import { twMerge } from "tailwind-merge";
import Badge from "../../Badge";

const NavbarMobileItem: React.FC<{
  route: NavItem;
  setNav: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ route, setNav }) => {
  return (
    <li className="w-full rounded-lg bg-[#202b38] cursor-not-allowed relative">
      {route.comingSoon ? (
        <div>
          <div
            className={twMerge(
              "flex justify-center items-center space-x-2 rounded-lg hover:bg-[#131921] px-3 py-2 text-white",
              route.comingSoon && "opacity-35",
            )}
          >
            <Image src={route.icon} alt={route.icon} width={30} height={30} />
            <p className="font-bold uppercase drop-shadow lg:text-xl xl:text-2xl">
              {route.name}
            </p>
          </div>
          <Badge>soon</Badge>
        </div>
      ) : typeof route.route === "string" ? (
        <Link href={route.route}>
          <div className="flex justify-center items-center space-x-2 bg-[#202b38] hover:bg-[#131921] px-3 py-2 rounded-lg text-white">
            <Image src={route.icon} alt={route.icon} width={30} height={30} />
            <p className="font-bold uppercase drop-shadow lg:text-xl xl:text-2xl">
              {route.name}
            </p>
          </div>
        </Link>
      ) : (
        <div className="relative group transition-all ease-in-out duration-300">
          <div className="bg-[#202b38] rounded-lg overflow-hidden max-h-12 group-hover:max-h-[200px] transition-all duration-300">
            <div className="flex justify-center items-center space-x-2 cursor-pointer group-hover:bg-[#131921] px-3 py-2 rounded-lg text-white">
              <div className="w-full">
                <div className="flex flex-col justify-center items-center">
                  <div className="flex justify-center items-center space-x-2">
                    <Image
                      src={route.icon}
                      alt={route.icon}
                      width={30}
                      height={30}
                    />
                    <p>{route.name}</p>
                    <IoIosArrowDown className="ml-2" />
                  </div>

                  <ul className="text-white border-t shadow-lg mt-3 z-20 w-full opacity-0 group-hover:opacity-100 transition-all ease-in duration-300">
                    {Array.isArray(route.route)
                      ? route.route.map(({ link, routeName, comingSoon }) => (
                          <NavbarMobileSubItems
                            key={routeName}
                            link={link}
                            routeName={routeName}
                            comingSoon={comingSoon}
                            setNav={setNav}
                          />
                        ))
                      : Object.entries(route.route).map(([key, value]) => (
                          <li
                            key={key}
                            className="hover:bg-gray-200 hover:text-black-medium rounded-md w-full text-center"
                          >
                            <Link href={value}>
                              <div className="block px-4 py-2 uppercase">
                                {key}
                              </div>
                            </Link>
                          </li>
                        ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default NavbarMobileItem;
