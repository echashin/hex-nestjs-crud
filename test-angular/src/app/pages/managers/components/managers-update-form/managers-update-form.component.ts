import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import {DynamicForm} from "../../../../../modules/crud/classes/dynamic-form.component";
import {ManagerUpdateInput} from "../../../../../shared/api/core/data-contracts";


@Component({
  selector: 'app-manager-create-form',
  templateUrl: './managers-update-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagersUpdateFormComponent extends DynamicForm<ManagerUpdateInput> implements OnInit {
  passwordVisible: boolean = false;
  passwordMaxLength: number = 100;


  constructor(private fb: UntypedFormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.maxLength(this.passwordMaxLength)]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      dateOfBirth: [null],
    });
  }

  override beforeSubmit(value: ManagerUpdateInput): ManagerUpdateInput {
    const formValues: ManagerUpdateInput = value;
    let ind: keyof typeof formValues;
    for (ind in formValues) {
      if (value[ind] === null || !value[ind]) delete formValues[ind];
    }
    return formValues;
  }
}
