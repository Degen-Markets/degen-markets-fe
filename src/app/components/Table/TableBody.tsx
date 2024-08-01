import React, { useState, useEffect } from "react";
import { TableColumn } from "./types";
import { twMerge } from "tailwind-merge";

interface TableBodyProps {
  columns: TableColumn[];
  data: Record<string, any>[];
  renderExpandableContent?: (row: Record<string, any>) => React.ReactNode;
  isExpandable?: boolean;
}

const TableBody: React.FC<TableBodyProps> = ({
  columns,
  data,
  renderExpandableContent,
  isExpandable = false,
}) => {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleExpandRow = (index: number) => {
    setExpandedRows((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index],
    );
  };

  return (
    <div>
      {data.map((row, rowIndex) => (
        <div key={rowIndex} className="group">
          <div
            className={twMerge(
              "grid",
              isExpandable && "hover:bg-blue-light cursor-pointer",
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
                  {row[column.key]}
                </div>
              );
            })}
          </div>
          {isExpandable && expandedRows.includes(rowIndex) && (
            <div className="p-4 bg-gray-800 text-white">
              {renderExpandableContent ? renderExpandableContent(row) : null}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TableBody;

// {
//   (
//     <div className="bg-gray-800 p-4 text-white f-fit">
//       <p className="text-3xl">Bet Details</p>
//       <div className="flex justify-center items-center border-4 border-b-0">
//         <p className="px-2">
//           <strong>Created at:</strong> {formatDate(row.creationTimestamp)}
//         </p>
//         {row.acceptanceTimestamp && (
//           <>
//             <p className="border-r-4 px-2">
//               <strong>Accepted at:</strong>{" "}
//               {formatDate(row.acceptanceTimestamp)}
//             </p>
//             <p className="px-2">
//               <strong>Ended at:</strong>{" "}
//               {formatDate(row.expirationTimestamp)}
//             </p>
//           </>
//         )}
//       </div>
//       {/* Add additional expandable content here */}
//       <div className="p-2">
//         <p>Additional details about the bet...</p>
//       </div>
//     </div>
//   )
// }
