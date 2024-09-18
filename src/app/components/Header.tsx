"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Wrapper from "@/app/components/Wrapper";
import SolanaWallet from "./SolanaWallet";
import DgmLogoIcon from "./Icons/DgmLogoIcon";
import Navbar from "@/app/components/Navbar";

const Header: React.FC = () => {
  const [nav, setNav] = useState<boolean>(false);

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
              <Link href="/">
                <DgmLogoIcon width={64} height={64} />
              </Link>
              <div className="flex items-center space-x-6">
                <Navbar nav={nav} setNav={setNav} />
              </div>
              <div className="hidden md:flex">
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
