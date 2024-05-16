import Image from "next/image";

const fellowsCards = [
  "3qyEeEom",
  "8iGfjlMj",
  "COwaR",
  "Ds7ZTZ",
  "b1lvC45d",
  "CPNdKAm3",
  "CzQz1rOb",
  "ezW6zWx7",
  "HD9kpklf",
  "KILbcfmY",
  "lHoszyAe",
  "lI1ge7Nu",
  "oOAKXzy",
  "P48EOw0F",
  "qyQ7S_6_",
  "RXUJwuB5",
  "tMx3y7je",
  "wT_9FIxy",
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
    <h2 className="geo-font font-normal md:font-bold text-xs md:text-lg">
      @{title}
    </h2>
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
