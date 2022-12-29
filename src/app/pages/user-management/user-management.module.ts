import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementPageComponent } from './user-management-page/user-management-page.component';
import { UserManagementFormComponent } from './user-management-form/user-management-form.component';
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzIconModule} from "ng-zorro-antd/icon";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    UserManagementPageComponent,
    UserManagementFormComponent,

  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    NzInputModule,
    NzButtonModule,
    NzDropDownModule,
    NzTableModule,
    NzIconModule,
    FormsModule
  ]
})
export class UserManagementModule { }
