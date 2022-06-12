import * as _ from 'lodash';

import { TableColumn, TableRow } from 'common/structures';


export class TableView {

  private _columns: Array<TableColumn>;
  private _rows: Array<TableRow>;


  constructor(columns: Array<any>, rows: Array<any>) {
    this._columns = columns;

    const rowList: Array<TableRow> = [];
    _.each(rows, (value, key) => {
      const row = {};
      _.each(rows[key], (val, k) => {
        row[this.columns[k].key] = (this.columns[k] && this.columns[k].formatter)
          ? this.columns[k].formatter(rows[key][k])
          : rows[key][k];
      });
      rowList.push(row);
    });

    this._rows = rowList;
  }


  get rows(): Array<TableRow> {
    return this._rows;
  }


  set rows(value: Array<TableRow>) {
    this._rows = value;
  }


  get columns(): Array<TableColumn> {
    return this._columns;
  }


  set columns(value: Array<TableColumn>) {
    this._columns = value;
  }

}
