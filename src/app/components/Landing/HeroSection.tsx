"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Button } from "@/app/components/Button/Button";
import Link from "next/link";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import { Section } from "@/app/components/Section";

const HeroSection = () => (
  <Section className="space-y-5 lg:space-y-10 flex gap-4">
    <>
      <div className="w-full lg:w-[60%]">
        <h1 className="text-2xl md:text-6xl md:leading-snug  mb-8">
          Decentralized Prediction Market on Blinks
        </h1>
        <p className="w-[80%] lg:w-[60%] text-base md:text-md text-lavender-blue mb-6">
          Make Predictions on Events Directly on Twitter via Solana Blinks.
          Predict Now to Claim YOUR Share of the $DGM AirDrop
        </p>
        <Link href="/bets">
          <Button
            intent="primary"
            size="small"
            icon={<HiMiniArrowTrendingUp size={24} />}
          >
            Predict now
          </Button>
        </Link>
      </div>
      <div className="hidden lg:block relative w-[40%]">
        <div className="absolute top-5 -right-16">
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
