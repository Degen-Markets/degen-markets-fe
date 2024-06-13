import { ArrowDown, ArrowUp } from "@/app/components/Icons";
import {
  betDuration,
  getHumanFriendlyMetric,
} from "@/app/lib/utils/bets/helpers";
import React from "react";
import { BetType, Metric } from "@/app/lib/utils/bets/types";

interface Props {
  metric: Metric;
  isBetOnUp: boolean;
  creationTimestamp: string;
  expirationTimestamp: string;
  className?: string;
  betType: BetType;
}

const MetricDisplay = ({
  metric,
  isBetOnUp,
  creationTimestamp,
  expirationTimestamp,
  betType,
  className,
}: Props) => {
  return (
    <span
      className={`${isBetOnUp ? "text-green-500" : "text-red-500"} flex items-center`}
    >
      {getHumanFriendlyMetric(metric)}
      {betType === "binary" && (isBetOnUp ? <ArrowUp /> : <ArrowDown />)}
      <span
        className={`text-neutral-800 pl-1 ${className}`}
      >{`${betDuration(creationTimestamp, expirationTimestamp)}`}</span>
    </span>
  );
};

export default MetricDisplay;
