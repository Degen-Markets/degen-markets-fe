import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { TableProps } from "./types";

const Table = <T extends Record<string, unknown>>({
  columns,
  data,
  isExpandable = false,
  renderExpandableContent,
}: TableProps<T>) => {
  return (
    <div className="overflow-x-auto rounded-xl">
      <div className="bg-blue-secondary w-[1248px] overflow-hidden p-2">
        <TableHeader columns={columns} />
        <TableBody
          columns={columns}
          data={data}
          isExpandable={isExpandable}
          renderExpandableContent={renderExpandableContent}
        />
      </div>
    </div>
  );
};

export default Table;
