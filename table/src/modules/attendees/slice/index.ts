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
  editItem: IPerson | null;
}

const initialState: AttendeesTableState = {
  data: [],
  sortingConfig: {},
  paginationConfig: null,
  isEditMode: false,
  editItem: null,
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
    handleEdit: (state, action: PayloadAction<IPerson>) => {
      state.isEditMode = true;
      state.editItem = action.payload;
    },
    handleSave: (state, action: PayloadAction<IPerson>) => {
      state.data = state.data.map((item) => {
        if (item.id === action.payload.id) {
          return action.payload;
        }

        return item;
      });

      state.isEditMode = false;
      state.editItem = null;
    },
    handleDelete: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
  },
});

export const {
  getAttendeesRequest,
  setCurrentPage,
  setSorting,
  handleEdit,
  handleSave,
  handleDelete,
} = attendeesTableSlice.actions;

export const selectAttendees = (state: RootState) => state.attendeesTable.data;

export const selectPagination = (state: RootState) =>
  state.attendeesTable.paginationConfig;

export const selectSorting = (state: RootState) =>
  state.attendeesTable.sortingConfig;

export const selectIsEditMode = (state: RootState) =>
  state.attendeesTable.isEditMode;

export default attendeesTableSlice.reducer;
