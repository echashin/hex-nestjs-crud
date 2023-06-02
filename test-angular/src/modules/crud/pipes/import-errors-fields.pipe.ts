import {Pipe, PipeTransform} from '@angular/core';
import {ImportErrorDto, InputError} from "../../../shared/api/core/data-contracts";


@Pipe({name: 'importErrorsFields'})
export class ImportErrorsFieldsPipe implements PipeTransform {
  transform({errors}: ImportErrorDto): string[] {
    return errors ? errors.map((err: InputError) => err.property) : [];
  }
}
