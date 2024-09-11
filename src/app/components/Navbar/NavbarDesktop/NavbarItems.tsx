import React from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import Badge from "../../Badge";
import { IoIosArrowDown } from "react-icons/io";
import NavDropdownMenu from "./NavDropDown";
import Link from "next/link";
import { NavItem } from "@/app/lib/utils/NavigationRoutes";
import { useRouter } from "next/navigation";

interface NavbarItemProps {
  route: NavItem;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ route }) => {
  const router = useRouter();

  const handleClick = () => {
    if (typeof route.route === "string") {
      router.push(route.route);
    }
  };

  const renderContent = () => (
    <div
      className={twMerge(
        "flex justify-center items-center space-x-2 cursor-pointer",
        route.comingSoon && "cursor-not-allowed opacity-35",
      )}
      onClick={!route.comingSoon ? handleClick : undefined}
    >
      {route.icon && (
        <Image src={route.icon} alt={route.name} width={25} height={25} />
      )}
      <p className="font-bold uppercase drop-shadow-text lg:text-xl xl:text-2xl">
        {route.name}
      </p>
      {Array.isArray(route.route) && (
        <IoIosArrowDown className="flex-shrink-0" />
      )}
    </div>
  );

  const renderDropdown = () => {
    if (Array.isArray(route.route)) {
      return <NavDropdownMenu routes={route.route} />;
    }

    if (typeof route.route === "object") {
      return (
        <ul className="absolute top-6 w-64 hidden group-hover:block bg-white text-black-medium rounded-md shadow-lg mt-2 z-20 text-lg font-semibold">
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
      {route.comingSoon ? (
        <>
          {renderContent()}
          <Badge>Soon</Badge>
        </>
      ) : (
        <>
          {renderContent()}
          {renderDropdown()}
        </>
      )}
    </li>
  );
};

export default NavbarItem;
