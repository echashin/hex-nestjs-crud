import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, Validators} from '@angular/forms';
import Timezone from 'timezone-enum';
import {DynamicForm} from "../../../../../modules/crud/classes/dynamic-form.component";
import {ManagerCreateInput} from "../../../../../shared/api/core/data-contracts";


@Component({
  selector: 'app-manager-create-form',
  templateUrl: './managers-create-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagersCreateFormComponent extends DynamicForm<ManagerCreateInput> implements OnInit {

  passwordVisible: boolean = false;
  passwordMaxLength: number = 100;


  constructor(private fb: UntypedFormBuilder) {
    super();
  }

  override defaultFormValue: Partial<ManagerCreateInput> = {
    firstName: '',
    lastName: '',
  };

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.maxLength(this.passwordMaxLength)]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      dateOfBirth: [null],
      placeOfBirth: [null],
      nationalityCode: [null],
      salutation: [null],
      phoneCountryCode: [null],
      phoneNumber: [null],
      timeZone: [Timezone['Europe/Berlin']],
      corporateCode: [null],
    });
  }
}
