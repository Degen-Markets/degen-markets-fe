import React from "react";
import { TableColumn as TableColumnType } from "./types";
import { twMerge } from "tailwind-merge";
import TableColumn from "./TableColumn";

interface TableRowProps<T extends Record<string, unknown>> {
  row: T;
  columns: TableColumnType[];
  isExpandable: boolean;
  isExpanded: boolean;
  toggleExpand: () => void;
  renderExpandableContent?: (row: T) => React.ReactNode;
  isLastRow: boolean;
}

const TableRow = <T extends Record<string, unknown>>({
  row,
  columns,
  isExpandable,
  isExpanded,
  toggleExpand,
  renderExpandableContent,
  isLastRow,
}: TableRowProps<T>) => {
  return (
    <div className="group">
      <div
        className={twMerge(
          "grid",
          isExpandable && "hover:bg-blue-light cursor-pointer",
          isLastRow && "rounded-b-xl",
        )}
        style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
        onClick={isExpandable ? toggleExpand : undefined}
      >
        {columns.map((column, idx) => (
          <TableColumn
            key={column.key}
            content={row[column.key] as React.ReactNode}
            isFirst={idx === 0}
            isLast={idx === columns.length - 1}
          />
        ))}
      </div>
      {isExpandable && isExpanded && (
        <div className="p-4 bg-gray-800 text-white rounded-b-xl">
          {renderExpandableContent ? renderExpandableContent(row) : null}
        </div>
      )}
    </div>
  );
};

export default TableRow;
