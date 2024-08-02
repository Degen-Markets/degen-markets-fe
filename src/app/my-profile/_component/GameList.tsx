import React, { useMemo } from "react";
import GameCard from "./GameCard";
import { BetResponse } from "@/app/lib/utils/bets/types";
import { calculateBetStats } from "@/app/lib/utils/bets/helpers";
import { useAccount } from "wagmi";
import { Address } from "viem";

interface GameListProps {
  bets: BetResponse[];
}

const GameList: React.FC<GameListProps> = ({ bets }) => {
  const { address } = useAccount();
  const {
    bullOrBearWinPercentage,
    thePriceIsRightWinPercentage,
    totalBullOrBearBets,
    totalBullOrBearWins,
    totalThePriceIsRightBets,
    totalThePriceIsRightWins,
  } = useMemo(
    () => calculateBetStats(bets, address as Address),
    [bets, address],
  );

  const userGames = useMemo(() => {
    return [
      {
        game: "Bull or Bear",
        playedTime: totalBullOrBearBets || 0,
        winTime: totalBullOrBearWins || 0,
        winPercentage: bullOrBearWinPercentage || 0,
        bgImage: "/games/bull_or_bear.webp",
        bgColor: "#FEB3384D",
        gameIconLeft: "/profile/Bull.svg",
        gameIconRight: "/profile/Bear.svg",
        comingSoon: false,
      },
      {
        game: "The Price is Right",
        playedTime: totalThePriceIsRightBets || 0,
        winTime: totalThePriceIsRightWins || 0,
        winPercentage: thePriceIsRightWinPercentage || 0,
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
  }, [
    bullOrBearWinPercentage,
    thePriceIsRightWinPercentage,
    totalBullOrBearBets,
    totalBullOrBearWins,
    totalThePriceIsRightBets,
    totalThePriceIsRightWins,
  ]);
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-10">
      {userGames.map((game) => (
        <GameCard game={game} key={game.game} />
      ))}
    </div>
  );
};

export default GameList;
