import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzTypographyModule} from 'ng-zorro-antd/typography';

import {ManagersCreateFormComponent} from './components/managers-create-form/managers-create-form.component';
import {ManagersCrudComponent} from './components/managers-crud/managers-crud.component';

import {ManagersFilterFormComponent} from './components/managers-filter-form/managers-filter-form.component';
import {ManagersUpdateFormComponent} from './components/managers-update-form/managers-update-form.component';
import {ManagersRouterModule} from './managers-router.module';
import {CrudModule} from "../../../modules/crud/crud.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";

const ngZorro: Required<NgModule>['declarations'] = [
  NzInputModule,
  NzIconModule,
  NzDatePickerModule,
  NzSelectModule,
  NzCardModule,
  NzTypographyModule,
  NzButtonModule,
  NzDrawerModule,
  NzModalModule,
  NzToolTipModule,
  NzFormModule,
];

@NgModule({
  declarations: [
    ManagersCrudComponent,
    ManagersCreateFormComponent,
    ManagersFilterFormComponent,
    ManagersUpdateFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ManagersRouterModule,
    CrudModule,
    ...ngZorro,
  ],
})
export default class ManagersModule {
}
