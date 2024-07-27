"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import SwitchChainDialog from "./Dialog/SwitchChainDialog";
import ConnectorDialog from "./Dialog/ConnectorDialog";
import { Web3Status } from "./Dialog/Web3Status";
import GradientText from "./WalletMenu/GradientText";
import Wrapper from "@/app/components/Wrapper";

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
    <>
      <header className="w-full text-white z-50 border-b border-cadet-blue-light p-2 bg-black-medium">
        <Wrapper>
          <div className="flex justify-between items-center w-full lg:h-16">
            <div className="flex-row md:flex-col justify-center items-center flex lg:flex-row lg:justify-start lg:items-center w-full h-full py-0.5 lg:py-0">
              <div className="flex items-center md:justify-around w-full lg:w-auto">
                <Link
                  href="/"
                  className="uppercase font-bold whitespace-nowrap text-3xl xl:text-4xl flex justify-center items-center"
                >
                  <GradientText>Degen Markets</GradientText>
                  <span className="relative -top-0.5 bg-cadet-blue-light h-24 w-[1px] rotate-27 text-5xl mx-5 hidden lg:block" />
                </Link>
                <div className="hidden md:block lg:hidden">
                  <Web3Status setNav={setNav} />
                </div>
              </div>
              <Navbar nav={nav} setNav={setNav} />
            </div>
            <div className="hidden lg:block">
              <Web3Status setNav={setNav} />
            </div>
          </div>
          <SwitchChainDialog />
          <ConnectorDialog />
        </Wrapper>
      </header>
    </>
  );
};

export default Header;
