import {Component, Input, OnInit} from '@angular/core';
import {DashboardService} from "../service/dashboard.service";
import {GeneralityDto} from "../model/Dashboard";
import {ChartOptions} from "./SetupChart";
import {SystemUtil} from "../../../util/SystemUtil";
import {Observable} from "rxjs";

@Component({
  selector: 'app-generality',
  templateUrl: './generality.component.html',
  styleUrls: ['./generality.component.scss']
})
export class GeneralityComponent implements OnInit {

  generalityDto!: GeneralityDto;
  chartOptions!: ChartOptions;

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.getGenerality();
  }

  getGenerality() {
    this.dashboardService.getGenerality()
      .subscribe(res => res && (this.generalityDto = res));

  }


}
