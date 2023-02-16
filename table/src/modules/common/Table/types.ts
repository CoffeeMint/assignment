import { SortingDirection } from "../consts";

export interface ITableColumn<T, K extends keyof T> {
  label: string;
  key: K;
  render?: (item: T) => React.ReactElement;
}

export interface ISort<K extends string> {
  key?: K;
  direction?: SortingDirection;
}

export interface ISortingConfig<K extends string> extends ISort<K> {
  setSorting: (key: K) => void;
}

export interface IPaginationConfig {
  pageCount: number;
  currentPage: number;
}

export interface ITablePagination extends IPaginationConfig {
  setPage: (pageNumber: number) => void;
}

interface ITableConfig<T, K extends keyof T & string> {
  columns: ITableColumn<T, K>[];
  isEditMode: boolean;
  sortingConfig?: ISortingConfig<K>;
  handleEditClick: (item: T) => void;
  handleDeleteClick: (item: T) => void;
  handleSaveClick: (item: T) => void;
}

export interface ITableRow<T, K extends keyof T & string>
  extends ITableConfig<T, K> {
  rowData: T;
}

export interface ITable<T, K extends keyof T & string>
  extends ITableConfig<T, K> {
  data: T[];
  pagination: ITablePagination;
}

export interface ITableAction<T> {
  label: string;
  handler: (item: T) => void;
}
