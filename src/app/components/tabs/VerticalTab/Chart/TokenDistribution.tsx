"use client";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import ProgressBar from "./ProgressBar";

interface TokenDistributionProps {
  title: string;
  items: {
    text: string;
    highlight?: boolean;
    isLocked?: boolean;
  }[];
  progress: number;
  totalTokens: {
    amount: number;
    symbol: string;
    total: number;
  };
  x: number;
  y: number;
  isMobile?: boolean;
}

export function TokenDistribution({
  title,
  items,
  progress,
  totalTokens,
  x,
  y,
  isMobile = false,
}: TokenDistributionProps) {
  return (
    <motion.div
      className="absolute w-full h-full rounded-lg p-2 flex flex-col"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: isMobile ? "250px" : "350px",
        height: "fit-content",
        transform: "translate(-50%, -50%)",
        color: "white",
        fontSize: isMobile ? "0.75rem" : "0.875rem",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.5,
        delay: 2.2,
      }}
    >
      <div>
        <h2
          className={`font-extrabold ${isMobile ? "text-lg" : "text-xl"} text-secondary`}
        >
          {title}
        </h2>
      </div>
      <div className="space-y-1">
        <ul
          className={`space-y-1 ${isMobile ? "text-xs" : "text-sm"} list-disc list-outside pl-5 text-secondary`}
          style={{ listStyleType: "disc" }}
        >
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-zinc-200 marker:text-secondary"
            >
              {item.isLocked !== undefined && (
                <span className={isMobile ? "text-[10px]" : "text-xs"}>
                  {item.isLocked ? (
                    <LockClosedIcon className="text-danger w-4 h-4" />
                  ) : (
                    <LockOpenIcon className="text-success w-4 h-4" />
                  )}
                </span>
              )}
              <span
                className={
                  item.highlight ? "text-success font-medium" : "text-zinc-200"
                }
              >
                {item.text}
              </span>
            </li>
          ))}
        </ul>

        <div className="space-y-2">
          <h3
            className={`${isMobile ? "text-xs" : "text-sm"} font-medium text-zinc-200`}
          >
            Token Unlock
          </h3>
          <div className="relative">
            <ProgressBar progress={progress} />
          </div>
        </div>

        <div
          className={`${isMobile ? "text-xs" : "text-sm"} font-medium text-success`}
        >
          ~{totalTokens.amount.toLocaleString()} / ~
          {totalTokens.total.toLocaleString()}{" "}
          <span className="text-yellow-500">${totalTokens.symbol}</span>
        </div>
      </div>
    </motion.div>
  );
}
