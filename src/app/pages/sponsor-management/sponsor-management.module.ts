import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SponsorManagementRoutingModule} from './sponsor-management-routing.module';
import {SponsorManagementPageComponent} from './sponsor-management-page/sponsor-management-page.component';
import {SponsorManagementFormComponent} from './sponsor-management-form/sponsor-management-form.component';
import {NzGridModule} from "ng-zorro-antd/grid";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzImageModule} from "ng-zorro-antd/image";
import {NzSwitchModule} from "ng-zorro-antd/switch";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzUploadModule} from "ng-zorro-antd/upload";
import {CKEditorModule} from "ckeditor4-angular";
import {NzNotificationService} from "ng-zorro-antd/notification";
import { SponsorViewDetailComponent } from './sponsor-view-detail/sponsor-view-detail.component';
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";


@NgModule({
  declarations: [
    SponsorManagementPageComponent,
    SponsorManagementFormComponent,
    SponsorViewDetailComponent
  ],
    imports: [
        CommonModule,
        SponsorManagementRoutingModule,
        NzGridModule,
        ReactiveFormsModule,
        NzSelectModule,
        NzButtonModule,
        NzTableModule,
        NzPaginationModule,
        NzInputModule,
        NzImageModule,
        FormsModule,
        NzSwitchModule,
        NzDividerModule,
        NzIconModule,
        NzCardModule,
        NzFormModule,
        NzUploadModule,
        CKEditorModule,
        NzDropDownModule,
        NzDescriptionsModule,
    ],
  providers: [{provide: NzNotificationService}]
})
export class SponsorManagementModule {
}
