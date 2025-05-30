import NavigationRoutes from "@/app/lib/utils/NavigationRoutes";
import NavbarMobileItem from "./NavbarMobileItem";
import SolanaWallet from "@/app/components/SolanaWallet";
import { Dispatch, FC, SetStateAction } from "react";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import XIcon from "@/app/components/Icons/XIcon";

export const NavbarMobile: FC<{
  nav: boolean;
  setNav: Dispatch<SetStateAction<boolean>>;
}> = ({ nav, setNav }) => {
  const wallet = useWallet();
  return (
    <aside className="top-0 left-0 right-0 bottom-0 fixed ">
      <div
        onClick={() => setNav(!nav)}
        className="absolute inset-0 bottom-0 left-0 right-0 top-0 h-full w-full bg-black bg-opacity-70 backdrop-blur-sm transition-opacity"
      ></div>
      <div className="fixed bottom-0 right-0 h-full w-[85%] bg-main p-4 ">
        <div className="flex flex-col h-full ">
          <ul className="mt-20">
            {NavigationRoutes.header.navbar.map((route) => {
              if (route.protected && !wallet.connected) return null;
              return (
                <NavbarMobileItem
                  key={route.name}
                  route={route}
                  setNav={setNav}
                />
              );
            })}
          </ul>
          <div className="flex justify-center cursor-pointer uppercase py-4 tracking-wider text-base mt-20">
            <SolanaWallet />
          </div>
          <div className="flex justify-center mt-auto">
            <Link
              href="https://x.com/DEGEN_MARKETS"
              target="_blank"
              className="text-white flex gap-2 items-center"
            >
              <XIcon className="text-lg" width={32} height={32} />{" "}
              @DEGEN_MARKETS
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
};
