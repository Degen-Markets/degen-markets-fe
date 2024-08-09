import { IoIosArrowDown } from "react-icons/io";
import { twMerge } from "tailwind-merge";
import { Button } from "../Button";
import { MetricSort } from "@/app/lib/utils/bets/types";

interface SortButtonProps {
  label: string;
  sortKey: MetricSort;
  sortCriteria: MetricSort;
  sortOrder: "asc" | "desc";
  onClick: (criteria: MetricSort) => void;
}

const SortButton: React.FC<SortButtonProps> = ({
  label,
  sortKey,
  sortCriteria,
  sortOrder,
  onClick,
}) => {
  const isActive = sortCriteria === sortKey;

  return (
    <button
      onClick={() => onClick(sortKey)}
      className={twMerge(
        "flex items-center space-x-1 border rounded-lg px-2 py-0.5 text-xs font-extrabold",
        isActive ? "text-blue-main bg-blue-light" : "text-cadet-blue-light",
      )}
    >
      <span>{label}</span>
      {isActive && (
        <IoIosArrowDown className={sortOrder === "asc" ? "rotate-180" : ""} />
      )}
    </button>
  );
};

export default SortButton;
