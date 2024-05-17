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
    <Image
      width={100}
      height={100}
      src={`/fellows/${title}.jpg`}
      alt={`@${title}`}
      className="h-12 w-12 md:h-24 md:w-24 rounded-md"
    />
    <Link
      className="geo-font font-normal md:font-bold text-xs md:text-lg"
      href={`https://twitter.com/${title}`}
      target="_blank"
    >
      @{title}
    </Link>
  </div>
);

const FellowDegens = () => (
  <div className="flex justify-end">
    <div
      className="flex flex-col max-w-[90%] md:max-w-[70%] space-y-2"
      id="fellow-degens"
    >
      <h1 className="text-left font-bold text-2xl md:text-6xl">
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
