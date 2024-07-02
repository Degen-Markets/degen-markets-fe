import {
  betDuration,
  getHumanFriendlyMetric,
} from "@/app/lib/utils/bets/helpers";
import React from "react";
import { BetType, Metric } from "@/app/lib/utils/bets/types";
import Image from "next/image";

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
      {betType === "binary" &&
        (isBetOnUp ? (
          <Image src="/ArrowUp.svg" width={24} height={24} alt="arrow-up" />
        ) : (
          <Image src="/ArrowDown.svg" width={24} height={24} alt="arrow-down" />
        ))}
      <span
        className={`text-neutral-800 pl-1 ${className}`}
      >{`${betDuration(creationTimestamp, expirationTimestamp)}`}</span>
    </span>
  );
};

export default MetricDisplay;
