import { Pipe, PipeTransform } from '@angular/core';
import { IConfig } from './config';
import { MaskApplierService } from './mask-applier.service';

@Pipe({
  name: 'mask',
  pure: true
})
export class MaskPipe implements PipeTransform {
  public constructor(private _maskService: MaskApplierService) {}

  public transform(
    value: string | number,
    mask: string | [string, IConfig['patterns']]
  ): string {
    if (!value) {
      return '';
    }
    if (typeof mask === 'string') {
      if (mask.includes('dot_separator')) {
        value = String(value).replace('.', ',');
      }
      return this._maskService.applyMask(`${value}`, mask);
    }
    return this._maskService.applyMaskWithPattern(`${value}`, mask);
  }
}
