import { ArrowDown, ArrowUp } from "@/app/components/Icons";
import {
  betDuration,
  getHumanFriendlyMetric,
} from "@/app/lib/utils/bets/helpers";
import React from "react";
import { Metric } from "@/app/lib/utils/bets/types";

interface Props {
  metric: Metric;
  isBetOnUp: boolean;
  creationTimestamp: string;
  expirationTimestamp: string;
  className?: string;
}

const MetricDisplay = ({
  metric,
  isBetOnUp,
  creationTimestamp,
  expirationTimestamp,
  className,
}: Props) => {
  return (
    <span
      className={`${isBetOnUp ? "text-green-500" : "text-red-500"} flex items-center`}
    >
      {getHumanFriendlyMetric(metric)}
      {isBetOnUp ? <ArrowUp /> : <ArrowDown />}
      <span
        className={`text-neutral-800 pl-1 ${className}`}
      >{`${betDuration(creationTimestamp, expirationTimestamp)}`}</span>
    </span>
  );
};

export default MetricDisplay;
