import Link from "next/link";
import { FC } from "react";

const NavDropdownMenuItem: FC<{
  routeName: string;
  link: string;
}> = ({ routeName, link }) => (
  <li className="hover:bg-gray-200 rounded-md w-full text-center py-1">
    <Link href={link} className="flex items-center justify-center">
      <div className="block px-2 py-2 uppercase whitespace-nowrap">
        {routeName}
      </div>
    </Link>
  </li>
);

export default NavDropdownMenuItem;
