"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Button } from "@/app/components/Button/Button";
import Link from "next/link";
import { Section } from "@/app/components/Section";
import RobotIcon from "@/app/components/Icons/RobotIcon";

const HeroSection = () => (
  <div className="bg-hero">  
     <Section className="space-y-5 lg:space-y-10 flex gap-4 ">

    <>
      <div className="w-full lg:w-[60%]">
        <h1 className="text-2xl md:text-6xl md:leading-snug  mb-8">
          Dare to disagree with the prophecies?
        </h1>
        <p className="w-[80%] lg:w-[60%] text-base md:text-md text-lavender-blue mb-6">
          Go head to head against AI predictions
        </p>
        <Link href="/pools">
          <Button intent="primary" icon={<RobotIcon width={30} />}>
            Bet Against AI
          </Button>
        </Link>
      </div>
      <div className="hidden lg:block relative w-[40%]">
        <div className="absolute top-5 right-0">
          <DotLottieReact src="/animations/hero-shape.lottie" loop autoplay />
        </div>
        <div className="absolute">
          <DotLottieReact src="/animations/blink.lottie" autoplay />
        </div>
      </div>
    </>
  </Section>
);

export default HeroSection;
