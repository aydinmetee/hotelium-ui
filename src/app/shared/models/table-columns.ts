import { TranslateKey } from './translate-key.enum';

export interface TableColumn<T> {
  default: boolean;
  field: keyof T;
  header: string;
  index?: number;
  isDate?: true;
  dateFormat?: string;
  isNumber?: boolean;
  numberFormat?: string;
  textAlign?: 'left' | 'center' | 'right';
  translateKey?: TranslateKey;
}

export type TableColumns<T> = TableColumn<T>[];
