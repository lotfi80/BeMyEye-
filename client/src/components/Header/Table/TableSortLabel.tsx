import React from "react";

// @ts-ignore

type TableSortLabelProps = {
  active: boolean;
  direction: "asc" | "desc";
  children: React.ReactNode;
  createSortHandler: () => void;
};

export const TableSortLabel: React.FC<TableSortLabelProps> = ({
  children,
  createSortHandler,
}) => {
  // const sortIndicator = active ? `Sort direction: ${direction}` : "";
  return (
    <span
      onClick={createSortHandler}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      {children}
    </span>
  );
};

export const Box: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <span style={{ visibility: "hidden" }}>{children}</span>;
};
