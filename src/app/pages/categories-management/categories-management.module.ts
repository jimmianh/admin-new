import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesManagementRoutingModule } from './categories-management-routing.module';
import { CategoriesManagementPageComponent } from './categories-management-page/categories-management-page.component';
import { CategoriesManagementFormComponent } from './categories-management-form/categories-management-form.component';
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzFormModule} from "ng-zorro-antd/form";
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    CategoriesManagementPageComponent,
    CategoriesManagementFormComponent
  ],
  imports: [
    CommonModule,
    CategoriesManagementRoutingModule,
    NzDropDownModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzTableModule,
    FormsModule,
    NzFormModule,
    ReactiveFormsModule
  ]
})
export class CategoriesManagementModule { }
