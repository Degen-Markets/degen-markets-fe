"use client";
import { useState, useEffect, FC } from "react";
import Link from "next/link";
import Wrapper from "@/app/components/Wrapper";
import Navbar from "@/app/components/Navbar";
import DgmLogoIcon from "@/app/components/Icons/DgmLogoIcon";
import SolanaWallet from "@/app/components/SolanaWallet";

const Header: FC = () => {
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
    <header className="w-full text-white z-50 p-2 border-b border-white border-opacity-10">
      <Wrapper>
        <div className="flex justify-between items-center w-full lg:h-16">
          <div className="flex-row md:flex-col justify-center items-center flex lg:flex-row lg:justify-start lg:items-center w-full h-full py-0.5 lg:py-0">
            <div className="flex items-center justify-between w-full">
              <Link href="/">
                <DgmLogoIcon width={64} height={64} />
              </Link>
              <Navbar nav={nav} setNav={setNav} />
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
