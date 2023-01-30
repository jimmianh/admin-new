import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FAQManagementRoutingModule } from './faq-management-routing.module';
import { FaqManagementPageComponent } from './faq-management-page/faq-management-page.component';
import { FaqManagementFormComponent } from './faq-management-form/faq-management-form.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzImageModule} from "ng-zorro-antd/image";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CKEditorModule} from "ckeditor4-angular";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzUploadModule} from "ng-zorro-antd/upload";
import {NzNotificationService} from "ng-zorro-antd/notification";


@NgModule({
  declarations: [
    FaqManagementPageComponent,
    FaqManagementFormComponent
  ],
  imports: [
    CommonModule,
    FAQManagementRoutingModule,
    NzTableModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzSwitchModule,
    NzPaginationModule,
    FormsModule,
    NzIconModule,
    NzImageModule,
    NzDividerModule,
    NzCardModule,
    NzUploadModule,
    CKEditorModule,
    ReactiveFormsModule,
  ],
  providers: [NzNotificationService]
})
export class FAQManagementModule { }
