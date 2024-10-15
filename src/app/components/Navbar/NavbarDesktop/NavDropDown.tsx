import { RouteItem } from "@/app/lib/utils/NavigationRoutes";
import NavDropdownMenuItem from "./NavDropdownMenuItems";

const NavDropdownMenu: React.FC<{ routes: Array<RouteItem> }> = ({
  routes,
}) => (
  <ul className="absolute top-6 w-64 hidden group-hover:block bg-white text-main rounded-md shadow-lg mt-2 z-20 text-lg font-semibold">
    {routes.map(({ routeName, link }) => (
      <NavDropdownMenuItem key={routeName} routeName={routeName} link={link} />
    ))}
  </ul>
);

export default NavDropdownMenu;
