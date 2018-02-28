
export class Column {
  field: string;
  header: string;

  constructor(fieldName: string, headerName: string) {
    this.field = fieldName;
    this.header = headerName;
  }
}
