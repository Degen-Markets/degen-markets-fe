import { BET_ACCEPTANCE_TIME_LIMIT } from "@/app/lib/utils/bets/constants";
import { getBetStatus } from "@/app/lib/utils/bets/helpers";
import { BetResponse } from "@/app/lib/utils/bets/types";
import cx from "classnames";

const BetStatus = ({ bet }: { bet: BetResponse }) => {
  const { status, className } = getBetStatus(bet);
  return (
    <div className={cx("text-sm px-1 mt-1 w-fit ", className)}>{status}</div>
  );
};

export default BetStatus;
