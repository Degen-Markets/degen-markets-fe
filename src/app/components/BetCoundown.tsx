import React, { useEffect, useState } from "react";
import { BET_ACCEPTANCE_TIME_LIMIT_IN_MS } from "@/app/lib/utils/bets/constants";

const BetCountdown: React.FC<{
  expirationTimestamp: number;
  classNames?: string;
  message?: string;
}> = ({
  expirationTimestamp,
  classNames,
  message = "Countdown to accept bet",
}) => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const endTime = new Date(expirationTimestamp * 1000);
    console.log(endTime);

    const updateCountdown = () => {
      const now = new Date();
      const distance = endTime.getTime() - now.getTime();

      if (distance < 0) {
        setCountdown("EXPIRED");
        clearInterval(timer);
        return;
      }

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setCountdown(`${hours}H ${minutes}M ${seconds}S`);
    };

    const timer = setInterval(updateCountdown, 1_000);

    return () => clearInterval(timer);
  }, [expirationTimestamp]);

  return (
    <div className={`tabular-nums ${classNames}`}>
      <div>
        {message}:&nbsp;
        <span className="tracking-wider">{countdown}</span>
      </div>
    </div>
  );
};

export default BetCountdown;
