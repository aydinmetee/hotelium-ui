import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TableColumn } from '../models/table-columns';
import { TranslateKey } from '../models/translate-key.enum';

@Injectable({
  providedIn: 'root',
})
export class ColumnTranslationService {
  constructor(public translationService: TranslateService) {}

  public getValue(
    value: any,
    key: TranslateKey,
    col?: TableColumn<any>,
    rowData?: any
  ) {
    if (!key) {
      return value;
    }

    switch (key) {
      case TranslateKey.room:
        switch (value) {
          case 'CLEAN':
            return this.t('clean');
          case 'RESERVED':
            return this.t('reserved');
          case 'DIRTY':
            return this.t('dirty');
          case 'CLOSED':
            return this.t('closed');
          case 'FILLED':
            return this.t('filled');

          default:
            return this.t('no-translation');
        }
      default:
        return value;
    }
  }
  public t(key: string): string {
    return this.translationService.instant(key);
  }
}
