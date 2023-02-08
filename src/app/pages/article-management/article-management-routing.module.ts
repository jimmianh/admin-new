import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ArticleManagementPageComponent} from "./article-management-page/article-management-page.component";
import {ArticleManagementFormComponent} from "./article-management-form/article-management-form.component";
import {ArticleManagementDetailComponent} from "./article-management-detail/article-management-detail.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Quản lý bài viết'
    },
    children: [
      {
        path: 'list',
        component: ArticleManagementPageComponent,
        data: {
          title: 'Danh sách bài viết'
        }
      },
      {
        path: 'form',
        component: ArticleManagementFormComponent,
        data: {
          title: 'form bài viết'
        }
      },
      {
        path: 'create/:campaignId',
        component: ArticleManagementFormComponent,
        data: {
          title: 'Tạo bài viết'
        }
      },
      {
        path: 'detail/:id',
        component: ArticleManagementDetailComponent,
        data: {
          title: 'Xem bài viết'
        }
      },
      {
        path: 'edit/:id',
        component: ArticleManagementFormComponent,
        data: {
          title: 'Chỉnh sửa bài viết'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleManagementRoutingModule { }
