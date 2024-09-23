import React from "react";

type TableCellProps = {
  sortDirection?: "asc" | "desc" | false;
  children: React.ReactNode;
};

const TableHeadCell: React.FC<TableCellProps> = ({
  sortDirection,
  children,
}) => {
  return <th>{children}</th>;
};

export default TableHeadCell;
