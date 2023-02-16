import React from "react";
import { ITableRow } from "./types";

const TableRow = <T, K extends keyof T & string>({
  rowData,
  columns,
  handleEditClick,
  handleSaveClick,
  sortingConfig,
  isEditMode,
}: ITableRow<T, K>) => {
  return (
    <tr>
      {columns.map((column) => {
        const { key, render } = column;

        if (!!render) {
          return <td key={key}>{render(rowData)}</td>;
        }

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
