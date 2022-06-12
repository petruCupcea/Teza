import { DecimalPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'fxRateDecimals',
})
export class FxRateDecimalsPipe extends DecimalPipe implements PipeTransform {

  static readonly format = '.4-6';


  transform(value: any): any {
    let result;

    try {
      result = super.transform(value, FxRateDecimalsPipe.format);
    } catch (err) {
    }

    return result;
  }

}
