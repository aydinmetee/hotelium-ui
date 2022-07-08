import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountTransactionService } from 'src/app/pages/account-transaction/services/account-transaction.service';
import { ReservationMasterService } from 'src/app/pages/reservations/services/reservation-master.service';
import { BaseComponent } from 'src/app/shared/base-component';
import { CustomerOperationComponent } from 'src/app/shared/components/customer-operation/customer-operation.component';
import { DashTableComponent } from 'src/app/shared/components/dash-table/dash-table.component';
import { LabelValue } from 'src/app/shared/models/label-value';
import { TableColumns } from 'src/app/shared/models/table-columns';
import { TranslateKey } from 'src/app/shared/models/translate-key.enum';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { ExpensesMaster } from '../../models/expenses-master';
import { ExpensesDetailService, ExpensesMasterService } from '../../services/expenses-master.service';


@Component({
  selector: 'app-expenses-master',
  templateUrl: './expenses-master.component.html',
  styleUrls: ['./expenses-master.component.scss'],
})
export class ExpensesMasterComponent
  extends BaseComponent
  implements OnInit
{

  detailColumns: TableColumns<any> = [];
  expensesMaster: ExpensesMaster = new ExpensesMaster();
  statusList: LabelValue<string, string>[] = [];
  reservationList:LabelValue<string,string>[] = [];

  constructor(
    private expensesMasterService: ExpensesMasterService,
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private expensesDetailService: ExpensesDetailService,
    private reservationMasterService:ReservationMasterService,
    utilityService: UtilityService
  ) {
    super(expensesMasterService, utilityService);
    this.searchForm = this.builder.group({
      description: [null],
      roomId: [null],
      status: [null],
      bookAmount: [null],
    });

    this.reservationMasterService.getOptionList({searchArgs:{},label:'id',value:'id'}).subscribe(res => {
      this.reservationList = res;
    })

    this.form = this.builder.group({
      reservationMasterId: [null, Validators.required],
    });

    this.statusList = [
      { label: this.t('select'), value: null },
      { label: this.t('unpaid'), value: 'UNPAID' },
      { label: this.t('paid'), value: 'PAID' },
      { label: this.t('cancelled'), value: 'CANCELLED' },
    ];
  }

  ngOnInit(): void {
    this.transtaionInit(() => {
      this.initStepItems(['expenses.general', 'expenses.customers']);
    });
    this.hideloader();

    this.columns = [
      { field: 'id', header: this.t('id'), default: true },
      { field: 'amount', header: this.t('amount'),isNumber:true,numberFormat:this.decimalFormat, default: true },

      {
        field: 'status',
        header: this.t('status'),
        default: true,
        translateKey: TranslateKey.reservationStatus,
      },
      {
        field: 'creDate',
        header: this.t('creDate'),
        default: true,
        isDate: true,
        dateFormat: this.onlyDateFormat,
      },
    ];

    this.init();
  }

  navToDetail(id?: string): void {
    if (id) {
      this.router.navigate([id, 'detail'], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate([this.expensesMaster.id, 'detail'], {
        relativeTo: this.activatedRoute,
      });
    }
  }

  public create(): void {
    console.log(this.reservationList)
    console.log(this.form.value)
    super.create();
  }

}
