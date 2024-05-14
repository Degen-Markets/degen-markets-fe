import { BetResponse } from "@/app/lib/utils/bets/types";
import { Heading, Headline, SubHeadline } from "@/app/components/Heading";
import UserAvatar from "@/app/components/UserAvatar";
import { getDisplayNameForAddress } from "@/app/lib/utils/bets/helpers";
import Metric from "@/app/bets/[id]/_compoenets/Metric";
import ReplicateBetAction from "@/app/bets/[id]/_compoenets/ReplicateBetAction";
import { ButtonGradient } from "@/app/components/Button";
import shareContent from "@/app/lib/utils/shareContent";

interface Props {
  bet: BetResponse;
}

const WonBet = ({ bet }: Props) => {
  const { winner, creator, acceptor, id } = bet;
  const loser = winner ? (winner === creator ? acceptor : creator) : null;
  if (!winner || !loser) return;

  const handleShare = () => {
    const url = `${window.location.protocol}//${window.location.hostname}/bets/${id}`;
    shareContent("I just won a bet", "Check out my winning bet:", url);
  };
  return (
    <>
      <Heading>
        <Headline>Winner</Headline>
        <SubHeadline isTop={true} className="bg-transparent border-transparent">
          <div className="flex flex-col text-xl items-center ">
            <UserAvatar address={winner} />
            <div>{getDisplayNameForAddress(winner)}</div>
          </div>
        </SubHeadline>
      </Heading>
      <Metric bet={bet} hideStartingMetric={true} />
      <Heading className="justify-center flex">
        <Headline className="w-2/5 " variant="light" size="compact">
          <div className="flex  text-xl justify-center items-center gap-4 ">
            <UserAvatar address={loser} className="w-8 h-8" />
            <div className="text-lg">{getDisplayNameForAddress(loser)}</div>
            <div className="uppercase text-2xl">Loser</div>
          </div>
        </Headline>
      </Heading>

      <div className="flex justify-center mt-8 gap-4">
        <ReplicateBetAction bet={bet} />
        <ButtonGradient size="small" className="w-2/5" onClick={handleShare}>
          Share
        </ButtonGradient>
      </div>
    </>
  );
};

export default WonBet;
