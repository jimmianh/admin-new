import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignManagementRoutingModule } from './campaign-management-routing.module';
import { CampaignManagementPageComponent } from './campaign-management-page/campaign-management-page.component';
import { CampaignManagementFormComponent } from './campaign-management-form/campaign-management-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzImageModule} from "ng-zorro-antd/image";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzCardModule} from "ng-zorro-antd/card";


@NgModule({
  declarations: [
    CampaignManagementPageComponent,
    CampaignManagementFormComponent
  ],
  imports: [
    CommonModule,
    CampaignManagementRoutingModule,
    ReactiveFormsModule,
    NzGridModule,
    NzButtonModule,
    NzInputModule,
    NzDatePickerModule,
    NzSelectModule,
    NzTableModule,
    NzSwitchModule,
    NzPaginationModule,
    FormsModule,
    NzIconModule,
    NzImageModule,
    NzFormModule,
    NzDividerModule,
    NzCardModule,
  ]
})
export class CampaignManagementModule { }
