import { Component, Input, OnInit } from '@angular/core';
import { TableColumn } from '../../models/table-columns';
import { ColumnTranslationService } from '../../services/column-translation.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'sis-col-value',
  templateUrl: './sis-col-value.component.html',
  styleUrls: ['./sis-col-value.component.scss'],
})
export class SisColValueComponent implements OnInit {
  @Input() public col: TableColumn<any>;
  @Input() public rowData: any;
  @Input() public parentCurrency: string;

  constructor(public colTranslateServ: ColumnTranslationService) {}

  public ngOnInit() {
    console.log(this.col);
    console.log(this.rowData);
  }
}
