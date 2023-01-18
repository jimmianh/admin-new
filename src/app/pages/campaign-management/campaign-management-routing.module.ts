import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CampaignManagementPageComponent} from "./campaign-management-page/campaign-management-page.component";
import {CampaignManagementFormComponent} from "./campaign-management-form/campaign-management-form.component";
import {CampaignManagementDetailComponent} from "./campaign-management-detail/campaign-management-detail.component";
import {CampaignTransactionPageComponent} from "./campaign-transaction-page/campaign-transaction-page.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Quản lý chiến dịch'
    },
    children: [
      {
        path: 'list',
        component: CampaignManagementPageComponent,
        data: {
          title: 'Danh sách các chiến dịch'
        }
      },
      {
        path: 'form',
        component: CampaignManagementFormComponent,
        data: {
          title: 'Danh sách các chiến dịch'
        }
      },
      {
        path: 'create',
        component: CampaignManagementFormComponent,
        data: {
          title: 'Tạo chiến dịch'
        }
      },
      {
        path: 'detail/:id',
        component: CampaignManagementDetailComponent,
        data: {
          title: 'Xem chi tiết chiến dịch'
        }
      },
      {
        path: 'edit/:id',
        component: CampaignManagementFormComponent,
        data: {
          title: 'Chỉnh sửa chiến dịch'
        }
      },
      {
        path: 'transaction/:id',
        component: CampaignTransactionPageComponent,
        data: {
          title: 'Lịch sử giao dịch'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignManagementRoutingModule { }
