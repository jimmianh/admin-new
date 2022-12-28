import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementPageComponent } from './user-management-page/user-management-page.component';
import { UserManagementFormComponent } from './user-management-form/user-management-form.component';

@NgModule({
  declarations: [
    UserManagementPageComponent,
    UserManagementFormComponent,

  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
  ]
})
export class UserManagementModule { }
