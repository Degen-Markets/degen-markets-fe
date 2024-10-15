import { Dispatch, FC, SetStateAction } from "react";
import Link from "next/link";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { NavItem } from "@/app/lib/utils/NavigationRoutes";
import NavbarMobileSubItems from "./NavbarMobileSubItems";

const NavbarMobileItem: FC<{
  route: NavItem;
  setNav: Dispatch<SetStateAction<boolean>>;
}> = ({ route, setNav }) => {
  const handleClick = () => setNav(false);

  return (
    <li className="w-full cursor-not-allowed relative text-white">
      {typeof route.route === "string" ? (
        <Link href={route.route} onClick={handleClick}>
          <div className="flex items-center space-x-2 px-3 py-2">
            {route.icon && (
              <Image src={route.icon} alt={route.icon} width={30} height={30} />
            )}
            <p className="font-bold uppercase text-base">{route.name}</p>
          </div>
        </Link>
      ) : (
        <div className="relative group transition-all duration-300">
          <div className="overflow-hidden max-h-12 group-hover:max-h-[200px] transition-all duration-300">
            <div className="flex items-center space-x-2 cursor-pointer group-hover:bg-[#131921] px-3 py-2 rounded-lg text-white">
              {route.icon && (
                <Image
                  src={route.icon}
                  alt={route.icon}
                  width={30}
                  height={30}
                />
              )}
              <p>{route.name}</p>
              <IoIosArrowDown className="ml-2" />
            </div>
            <ul className="text-white border-t shadow-lg mt-3 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {Array.isArray(route.route)
                ? route.route.map(({ link, routeName }) => (
                    <NavbarMobileSubItems
                      key={routeName}
                      link={link}
                      routeName={routeName}
                      setNav={setNav}
                    />
                  ))
                : Object.entries(route.route).map(([key, value]) => (
                    <li
                      key={key}
                      className="hover:bg-gray-200 hover:text-main rounded-md w-full text-center"
                    >
                      <Link href={value}>
                        <div className="block px-4 py-2 uppercase">{key}</div>
                      </Link>
                    </li>
                  ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
};

export default NavbarMobileItem;
