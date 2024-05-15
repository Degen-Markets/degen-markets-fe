"use client";
import Link from "next/link";

import Navbar from "@/app/components/Navbar";
import { FC } from "react";
import Wrapper from "@/app/components/Wrapper";
import Image from "next/image";

const Header: FC = () => {
  return (
    <header className="w-full text-white bg-transparent sticky top-0 z-50 py-4">
      <Wrapper>
        <Link href="/">
          <Image
            className="hidden lg:block w-[400px] h-auto"
            width={572}
            height={92}
            src="/logo.png"
            alt="Degen markets"
          />
        </Link>
        <Navbar />
      </Wrapper>
    </header>
  );
};

export default Header;
