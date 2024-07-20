import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const NavDropdownMenuItem: React.FC<{
  routeName: string;
  link: string;
  comingSoon?: boolean;
}> = ({ routeName, link, comingSoon }) => (
  <li
    className={twMerge(
      "hover:bg-gray-200 rounded-md w-full text-center py-1",
      comingSoon && "opacity-35 cursor-not-allowed",
    )}
  >
    {comingSoon ? (
      <div className="flex items-center justify-center">
        <div className="block px-2 py-2 uppercase whitespace-nowrap">
          {routeName}
        </div>
        <Image
          src="/navIcons/lock.svg"
          className="invert"
          alt={routeName}
          width={20}
          height={20}
        />
      </div>
    ) : (
      <Link href={link} className="flex items-center justify-center">
        <div className="block px-2 py-2 uppercase whitespace-nowrap">
          {routeName}
        </div>
      </Link>
    )}
  </li>
);

export default NavDropdownMenuItem;
