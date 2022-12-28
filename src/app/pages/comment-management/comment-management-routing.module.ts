import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CommentManagementPageComponent} from "./comment-management-page/comment-management-page.component";
import {CommentManagementDetailComponent} from "./comment-management-detail/comment-management-detail.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Bình luận'
    },
    children: [
      {
        path: 'list',
        component: CommentManagementPageComponent,
        data: {
          title: 'Danh sách các bình luận'
        }
      },
      {
        path: 'view/:id',
        component: CommentManagementDetailComponent,
        data: {
          title: 'Xem chi tiết bình luận'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommentManagementRoutingModule { }
