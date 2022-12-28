import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentManagementRoutingModule } from './comment-management-routing.module';
import { CommentManagementPageComponent } from './comment-management-page/comment-management-page.component';
import { CommentManagementDetailComponent } from './comment-management-detail/comment-management-detail.component';;


@NgModule({
  declarations: [
    CommentManagementPageComponent,
    CommentManagementDetailComponent
  ],
  imports: [
    CommonModule,
    CommentManagementRoutingModule,
  ]
})
export class CommentManagementModule { }
