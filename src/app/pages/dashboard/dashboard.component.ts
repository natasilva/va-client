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
  showErrorMessage: boolean = false

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

      try {
        this.group$ = this.groupService.get(params)

        this.group$.subscribe((result) => {
          if (!result) this.showErrorMessage = true
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  reset() {
    this.showErrorMessage = false
    this.group$ = new Observable<any>()
  }
}
