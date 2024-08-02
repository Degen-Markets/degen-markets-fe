import React, { useState } from "react";
import { TableColumn as TableColumnType } from "./types";
import TableRow from "./TableRow";

interface TableBodyProps<T extends Record<string, unknown>> {
  columns: TableColumnType[];
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
      {data.map((row, rowIndex) => (
        <TableRow
          key={rowIndex}
          row={row}
          columns={columns}
          isExpandable={isExpandable}
          isExpanded={expandedRows.includes(rowIndex)}
          toggleExpand={() => toggleExpandRow(rowIndex)}
          renderExpandableContent={renderExpandableContent}
          isLastRow={rowIndex === data.length - 1}
        />
      ))}
    </div>
  );
};

export default TableBody;
