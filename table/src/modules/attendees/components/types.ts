import { ITable } from "../../common/Table/types";
import { IPerson } from "../types";

export interface IAttendeesTableProps {
  tableProps: ITable<IPerson, keyof IPerson>;
}
