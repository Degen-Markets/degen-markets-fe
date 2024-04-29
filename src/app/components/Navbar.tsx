import React from "react";
import Link from "next/link";
import {
  ButtonPrimary,
  ButtonTransparent,
  CustomConnectButton,
} from "@/app/components/Button";
import { ButtonBlue } from "@/app/components/Button/NavbarButtons";

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
        <div className="flex gap-5 items-center ">
          <Link href="/bets">
            <ButtonBlue>Existing bets</ButtonBlue>
          </Link>
          <Link href="/create-bet">
            <ButtonBlue>create bet</ButtonBlue>
          </Link>
          <CustomConnectButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
