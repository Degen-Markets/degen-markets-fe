"use client";
import Wrapper from "@/app/components/Wrapper";
import { ButtonGradient } from "@/app/components/Button";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="flex flex-col items-center text-white h-[230px] md:h-[500px] w-screen ">
      <div className="absolute top-[60px] md:top-[170px] w-screen bg-green-500">
        <div className="absolute z-[2] w-screen">
          <Marquee speed={60} direction="left">
            <Image
              src="/clouds/cloud.png"
              width={400}
              height={400}
              alt=""
              className="w-[200px] md:w-[400px]"
            />
          </Marquee>
        </div>

        <div className="absolute z-[2] w-screen">
          <Marquee speed={30} direction="right">
            <Image
              width={1000}
              height={483}
              src="/pepe-cloud.png"
              alt=""
              className="w-[100vw] md:w-[1000px]"
            />
          </Marquee>
        </div>
      </div>

      <div className="px-4 md:px-0 absolute top-[130px] md:top-[30%] z-10  md:leading-[0.8]">
        <Wrapper>
          <div className="text-4xl md:text-8xl z-[10] text-center uppercase md:mx-20">
            THE DECENTRALIZED PREDICTION MARKET ON BASE
          </div>
          <div className="text-center font-[100] text-2xl md:text-4xl">
            By DEGENS for DEGENS
          </div>
          <div className="flex flex-col gap-4 md:gap-10 justify-center items-center mt-8 md:mt-10">
            <Link href="/create-bet">
              <ButtonGradient size="regular" className="md:px-12">
                Predict now!
              </ButtonGradient>
            </Link>
            <div className="">
              <Image
                src="./pixelated/down-arrow.svg"
                className="animate-bounce w-12 md:w-16 h-auto"
                width={100}
                height={100}
                alt=""
              />
            </div>
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export default Hero;
