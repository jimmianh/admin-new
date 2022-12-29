import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PaymentChannelManagementFormComponent} from "./payment-channel-management-form/payment-channel-management-form.component";
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
      },
      {
        path: 'create',
        component: PaymentChannelManagementFormComponent,
        data: {
          title: 'Tạo kênh thanh toán'
        }
      },
      {
        path: 'view/:id',
        component: PaymentChannelManagementFormComponent,
        data: {
          title: 'Xem kênh thanh toán'
        }
      },
      {
        path: 'edit/:id',
        component: PaymentChannelManagementFormComponent,
        data: {
          title: 'Chỉnh sửa kênh thanh toán'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentChannelManagementRoutingModule { }
