import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionManagementRoutingModule } from './transaction-management-routing.module';
import { TransactionManagementPageComponent } from './transaction-management-page/transaction-management-page.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzPaginationModule} from "ng-zorro-antd/pagination";


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
  ]
})
export class TransactionManagementModule { }
