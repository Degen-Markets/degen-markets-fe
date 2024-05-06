import React from "react";
import Link from "next/link";
import { ButtonSecondary, CustomConnectButton } from "@/app/components/Button";

const Navbar: React.FC = ({}) => {
  return (
    <div className="w-full flex items-center">
      <div className="flex justify-between w-full px-10 py-5 items-center">
        <Link href="/">
          <div className="flex gap-x-2 items-center">
            <div className="uppercase text-8xl tracking-wide">
              Degen markets
            </div>
          </div>
        </Link>
        <div className="flex justify-center gap-5 items-center ">
          <Link href="/bets">
            <ButtonSecondary size="small">Existing bets</ButtonSecondary>
          </Link>
          <Link href="/create-bet">
            <ButtonSecondary size="small">Create bet</ButtonSecondary>
          </Link>
          <Link href="/my-bets">
            <ButtonSecondary size="small">My bets</ButtonSecondary>
          </Link>
          <CustomConnectButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
