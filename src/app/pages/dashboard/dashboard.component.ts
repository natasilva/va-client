import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { GroupService } from '../../core/services/group.service';
import { ValidatorsService } from '../../core/utils/validators.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  cpfForm: FormGroup;
  groupLink: string;
  group$ = new Observable<any>()

  constructor(
    private fb: FormBuilder,
    private groupService: GroupService,
    private validatorsService: ValidatorsService,
  ) {
    this.cpfForm = this.fb.group({
      cpf: ['', [Validators.required, this.validatorsService.validateCpfCnpj]],
    });
  }

  onSubmit(): void {
    if (this.cpfForm.valid) {
      const params = { cnpjf: this.cpfForm.value.cpf };
      this.group$ = this.groupService.get(params)
    }
  }

  reset() {
    this.group$ = new Observable<any>()
  }
}
