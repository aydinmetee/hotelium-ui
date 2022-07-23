import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/shared/base-component';
import { LabelValue } from 'src/app/shared/models/label-value';
import { ComboService } from 'src/app/shared/services/combo.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { ExpensesMaster } from '../../models/expenses-master';
import { ExpensesDetailService, ExpensesMasterService } from '../../services/expenses-master.service';


@Component({
  selector: 'app-expenses-detail',
  templateUrl: './expenses-detail.component.html',
  styleUrls: ['./expenses-detail.component.scss'],
})
export class ExpensesDetailComponent
  extends BaseComponent
  implements OnInit
{
  expensesMaster: ExpensesMaster = new ExpensesMaster();

  constructor(
    private expensesDetailService: ExpensesDetailService,
    private expensesMasterService: ExpensesMasterService,
    private activatedRoute: ActivatedRoute,
    private comboService: ComboService,
    utilityService: UtilityService
  ) {
    super(expensesDetailService, utilityService);
    this.expensesDetailService.expensesMasterId = '';
    console.log(this.minDate);

    this.searchForm = this.builder.group({
      roomCode: [null],
      description: [null],
      checkInDate: [null],
      checkOutDate: [null],
      status: [null],
      reservationDate: [null],
      dailyAmount: [null],
      duration: [null],
    });

    this.form = this.builder.group({
      customerId: [null, Validators.required],
      reservationMasterId: [null, Validators.required],
    });

    this.calendarInit();
  }

  ngOnInit(): void {
    this.initDetail();
    this.hideloader();
    this.columns = [
      { field: 'id', header: this.t('id'), default: true },
      {
        field: 'customerFullName',
        header: this.t('customerFullName'),
        default: true,
      },
      { field: 'customerLegalId', header: this.t('legalId'), default: true },
      { field: 'customerPhone', header: this.t('phone'), default: true },
    ];

    this.init();
  }

  create() {
    this.form
      .get('expensesMasterId')
      .setValue(this.expensesDetailService.expensesMasterId);
    if (this.isInValid()) {
      return;
    }
    this.showLoader();
    const model = Object.assign({}, this.form.value);
    this.expensesDetailService
      .createObject(model)
      .subscribe(this.createHandler());
  }

  public initDetail() {
    this.activatedRoute.params.subscribe(({ masterId }) => {
      this.expensesDetailService.expensesMasterId = masterId;
      this.expensesDetailService
        .findObject(masterId)
        .subscribe((result: ExpensesMaster) => {
          this.expensesMaster = result;
          this.searchForm.patchValue({
            ...result
          });
          this.searchForm.disable();
         
        });
    });
  }

  public updateActions() {
    this.showUpdateMessage();
    this.initDetail();
    this.getPageData();
    this.hideDialog();
  }

}
