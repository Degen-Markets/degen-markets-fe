import React from "react";
import BetComponent from "./BetComponent";
import { useBetContext } from "../BetContext";

const BetDetail = ({
  ethPrice,
  calculatedValue,
}: {
  ethPrice: number | null;
  calculatedValue: string;
}) => {
  const { value, ticker, metric, direction, isProMode, customDuration } =
    useBetContext();
  const durationLabel = customDuration.label.toLowerCase();
  return (
    <div className="mb-4 text-sm text-center my-2">
      Bet&nbsp;
      {Number(value) > 0 && ethPrice ? (
        <span className="text-yellow-light">{`$${calculatedValue}`}&nbsp;</span>
      ) : (
        <span className="text-yellow-light">$0&nbsp;</span>
      )}
      that{" "}
      {isProMode
        ? `${ticker.label} & ${metric.label} goes ${direction.label.toLowerCase()} in ${durationLabel}`
        : `${ticker.label}'s Price goes Up/Down in 6 Hours."`}
    </div>
  );
};

export default BetDetail;
