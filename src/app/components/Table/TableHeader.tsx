import React from "react";
import { TableColumn } from "./types";

interface TableHeaderProps {
  columns: TableColumn[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ columns }) => {
  return (
    <div
      className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal grid"
      style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
    >
      {columns.map((column) => (
        <div key={column.key} className="p-2">
          {column.label}
        </div>
      ))}
    </div>
  );
};

export default TableHeader;
