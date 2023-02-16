import React, { useCallback, useEffect, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { ITable } from "../../common/Table/types";
import AttendeesTable from "../components";
import {
  selectAttendees,
  selectIsEditMode,
  selectPagination,
  selectSorting,
  setCurrentPage,
  setSorting,
  getAttendeesRequest,
} from "../slice";
import { IPerson } from "../types";
import { getTableColumns } from "../utils/tableUtils";

const AttendeesTableContainer = () => {
  const data = useAppSelector(selectAttendees);
  const pagination = useAppSelector(selectPagination);
  const sorting = useAppSelector(selectSorting);
  const isEditMode = useAppSelector(selectIsEditMode);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAttendeesRequest());
  }, [dispatch]);

  const handleSetCurrentPage = useCallback(
    (page: number) => {
      dispatch(setCurrentPage(page));
    },
    [dispatch]
  );

  const handleSetSorting = useCallback(
    (key: keyof IPerson) => {
      dispatch(setSorting(key));
    },
    [dispatch]
  );

  const tableProps: ITable<IPerson, keyof IPerson> = useMemo(
    () => ({
      columns: getTableColumns(),
      data,
      pagination: { ...pagination, setPage: handleSetCurrentPage },
      sortingConfig: { ...sorting, setSorting: handleSetSorting },
      handleDeleteClick: () => {},
      handleEditClick: () => {},
      handleSaveClick: () => {},
      isEditMode,
    }),
    [
      data,
      pagination,
      sorting,
      handleSetCurrentPage,
      handleSetSorting,
      isEditMode,
    ]
  );
  console.log(pagination);
  if (!data) {
    return <>Loading</>;
  }

  return <AttendeesTable tableProps={tableProps} />;
};

export default AttendeesTableContainer;
