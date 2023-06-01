import {ChangeDetectionStrategy, Component, Type} from '@angular/core';

import {ManagersCreateFormComponent} from '../managers-create-form/managers-create-form.component';
import {ManagersFilterFormComponent} from '../managers-filter-form/managers-filter-form.component';
import {ManagerCreateInput, ManagerEntity, ManagerUpdateInput} from "../../../../../shared/api/core/data-contracts";
import {DynamicFilterFormComponent} from "../../../../../modules/crud/classes/dynamic-filter-form.component";
import {DynamicForm} from "../../../../../modules/crud/classes/dynamic-form.component";
import {CrudFields} from "../../../../../modules/crud/types/crud-select.type";
import {CrudConfig} from "../../../../../modules/crud/interfaces/crud-config";
import {CrudColumn, EntityValue} from "../../../../../modules/crud/types/crud-column";
import {CrudManagerService} from "../../../../../shared/api/core/crud-manager.service";
import {ManagersUpdateFormComponent} from "../managers-update-form/managers-update-form.component";

@Component({
  selector: 'app-manager-crud',
  templateUrl: './managers-crud.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagersCrudComponent {
  createForm: Type<DynamicForm<ManagerCreateInput>> = ManagersCreateFormComponent;
  updateForm: Type<DynamicForm<ManagerUpdateInput>> = ManagersUpdateFormComponent;
  filterForm: Type<DynamicFilterFormComponent> = ManagersFilterFormComponent;

  fields: CrudFields<ManagerEntity> = ['email', 'isEmailVerified', 'isActive'];
  join: string[] = ['settings||firstName,lastName,timeZone'];
  config: CrudConfig = {
    title: 'Managers',
    plural: 'Managers',
    single: 'Manager',
  };

  columns: CrudColumn<ManagerEntity>[] = [
    {
      label: 'Name',
      isSortable: false,
      fixedLeft: true,
      type: 'link',
      settings: {
        getField(item: ManagerEntity): EntityValue {
          return [item.firstName, item.lastName].filter(Boolean).join(' ');
        },
        link(item: ManagerEntity): any {
          return `details/${item.id}`;
        },
      },
    },
    {
      label: 'Email',
      isSortable: true,
      sortBy: 'email',
      type: 'text',
      settings: {
        getField(item: ManagerEntity): EntityValue {
          return item.email;
        },
      },
    },
    {
      label: 'Verified email',
      isSortable: true,
      sortBy: 'isEmailVerified',
      type: 'boolean',
      settings: {
        getField(item: ManagerEntity): EntityValue {
          return item.isEmailVerified;
        },
        boolean: {
          falseText: 'Not Verified',
          trueText: 'Verified',
        },
      },
    },
    {
      label: 'Status',
      isSortable: true,
      sortBy: 'isActive',
      type: 'boolean',
      settings: {
        getField(item: ManagerEntity): EntityValue {
          return item.isActive;
        },
        boolean: {
          trueText: 'Active',
          falseText: 'Inactive',
        },
      },
    },
  ];

  constructor(public readonly service: CrudManagerService) {}
}
