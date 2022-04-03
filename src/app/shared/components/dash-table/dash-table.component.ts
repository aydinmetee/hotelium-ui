import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseComponent } from '../../base-component';
import { TableColumns } from '../../models/table-columns';
import { UtilityService } from '../../services/utility.service';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'dash-table',
  templateUrl: './dash-table.component.html',
  styleUrls: ['./dash-table.component.scss'],
})
export class DashTableComponent extends BaseComponent implements OnInit {
  @Input() columns: TableColumns<any>;
  @Input() title: string;
  @Input() set service(serv) {
    this.componentService = serv;
  }

  @Input() pagination: boolean;
  @Input() pageSize: number;
  @Input() id: string;
  @Output() sendSerial = new EventEmitter();

  public rowsPerPage = [5, 10, 25, 50, 100, 500];

  initStarted = true;
  isLazy = true;
  constructor(utilServ: UtilityService) {
    super(null, utilServ);
    this.initStarted = false;
  }

  ngOnInit() {}

  refreshData(searchArgs: any = {}): void {
    this.searchObject = searchArgs;
    this.pageNumber = 0;
    this.getPageData();
  }

  setInitSearchData(searchData: any) {
    this.searchObject = searchData;
    this.initStarted = true;
    this.isLazy = true;
  }

  onRowSelect(event) {
    this.sendSerial.emit(event.data.serial);
  }
}
