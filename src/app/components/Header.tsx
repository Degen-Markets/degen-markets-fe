"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Wrapper from "@/app/components/Wrapper";
import SolanaWallet from "./SolanaWallet";
import { useWallet } from "@solana/wallet-adapter-react";
import { NavbarMobile } from "./Navbar/NavbarMobile";
import { IoMenu, IoCloseSharp } from "react-icons/io5";

const Header: React.FC = () => {
  const [nav, setNav] = useState<boolean>(false);
  const wallet = useWallet();

  useEffect(() => {
    if (nav) {
      document.body.setAttribute("data-scroll-locked", "1");
    } else {
      document.body.removeAttribute("data-scroll-locked");
    }

    // Clean up the effect when the component unmounts
    return () => {
      document.body.removeAttribute("data-scroll-locked");
    };
  }, [nav]);

  return (
    <header className="w-full text-white z-50 p-2 mt-4">
      <Wrapper>
        <div className="flex justify-between items-center w-full lg:h-16">
          <div className="flex-row md:flex-col justify-center items-center flex lg:flex-row lg:justify-start lg:items-center w-full h-full py-0.5 lg:py-0">
            <div className="flex items-center justify-between w-full">
              <Link
                href="/"
                className="uppercase font-bold whitespace-nowrap text-3xl xl:text-4xl flex justify-center items-center text-purple-light"
              >
                Degen Markets
              </Link>
              <div
                onClick={() => setNav(!nav)}
                className="cursor-pointer z-50 md:hidden ml-auto"
              >
                {nav ? (
                  <div className="text-black-medium">
                    <IoCloseSharp size={30} />
                  </div>
                ) : (
                  <div>
                    <IoMenu size={30} />
                  </div>
                )}
              </div>
              {nav && <NavbarMobile nav={nav} setNav={setNav} />}
              <div className="hidden md:flex items-center space-x-2">
                {wallet.connected && (
                  <Link
                    href={"/my-profile"}
                    className="hover:underline underline-offset-4 font-semibold hover:text-purple-light transition-all ease-in duration-150 "
                  >
                    Profile
                  </Link>
                )}
                <SolanaWallet />
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
