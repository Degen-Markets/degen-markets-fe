import { Address } from "@/app/lib/utils/bets/types";
import { Heading, Headline, SubHeadline } from "@/app/components/Heading";
import UserAvatar from "@/app/components/UserAvatar";
import { getDisplayNameForAddress } from "@/app/lib/utils/bets/helpers";

interface Props {
  winner: Address;
  loser: Address;
}
const WonBet = ({ winner, loser }: Props) => {
  return (
    <>
      <Heading>
        <Headline>
          <div className="flex flex-col text-xl items-center -translate-y-1/2">
            <UserAvatar address={winner} />
            <div>{getDisplayNameForAddress(winner)}</div>
          </div>
          <div className="uppercase">Winner</div>
        </Headline>
      </Heading>
      <Heading>
        <Headline variant="light" className="text-blue-dark">
          <div className="flex flex-col text-xl items-center -translate-y-1/2">
            <UserAvatar address={loser} />
            <div>{getDisplayNameForAddress(loser)}</div>
          </div>
          <div className="uppercase">Loser</div>
        </Headline>
      </Heading>
    </>
  );
};

export default WonBet;
