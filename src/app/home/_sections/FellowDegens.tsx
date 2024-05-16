import Image from "next/image";

const FellowDegens = () => {
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

  return (
    <div
      className="flex flex-col items-center gap-10 p-10 border-t-8 border-b-8 border-l-8 rounded-l-xl"
      id="fellow-degens"
    >
      <h1 className="arcade-font font-bold text-2xl md:text-4xl">
        Fellow DEGENS
      </h1>
      <div className="flex flex-wrap gap-10 md:gap-20  md:w-[60%] justify-center">
        {fellowsCards.map((card, index) => (
          <div
            key={index + card.title}
            className="flex flex-col justify-center items-center gap-2"
          >
            <Image
              width={100}
              height={100}
              src={`./fellows/${card.title}.png`}
              alt={`@${card.title}`}
              className="h-30 w-30 object-cover"
            />
            <h2 className="geo-font text-lg">@{card.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FellowDegens;
