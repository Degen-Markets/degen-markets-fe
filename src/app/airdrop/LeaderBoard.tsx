import { FC } from "react";
import { Player } from "@/app/types/player";
import UserAvatar from "@/app/components/UserAvatar";
import Link from "next/link";
import { getDisplayNameForAddress } from "@/app/lib/utils/helpers";
import { HiTrophy } from "react-icons/hi2";

interface LeaderBoardProps {
  players: Player[];
}

const LeaderBoard: FC<LeaderBoardProps> = ({ players }) => {
  return (
    <section>
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-lavender-blue">
          <tr>
            <th className="px-6 py-3">Place</th>
            <th className="px-6 py-3">Username</th>
            <th className="px-6 py-3">Points</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr
              className="border-b-4 border-b-main bg-steel-gray rounded-lg"
              key={player.address}
            >
              <th className="px-2 lg:px-6 py-2 font-medium  whitespace-nowrap">
                <div className="flex items-center gap-1">
                  <HiTrophy size={24} className="text-lavender-blue" />{" "}
                  {index + 4}
                </div>
              </th>
              <td className="px-2 lg:px-6 py-2">
                <div className="flex gap-3 items-center">
                  <UserAvatar
                    src={player.twitterPfpUrl}
                    className="h-8 w-8 lg:w-12 lg:h-12"
                    width={32}
                    height={32}
                  />
                  <div className="text-lg font-semibold">
                    {player.twitterUsername ? (
                      <Link
                        href={`https://x.com/${player.twitterUsername}`}
                        target="_blank"
                      >
                        @{player.twitterUsername}
                      </Link>
                    ) : (
                      getDisplayNameForAddress(player.address)
                    )}
                  </div>
                </div>
              </td>
              <td className="px-2 lg:px-6 py-2">{player.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default LeaderBoard;
