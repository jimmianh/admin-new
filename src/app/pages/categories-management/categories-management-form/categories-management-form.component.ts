import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-categories-management-form',
  templateUrl: './categories-management-form.component.html',
  styleUrls: ['./categories-management-form.component.scss']
})
export class CategoriesManagementFormComponent implements OnInit {

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
    });
  }
  constructor(private fb: UntypedFormBuilder) {}

  validateForm!: UntypedFormGroup;

  submitForm(): void {
    console.log('submit', this.validateForm.value);
  }
}
