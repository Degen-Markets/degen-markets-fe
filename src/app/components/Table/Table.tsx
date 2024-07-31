import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { TableProps } from "./types";

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <TableHeader columns={columns} />
        <TableBody columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Table;
