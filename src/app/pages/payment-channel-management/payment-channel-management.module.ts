import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentChannelManagementRoutingModule } from './payment-channel-management-routing.module';
import { PaymentChannelManagementPageComponent } from './payment-channel-management-page/payment-channel-management-page.component';
import { PaymentChannelManagementFormComponent } from './payment-channel-management-form/payment-channel-management-form.component';
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzTableModule} from "ng-zorro-antd/table";


@NgModule({
  declarations: [
    PaymentChannelManagementPageComponent,
    PaymentChannelManagementFormComponent
  ],
  imports: [
    CommonModule,
    PaymentChannelManagementRoutingModule,
    NzDividerModule,
    NzTableModule,
  ]
})
export class PaymentChannelManagementModule { }
