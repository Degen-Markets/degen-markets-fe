import Link from "next/link";
import DgmLogoIcon from "@/app/components/Icons/DgmLogoIcon";
import FooterWaveDecoration from "@/app/components/Footer/FooterWaveDecoration";
import NewsletterSubscription from "@/app/components/Footer/NewsletterSubscription";
import ShadowDecoration from "@/app/components/Footer/ShadowDecoration";

function FooterBottom() {
  return (
    <div className="md:mx-auto md:max-w-screen-xl lg:max-w-screen-2xl pt-4 lg:pt-20 pb-4 lg:pb-10 px-4 lg:px-12 text-sm text-gray-500 ">
      <div className="flex justify-between items-center w-full space-x-4">
        <div>©2024 degensmarkets, All rights reserved</div>
        <DgmLogoIcon width={80} height={80} />
        <div className="flex space-x-2">
          <Link href="/" className="text-gray-500 hover:text-main">
            Terms of Service
          </Link>
          <Link href="/" className="text-gray-500 hover:text-main">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}

const Footer = () => {
  return (
    <footer className="bg-white w-full text-main text-base mt-10 lg:mt-0">
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
