import React from "react";

type TableCellProps = {
  sortDirection?: "asc" | "desc" | false;
  children: React.ReactNode;
};

const TableHeadCell: React.FC<TableCellProps> = ({
  sortDirection,
  children,
}) => {
  return (
    <th className=" text-left  font-medium text-gray-500 uppercase tracking-wider">
      {children}
    </th>
  );
};

export default TableHeadCell;
