import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesManagementRoutingModule } from './categories-management-routing.module';
import { CategoriesManagementPageComponent } from './categories-management-page/categories-management-page.component';
import { CategoriesManagementFormComponent } from './categories-management-form/categories-management-form.component';


@NgModule({
  declarations: [
    CategoriesManagementPageComponent,
    CategoriesManagementFormComponent
  ],
  imports: [
    CommonModule,
    CategoriesManagementRoutingModule,
  ]
})
export class CategoriesManagementModule { }
