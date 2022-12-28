import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SponsorManagementPageComponent} from "./sponsor-management-page/sponsor-management-page.component";
import {SponsorManagementFormComponent} from "./sponsor-management-form/sponsor-management-form.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Nhà đồng hành'
    },
    children: [
      {
        path: 'list',
        component: SponsorManagementPageComponent,
        data: {
          title: 'Danh sách các nhà đồng hành'
        }
      },
      {
        path: 'form',
        component: SponsorManagementFormComponent,
        data: {
          title: 'form nhà đồng hành'
        }
      },
      {
        path: 'create',
        component: SponsorManagementFormComponent,
        data: {
          title: 'Tạo mới nhà đồng hành'
        }
      },
      {
        path: 'view/:id',
        component: SponsorManagementFormComponent,
        data: {
          title: 'Xem chi tiết'
        }
      },
      {
        path: 'edit/:id',
        component: SponsorManagementFormComponent,
        data: {
          title: 'Chỉnh sửa thông tin'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SponsorManagementRoutingModule { }
