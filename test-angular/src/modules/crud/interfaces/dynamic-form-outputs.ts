import { OutputsType } from 'ng-dynamic-component';

export type DynamicFormOutputs<T = any> = {
  formSubmit?: (value: T) => void | undefined;
  formValueChanges?: (value: T) => void | undefined;
} & OutputsType;
