import { ITableColumn } from "../../common/Table/types";
import { IPerson } from "../types";

export const getTableColumns = (): ITableColumn<IPerson, keyof IPerson>[] => [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "dateOfBirth",
    label: "Date of birth",
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
];
