import {Injectable} from "@angular/core";
import {Column} from "../models/Column";
import {Subject} from "rxjs/Subject";

/*
  STANDARD CLASS FOR SETTING TABLE AND PAGINATION PARAMETERS.
*/

@Injectable()
export class GridLoadUtil {
  columns: Column[] = [];
  columnsChange: Subject<Column[]> = new Subject<Column[]>();

  constructor() {
  }

  setColumns(columnList: Column[]): void {
    this.columns = columnList;
    this.columnsChange.next(this.columns);
  }
}
