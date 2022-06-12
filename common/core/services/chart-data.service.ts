import * as _ from 'lodash';
import { Injectable } from '@angular/core';

import { PieChartItem } from 'common/structures';


@Injectable()
export class ChartDataService {

  constructor() {
  }


  addColor(chartData: Array<PieChartItem>, colors: Array<string>): Array<PieChartItem> {
    const data = _.cloneDeep(chartData);

    const dataWithColors = _.map(data, (item: PieChartItem, index: number): PieChartItem => {
      item.color = (colors.length <= index + 1) ? colors[index % colors.length] : colors[index];

      return item;
    });

    return dataWithColors;
  }


  getTotalAmount(chartData: Array<PieChartItem>): number {
    const totalAmount = _.sumBy(chartData, (item: PieChartItem) => {
      return item.equivalentAmount;
    });

    return totalAmount;
  }

}
