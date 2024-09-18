import { FC } from "react";
import NavigationRoutes from "@/app/lib/utils/NavigationRoutes";
import NavbarItem from "./NavbarItems";
import { useWallet } from "@solana/wallet-adapter-react";

export const NavbarDesktop: FC = () => {
  const wallet = useWallet();
  return (
    <div className="hidden md:flex items-center md:justify-center lg:justify-between p-3">
      <ul className="flex items-center space-x-10">
        {NavigationRoutes.header.navbar.map((route) => {
          if (route.protected && !wallet.connected) return null;
          return <NavbarItem key={route.name} route={route} />;
        })}
      </ul>
    </div>
  );
};
