"use client";
import Link from "next/link";

import Navbar from "@/app/components/Navbar";
import { FC } from "react";
import SwitchChainDialog from "./Dialog/SwitchChainDialog";
import ConnectorDialog from "./Dialog/ConnectorDialog";

const Header: FC = () => {
  return (
    <header className="w-full text-white bg-transparent z-50 py-4">
      <div className="flex flex-row justify-between items-center mx-9">
        <Link href="/" className="uppercase text-2xl md:text-8xl">
          Degen Markets
        </Link>
        <SwitchChainDialog />
        <ConnectorDialog />
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
