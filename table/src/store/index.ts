import { configureStore } from "@reduxjs/toolkit";
import attendeesTableReducer from "../modules/attendees/slice";

export const store = configureStore({
  reducer: {
    attendeesTable: attendeesTableReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
