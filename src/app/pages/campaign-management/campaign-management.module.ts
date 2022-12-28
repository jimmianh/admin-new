import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CampaignManagementRoutingModule } from './campaign-management-routing.module';
import { CampaignManagementPageComponent } from './campaign-management-page/campaign-management-page.component';
import { CampaignManagementFormComponent } from './campaign-management-form/campaign-management-form.component';


@NgModule({
  declarations: [
    CampaignManagementPageComponent,
    CampaignManagementFormComponent
  ],
  imports: [
    CommonModule,
    CampaignManagementRoutingModule,
  ]
})
export class CampaignManagementModule { }
