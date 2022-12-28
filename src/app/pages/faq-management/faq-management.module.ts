import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FAQManagementRoutingModule } from './faq-management-routing.module';
import { FaqManagementPageComponent } from './faq-management-page/faq-management-page.component';
import { FaqManagementFormComponent } from './faq-management-form/faq-management-form.component';


@NgModule({
  declarations: [
    FaqManagementPageComponent,
    FaqManagementFormComponent
  ],
  imports: [
    CommonModule,
    FAQManagementRoutingModule,
  ]
})
export class FAQManagementModule { }
