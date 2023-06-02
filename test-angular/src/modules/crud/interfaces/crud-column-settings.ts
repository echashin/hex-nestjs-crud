import { Data, Params } from '@angular/router';

import { CrudColumnDate, EntityValue } from '../types/crud-column';

export interface CrudColumnSettings<T> {
  getField(item: T): EntityValue;
}

export interface CrudBooleanSettings<T> extends CrudColumnSettings<T> {
  boolean: {
    trueText: string;
    falseText: string;
  };
  getField(item: T): boolean;
}

export interface CrudLinkSettings<T> extends CrudColumnSettings<T> {
  link(item: T): string;
  getQueryParams?(item: T): Params;
  getDataParams?(item: T): Data;
}

export interface CrudDateSettings<T> extends CrudColumnSettings<T> {
  dateFormat?: CrudColumnDate;
}

export interface CrudTextArraySettings<T> extends CrudColumnSettings<T> {
  getField(item: T): string[];
}
