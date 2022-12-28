import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserManagementPageComponent} from "./user-management-page/user-management-page.component";
import {UserManagementFormComponent} from "./user-management-form/user-management-form.component";
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Người dùng'
    },
    children: [
      {
        path: 'list',
        component: UserManagementPageComponent,
        data: {
          title: 'Danh sách người dùng'
        }
      },
      {
        path: 'form',
        component: UserManagementFormComponent,
        data: {
          title: 'form người dùng'
        }
      },
      {
        path: 'create',
        component: UserManagementFormComponent,
        data: {
          title: 'Tạo người dùng mới'
        }
      },
      {
        path: 'view/:id',
        component: UserManagementFormComponent,
        data: {
          title: 'Xem thông tin chi tiết'
        }
      },
      {
        path: 'edit/:id',
        component: UserManagementFormComponent,
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
export class UserManagementRoutingModule { }
