import { TranslateKey } from './translate-key.enum';

export interface TableColumn<T> {
  field: keyof T;
  header: string;
  index?: number;
  isDate?: true;
  default?: boolean;
  translateKey?: TranslateKey;
  dateFormat?: string;
  key?: number;
  width?: string;
  isNumber?: boolean;
  numberFormat?: string;
  searchField?: boolean;
  currencyField?: keyof T;
  showParentCurrency?: boolean;
  prefix?: string;
  textAlign?: 'left' | 'center' | 'right';
  customRender?: boolean;
  renderMethod?: any;
  isStatus?: boolean;
  case?: 'upperCase' | 'lowerCase' | 'default';
  showTooltip?: boolean;
  symbol?: string;
  type?: 'UserName' | 'Observable' | 'Other';
  searchType?: 'Date' | 'Text' | 'DropDown' | 'Other';
  nullable?: boolean;
  totalTextColumn?: boolean;
}

export type TableColumns<T> = TableColumn<T>[];
