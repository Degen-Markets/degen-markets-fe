import React from "react";
import Image from "next/image";
import CircularProgress from "./CircularProgressBar";
import GradientText from "@/app/components/GradientText";

interface GameCardProps {
  game: {
    game: string;
    playedTime: number;
    winTime: number;
    winPercentage: number;
    bgImage: string;
    bgColor: string;
    gameIconLeft: string;
    gameIconRight: string;
    comingSoon: boolean;
  };
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <div key={game.game} className="relative">
      <div className="flex items-center justify-center space-x-2 mb-2">
        {game?.gameIconLeft && (
          <Image
            src={game.gameIconLeft}
            width={20}
            height={20}
            alt={game.gameIconLeft}
          />
        )}
        <p className="text-center font-bold uppercase">{game.game}</p>
        {game?.gameIconRight && (
          <Image
            src={game.gameIconRight}
            width={20}
            height={20}
            alt={game.gameIconRight}
          />
        )}
      </div>
      <div className="relative h-[266px] rounded-xl overflow-hidden border-2">
        <div
          className="w-full h-full bg-cover bg-no-repeat bg-opacity-25 opacity-25"
          style={{
            backgroundImage: `url(${game.bgImage})`,
          }}
        />
        {game.comingSoon && (
          <div className="absolute inset-0 bg-black-main bg-opacity-90 z-10 flex justify-center items-center cursor-not-allowed">
            <GradientText className="font-bold text-5xl z-20">
              Soon
            </GradientText>
          </div>
        )}
        <div className="absolute inset-0">
          <div className={`p-4 rounded-xl`}>
            <div className="relative flex font-bold flex-col items-center w-full justify-between">
              <div className="text-5xl">{game.playedTime}</div>
              <div className="text-center">Total Games Played</div>
            </div>
            <div className="w-full mt-2 flex items-center justify-around">
              <div className="w-full h-full max-w-14 md:max-w-24 flex-shrink-0">
                <img src={"/profile/Trophy.svg"} alt="trophy" />
              </div>
              <div className="flex flex-col items-center justify-between uppercase font-bold px-5">
                <div className="text-3xl lg:text-6xl">{game.winTime}</div>
                <div className="text-lg">
                  {game.winTime === 1 ? "Win" : "WINS"}
                </div>
              </div>
              <CircularProgress
                bgColor={game.bgColor}
                percentage={game.winPercentage}
                key={game.game}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
