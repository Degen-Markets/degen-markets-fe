import Image from "next/image";
import { twMerge } from "tailwind-merge";
import Badge from "../../Badge";
import { IoIosArrowDown } from "react-icons/io";
import NavDropdownMenu from "./NavDropDown";
import Link from "next/link";
import { NavItem } from "@/app/lib/utils/NavigationRoutes";

const NavbarItem: React.FC<{
  route: NavItem;
}> = ({ route }) => (
  <li key={route.name} className="relative group">
    {route.comingSoon ? (
      <div className="cursor-not-allowed">
        <div
          className={twMerge(
            "flex justify-center items-center space-x-2 relative",
            "opacity-35",
          )}
        >
          <Image src={route.icon} alt={route.icon} width={25} height={25} />
          <p className="font-bold uppercase  lg:text-xl xl:text-2xl drop-shadow-text">
            {route.name}
          </p>
        </div>
        <Badge>Soon</Badge>
      </div>
    ) : (
      <div className="relative group">
        <div className="flex justify-center items-center space-x-2 cursor-pointer">
          <Image src={route.icon} alt={route.icon} width={25} height={25} />
          <p className="font-bold uppercase drop-shadow-text lg:text-xl xl:text-2xl">
            {route.name}
          </p>
          <IoIosArrowDown className="flex-shrink-0" />
        </div>
        {Array.isArray(route.route) ? (
          <NavDropdownMenu routes={route.route} />
        ) : (
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
        )}
      </div>
    )}
  </li>
);

export default NavbarItem;
