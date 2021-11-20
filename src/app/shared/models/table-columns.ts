import { TranslateKey } from './translate-key.enum';

export interface TableColumn<T> {
  default: boolean;
  field: keyof T;
  header: string;
  index?: number;
  isDate?: true;
  dateFormat?: string;
  isNumber?: boolean;
  key?: number;
  numberFormat?: string;
  currencyField?: keyof T;
  textAlign?: 'left' | 'center' | 'right';
  translateKey?: TranslateKey;
}

export type TableColumns<T> = TableColumn<T>[];
