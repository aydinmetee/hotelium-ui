import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyCode'
})
export class CurrencyCodePipe implements PipeTransform {

  currencySym = {
    usd: '$',
    try: '₺',
    'euro ': '€'
  };

  transform(id: string): string {
    return this.currencySym[String(id).toLowerCase()];
  }
}
