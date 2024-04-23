import React, { useEffect, useState } from "react";

const BetCountdown: React.FC<{
  betCreationTimestamp: string;
  duration: number;
  classNames?: string;
}> = ({ betCreationTimestamp, duration = 86400 * 1000, classNames }) => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const endTime = new Date(parseInt(betCreationTimestamp) * 1000 + duration);

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

    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [betCreationTimestamp]);

  return (
    <div className={`tabular-nums ${classNames}`}>
      <div>
        Countdown to accept bet:&nbsp;
        <span className="tracking-wider">{countdown}</span>
      </div>
    </div>
  );
};

export default BetCountdown;
