import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";

const Navbar: React.FC<{}> = ({}) => {
  return (
    <div className="w-full flex items-center">
      <div className="flex justify-between w-full px-10 py-5 items-center">
        <Link href={"/"}>
          <div className="flex gap-x-2 items-center">
            <Image
              src="/dm-logo.png"
              alt={"DB"}
              width={100}
              height={100}
              className="w-12 h-12"
            />
            <div className="uppercase text-4xl tracking-wide">
              Degen markets
            </div>
          </div>
        </Link>
        <div className="flex gap-4 items-center">
          <Link href={"/create-bet"}>
            <div className="bg-neutral-950 text-neutral-200 rounded-md px-4 py-2">
              create bet
            </div>
          </Link>
          <div className="text-2xl">
            <ConnectButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
