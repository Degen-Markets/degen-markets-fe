import React from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { IoIosArrowDown } from "react-icons/io";
import NavDropdownMenu from "./NavDropDown";
import Link from "next/link";
import { NavItem } from "@/app/lib/utils/NavigationRoutes";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

interface NavbarItemProps {
  route: NavItem;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ route }) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = typeof route.route === "string" && pathname === route.route;

  const handleClick = () => {
    if (typeof route.route === "string") {
      router.push(route.route);
    }
  };

  const renderIcon = () => {
    if (route.icon) {
      return <Image src={route.icon} alt={route.name} width={25} height={25} />;
    }
    return null;
  };

  const renderActiveIndicator = () => {
    if (isActive) {
      return (
        <div className="w-full absolute  flex -bottom-2 justify-center">
          <svg
            width="47"
            height="6"
            viewBox="0 0 47 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M46 4.07391C41.5877 4.10259 37.1376 4.18905 32.7278 4.34822C31.4595 4.39407 30.0982 4.42708 28.8377 4.56254C28.3052 4.61978 27.755 4.79991 27.207 4.88663C26.7626 4.95698 25.3306 5.19723 25.0852 4.6507C24.7823 3.97631 25.9832 3.47156 26.31 3.3141C27.4156 2.78132 28.5907 2.44308 29.6681 1.89196C29.7325 1.85908 29.8464 1.79947 29.9578 1.73227C28.6735 1.54913 24.8164 1.89995 23.7989 1.93702C22.7651 1.97449 21.6943 1.94685 20.6547 1.95798C14.1015 2.02807 7.5551 2.40024 1 2.40352V1.73266C8.30071 1.729 15.5947 1.26512 22.8934 1.27626C25.0053 1.27953 27.1426 0.963429 29.2394 1.00351C29.5975 1.01046 30.7289 0.959236 30.7283 1.63625C30.7279 2.18331 29.8121 2.54552 29.498 2.68923C28.8617 2.98044 26.625 3.7806 25.8006 4.31586C26.2226 4.34822 26.8519 4.267 27.1445 4.22076C27.7015 4.13259 28.2494 3.9526 28.7953 3.89391C30.0654 3.75741 31.4356 3.72387 32.7134 3.67763C37.1272 3.51833 41.5814 3.43174 45.9978 3.40305L46 4.07391Z"
              fill="#8F7CFF"
              stroke="#8F7CFF"
            />
          </svg>
        </div>
      );
    }
    return null;
  };

  const renderDropdownMenu = () => {
    if (Array.isArray(route.route)) {
      return <NavDropdownMenu routes={route.route} />;
    }

    if (typeof route.route === "object") {
      return (
        <ul className="absolute top-6 w-64 hidden group-hover:block bg-white text-main rounded-md shadow-lg mt-2 z-20 text-lg font-semibold">
          {Object.entries(route.route).map(([key, value]) => (
            <li
              key={key}
              className="hover:bg-gray-200 rounded-md w-full text-center"
            >
              <Link href={value}>
                <div className="block px-4 py-2 uppercase whitespace-nowrap">
                  {key}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      );
    }

    return null;
  };

  return (
    <li className="relative group">
      <div
        className={twMerge(
          "flex justify-center items-center cursor-pointer",
          isActive && "font-semibold",
        )}
        onClick={typeof route.route === "string" ? handleClick : undefined}
      >
        {renderIcon()}
        <span className="text-base lg:text-lg">{route.name}</span>
        {Array.isArray(route.route) && (
          <IoIosArrowDown className="flex-shrink-0" />
        )}
        {renderActiveIndicator()}
      </div>
      {renderDropdownMenu()}
    </li>
  );
};

export default NavbarItem;
