import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexGrid, ApexNonAxisChartSeries,
  ApexStroke,
  ApexTitleSubtitle,
  ApexXAxis
} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

