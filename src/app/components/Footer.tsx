import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center font-kadwa text-white text-xl  gap-4 mt-8 md:mt-12">
      <h3>
        For media requests:&nbsp;
        <span className="animated-link">
          <a href="mailto:media@degensmarkets.com">media@degensmarkets.com</a>
        </span>
      </h3>
      <div className="flex gap-2 align-middle items-center">
        <a
          href="https://twitter.com/DEGEN_MARKETS"
          rel="noopener noreferrer"
          target="_blank"
          className="flex items-centers"
        >
          <button className="hover:scale-110 w-10 social">
            <Image
              src="/socials/twitter.png"
              alt="Twitter"
              width={20}
              height={20}
            />
          </button>
        </a>
        <a
          href="https://t.me/+--njIIahc-ZkNTdi"
          rel="noopener noreferrer"
          target="_blank"
          className="flex items-centers"
        >
          <button className="hover:scale-110 w-10" rel="noopener noreferrer">
            <Image
              src="/socials/telegram.png"
              alt="Telegram"
              width={20}
              height={20}
            />
          </button>
        </a>
      </div>
      <h3>© degensmarkets 2024</h3>
      <img src="footer-image.png" alt="" className="w-screen" />
    </footer>
  );
};

export default Footer;
