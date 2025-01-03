import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const MAX_SUPPLY = 100_000_000;

interface TokenDistributionProps {
  title: string;
  percentage: number;
  items: {
    text: string;
    highlight?: boolean;
    isLocked?: boolean;
  }[];
  totalTokens: {
    amount: number;
    symbol: string;
  };
  x: number;
  y: number;
  isMobile?: boolean;
}

export function TokenDistribution({
  title,
  items,
  totalTokens,
  percentage,
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
          className={`font-semibold ${isMobile ? "text-lg" : "text-xl"} text-lavender-blue mb-2`}
        >
          {`${title} (${percentage}%)`}
        </h2>
      </div>
      <div className="space-y-2">
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
                    <LockClosedIcon className="text-orange-700 w-4 h-4" />
                  ) : (
                    <LockOpenIcon className="text-teal-500 w-4 h-4" />
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
        <div
          className={`${isMobile ? "text-xs" : "text-sm"} font-medium text-teal-600`}
        >
          ~{totalTokens.amount.toLocaleString()} / ~
          {MAX_SUPPLY.toLocaleString()}{" "}
          <span className="text-orange-300">${totalTokens.symbol}</span>
        </div>
      </div>
    </motion.div>
  );
}
