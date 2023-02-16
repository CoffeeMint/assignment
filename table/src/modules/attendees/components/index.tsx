import React from "react";
import Table from "../../common/Table";
import { IAttendeesTableProps } from "./types";

const AttendeesTable = ({ tableProps }: IAttendeesTableProps) => {
  return <Table {...tableProps} />;
};

export default AttendeesTable;
