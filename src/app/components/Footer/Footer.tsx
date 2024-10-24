import Link from "next/link";
import DgmLogoIcon from "@/app/components/Icons/DgmLogoIcon";
import XIcon from "../Icons/XIcon";
import TelegramIcon from "../Icons/TelegramIcon";
import FooterWaveDecoration from "./FooterWaveDecoration";
import NewsletterSubscription from "./NewsletterSubscription";
import ShadowDecoration from "./ShadowDecoration";

function FooterBottom() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="md:mx-auto md:max-w-screen-xl lg:max-w-screen-2xl pt-0 mt-6 lg:mt-0 lg:pt-10 pb-4 lg:pb-10 px-4 lg:px-12 text-sm text-gray-500 sm:border-t lg:border-0">
      <div className="flex items-center justify-between border-b pb-8">
        <div className="flex space-x-5 text-black">
          <Link href="/airdrop">Airdrop</Link>
          <Link href="/pools">Pools</Link>
        </div>
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Link href="https://x.com/DEGEN_MARKETS" target="_blank">
            <XIcon className="hover:text-black" />
          </Link>
          <Link href="https://t.me/+I6PUfipOKlY5MWUx" target="_blank">
            <TelegramIcon className="hover:text-black" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center w-full md:space-x-4">
        <div>©{currentYear} Degen Markets, All rights reserved</div>
        <div>
          <DgmLogoIcon width={80} height={80} />
        </div>
        <div>
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
    </div>
  );
}

const Footer = () => {
  return (
    <footer className="bg-white w-full text-main text-base mt-10 lg:mt-20 pt-0 lg:pt-0">
      <FooterWaveDecoration />

      {/* <div className="md:mx-auto md:max-w-screen-xl lg:max-w-screen-2x flex gap-8 bg-white w-full relative">
        <NewsletterSubscription />
        <ShadowDecoration />
      </div> */}

      <FooterBottom />
    </footer>
  );
};

export default Footer;
