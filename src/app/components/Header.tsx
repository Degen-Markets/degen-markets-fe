"use client";
import Link from "next/link";

import Navbar from "@/app/components/Navbar";
import { FC } from "react";
import Wrapper from "@/app/components/Wrapper";

const Header: FC = () => {
  return (
    <header className="w-full text-white bg-transparent sticky top-0 z-50 py-4">
      <div className="flex flex-row justify-between items-center mx-9">
        <Link href="/" className="uppercase text-2xl md:text-7xl">
          Degen Markets
        </Link>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
