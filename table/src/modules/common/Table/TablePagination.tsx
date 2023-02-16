import React, { useMemo } from "react";
import { ITablePagination } from "./types";

import "./styles.css";

const TablePagination = ({
  setPage,
  currentPage,
  pageCount,
}: ITablePagination) => {
  const pageNumbers = useMemo(() => {
    if (!pageCount) {
      return [];
    }

    const pageCountRounded =
      pageCount % 1 === 0 ? ~~pageCount : ~~pageCount + 1;

    return Array.from(Array(pageCountRounded).keys());
  }, [pageCount]);

  return (
    <div className="pagination">
      {pageNumbers.map((page) => {
        return (
          <div
            className={`page ${page === currentPage && "selectedPage"}`}
            key={page}
            onClick={() => setPage(page)}
          >
            {page + 1}
          </div>
        );
      })}
    </div>
  );
};

export default TablePagination;
