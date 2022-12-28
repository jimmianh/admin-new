import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleManagementRoutingModule } from './article-management-routing.module';
import { ArticleManagementFormComponent } from './article-management-form/article-management-form.component';
import { ArticleManagementPageComponent } from './article-management-page/article-management-page.component';


@NgModule({
  declarations: [
    ArticleManagementFormComponent,
    ArticleManagementPageComponent
  ],
  imports: [
    CommonModule,
    ArticleManagementRoutingModule,
  ]
})
export class ArticleManagementModule { }
