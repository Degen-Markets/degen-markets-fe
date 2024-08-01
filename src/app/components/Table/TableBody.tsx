import React, { useState } from "react";
import { TableColumn } from "./types";
import { twMerge } from "tailwind-merge";
import { BetTableRow } from "./types";

interface TableBodyProps<T extends Record<string, unknown>> {
  columns: TableColumn[];
  data: T[];
  renderExpandableContent?: (row: T) => React.ReactNode;
  isExpandable?: boolean;
}

const TableBody = <T extends Record<string, unknown>>({
  columns,
  data,
  renderExpandableContent,
  isExpandable = false,
}: TableBodyProps<T>) => {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleExpandRow = (index: number) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <div>
      {data.map((row, rowIndex) => {
        const lastIndex = data.length - 1 === rowIndex;
        return (
          <div key={rowIndex} className="group">
            <div
              className={twMerge(
                "grid",
                isExpandable && "hover:bg-blue-light cursor-pointer",
                lastIndex && "rounded-b-xl",
              )}
              style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
              onClick={() => isExpandable && toggleExpandRow(rowIndex)}
            >
              {columns.map((column, idx) => {
                const isLastIndex = columns.length - 1;
                return (
                  <div
                    key={column.key}
                    className={twMerge(
                      "p-4 text-lg font-bold border-black-main border-x center-all",
                      isLastIndex && "border-r-0",
                      idx === 0 && "border-l-0",
                    )}
                  >
                    {row[column.key] as React.ReactNode}
                  </div>
                );
              })}
            </div>
            {isExpandable && expandedRows.includes(rowIndex) && (
              <div className="p-4 bg-gray-800 text-white rounded-b-xl">
                {renderExpandableContent ? renderExpandableContent(row) : null}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TableBody;
