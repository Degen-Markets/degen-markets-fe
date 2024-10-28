"use client";

import { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";

const AnimatedLoading = ({
  text = "Loading",
  speed = 300,
  className,
}: {
  text?: string;
  speed?: number;
  className?: string;
}) => {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => {
        if (prevDots.length >= 3) {
          return "";
        }
        return prevDots + ".";
      });
    }, speed);

    return () => clearInterval(interval);
  }, [speed]);

  return (
    <div
      className={twMerge(
        "flex items-center justify-center min-h-[100px] bg-background text-foreground",
        className,
      )}
    >
      <p className="text-xl" aria-live="polite">
        {text}
        <span className="inline-block w-6">{dots}</span>
      </p>
    </div>
  );
};

export default AnimatedLoading;
