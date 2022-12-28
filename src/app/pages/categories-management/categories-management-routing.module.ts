import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CategoriesManagementPageComponent} from "./categories-management-page/categories-management-page.component";
import {CategoriesManagementFormComponent} from "./categories-management-form/categories-management-form.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Danh mục'
    },
    children: [
      {
        path: 'list',
        component: CategoriesManagementPageComponent,
        data: {
          title: 'Danh sách các danh mục'
        }
      },
      {
        path: 'form',
        component: CategoriesManagementFormComponent,
        data: {
          title: 'form danh mục'
        }
      },
      {
        path: 'create',
        component: CategoriesManagementFormComponent,
        data: {
          title: 'Tạo danh mục'
        }
      },
      {
        path: 'view/:id',
        component: CategoriesManagementFormComponent,
        data: {
          title: 'Xem danh mục'
        }
      },
      {
        path: 'edit/:id',
        component: CategoriesManagementFormComponent,
        data: {
          title: 'Chỉnh sửa danh mục'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesManagementRoutingModule { }
