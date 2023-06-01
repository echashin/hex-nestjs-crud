import {
  CrudBooleanSettings,
  CrudColumnSettings,
  CrudDateSettings,
  CrudLinkSettings,
  CrudTextArraySettings,
} from '../interfaces/crud-column-settings';
import {date_format, date_time_format, time_format} from "../config/date-time-formats.config";

export type CrudColumnType =
  | 'text'
  | 'text[]'
  | 'boolean'
  | 'image'
  | 'float2decimalplaces'
  | 'date'
  | 'time'
  | 'link'
  | 'tags'
  | 'action'
  | 'price'
  | 'location';

export type CrudColumnDate = date_format | time_format | date_time_format;

export type EntityValue = any;

export type CrudColumn<T> = {
  label: string;
  isSortable: boolean;

  sortBy?: string;
  align?: 'left' | 'right' | 'center';
  font?: 'roboto-mono';
  fixedLeft?: boolean;
  fixedRight?: boolean;
  nzWidth?: `${number}px`;
} & SettingsWithTypes<T>;

type TypesWithCustomSettings<T> =
  | { type: 'boolean'; settings: CrudBooleanSettings<T> }
  | { type: 'link'; settings: CrudLinkSettings<T> }
  | { type: 'date'; settings: CrudDateSettings<T> }
  | { type: 'text[]'; settings: CrudTextArraySettings<T> };

type TypesNotCustom<T = CrudColumnType> = T extends TypesWithCustomSettings<any>['type'] ? never : T;

export type SettingsWithTypes<T> = TypesWithCustomSettings<T> | {
  type: TypesNotCustom;
  settings: CrudColumnSettings<T>
};
