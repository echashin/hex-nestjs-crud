import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'bool' })
export class BoolPipe implements PipeTransform {
  transform(value: any): boolean {
    return Boolean(value);
  }
}
