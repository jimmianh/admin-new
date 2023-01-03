import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentChannelManagementRoutingModule } from './payment-channel-management-routing.module';
import { PaymentChannelManagementPageComponent } from './payment-channel-management-page/payment-channel-management-page.component';
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzGridModule} from "ng-zorro-antd/grid";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzSwitchModule} from "ng-zorro-antd/switch";


@NgModule({
  declarations: [
    PaymentChannelManagementPageComponent
  ],
  imports: [
    CommonModule,
    PaymentChannelManagementRoutingModule,
    NzDividerModule,
    NzTableModule,
    NzModalModule,
    NzButtonModule,
    NzCheckboxModule,
    NzGridModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzIconModule,
    NzSwitchModule,
    FormsModule,
  ]
})
export class PaymentChannelManagementModule { }
