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

  return (
    <li className="relative group">
      <div
        className={twMerge(
          "flex justify-center items-center space-x-2 cursor-pointer",
          isActive && "border-b-2 border-purple-medium pb-2 text-purple-medium",
        )}
        onClick={typeof route.route === "string" ? handleClick : undefined}
      >
        {route.icon && (
          <Image src={route.icon} alt={route.name} width={25} height={25} />
        )}
        <p className="font-bold uppercase  lg:text-xl xl:text-2xl">
          {route.name}
        </p>
        {Array.isArray(route.route) && (
          <IoIosArrowDown className="flex-shrink-0" />
        )}
      </div>

      {Array.isArray(route.route) ? (
        <NavDropdownMenu routes={route.route} />
      ) : (
        typeof route.route === "object" && (
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
        )
      )}
    </li>
  );
};

export default NavbarItem;
