import { useMemo } from "react";
import NavigationRoutes from "@/app/lib/utils/NavigationRoutes";
import NavbarItem from "./NavbarItems";

export const NavbarDesktop: React.FC = () => {
  const sortedRoutes = useMemo(() => {
    return [...NavigationRoutes.header.navbar].sort((a, b) => {
      if (a.comingSoon && !b.comingSoon) return 1;
      if (!a.comingSoon && b.comingSoon) return -1;
      return 0;
    });
  }, []);

  return (
    <div className="hidden w-full gap-x-4 md:flex items-center md:justify-center lg:justify-between p-3">
      <ul className="flex items-center space-x-10">
        {sortedRoutes.map((route) => (
          <NavbarItem key={route.name} route={route} />
        ))}
      </ul>
    </div>
  );
};
