"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Wrapper from "@/app/components/Wrapper";
import SolanaWallet from "./SolanaWallet";

const Header: React.FC = () => {
  const [nav] = useState<boolean>(false);

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
            <div className="flex items-center md:justify-between w-full">
              <Link
                href="/"
                className="uppercase font-bold whitespace-nowrap text-3xl xl:text-4xl flex justify-center items-center text-purple-light"
              >
                Degen Markets
              </Link>

              <SolanaWallet />
            </div>
          </div>
        </div>
      </Wrapper>
    </header>
  );
};

export default Header;
