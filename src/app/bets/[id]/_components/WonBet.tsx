import { BetResponse } from "@/app/lib/utils/bets/types";
import { Heading, Headline, SubHeadline } from "@/app/components/Heading";
import UserAvatar from "@/app/components/UserAvatar";
import { getDisplayNameForAddress } from "@/app/lib/utils/bets/helpers";
import MetricAndWager from "@/app/bets/[id]/_components/MetricAndWager";
import ReplicateBetAction from "@/app/bets/[id]/_components/ReplicateBetAction";
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
    <div className="lg:max-w-screen-md">
      <Heading>
        <Headline className="uppercase text-mantis-dark lg:text-9xl">
          Winner
        </Headline>
        <SubHeadline
          isTop={true}
          className="bg-transparent border-transparent lg:px-6"
        >
          <div className="flex flex-col text-xl items-center ">
            <UserAvatar
              address={winner}
              className="w-16 h-16 md:h-32 md:w-32"
            />
            <div>{getDisplayNameForAddress(winner)}</div>
          </div>
        </SubHeadline>
      </Heading>
      <MetricAndWager bet={bet} hideStartingMetric={true} />
      <Heading className="justify-center flex mt-4 md:-mt-8 -z-10">
        <Headline className="md:w-2/5 " size="compact">
          <div className="flex  text-xl justify-center items-center gap-4 ">
            <UserAvatar address={loser} className="w-8 h-8" />
            <div className="text-lg">{getDisplayNameForAddress(loser)}</div>
            <div className="uppercase text-3xl text-red-main">Loser</div>
          </div>
        </Headline>
      </Heading>
      <div className="flex justify-center mt-8 gap-4">
        <ReplicateBetAction bet={bet} />
        <ButtonGradient size="small" className="w-2/5" onClick={handleShare}>
          Share
        </ButtonGradient>
      </div>
    </div>
  );
};

export default WonBet;
