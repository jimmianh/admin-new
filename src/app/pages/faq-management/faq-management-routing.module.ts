import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FaqManagementPageComponent} from "./faq-management-page/faq-management-page.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Câu hỏi thường gặp'
    },
    children: [
      {
        path: 'list',
        component: FaqManagementPageComponent,
        data: {
          title: 'Danh sách các câu hỏi thường gặp'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FAQManagementRoutingModule { }
