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
          <Link href="/bets">
            <button className="flex flex-row masked-button p-1 rounded-full text-3xl w-fit cursor-pointer">
              <span className="flex flex-row bg-blue-dark rounded-full px-2 py-0.5">
                <span className="masked-button-text flex geo-font cursor-pointer">
                  existing bets
                  <span className="gradient-button-arrow flex items-center"></span>
                </span>
              </span>
            </button>
          </Link>
          <Link href="/create-bet">
            <button className="flex flex-row masked-button p-1 rounded-full text-3xl w-fit cursor-pointer">
              <span className="flex flex-row bg-blue-dark rounded-full px-2 py-0.5">
                <span className="masked-button-text flex geo-font cursor-pointer">
                  create bet
                  <span className="gradient-button-arrow flex items-center"></span>
                </span>
              </span>
            </button>
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
