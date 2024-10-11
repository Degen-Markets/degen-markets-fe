import LeaderboardTable from "@/app/components/LeaderboardTable/LeaderboardTable";
import { Player } from "@/app/types/player";
import { FC } from "react";
import { Section } from "@/app/components/Section";

interface Props {
  players: Player[];
}
const LeaderBoard: FC<Props> = ({ players }) => {
  return (
    <Section>
      <LeaderboardTable players={players} />
    </Section>
  );
};

export default LeaderBoard;
