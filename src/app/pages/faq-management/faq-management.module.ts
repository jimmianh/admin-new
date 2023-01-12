import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FAQManagementRoutingModule } from './faq-management-routing.module';
import { FaqManagementPageComponent } from './faq-management-page/faq-management-page.component';
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzIconModule} from "ng-zorro-antd/icon";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzButtonModule} from "ng-zorro-antd/button";


@NgModule({
  declarations: [
    FaqManagementPageComponent,
  ],
  imports: [
    CommonModule,
    FAQManagementRoutingModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzTableModule,
    NzSwitchModule,
    NzIconModule,
    ReactiveFormsModule,
    FormsModule,
    NzButtonModule
  ]
})
export class FAQManagementModule { }
