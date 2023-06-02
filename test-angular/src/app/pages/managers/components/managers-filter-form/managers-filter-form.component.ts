import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import {DynamicFilterFormComponent} from "../../../../../modules/crud/classes/dynamic-filter-form.component";
import {FindInput} from "../../../../../shared/api/core/data-contracts";


@UntilDestroy()
@Component({
  selector: 'app-users-staff-filter-form',
  templateUrl: './managers-filter-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagersFilterFormComponent extends DynamicFilterFormComponent {
  override form = new FormGroup({
    search: new FormControl<string | null>(null),
    status: new FormControl('all') as FormControl<'all' | 'deleted' | 'active'>,
  });

  mapSearch({ search, status }: typeof this.form.value): FindInput {
    const s: any = { $and: [] };
    if (status === 'deleted') {
      s.$and.push({ deleted_date: { $notnull: true } });
    }
    if (search) {
      const [firstName, lastName] = search.split(' ');
      s.$and.push({
        $or: [
          {
            email: { $contL: search },
          },
          {
            'settings.firstName': { $contL: firstName },
          },
          {
            'settings.lastName': { $contL: lastName || firstName },
          },
          {
            'settings.managerNumber': { $contL: search },
          },
        ],
      });
    }
    return {
      s: JSON.stringify(s),
      softDelete: status !== 'active',
    };
  }
}
