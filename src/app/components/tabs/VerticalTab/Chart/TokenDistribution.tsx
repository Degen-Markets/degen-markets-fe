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
}

export function TokenDistribution({
  title,
  items,
  progress,
  totalTokens,
  x,
  y,
}: TokenDistributionProps) {
  return (
    <motion.div
      className="absolute w-full h-full  rounded-lg p-2 flex flex-col  "
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: "350px",
        height: "fit-content",
        transform: "translate(-50%, -50%)",
        color: "white",
        fontSize: "0.875rem",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 0.5,
        delay: 2.2,
      }}
    >
      <div>
        <h2 className="font-extrabold text-xl text-secondary">{title}</h2>
      </div>
      <div className="space-y-1">
        <ul className="space-y-1 text-sm list-disc pl-4 text-secondary">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2 text-secondary">
              {item.isLocked !== undefined && (
                <span className="text-xs">
                  {item.isLocked ? (
                    <LockClosedIcon className="text-danger" />
                  ) : (
                    <LockOpenIcon className="text-success" />
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
          <h3 className="text-sm font-medium text-zinc-200">Token Unlock</h3>
          <div className="relative">
            <ProgressBar progress={progress} />
          </div>
        </div>

        <div className="text-sm font-medium text-success">
          ~{totalTokens.amount.toLocaleString()} / ~
          {totalTokens.total.toLocaleString()}{" "}
          <span className="text-yellow-500">${totalTokens.symbol}</span>
        </div>
      </div>
    </motion.div>
  );
}
