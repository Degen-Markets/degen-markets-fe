import { isBetRunning } from "@/app/lib/utils/bets/helpers";
import { BetResponse } from "@/app/lib/utils/bets/types";
import cx from "classnames";

const BetStatus = ({ bet }: { bet: BetResponse }) => {
  const betStatus = isBetRunning(bet) ? "Running" : "Expired";
  const betStatusClass = isBetRunning(bet) ? "bg-green-main" : "bg-red-main";
  return (
    <div
      className={cx(
        "text-sm px-1 mt-1 w-fit whitespace-nowrap",
        betStatusClass,
      )}
    >
      {betStatus}
    </div>
  );
};

export default BetStatus;
