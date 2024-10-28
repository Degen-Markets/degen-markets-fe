import Link from "next/link";
import DgmLogoIcon from "@/app/components/Icons/DgmLogoIcon";
import XIcon from "../Icons/XIcon";
import TelegramIcon from "../Icons/TelegramIcon";

function FooterBottom() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="md:mx-auto md:max-w-screen-xl lg:max-w-screen-2xl pt-0 mt-5 lg:mt-0 lg:pt-10 pb-4 lg:pb-5 px-4 lg:px-12 text-sm">
      <div className="flex items-center justify-between border-b mb-3 pb-3 md:pb-8 text-main font-semibold">
        <div className="flex space-x-5 text-">
          <Link href="/airdrop">Airdrop</Link>
          <Link href="/pools">Pools</Link>
        </div>
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Link href="https://x.com/DEGEN_MARKETS" target="_blank">
            <XIcon className="hover:text-primary" />
          </Link>
          <Link href="https://t.me/+I6PUfipOKlY5MWUx" target="_blank">
            <TelegramIcon className="hover:text-primary" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center w-full text-gunmetal">
        <div>©{currentYear} Degen Markets, All rights reserved</div>
        <div>
          <DgmLogoIcon
            width={80}
            height={80}
            className="w-14 h-14 md:w-20 md:h-20"
          />
        </div>
        <div className="w-full lg:w-auto flex space-x-4 justify-between">
          <Link href="/" className="hover:text-primary">
            Terms of Service
          </Link>
          <Link href="/" className="hover:text-main">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}

const Footer = () => {
  return (
    <footer className="bg-white w-full text-main text-base mt-10 lg:mt-20 pt-0 lg:pt-0">
      {/* <FooterWaveDecoration /> */}

      {/* <div className="md:mx-auto md:max-w-screen-xl lg:max-w-screen-2x flex gap-8 bg-white w-full relative">
        <NewsletterSubscription />
        <ShadowDecoration />
      </div> */}

      <FooterBottom />
    </footer>
  );
};

export default Footer;
