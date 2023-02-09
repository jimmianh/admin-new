import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ApexChart, ApexDataLabels } from 'ng-apexcharts';
import {SystemUtil} from "../../../../util/SystemUtil";

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnChanges {

  @Input() data : any = {};
  public rateData: any = {};


  chartDetails: ApexChart = {
    type: 'pie',
    toolbar: {
      show: true
    }
  };

  chartLabels!: string[];
  chartSeries!: number[];

  chartDataLabels: ApexDataLabels = {
    enabled: true
  };
  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {
    this.rateData = changes['data'].currentValue;
    let map = SystemUtil.handlerResponseAmountByCategory(this.rateData && this.rateData.amountCategories);
    this.chartLabels  = map.get('name');
    this.chartSeries = map.get('amount');
    console.log("this.chartLabels: ", this.chartLabels)
    console.log("this.chartSeries: ", this.chartSeries)
  }

}
