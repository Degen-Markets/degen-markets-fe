"use client";
import React from "react";
// import { Mail, UserPlus, Link } from 'lucide-react';
import { IoMailOpen } from "react-icons/io5";
import { HiMiniUserPlus } from "react-icons/hi2";
import { FaSquareXTwitter } from "react-icons/fa6";
import AvatarWithLabel from "@/app/components/AvatarWithLabel";
import { useAccount } from "wagmi";
import UserAvatar from "@/app/components/UserAvatar";
import { getDisplayNameForAddress } from "@/app/lib/utils/bets/helpers";
import { Address } from "viem";
import { BsPatchCheckFill } from "react-icons/bs";
import Image from "next/image";
import CircularProgress from "./CircularProgressBar";

interface GameStats {
  totalGames: number;
  wins: number;
}

interface LastMatch {
  opponent: string;
  game: string;
  stake: string;
  prediction: string;
  outcome: string;
  profitLoss: string;
}

const ProfileComponent: React.FC = () => {
  const { address } = useAccount();
  const gameStats: GameStats = { totalGames: 231, wins: 157 };
  const lastMatches: LastMatch[] = [
    {
      opponent: "0x53...dB87a",
      game: "BULL OR BEAR",
      stake: "0.03 ETH",
      prediction: "PRICE MOONS",
      outcome: "PRICE MOONS",
      profitLoss: "0.03 ETH",
    },
    {
      opponent: "0x53...dB87a",
      game: "BULL OR BEAR",
      stake: "0.03 ETH",
      prediction: "PRICE MOONS",
      outcome: "PRICE RUSS",
      profitLoss: "-0.03 ETH",
    },
  ];

  const userGames = [
    {
      game: "Bull or Bear",
      playedTime: 321,
      winTime: 157,
      winPercentage: 50,
      bgImage: "/games/bull_or_bear.webp",
      bgColor: "#FEB3384D",
      gameIconLeft: "/profile/Bull.svg",
      gameIconRight: "/profile/Bear.svg",
    },
    {
      game: "The Price is Right",
      playedTime: 65,
      winTime: 157,
      winPercentage: 20,
      bgImage: "/games/price_is_right.webp",
      bgColor: "#3FADF666",
      gameIconLeft: "",
      gameIconRight: "",
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
    },
  ];

  return (
    <div className="bg-blue-light bg-opacity-20 text-white p-6 rounded-lg max-w-7xl mx-auto">
      <div className="flex-col md:flex-row flex items-center justify-between mb-6 gap-5">
        <div className=" flex items-center space-x-4 border border-red-400 w-full rounded-xl p-2">
          <div className="grid md:grid-cols-4 w-full h-full">
            {/* first */}
            <div className="col-span-1 flex flex-col justify-center items-start space-y-2 relative ">
              <span className="absolute top-0 -right-18 rounded-md font-bold px-3 text-md py-2 bg-[#5A799E4D] bg-opacity-50">
                ghosthash1
                <BsPatchCheckFill
                  className="absolute -top-3 -right-3"
                  size={25}
                />
              </span>
              <UserAvatar address={address} height={200} width={200} />
              <p className="text-md">
                {address ? getDisplayNameForAddress(address as Address) : ""}
              </p>
            </div>
            {/* second */}
            <div className="flex justify-between items-center gap-7 col-span-3">
              <div className="flex justify-between items-center md:flex-col md:space-y-3 px-10 w-full">
                <div className="w-full">
                  <div className="flex items-center space-x-2 font-bold">
                    <Image
                      src="/profile/Rank.svg"
                      width={40}
                      height={40}
                      alt="cash"
                    />
                    <p>Rank</p>
                  </div>
                  <div className="border-2 rounded-4xl p-6 bg-[url(/profile/lady.svg)] bg-no-repeat bg-cover uppercase font-bold bg-opacity-35">
                    Common Shiller
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex items-center space-x-2 font-bold">
                    <Image
                      src="/profile/Transaction.svg"
                      width={40}
                      height={40}
                      alt="cash"
                    />

                    <p>Points</p>
                  </div>
                  <div className="border-2 rounded-4xl p-2 bg-blue-dark flex justify-rounded items-center gap-3 font-bold">
                    <Image
                      src="/profile/Cash.svg"
                      width={80}
                      height={80}
                      alt="cash"
                    />
                    <span>210</span>
                    <span>PTS</span>
                  </div>
                </div>
              </div>

              {/* third */}

              <div className="w-full h-full flex flex-col items-center justify-center">
                <p className="text-sm text-center font-bold mb-2 ">
                  Game Played
                </p>
                <div className="w-full flex justify-center items-center flex-col h-full">
                  <div className=" h-max bg-olive-to-blue-gradient flex justify-center w-full items-center border-2 rounded-3xl text-center text-5xl font-bold">
                    21
                  </div>
                </div>
              </div>
              <div className="w-full h-full flex flex-col items-center justify-center">
                <p className="text-sm text-center font-bold mb-1">
                  Win Percentage
                </p>
                <div
                  className="w-full flex justify-center items-center flex-col h-full"
                  h-full
                >
                  <div className="h-full bg-teal-to-blue-gradient flex justify-center w-full items-center border-2 rounded-3xl text-center text-5xl font-bold">
                    56%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex md:flex-col justify-between w-full max-w-md md:w-auto h-full">
          <button className="">
            <Image
              src="/profile/AddUser.svg"
              alt="alt"
              width={50}
              height={50}
            />
            <p>Invite</p>
          </button>
          <button className="">
            <Image src="/profile/Mail.svg" alt="alt" width={50} height={50} />
            <p>Invite</p>
          </button>
          <button className="">
            <Image
              src="/profile/TwitterX.svg"
              alt="alt"
              width={50}
              height={50}
            />
            <p>Invite</p>
          </button>
        </div>
      </div>

      {/* Join section */}

      <div className="border-b pb-3 my-5 font-bold">
        <div className="flex justify-between items-center px-4">
          <div>Joined 1.07.2024</div>
          <div>
            <div>
              Me vs:&nbsp;<span className="text-green-light">2w</span>
              &nbsp;/&nbsp;<span className="text-red-light">0L</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6 ">
        {userGames.map((game) => {
          console.log({
            BGIMAGE: game.bgImage,
          });
          return (
            <div key={game.game}>
              <div className="flex items-center justify-center space-x-2 mb-2">
                {game.gameIconLeft && (
                  <Image
                    src={game.gameIconLeft}
                    width={20}
                    height={20}
                    alt={game.gameIconLeft}
                  />
                )}
                <p className="text-center font-bold uppercase">{game.game}</p>
                {game.gameIconRight && (
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
                <div className="absolute inset-0">
                  <div className={`p-4 rounded-xl `}>
                    <div className="relative flex font-bold flex-col items-center w-full justify-between">
                      <div className="text-5xl">{game.playedTime}</div>
                      <div className="text-center">Total Games Played</div>
                    </div>
                    <div className="w-full mt-2 flex items-center justify-around">
                      <Image
                        src={"/profile/Trophy.svg"}
                        alt="trophy"
                        width={70}
                        height={70}
                      />
                      <div className="flex flex-col items-center justify-between space-x-2 uppercase font-bold px-5">
                        <div className="text-6xl">{game.winTime}</div>
                        <div className="text-lg">
                          {" "}
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
        })}
      </div>

      <div className="border-b pb-3 my-5 font-bold">
        <div className="flex justify-between items-center px-4">
          <div>Joined 1.07.2024</div>
          <div>
            <div>
              Me vs:&nbsp;<span className="text-green-light">2w</span>
              &nbsp;/&nbsp;<span className="text-red-light">0L</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">LAST MATCHES</h3>
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th>OPPONENT</th>
              <th>GAME</th>
              <th>STAKE</th>
              <th>PREDICTION</th>
              <th>OUTCOME</th>
              <th>PROFIT/LOSS</th>
            </tr>
          </thead>
          <tbody>
            {lastMatches.map((match, index) => (
              <tr key={index} className="border-t border-gray-700">
                <td>{match.opponent}</td>
                <td>{match.game}</td>
                <td>{match.stake}</td>
                <td>{match.prediction}</td>
                <td>{match.outcome}</td>
                <td
                  className={
                    match.profitLoss.startsWith("-")
                      ? "text-red-500"
                      : "text-green-500"
                  }
                >
                  {match.profitLoss}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfileComponent;
