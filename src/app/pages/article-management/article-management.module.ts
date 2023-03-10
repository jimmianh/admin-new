import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ArticleManagementRoutingModule} from './article-management-routing.module';
import {ArticleManagementPageComponent} from './article-management-page/article-management-page.component';
// import {CampaignManagementFormComponent} from './campaign-management-form/campaign-management-form.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzImageModule} from "ng-zorro-antd/image";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzUploadModule} from "ng-zorro-antd/upload";
import {CKEditorModule} from "ckeditor4-angular";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {ArticleManagementFormComponent} from "./article-management-form/article-management-form.component";
import {ArticleManagementDetailComponent} from "./article-management-detail/article-management-detail.component";
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {NzTagModule} from "ng-zorro-antd/tag";


@NgModule({
  declarations: [
    ArticleManagementPageComponent,
    ArticleManagementFormComponent,
    ArticleManagementDetailComponent
    // CampaignManagementFormComponent
  ],
  imports: [
    CommonModule,
    ArticleManagementRoutingModule,
    ReactiveFormsModule,
    NzGridModule,
    NzButtonModule,
    NzInputModule,
    NzDatePickerModule,
    NzSelectModule,
    NzTableModule,
    NzSwitchModule,
    NzPaginationModule,
    FormsModule,
    NzIconModule,
    NzImageModule,
    NzFormModule,
    NzDividerModule,
    NzCardModule,
    NzUploadModule,
    CKEditorModule,
    NzDropDownModule,
    NzDescriptionsModule,
    NzTagModule,
  ],
  providers: [NzNotificationService]
})
export class ArticleManagementModule {
}
