"use client";
import Link from "next/link";
import React, { useState } from "react";
import { ButtonSecondary, CustomConnectButton } from "@/app/components/Button";
import { HamburgerIcon } from "@/app/components/Icons";
import { CrossIcon } from "@/app/components/Icons";
import { useRouter } from "next/navigation";

const Menu: React.FC = () => {
  const [nav, setNav] = useState<boolean>(false);
  const router = useRouter();
  return (
    <div className="flex justify-between items-center w-full h-20 lg:px-10 px-6 text-white bg-transparent fixed nav z-50">
      <Link href="/">
        <div className="hidden lg:flex gap-x-2 items-center">
          <div className="uppercase text-8xl tracking-wide">Degen markets</div>
        </div>
      </Link>

      <ul className="hidden lg:flex gap-x-5">
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
      </ul>
      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer z-10 lg:hidden ml-auto"
      >
        {nav ? (
          <div className="text-blue-dark">
            <CrossIcon />
          </div>
        ) : (
          <div className="text-blue-dark">
            <HamburgerIcon />
          </div>
        )}
      </div>

      {nav && (
        <>
          <div
            onClick={() => setNav(!nav)}
            className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900  h-[100dvh] bg-opacity-80"
          ></div>
          <ul className="flex flex-col absolute top-0 right-0 w-[80%] h-[100dvh] bg-neutral-100 text-neutral-800">
            <li className="pt-20 flex-1">
              <div className="px-6 cursor-pointer uppercase py-4 tracking-wider text-base ">
                <ButtonSecondary
                  className="px-8"
                  size="small"
                  onClick={() => {
                    router.push("/");
                    setNav(!nav);
                  }}
                >
                  Home
                </ButtonSecondary>
              </div>
              <div className="px-6 cursor-pointer uppercase py-4 tracking-wider text-base">
                <ButtonSecondary
                  className="px-8"
                  onClick={() => {
                    router.push("/bets");
                    setNav(!nav);
                  }}
                  size="small"
                >
                  Existing bets
                </ButtonSecondary>
              </div>
              <div className="px-6 cursor-pointer uppercase py-4 tracking-wider text-base">
                <ButtonSecondary
                  className="px-8"
                  onClick={() => {
                    router.push("/create-bet");
                    setNav(!nav);
                  }}
                  size="small"
                >
                  Create bet
                </ButtonSecondary>
              </div>
              <div className="px-6 cursor-pointer uppercase py-4 tracking-wider text-base">
                <ButtonSecondary
                  className="px-8"
                  onClick={() => {
                    router.push("/my-bets");
                    setNav(!nav);
                  }}
                  size="small"
                >
                  My bets
                </ButtonSecondary>
              </div>
              <div className="px-6 cursor-pointer uppercase py-4 tracking-wider text-base">
                <CustomConnectButton className="px-8" />
              </div>
            </li>
            <li className="flex-end bg-blue-dark text-white">
              <div className="px-6 cursor-pointer uppercase font-oswald py-4 tracking-wider text-base">
                <Link href="https://twitter.com/DEGEN_MARKETS" target="_blank">
                  <div>Twitter</div>
                </Link>
              </div>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default Menu;
