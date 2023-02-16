import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SortingDirection, tableRowsPerPage } from "../../common/consts";
import { IPaginationConfig, ISort } from "../../common/Table/types";
import { IPerson } from "../types";

import data from "../../../assets/data.json";
import { RootState } from "../../../store";

interface AttendeesTableState {
  data: IPerson[];
  sortingConfig: ISort<keyof IPerson & string>;
  paginationConfig: IPaginationConfig | null;
  isEditMode: boolean;
}

const initialState: AttendeesTableState = {
  data: [],
  sortingConfig: {},
  paginationConfig: null,
  isEditMode: false,
};

export const attendeesTableSlice = createSlice({
  name: "attendeesTable",
  initialState,
  reducers: {
    getAttendeesRequest: (state: AttendeesTableState) => {
      state.data = [...data];

      state.paginationConfig = {
        pageCount: data.length / tableRowsPerPage,
        currentPage: 0,
      };
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.paginationConfig!.currentPage = action.payload;
    },
    setSorting: (state, action: PayloadAction<keyof IPerson>) => {
      const key = action.payload;

      if (state.sortingConfig?.key === key) {
        if (state.sortingConfig.direction === SortingDirection.asc) {
          state.sortingConfig.direction = SortingDirection.desc;
        } else {
          state.sortingConfig = null;
        }
      } else {
        state.sortingConfig = {
          key,
          direction: SortingDirection.asc,
        };
      }
    },
  },
});

export const { getAttendeesRequest, setCurrentPage, setSorting } =
  attendeesTableSlice.actions;

export const selectAttendees = (state: RootState) => state.attendeesTable.data;

export const selectPagination = (state: RootState) =>
  state.attendeesTable.paginationConfig;

export const selectSorting = (state: RootState) =>
  state.attendeesTable.sortingConfig;

export const selectIsEditMode = (state: RootState) =>
  state.attendeesTable.isEditMode;

export default attendeesTableSlice.reducer;
