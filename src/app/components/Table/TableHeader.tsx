import React from "react";
import { TableColumn } from "./types";
import { twMerge } from "tailwind-merge";
import { Katibeh } from "next/font/google";

interface TableHeaderProps {
  columns: TableColumn[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ columns }) => {
  return (
    <div
      className=" uppercase leading-normal border-b border-black-main grid"
      style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
    >
      {columns.map((column, idx) => {
        const isLastIndex = columns.length - 1;
        return (
          <div
            key={column.key}
            className={twMerge(
              "p-4 text-lg font-bold border-black-main border-x",
              isLastIndex && "border-r-0",
              idx === 0 && "border-l-0",
            )}
          >
            {column.label}
          </div>
        );
      })}
    </div>
  );
};

export default TableHeader;
