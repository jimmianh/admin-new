import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FaqManagementPageComponent} from "./faq-management-page/faq-management-page.component";
import {FaqManagementFormComponent} from "./faq-management-form/faq-management-form.component";

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
      {
        path: 'form',
        component: FaqManagementFormComponent,
        data: {
          title: 'form câu hỏi'
        }
      },
      {
        path: 'create',
        component: FaqManagementFormComponent,
        data: {
          title: 'Tạo câu hỏi'
        }
      },
      {
        path: 'view/:id',
        component: FaqManagementFormComponent,
        data: {
          title: 'Xem câu hỏi'
        }
      },
      {
        path: 'edit/:id',
        component: FaqManagementFormComponent,
        data: {
          title: 'Chỉnh sửa câu hỏi'
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
