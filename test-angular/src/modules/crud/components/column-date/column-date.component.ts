import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


import { CrudColumnDate } from '../../types/crud-column';
import {DATE_FORMAT} from "../../config/date-time-formats.config";

@Component({
  selector: 'app-column-date',
  templateUrl: './column-date.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnDateComponent {
  @Input() set value(v: any) {
    if (v) {
      this.val = `${v}`;
    }
  }

  private _type: CrudColumnDate = DATE_FORMAT;
  @Input() set dateType(value: CrudColumnDate | undefined) {
    if (value) {
      this._type = value;
    }
  }

  get dateType(): CrudColumnDate {
    return this._type;
  }

  val: string | undefined;
}
