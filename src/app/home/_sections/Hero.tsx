import Marquee from "react-fast-marquee";

const Hero = () => {
  return (
    <div className="flex flex-col items-center text-white h-screen w-screen ">
      <div className="absolute w-screen fle x-col bg-green-500">
        <div className="absolute z-[2] w-screen">
          <Marquee speed={60} direction="left">
            <img
              src="./clouds/cloud.png"
              alt=""
              className="w-[200px] md:w-[400px]"
            />
          </Marquee>
        </div>

        <div className="absolute z-[2] w-screen">
          <Marquee speed={30} direction="right">
            <img
              src="./pepe-cloud.png"
              alt=""
              className="w-[100vw] md:w-[1000px]"
            />
          </Marquee>
        </div>
      </div>

      <div className="px-4 md:px-0 absolute top-1/2 z-10">
        <div className="text-4xl md:text-7xl z-[10] text-center">
          The Decentralized Prediction Market on Base
        </div>
        <div className="flex items-center justify-center font-[100] text-2xl md:text-4xl">
          By DEGENS for DEGENS
        </div>
        <div className="flex flex-col gap-10 justify-center items-center mt-10">
          <div className="">Scroll down to see fellow DEGENS</div>
          <div className="">
            <img
              src="./pixelated/down-arrow.png"
              className="animate-bounce"
              width={100}
              height={100}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
