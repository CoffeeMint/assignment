import React, { useMemo } from "react";
import { SortingDirection, tableRowsPerPage } from "../consts";
import TableRow from "./TableRow";
import { ITable } from "./types";
import { orderBy } from "lodash";
import TablePagination from "./TablePagination";

const Table = <T, K extends keyof T & string>({
  data,
  columns,
  pagination,
  sortingConfig,
  handleDeleteClick,
  handleEditClick,
  handleSaveClick,
  isEditMode,
}: ITable<T, K>) => {
  console.log(data);

  const tableData = useMemo(() => {
    if (!data) {
      return [];
    }

    const isDesc = sortingConfig.direction === SortingDirection.desc;

    const sortedData = orderBy(
      data,
      [sortingConfig.key],
      isDesc ? "desc" : "asc"
    );

    const startIndex = pagination.currentPage * tableRowsPerPage;
    const endIndex = startIndex + tableRowsPerPage;

    return sortedData.slice(startIndex, endIndex);
  }, [sortingConfig, data, pagination]);

  const handleColumnClick = (key: K) => {
    const { setSorting } = sortingConfig;
    setSorting(key);
  };

  return (
    <div className="root">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <td
                onClick={() => handleColumnClick(column.key)}
                key={column.key}
              >
                {column.label}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((item) => (
            <TableRow
              isEditMode={isEditMode}
              rowData={item}
              columns={columns}
              sortingConfig={sortingConfig}
              handleDeleteClick={handleDeleteClick}
              handleEditClick={handleEditClick}
              handleSaveClick={handleSaveClick}
            />
          ))}
        </tbody>
      </table>
      <TablePagination {...pagination} />
    </div>
  );
};

export default Table;
