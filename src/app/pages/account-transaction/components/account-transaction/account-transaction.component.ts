import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { AutoComplete } from 'primeng/autocomplete';
import { BaseComponent } from 'src/app/shared/base-component';
import { LabelValue } from 'src/app/shared/models/label-value';
import { TranslateKey } from 'src/app/shared/models/translate-key.enum';
import { AutoCompleteService } from 'src/app/shared/services/auto-complete.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { AccountTransactionService } from '../../services/account-transaction.service';

@Component({
  selector: 'app-account-transaction',
  templateUrl: './account-transaction.component.html',
  styleUrls: ['./account-transaction.component.scss'],
})
export class AccountTransactionComponent
  extends BaseComponent
  implements OnInit
{
  public sourceList: LabelValue<string, string>[] = [];
  public typeList: LabelValue<string, string>[] = [];
  public draweesResult: any[] = [];

  constructor(
    private accountTransactionService: AccountTransactionService,
    private autoCompleteService: AutoCompleteService,
    utilityService: UtilityService
  ) {
    super(accountTransactionService, utilityService);
    this.searchForm = this.builder.group({
      draweeId: [null],
    });

    this.searchToggle = true;
    this.initStarted = false;
    this.form = this.builder.group({
      amount: [null, [Validators.required, Validators.min(1)]],
      description: [null],
      source: [null, Validators.required],
      type: ['EXPENSE'],
    });

    this.typeList = [
      { label: this.t('select'), value: null },
      { label: this.t('income'), value: 'INCOME' },
      { label: this.t('expense'), value: 'EXPENSE' },
    ];

    this.sourceList = [
      { label: this.t('select'), value: null },
      { label: this.t('debit'), value: 'DEBIT' },
      { label: this.t('cash'), value: 'CASH' },
      { label: this.t('bank'), value: 'BANK' },
    ];
  }

  ngOnInit(): void {
    this.hideloader();
    this.columns = [
      { field: 'id', header: this.t('id'), default: true },
      { field: 'nameTitle', header: this.t('nameOrNameTitle'), default: true },
      {
        field: 'reservationDate',
        header: this.t('reservationDate'),
        default: true,
        isDate: true,
        dateFormat: this.onlyDateFormat,
      },
      {
        field: 'duration',
        header: this.t('duration'),
        default: true,
        isNumber: true,
        numberFormat: this.integerFormat,
      },
      {
        field: 'dailyAmount',
        header: this.t('dailyAmount'),
        default: true,
        isNumber: true,
        numberFormat: this.decimalFormat,
      },
      {
        field: 'amount',
        header: this.t('amount'),
        default: true,
        isNumber: true,
        numberFormat: this.decimalFormat,
      },
      { field: 'description', header: this.t('description'), default: true },
      {
        field: 'source',
        header: this.t('source'),
        default: true,
        translateKey: TranslateKey.source,
      },
      {
        field: 'creDate',
        header: this.t('creDate'),
        default: true,
        isDate: true,
        dateFormat: this.dateFormat,
      },
    ];

    this.init();
  }

  public getDraweesList(searchQuery: { query: string }): void {
    this.autoCompleteService
      .getDrawees({ nameTitle: searchQuery.query })
      .subscribe((result) => {
        console.log(result);
        this.draweesResult = result;
      });
  }

  public onFocus(auto: AutoComplete): void {
    console.log(auto);
    if (this.draweesResult.length > 0) {
      if (!auto.suggestions) {
        auto.suggestions = this.draweesResult;
      } else {
        auto.show();
      }
    }
  }

  public search(): void {
    this.pageNumber = 0;
    this.searchObject = this.searchForm.value;
    this.searchObject.draweeId = (this.searchForm.value.draweeId || {}).value;
    this.getPageData();
  }

  public reset(): void {
    this.searchForm.reset();
    this.searchObject = {};
    this.data = [];
  }
}
