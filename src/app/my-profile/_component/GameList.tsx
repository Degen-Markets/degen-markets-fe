import React, { useMemo } from "react";
import GameCard from "./GameCard";
import { BetResponse } from "@/app/lib/utils/bets/types";

interface GameListProps {
  bets: BetResponse[];
}

const GameList: React.FC<GameListProps> = ({ bets }) => {
  const userGames = useMemo(() => {
    return [
      {
        game: "Bull or Bear",
        playedTime: 53,
        winTime: 23,
        winPercentage: 10,
        bgImage: "/games/bull_or_bear.webp",
        bgColor: "#FEB3384D",
        gameIconLeft: "/profile/Bull.svg",
        gameIconRight: "/profile/Bear.svg",
        comingSoon: false,
      },
      {
        game: "The Price is Right",
        playedTime: 40,
        winTime: 30,
        winPercentage: 30,
        bgImage: "/games/price_is_right.webp",
        bgColor: "#3FADF666",
        gameIconLeft: "",
        gameIconRight: "",
        comingSoon: false,
      },
      {
        game: "Pool",
        playedTime: 43,
        winTime: 157,
        winPercentage: 65,
        bgImage: "/games/game_3.jpg",
        bgColor: "#AB9FF166",
        gameIconLeft: "",
        gameIconRight: "/profile/phantom.svg",
        comingSoon: true,
      },
    ];
  }, []);
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-10">
      {userGames.map((game) => (
        <GameCard game={game} key={game.game} />
      ))}
    </div>
  );
};

export default GameList;
