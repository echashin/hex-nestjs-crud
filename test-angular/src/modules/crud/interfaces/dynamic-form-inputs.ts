import {InputsType} from 'ng-dynamic-component';
import {InputError} from "../../../shared/api/core/data-contracts";


export interface DynamicFormInputs<T = any> extends InputsType {
  value?: T | undefined;
  submit?: symbol | undefined;
  show?: symbol | undefined;
  errors?: InputError[];
  defaultFilters?: object;
}
