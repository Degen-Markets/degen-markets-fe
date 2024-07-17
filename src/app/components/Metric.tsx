import React from "react";
import Image from "next/image";
import {
  betDuration,
  getHumanFriendlyMetric,
} from "@/app/lib/utils/bets/helpers";
import { BetType, Metric } from "@/app/lib/utils/bets/types";

interface Props {
  metric: Metric;
  isBetOnUp: boolean;
  creationTimestamp: string;
  expirationTimestamp: string;
  className?: string;
  betType: BetType;
}

const MetricDisplay: React.FC<Props> = ({
  metric,
  isBetOnUp,
  creationTimestamp,
  expirationTimestamp,
  betType,
  className = "",
}) => {
  const getArrowImage = () => {
    const src = isBetOnUp ? "/ArrowUp.svg" : "/ArrowDown.svg";
    const alt = isBetOnUp ? "arrow-up" : "arrow-down";
    return <Image src={src} width={24} height={24} alt={alt} />;
  };

  return (
    <span
      className={`${isBetOnUp ? "text-green-500" : "text-red-500"} flex items-center`}
    >
      {getHumanFriendlyMetric(metric)}
      {betType === "binary" && (
        <>
          &nbsp;to go {isBetOnUp ? "up" : "down"}
          {getArrowImage()}
        </>
      )}
      <span className={`text-neutral-800 pl-1 ${className}`}>
        in&nbsp;{betDuration(creationTimestamp, expirationTimestamp)}
      </span>
    </span>
  );
};

export default MetricDisplay;
