import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'shortenIban',
})
export class ShortenIbanPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }

    return value.slice(0, 2) + '...' + value.slice(-10);
  }

}
