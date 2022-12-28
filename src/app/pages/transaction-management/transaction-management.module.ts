import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionManagementRoutingModule } from './transaction-management-routing.module';
import { TransactionManagementPageComponent } from './transaction-management-page/transaction-management-page.component';
import { TransactionManagementDetailComponent } from './transaction-management-detail/transaction-management-detail.component';


@NgModule({
  declarations: [
    TransactionManagementPageComponent,
    TransactionManagementDetailComponent
  ],
  imports: [
    CommonModule,
    TransactionManagementRoutingModule,
  ]
})
export class TransactionManagementModule { }
