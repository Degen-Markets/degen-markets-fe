import { FC } from "react";
import { Player } from "@/app/types/player";
import LeaderboardTableRow from "./LeaderboardTableRow";
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
            <LeaderboardTableRow
              player={player}
              index={index}
              key={player.address}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default LeaderBoard;
