import React from "react";
import DgmLogoIcon from "@/app/components/Icons/DgmLogoIcon";
import Link from "next/link";
import { Button } from "@/app/components/Button/Button";

function FooterBottom() {
  return (
    <div className="md:mx-auto md:max-w-screen-xl lg:max-w-screen-2xl pt-20 pb-10">
      <div className="flex justify-between items-center w-full space-x-4">
        <div>©2024 degensmarkets, All rights reserved</div>
        <DgmLogoIcon width={80} height={80} />
        <div className="flex space-x-2">
          <Link href="">Terms of Service</Link>
          <Link href="/">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
}

function ShadowDecoration() {
  return (
    <div className="flex items-center justify-center w-full absolute -top-16">
      <svg
        width="1190"
        height="150"
        viewBox="0 0 1190 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.2" filter="url(#filter0_f_220_3003)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M160.472 55.1096C160.682 55.037 160.903 55 161.125 55H1028.87C1029.1 55 1029.32 55.037 1029.53 55.1096L1133.74 91.1096C1135.87 91.8464 1135.34 95 1133.09 95H56.9147C54.6583 95 54.129 91.8464 56.2616 91.1096L160.472 55.1096Z"
            fill="black"
            fillOpacity="0.5"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_220_3003"
            x="0.546"
            y="0.634"
            width="1188.91"
            height="148.731"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="27.1828"
              result="effect1_foregroundBlur_220_3003"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

function FooterWaveDecoration() {
  return (
    <div className="w-full overflow-hidden">
      <svg
        className="w-full h-auto"
        viewBox="0 0 1440 163"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 0H1440V21C1440 21 1079.43 163 719.621 163C359.81 163 0 21 0 21V0Z"
          fill="#0C0C1A"
        />
      </svg>
    </div>
  );
}

function NewsletterSubscription() {
  return (
    <div className="absolute flex items-center w-full space-x-4 -top-40 bg-white rounded-lg py-12 z-10">
      <label htmlFor="email">Subscribe Newsletters</label>
      <div>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
        />
        <Button size="small" intent="primary">
          Subscribe Now
        </Button>
      </div>
    </div>
  );
}

const Footer = () => {
  return (
    <footer className="bg-white w-full text-main text-base">
      <FooterWaveDecoration />
      <div className="md:mx-auto md:max-w-screen-xl lg:max-w-screen-2x flex gap-8 bg-white w-full relative">
        <NewsletterSubscription />
        <ShadowDecoration />
      </div>
      <FooterBottom />
    </footer>
  );
};

export default Footer;
