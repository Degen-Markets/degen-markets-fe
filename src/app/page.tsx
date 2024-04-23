"use client";
import Marquee from "react-fast-marquee";
import Link from "next/link";

const fellowsCards = [
  { title: "cryptoles" },
  { title: "tradersz" },
  { title: "tylerdurden" },
  { title: "theeurosniper" },
  { title: "jpegplug" },
  { title: "ShardiB2" },
  { title: "dylanleeeth" },
  { title: "bullish_teddy" },
  { title: "high_fades" },
  { title: "Enter_the_krypt" },
  { title: "crypto_altology" },
  { title: "flatoutcrypto" },
  { title: "TheGemHunters" },
  { title: "AutonomyCapital" },
];

const Home = () => {
  return (
    <>
      <div className="absolute w-full top-[100px] z-[3]">
        <Marquee speed={30} direction="right">
          <img src="./pepe-cloud.png" alt="" className="w-[1000px] " />
        </Marquee>
      </div>
      <div className="z-[2]">
        <Marquee speed={150}>
          <img src="./clouds/cloud.png" alt="" className="w-[400px]" />
        </Marquee>
      </div>

      <div className=" flex flex-col items-center justify-center text-white">
        {/* GRADIENT BOX */}
        <div className="flex flex-col items-center w-full -mt-[250px] ">
          <div className="flex flex-row items-center py-14 p-0 z-10 justify-center w-full to-md2:flex-col">
            <div className="flex flex-col gap-6 items-center z-10 xl:translate-y-0">
              <h1 className="text-3xl xxxs:text-4xl xxs:text-5xl lg:text-6xl  xl:text-7xl xl2:text-6xl font-bold tracking-tight text-center geo-font text-nowrap">
                Are you DEGEN enough to
                <br />
                back your predictions?
              </h1>

              <div>
                <Link href="/create-bet">
                  <button className="flex flex-row masked-button p-1 rounded-full text-3xl w-fit cursor-pointer">
                    <span className="flex flex-row bg-blue-dark rounded-full px-2">
                      <span className="masked-button-text flex geo-font cursor-pointer">
                        Mama didn&apos;t raise no b
                        <span className="gradient-button-arrow flex items-center"></span>
                      </span>
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          {/* SCROLL DOWN */}
          <div className="flex relative flex-col items-center gap-4 z-10 ">
            <h5 className={`arcade-font text-xl text-center scroll-text`}>
              Scroll down to see fellow DEGENS
            </h5>
            <img
              src="./pixelated/down-arrow.png"
              className="bounce2"
              width={100}
              height={100}
              alt=""
            />
          </div>
        </div>
        {/* FELLOW DEGENS */}
        <div
          className="flex flex-col items-center gap-10 p-10"
          id="fellow-degens"
        >
          <h1 className="arcade-font font-bold text-4xl">Fellow DEGENS</h1>
          <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl3:grid-cols-7 gap-20">
            {fellowsCards.map((card, index) => (
              <div
                key={index + card.title}
                className="flex flex-col items-center gap-2"
              >
                <img
                  src={`./fellows/${card.title}.png`}
                  alt={`@${card.title}`}
                  className="h-30 w-30 object-cover"
                />
                <h2 className="geo-font text-lg">@{card.title}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
