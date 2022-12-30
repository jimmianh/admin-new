import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PaymentChannelManagementPageComponent} from "./payment-channel-management-page/payment-channel-management-page.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Kênh thanh toán'
    },
    children: [
      {
        path: 'list',
        component: PaymentChannelManagementPageComponent,
        data: {
          title: 'Danh sách các kênh thanh toán'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentChannelManagementRoutingModule { }
