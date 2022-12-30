import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TransactionManagementPageComponent} from "./transaction-management-page/transaction-management-page.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Lịch sử giao dịch'
    },
    children: [
      {
        path: 'list',
        component: TransactionManagementPageComponent,
        data: {
          title: 'Danh sách lịch sử giao dịch'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionManagementRoutingModule { }
