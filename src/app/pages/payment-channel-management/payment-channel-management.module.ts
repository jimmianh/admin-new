import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentChannelManagementRoutingModule } from './payment-channel-management-routing.module';
import { PaymentChannelManagementPageComponent } from './payment-channel-management-page/payment-channel-management-page.component';
import { PaymentChannelManagementFormComponent } from './payment-channel-management-form/payment-channel-management-form.component';


@NgModule({
  declarations: [
    PaymentChannelManagementPageComponent,
    PaymentChannelManagementFormComponent
  ],
  imports: [
    CommonModule,
    PaymentChannelManagementRoutingModule,
  ]
})
export class PaymentChannelManagementModule { }
