import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionManagementRoutingModule } from './transaction-management-routing.module';
import { TransactionManagementPageComponent } from './transaction-management-page/transaction-management-page.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzSliderModule} from "ng-zorro-antd/slider";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";


@NgModule({
  declarations: [
    TransactionManagementPageComponent
  ],
  imports: [
    CommonModule,
    TransactionManagementRoutingModule,
    NzTableModule,
    NzButtonModule,
    NzPaginationModule,
    ReactiveFormsModule,
    NzGridModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzSelectModule,
    NzSliderModule,
    FormsModule,
    NzDatePickerModule,
  ]
})
export class TransactionManagementModule { }
