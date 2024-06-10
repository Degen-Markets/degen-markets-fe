import React, { useState } from "react";
import Link from "next/link";
import { ButtonSecondary, CustomConnectButton } from "@/app/components/Button";
import { CrossIcon, HamburgerIcon } from "@/app/components/Icons";
import { useRouter } from "next/navigation";

const Navbar: React.FC = ({}) => {
  const [nav, setNav] = useState<boolean>(false);
  const router = useRouter();

  return (
    <>
      <ul className="hidden lg:flex gap-x-4">
        <Link href="/bets">
          <ButtonSecondary size="small">Existing bets</ButtonSecondary>
        </Link>
        <Link href="/create-bet">
          <ButtonSecondary size="small">Create bet</ButtonSecondary>
        </Link>
        <CustomConnectButton setNav={setNav} />
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
          <ul className="flex flex-col absolute top-0 right-0 w-3/4 md:w-[40%] h-[100dvh] bg-neutral-100 text-neutral-800">
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
                    router.push("/bets");
                    setNav(!nav);
                  }}
                  size="small"
                >
                  Existing bets
                </ButtonSecondary>
              </div>

              <div className="px-6 cursor-pointer uppercase py-4 tracking-wider text-base">
                <CustomConnectButton setNav={setNav} className="px-8" />
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
    </>
  );
};

export default Navbar;
