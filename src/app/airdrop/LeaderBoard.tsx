import { FC } from "react";
import { Player } from "@/app/types/player";
import LeaderboardTableRow from "./LeaderboardTableRow";

interface LeaderBoardProps {
  players: Player[];
  indexOffset: number;
}

const LeaderBoard = ({ players, indexOffset }: LeaderBoardProps) => {
  return (
    <section>
      <table className="w-full text-sm text-left mt-10 lg:mt">
        <thead className="text-xs text-lavender-blue">
          <tr>
            <th className="px-6 py-3">Place</th>
            <th className="px-6 py-3">Username</th>
            <th className="px-6 py-3">Points</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <LeaderboardTableRow
              key={player.address}
              player={player}
              index={index + indexOffset} // Add offset to display correct index
            />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default LeaderBoard;
