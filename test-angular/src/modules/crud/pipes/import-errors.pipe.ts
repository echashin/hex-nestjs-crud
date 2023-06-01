import {Pipe, PipeTransform} from '@angular/core';
import {ImportErrorDto, InputError} from "../../../shared/api/core/data-contracts";

@Pipe({name: 'importErrors'})
export class ImportErrorsPipe implements PipeTransform {
  transform({errors}: ImportErrorDto, property: string): string[] {
    return errors ? errors
      .filter((error: InputError) => (error.property.includes('.') ? error.property.includes(property) : error.property === property))
      .map((error: InputError) => error.message) : [];
  }
}
