import React from "react";
import { TableColumn } from "./types";

interface TableBodyProps {
  columns: TableColumn[];
  data: Record<string, any>[];
}

const TableBody: React.FC<TableBodyProps> = ({ columns, data }) => {
  return (
    <div className="bg-white text-gray-800">
      {data.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="border-b border-gray-200 grid"
          style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
        >
          {columns.map((column) => (
            <div key={column.key} className="p-2">
              {row[column.key]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TableBody;
