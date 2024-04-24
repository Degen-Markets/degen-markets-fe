import React from "react";
import Link from "next/link";
import { CustomConnectButton } from "@/app/components/Button";

const Navbar: React.FC<{}> = ({}) => {
  return (
    <div className="w-full flex items-center">
      <div className="flex justify-between w-full px-10 py-5 items-center">
        <Link href={"/"}>
          <div className="flex gap-x-2 items-center">
            <div className="uppercase text-8xl tracking-wide">
              Degen markets
            </div>
          </div>
        </Link>
        <div className="flex gap-3 items-center ">
          <Link href="/bets">
            <button className="py-1 px-3 rounded-full text-3xl text-yellow-light w-fit cursor-pointer border-yellow-light border-4">
              existing bets
            </button>
          </Link>
          <Link href="/create-bet">
            <button className="py-1 px-3 rounded-full text-3xl text-pink-light w-fit cursor-pointer border-pink-light border-4">
              create bet
            </button>
          </Link>
          <CustomConnectButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
