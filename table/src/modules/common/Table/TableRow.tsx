import React from "react";
import { ITableRow } from "./types";

const TableRow = <T, K extends keyof T & string>({
  rowData,
  columns,
  handleDeleteClick,
  handleEditClick,
  handleSaveClick,
  sortingConfig,
}: ITableRow<T, K>) => {
  return (
    <tr>
      {columns.map((column) => {
        const { key } = column;

        return (
          <td key={key}>
            <div>{rowData[key] as string}</div>
          </td>
        );
      })}
    </tr>
  );
};

export default TableRow;
