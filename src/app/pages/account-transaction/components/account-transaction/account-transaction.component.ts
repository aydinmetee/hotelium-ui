import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/base-component';
import { LabelValue } from 'src/app/shared/models/label-value';
import { TranslateKey } from 'src/app/shared/models/translate-key.enum';
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

  constructor(
    private accountTransactionService: AccountTransactionService,
    utilityService: UtilityService
  ) {
    super(accountTransactionService, utilityService);
    this.searchForm = this.builder.group({
      amount: [null],
      description: [null],
      firstDate: [null],
      lastDate: [null],
      source: [null],
      type: [null],
    });

    this.form = this.builder.group({
      amount: [null, Validators.required],
      description: [null, Validators.required],
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
      {
        field: 'amount',
        header: this.t('amount'),
        default: true,
        key: 1,
      },
      { field: 'description', header: this.t('description'), default: true },
      {
        field: 'source',
        header: this.t('source'),
        default: true,
        translateKey: TranslateKey.source,
      },
      {
        field: 'type',
        header: this.t('type'),
        default: true,
        translateKey: TranslateKey.transactionType,
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
}
