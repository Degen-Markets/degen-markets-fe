import { getBetStatus } from "@/app/lib/utils/bets/helpers";
import { BetResponse } from "@/app/lib/utils/bets/types";
import cx from "classnames";

const BetStatus = ({
  bet,
  className,
}: {
  bet: BetResponse;
  className?: string;
}) => {
  const { status, statusClass } = getBetStatus(bet);
  return (
    <div className={cx("text-sm px-1 mt-1 w-fit ", statusClass, className)}>
      {status}
    </div>
  );
};

export default BetStatus;
