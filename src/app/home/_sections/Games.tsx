import Image from "next/image";
import cx from "classnames";
import Link from "next/link";

const games = [
  {
    id: "bull_or_bear",
    label: "Bull Or Bear",
    link: "/create-bet",
  },
  {
    id: "game_2",
    label: "Coming soon",
  },
  {
    id: "game_3",
    label: "Coming soon",
  },
];

const GameCard = ({
  id,
  label,
  link,
}: {
  id: string;
  label: string;
  link?: string;
}) => {
  const content = (
    <>
      <Image
        width={200}
        height={150}
        src={`/games/${id}.jpg`}
        alt={label}
        className={cx(
          "w-20 h-28 md:h-48 md:w-40 rounded-md object-cover border-2 border-white ",
          { "opacity-50": !link },
          { "cursor-pointer": link },
        )}
      />
      <div className="absolute right-0 left-0 bottom-0 top-0 flex items-center justify-center text-xl md:text-5xl p-1 md:p-10 text-center text-stroke-3">
        {label}
      </div>
    </>
  );

  return (
    <div className={"flex flex-col justify-center items-center relative"}>
      {link ? <Link href={link}>{content}</Link> : content}
    </div>
  );
};

const Games = () => (
  <div className="flex justify-start max-w-[90%] md:max-w-[70%] mb-8 md:mb-12">
    <div className="flex flex-col space-y-2" id="fellow-degens">
      <h1 className="text-left font-bold text-2xl md:text-6xl pl-4 md:pl-8">
        Games
      </h1>
      <div className="flex flex-wrap gap-2 md:gap-10 p-4 md:p-10 border-t-8 border-b-8 border-r-8 rounded-r-xl">
        {games.map(({ id, label, link }) => (
          <GameCard key={id} label={label} id={id} link={link} />
        ))}
      </div>
    </div>
  </div>
);

export default Games;
