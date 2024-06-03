import React, { useEffect, useState } from "react";

const BetCountdown: React.FC<{
  expirationTimestampInS: number;
  classNames?: string;
  message?: string;
  countDownClassName?: string;
}> = ({
  expirationTimestampInS,
  classNames = "",
  message = "Countdown to accept bet",
  countDownClassName,
}) => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const endTime = expirationTimestampInS * 1000;

    const updateCountdown = () => {
      const distance = endTime - Date.now();

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
  }, [expirationTimestampInS]);

  return (
    <div className={`flex items-center text-sm lg:text-2xl ${classNames}`}>
      {message}:&nbsp;
      <span className={`tracking-wider ${countDownClassName}`}>
        {countdown}
      </span>
    </div>
  );
};

export default BetCountdown;
