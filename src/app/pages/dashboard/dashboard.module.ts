import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {GeneralityComponent} from './generality/generality.component';
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzStatisticModule} from "ng-zorro-antd/statistic";
import {NgApexchartsModule} from "ng-apexcharts";

@NgModule({
  declarations: [GeneralityComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NzGridModule,
    NzCardModule,
    NzStatisticModule,
    NgApexchartsModule,
  ]
})
export class DashboardModule {
}
