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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzUploadModule} from "ng-zorro-antd/upload";
import {CKEditorModule} from "ckeditor4-angular";
import {NzNotificationService} from "ng-zorro-antd/notification";

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
    FormsModule,
    NzPaginationModule,
    NzSwitchModule,
    NzFormModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzCardModule,
    NzUploadModule,
    CKEditorModule,
  ],
  providers: [{provide: NzNotificationService}]
})
export class UserManagementModule { }
