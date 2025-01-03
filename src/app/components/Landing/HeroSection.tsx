"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Button } from "@/app/components/Button/Button";
import Link from "next/link";
import { Section } from "@/app/components/Section";
import { SquaresPlusIcon } from "@heroicons/react/24/outline";

const HeroSection = () => (
  <div className="bg-hero pb-20">
    <Section className="space-y-5 lg:space-y-10 flex gap-4 ">
      <>
        <div className="w-full lg:w-[60%]">
          <h1 className="text-2xl md:text-6xl md:leading-snug  mb-8">
            Human, do you dare to bet against AI?
          </h1>
          <p className="w-[80%] lg:w-[60%] text-base md:text-md text-lavender-blue mb-6">
            AI Generated Prediction Markets coming soon
          </p>
          <Link
            href="https://x.com/tiresiasai"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button intent="primary" icon={<SquaresPlusIcon width={30} />}>
              Bet
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
  </div>
);

export default HeroSection;
