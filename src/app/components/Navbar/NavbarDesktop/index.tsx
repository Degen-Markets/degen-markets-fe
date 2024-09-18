import { FC } from "react";
import NavigationRoutes from "@/app/lib/utils/NavigationRoutes";
import NavbarItem from "./NavbarItems";

export const NavbarDesktop: FC = () => {
  return (
    <div className="hidden w-full gap-x-4 md:flex items-center md:justify-center lg:justify-between p-3">
      <ul className="flex items-center space-x-10">
        {NavigationRoutes.header.navbar.map((route) => (
          <NavbarItem key={route.name} route={route} />
        ))}
      </ul>
    </div>
  );
};
