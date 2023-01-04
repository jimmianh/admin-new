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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzImageModule} from "ng-zorro-antd/image";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {NzUploadModule} from "ng-zorro-antd/upload";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzSelectModule} from "ng-zorro-antd/select";


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
    ReactiveFormsModule,
    NzModalModule,
    NzSwitchModule,
    NzImageModule,
    NzPaginationModule,
    NzUploadModule,
    NzSelectModule
  ],
  providers: [{provide: NzNotificationService}]
})
export class CategoriesManagementModule { }
