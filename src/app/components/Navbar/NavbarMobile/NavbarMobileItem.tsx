import { Dispatch, FC, SetStateAction } from "react";
import Link from "next/link";
import Image from "next/image";
import { NavItem } from "@/app/lib/utils/NavigationRoutes";

const NavbarMobileItem: FC<{
  route: NavItem;
  setNav: Dispatch<SetStateAction<boolean>>;
}> = ({ route, setNav }) => {
  const handleClick = () => setNav(false);

  const renderItemContent = () => (
    <div className="flex items-center space-x-2 px-3 py-2">
      {route.icon && (
        <Image src={route.icon} alt={route.icon} width={30} height={30} />
      )}
      <p className="font-bold uppercase text-base">{route.name}</p>
      {route.statusLabel && (
        <span className="ml-1 inline-flex items-center px-1 py-0.5 text-xs font-semibold bg-primary bg-opacity-80 text-main rounded-full">
          {route.statusLabel}
        </span>
      )}
    </div>
  );

  return (
    <li className="w-full cursor-not-allowed relative text-white">
      {route.disabled ? (
        <div className="flex items-center space-x-2 px-3 py-2 cursor-not-allowed">
          {renderItemContent()}
        </div>
      ) : (
        <Link
          href={typeof route.route === "string" ? route.route : ""}
          onClick={handleClick}
        >
          {renderItemContent()}
        </Link>
      )}
    </li>
  );
};

export default NavbarMobileItem;
