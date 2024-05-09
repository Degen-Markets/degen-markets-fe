import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col items-center font-kadwa text-white text-xl px-10 pb-0 pt-[4vh] md:pt-16 gap-4">
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
            <img src={"./socials/twitter.png"} alt="Twitter" className="w-20" />
          </button>
        </a>
        <a
          href="https://t.me/+--njIIahc-ZkNTdi"
          rel="noopener noreferrer"
          target="_blank"
          className="flex items-centers"
        >
          <button className="hover:scale-110 w-10" rel="noopener noreferrer">
            <img
              src={"./socials/telegram.png"}
              alt="Twitter"
              className="w-20"
            />
          </button>
        </a>
      </div>
      <h3>© degensmarkets 2024</h3>
      <img src="footer-image.png" alt="" className="w-screen" />
    </div>
  );
};

export default Footer;
