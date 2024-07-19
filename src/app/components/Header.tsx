"use client";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import { FC, useState } from "react";
import SwitchChainDialog from "./Dialog/SwitchChainDialog";
import ConnectorDialog from "./Dialog/ConnectorDialog";
import { Web3Status } from "./Dialog/Web3Status";
import GradientText from "./WalletMenu/GradientText";

const Header: FC = () => {
  const [nav, setNav] = useState<boolean>(false);

  return (
    <header className="w-full text-white bg-transparent z-50 border-b border-cadet-blue-light p-2">
      <div className="flex justify-between items-center w-full">
        <div className="flex-row md:flex-col justify-center items-center flex lg:flex-row lg:justify-start lg:items-center w-full h-full space-y-2 lg:space-y-0">
          <div className="flex items-center  md:justify-around w-full lg:w-auto">
            <Link
              href="/"
              className="uppercase font-bold whitespace-nowrap text-3xl xl:text-4xl"
            >
              <GradientText>Degen Markets</GradientText>
            </Link>
            <div className="hidden md:block lg:hidden">
              <Web3Status setNav={setNav} />
            </div>
            <span className="text-5xl mx-2 hidden lg:block">/</span>
          </div>
          <Navbar nav={nav} setNav={setNav} />
        </div>
        <div className="hidden lg:block">
          <Web3Status setNav={setNav} />
        </div>
      </div>
      <SwitchChainDialog />
      <ConnectorDialog />
    </header>
  );
};

export default Header;
