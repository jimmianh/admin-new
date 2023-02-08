import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../service/dashboard.service";
import {GeneralityDto} from "../model/Dashboard";
import {ChartOptions} from "./SetupChart";
import {SystemUtil} from "../../../util/SystemUtil";

@Component({
  selector: 'app-generality',
  templateUrl: './generality.component.html',
  styleUrls: ['./generality.component.scss']
})
export class GeneralityComponent implements OnInit {

  generalityDto!: GeneralityDto;
  chartOptions!: ChartOptions;
  amountArr!: number[];
  monthArr!: string[];

  constructor(private dashboardService: DashboardService) {
  }

   ngOnInit(): void {
    this.getGenerality();
  }

  getGenerality() {
    this.dashboardService.getGenerality()
      .subscribe(res => {
        res && (this.generalityDto = res);
        let map = SystemUtil.getAmountFromAmountByMonth(this.generalityDto.amountByMonth);
        this.amountArr = map.get('amount');
        this.monthArr = map.get('month');
        this.setUpLineChart();
      })
  }

  private setUpLineChart() {
    this.chartOptions = {
      series: [
        {
          name: "Amount",
          data: this.amountArr
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Số tiền quyên góp theo tháng",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: this.monthArr
      }
    };
  }
}
