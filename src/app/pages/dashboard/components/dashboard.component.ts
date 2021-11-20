import { Component, Injector, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base-component';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { AccountTransactionService } from '../../account-transaction/services/account-transaction.service';
import { Balance } from '../models/balance';

interface Test {
  title: string;
  data: any[];
  label: any[];
}

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  public balance: Balance = new Balance();
  public filterOptions = [];

  public collectionData: any;
  public data02: any;
  public data03: any;
  public test12: Test = {
    title: 'test',
    data: [15, 25, 36],
    label: ['test', 'test', 'test2'],
  };

  public options: any;
  public chartHeight = '400px';
  public monthList: string[] = [
    'Ocak',
    'Şubat',
    'Mart',
    'Nisan',
    'Mayıs',
    'Haziran',
    'Temmuz',
    'Ağustos',
    'Eylül',
    'Ekim',
    'Kasım',
    'Aralık',
  ];

  public lineOptions: any;
  public options03: any;
  public style = getComputedStyle(document.body);
  public chartColorLight = this.style.getPropertyValue('--chart-light-color');
  public chartColorDark = this.style.getPropertyValue('--main-dark-color');
  public mainColor = this.style.getPropertyValue('--main-primary-color');

  constructor(
    _injector: Injector,
    utilServ: UtilityService,
    private accountTransactionService: AccountTransactionService
  ) {
    super(null, utilServ);
    this.hideloader();
    accountTransactionService.getMontlyBalance().subscribe((data) => {
      console.log(data);
      this.balance = data;
    });

    const monthBalance = [
      511778, 462878, 531736, 220222, 662562, 220008, 626282, 626771, 642643,
      674143, 202249, 162039,
    ];
  }

  public totalStockCost: any = {};
  public TotalDailySales: any = {};
  public TotalDailyCollections: any = {};
  public TotalDailyPayment: any = {};
  public paymentData: any = {};
  public balanceData: any = {};
  public PaymentAndCollectionBalance: any = {};

  public topSellingAmount: any = [];
  public topSellingQuantity: any = [];
  public widgeits = [];

  public ngOnInit() {
    this.transtaionInit(() => {
      this.columns = [
        { field: 'id', header: this.t('id'), default: false },
        { field: 'itemCode', header: this.t('skuSetCode'), default: true },
        { field: 'itemName', header: this.t('skuSet'), default: true },
        {
          field: 'itemType',
          header: this.t('type'),
          default: true,
        },
        {
          field: 'subThreshold',
          header: this.t('subThreshold'),
          default: true,
        },
      ];
    });

    this.init();
  }

  public doSomething() {
    this.utilityService.progressButtonService.disable();

    setTimeout(() => {
      this.utilityService.progressButtonService.enable();
    }, 2500);
  }
}
