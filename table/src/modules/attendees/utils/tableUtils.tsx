import moment from "moment";
import React from "react";
import { ITableColumn } from "../../common/Table/types";
import { IPerson } from "../types";
import "./styles.css";

export const getTableColumns = (
  handleDelete: (id: string) => void
): ITableColumn<IPerson, keyof IPerson>[] => [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "avatar",
    label: "Avatar",
    render: (item) => <img className="avatar" src={item.avatar} />,
  },
  {
    key: "dateOfBirth",
    label: "Date of birth",
    render: (item) => <>{moment(item.dateOfBirth).format("DD/MM/yyyy")}</>,
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "city",
    label: "City",
  },
  {
    key: "country",
    label: "Country",
  },
  {
    key: "id",
    label: "",
    render: (item) => (
      <button onClick={() => handleDelete(item.id)}>Del</button>
    ),
  },
];
