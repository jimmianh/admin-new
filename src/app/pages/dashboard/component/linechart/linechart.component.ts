import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid,
  ApexStroke,
  ApexXAxis
} from "ng-apexcharts/lib/model/apex-types";
import {SystemUtil} from "../../../../util/SystemUtil";

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.scss']
})
export class LinechartComponent implements OnChanges  {

  @Input() data : any = {};
  public rateData: any = {};

  grid: ApexGrid = {
    row: {
      colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
      opacity: 0.5
    }
  };
  dataLabels: ApexDataLabels = {
    enabled: false
  };
  stroke: ApexStroke ={
    curve: "straight"
  };
  chart: ApexChart = {
    height: 350,
    type: "line",
    zoom: {
      enabled: false
    }
  };
  xaxis!: ApexXAxis;
  series!: ApexAxisChartSeries;
  constructor() {

  }
  ngOnChanges(changes: SimpleChanges) {
    this.rateData = changes['data'].currentValue;
    let map = SystemUtil.getAmountFromAmountByMonth(this.rateData && this.rateData.amountByMonth);
    let data  = map.get('amount');
    let month = map.get('month');
    this.setUpLineChart(data, month);
  }
  private setUpLineChart(data: number[], month: string[]) {
    this.series = [
      {
        name: "Amount",
        data: data
      }
    ];
    this.xaxis = {
      categories: month
    }
  }

}
