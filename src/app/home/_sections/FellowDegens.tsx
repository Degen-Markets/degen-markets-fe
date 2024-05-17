import Image from "next/image";
import Link from "next/link";

const fellowsCards = [
  "PatMetheus",
  "TheOnlyDarwin",
  "high_fades",
  "jpegplug",
  "Enter_the_Krypt",
  "AutonomyCapital",
  "TheEuroSniper",
  "TheGemHunters",
  "ShardiB2",
  "TylerDurden",
  "bullish_teddy",
  "CaptClutchEth",
  "BTC_NFT",
  "Trader1sz",
  "Dylanleeeth",
  "TraderDaink",
  "TheCryptoLes",
  "Crypto_Altology",
];

const FellowCard = ({ title }: { title: string }) => (
  <div className="flex flex-col justify-center items-center">
    <div className="w-20 items-center flex flex-col items-center">
      <Image
        width={50}
        height={50}
        src={`/fellows/${title}.jpg`}
        alt={`@${title}`}
        className="rounded-md"
      />
      <Link
        className="geo-font font-normal md:font-bold text-xs md:text-lg"
        href={`https://twitter.com/${title}`}
        target="_blank"
      >
        @{title}
      </Link>
    </div>
  </div>
);

const FellowDegens = () => (
  <div className="flex justify-end">
    <div
      className="flex flex-col max-w-[90%] md:max-w-[70%] space-y-2"
      id="fellow-degens"
    >
      <h1 className="text-right font-bold text-2xl md:text-6xl pl-r md:pr-8">
        Fellow DEGENS
      </h1>
      <div className="flex flex-wrap gap-3 md:gap-10 p-4 md:p-10 border-t-8 border-b-8 border-l-8 rounded-l-xl">
        {fellowsCards.map((title) => (
          <FellowCard key={title} title={title} />
        ))}
      </div>
    </div>
  </div>
);

export default FellowDegens;
