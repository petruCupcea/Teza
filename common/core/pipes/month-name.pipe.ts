import { Pipe, PipeTransform } from '@angular/core';

import { Translator } from 'common/translate';


@Pipe({
  name: 'monthName',
})
export class MonthNamePipe implements PipeTransform {

  constructor(private readonly translator: Translator) {
  }


  transform(value: string | number): string {
    if (!value || value.toString().length > 2) {
      return '';
    }
    value = (value.toString().length === 1) ? '0' + value : value.toString();

    return <string> this.translator.instant('MONTHS.' + value);
  }

}
