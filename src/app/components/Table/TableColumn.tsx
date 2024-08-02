import React from "react";
import { twMerge } from "tailwind-merge";

interface TableColumnProps {
  content: React.ReactNode;
  isFirst: boolean;
  isLast: boolean;
}

const TableColumn: React.FC<TableColumnProps> = ({
  content,
  isFirst,
  isLast,
}) => {
  return (
    <div
      className={twMerge(
        "p-4 text-lg font-bold border-black-main border-x  border-r-0 center-all",
        isLast && "border-r-0",
        isFirst && "border-l-0",
      )}
    >
      {content}
    </div>
  );
};

export default TableColumn;
