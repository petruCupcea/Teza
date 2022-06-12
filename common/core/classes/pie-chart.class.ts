import { Directive, OnDestroy } from '@angular/core';

import { AmChart, AmChartsService } from 'common/am-charts';
import { PieChartConfig, PieChartItem } from 'common/structures';

import { AppInjector } from '../services/app-injector.service';
import { BaseComponent } from './base-component.class';
import { ChartDataService } from '../services/chart-data.service';
import { detach, idGenerator } from '../lib/';


@Directive()
export abstract class PieChart extends BaseComponent implements OnDestroy {

  chartId: string;
  totalAmount: number;
  chartData: Array<PieChartItem>;
  protected abstract chartColors: Array<string>;
  private chart: AmChart;
  private readonly chartConfig: PieChartConfig<PieChartItem>;
  private readonly amCharts: AmChartsService;
  private readonly chartDataService: ChartDataService;


  protected constructor(chartConfig: PieChartConfig<PieChartItem>) {
    super();
    this.amCharts = AppInjector.getDependency<AmChartsService>(AmChartsService);
    this.chartDataService = AppInjector.getDependency<ChartDataService>(ChartDataService);
    this.chartId = idGenerator('chart-');
    this.chartConfig = chartConfig;
  }


  ngOnDestroy() {
    super.ngOnDestroy();
    if (this.chart) {
      this.amCharts.destroyChart(this.chart);
    }
  }


  protected setChartData(chartData: Array<PieChartItem>, pureData?: boolean) {
    this.addTotalAmount(chartData);
    this.chartData = (pureData) ? chartData : this.transformChartData(chartData);
    detach(() => {
      this.chartConfig.dataProvider = this.chartData;
      this.chart = this.amCharts.makeChart(this.chartId, this.chartConfig);
    });
  }


  private addTotalAmount(chartData: Array<PieChartItem>) {
    this.totalAmount = this.chartDataService.getTotalAmount(chartData);
  }


  private transformChartData(chartData: Array<PieChartItem>): Array<PieChartItem> {
    const addedColors = this.addColor(chartData);

    return addedColors;
  }


  private addColor(chartData: Array<PieChartItem>): Array<PieChartItem> {
    if (this.chartColors) {
      return this.chartDataService.addColor(chartData, this.chartColors);
    }
  }

}
