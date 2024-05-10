import { Address } from "@/app/lib/utils/bets/types";
import { Heading, Headline, SubHeadline } from "@/app/components/Heading";
import UserAvatar from "@/app/components/UserAvatar";
import { getDisplayNameForAddress } from "@/app/lib/utils/bets/helpers";

interface Props {
  winner: Address;
  loser: Address;
}
const WinnerState = ({ winner, loser }: Props) => {
  return (
    <div>
      <Heading className="">
        <Headline>
          <div className="flex flex-col text-xl items-center -translate-y-1/2">
            <UserAvatar address={winner} />
            <div>{getDisplayNameForAddress(winner)}</div>
          </div>
        </Headline>
      </Heading>
      <Heading>
        <Headline>
          <div className="flex flex-col text-xl items-center -translate-y-1/2">
            <UserAvatar address={winner} />
            <div>{getDisplayNameForAddress(winner)}</div>
          </div>
        </Headline>
      </Heading>
    </div>
  );
};

export default WinnerState;
