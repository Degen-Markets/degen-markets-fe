import React, { useEffect, useState } from "react";

const BetCountdown: React.FC<{ betCreationTimestamp: string }> = ({
  betCreationTimestamp,
}) => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    // Calculate the future time by adding 86400 seconds (1 day) to the betCreationTimestamp
    const endTime = new Date(
      parseInt(betCreationTimestamp) * 1000 + 86400 * 1000,
    );

    // Function to update countdown
    const updateCountdown = () => {
      const now = new Date();
      const distance = endTime.getTime() - now.getTime();

      if (distance < 0) {
        setCountdown("EXPIRED");
        clearInterval(timer);
        return;
      }

      // Time calculations for days, hours, minutes and seconds
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the format H:MM:SS
      setCountdown(`${hours}H ${minutes}M ${seconds}S`);
    };

    // Update countdown every second
    const timer = setInterval(updateCountdown, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(timer);
  }, [betCreationTimestamp]);

  return (
    <div className="bg-blue-900 border-amber-400 py-1 px-2 tabular-nums">
      <div>Countdown to accept bet: {countdown}</div>
    </div>
  );
};

export default BetCountdown;
