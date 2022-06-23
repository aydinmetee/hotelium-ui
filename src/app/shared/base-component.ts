import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TableColumns } from './models/table-columns';
import { SelectItem, MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { RestService } from './services/rest.service';
import { UtilityService } from './services/utility.service';
import { LabelValue } from './models/label-value';

@Component({
  template: '',
})
export abstract class BaseComponent implements OnDestroy {
  public countryList: LabelValue<string, string>[] = [];
  public cityList: LabelValue<string, string>[] = [];
  public townList: LabelValue<string, string>[] = [];

  public form: FormGroup;
  public searchForm: FormGroup;
  public dateFormat = 'dd/MM/yyyy HH:mm';
  public onlyDateFormat = 'dd/MM/yyyy';
  public calendar: any = {};

  public selectedColumns: any;
  public columns: TableColumns<any> = [];
  public id = '';
  public invalidForm = false;

  public dialogType = true; // true => create , false = update
  public dialogTitle = '';
  public isDialogVisible = false;

  public data;
  public total = 0;
  public sortKey = 'id,ASC';
  public pageNumber = 0;
  public sortField: string;
  public sortFieldDef: string;
  public sortOrder: string;
  public pageSize = 10;
  public selectedItem = null;

  public statusList: SelectItem[] = [];

  public minDate = new Date();

  public activeIndex = 0;
  public stepItems: MenuItem[] = [];

  public searchObject: any = {};
  public searchToggle = false;
  protected formsCon: ElementRef;

  @ViewChild('pTable', { static: true }) public dt: Table;
  protected hideLoaderAfterInit = true;
  public rowsPerPage = [10, 25, 50, 100, 500];
  public builder: FormBuilder;
  public initStarted = true;

  constructor(
    protected componentService: RestService,
    protected utilityService: UtilityService
  ) {
    this.builder = utilityService.builder;

    this.calendar = {
      firstDayOfWeek: 0,
      dayNames: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
      monthNames: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      monthNamesShort: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      today: 'Today',
      clear: 'Clear',
    };

    this.minDate.setDate(this.minDate.getDate() - 1);
  }

  public calendarInit() {
    this.transtaionInit(() => {
      this.calendar = this.t('calendar');
      if (this.hideLoaderAfterInit) {
        // this.hideloader();
      }
    });
  }

  protected t(key: string): string {
    return this.utilityService.translateService.instant(key);
  }

  protected transtaionInit(translateCallback: () => void): void {
    this.utilityService.translateService.get('g').subscribe(() => {
      if (translateCallback) {
        translateCallback();
      }
    });
  }

  public init() {
    this.selectedColumns = this.columns
      .filter((i) => i.field !== 'id')
      .filter((i) => i.default);

    this.calendarInit();
  }

  ngOnDestroy() { }

  public create() {
    if (this.isInValid()) {
      return;
    }
    this.showLoader();
    const model = Object.assign({}, this.form.value);
    this.componentService.createObject(model).subscribe(this.createHandler());
  }

  public update() {
    if (this.isInValid()) {
      return;
    }

    this.showLoader();
    const model = Object.assign({}, this.selectedItem, this.form.value);
    this.componentService.updateObject(model).subscribe(this.updateHandler());
  }

  public isInValid(): boolean {
    this.invalidForm = true;
    const invalid = this.form.invalid;

    if (invalid && this.formsCon) {
      const elm: HTMLDivElement = this.formsCon.nativeElement;

      const target: HTMLElement = elm.querySelector('.ng-invalid');
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        });

        if (target.focus && typeof target.focus === 'function') {
          target.focus();
        }
      }
    }

    return invalid;
  }

  public showLoader(timeOut = 7500): void {
    this.utilityService.loginloader.isLoading = true;
  }

  public createHandler = (cb?: (args?) => void) => {
    return {
      next: (result) => {
        this.showCreateMessage();
        this.getFirstPage();
        this.utilityService.progressButtonService.enable();
        if (cb) {
          cb(result);
        }
      },
      error: (err) => {
        this.utilityService.progressButtonService.enable();
      },
      complete: () => {
        // this.enableProgressButtons();
        this.hideloader();
        this.hideDialog();
      },
    };
  };

  public showCreateMessage() {
    this.utilityService.alertService.success(
      this.t('alert.title.success'),
      this.t('alert.message.succesfully-created')
    );
  }

  public getFirstPage() {
    // console.log('getFirstPage');
    this.pageNumber = 0;
    return this.getPageData();
  }

  public hideloader(timeOut: number = 500): Promise<any> {
    return new Promise((res) => {
      setTimeout(() => {
        this.utilityService.loginloader.isLoading = false;
        res(null);
      }, timeOut);
    });
  }

  public hideDialog() {
    this.isDialogVisible = false;
  }

  public getPageData() {
    for (const key of Object.keys(this.searchObject)) {
      if (this.searchObject[key] === '') {
        this.searchObject[key] = null;
      }
    }

    return new Promise((resolve) => {
      if (this.componentService) {
        this.componentService
          .findPageableObjects(
            this.pageNumber,
            this.pageSize,
            `${this.sortField || 'id'},${this.sortOrder || 'DESC'}`,
            this.searchObject
          )
          .subscribe((res) => {
            this.total = res.totalElements;
            this.data = res.content;
            // if (this.hideLoaderAfterInit) {
            this.hideloader();
            // }
            resolve(null);
          });
      }
    });
  }

  public updateHandler = (cb?: (args?) => void) => {
    return {
      next: (result) => {
        this.showUpdateMessage();

        this.getFirstPage();

        if (cb) {
          cb(result);
        }
      },
      error: (err) => { },
      complete: () => {
        // this.enableProgressButtons();
        this.hideloader();
        this.hideDialog();
      },
    };
  };

  public showUpdateMessage() {
    this.utilityService.alertService.success(
      this.t('alert.title.success'),
      this.t('alert.message.succesfully-updated')
    );
  }

  public loadLazy(e: any): void {
    if (!this.initStarted) {
      return;
    }
    console.log(e);
    this.pageNumber = e.first / e.rows;
    this.sortField = e.sortField || this.sortFieldDef || 'id';
    this.sortOrder = e.sortOrder === 1 ? 'ASC' : 'DESC';
    this.pageSize = e.rows;
    if (this.componentService && this.componentService.apiUrl) {
      this.getPageData();
    }
  }

  public search(): void {
    this.pageNumber = 0;
    this.searchObject = this.searchForm.value;
    this.getPageData();
  }

  public reset(): void {
    this.searchForm.reset();
    this.searchObject = {};
    this.getPageData();
  }

  public showCreateDialog(isAsyncCall: boolean = false) {
    this.startDialogAction('create', null, isAsyncCall);
  }

  public startDialogAction(
    type: 'create' | 'update' = 'create',
    data?: any,
    isAsyncCall: boolean = false
  ): void {
    this.invalidForm = false;
    if (this.form) {
      this.form.reset();
    }
    this.dialogType = true;

    if (type === 'create') {
      this.dialogTitle = this.t('create');
      this.selectedItem = null;
    } else {
      this.selectedItem = data;
      this.dialogTitle = this.t('update');
      this.dialogType = false;
      this.initUpdateDialog(data);
    }

    if (!isAsyncCall) {
      this.after(() => (this.isDialogVisible = true));
    }
  }

  public after(cb: any, timeout: number = 1): void {
    setTimeout(() => {
      if (cb instanceof Function) {
        cb();
      }
    }, timeout);
  }

  public initUpdateDialog(data: any, e?: any): void {
    this.form.reset({ ...data });
  }

  public showUpdateDialog(data: any, isAsyncCall: boolean = false): void {
    this.startDialogAction('update', data, isAsyncCall);
  }

  public deleteDialog(
    item?: any,
    callback?: () => void,
    config?: { message: string; alert?: { title: string; message: string } }
  ) {
    config = config || { message: 'message.main-message' };
    config.alert = config.alert || {
      title: 'alert.title.success',
      message: 'confirmation.success-message.message.deleted',
    };

    item = item || this.selectedItem;
    this.utilityService.confirmationService.confirm({
      header: this.t('message.caution'),
      message: this.t(config.message),
      acceptLabel: 'form.btn.yes',
      accept: () => {
        this.componentService.deleteObject(item).subscribe((res) => {
          this.utilityService.alertService.success(
            this.t(config.alert.title),
            this.t(config.alert.message)
          );
          this.getPageData();
          if (callback) {
            callback();
          }
        });
      },
    });
  }

  public get phoneNumberFormat(): string {
    return this.t('phoneNumberFormat');
  }

  public get decimalFormat(): string {
    return this.t('decimal-format');
  }

  public get integerFormat(): string {
    return this.t('integer-format');
  }

  public confirm({
    title = 'warning',
    message = 'confirmOperation',
    passConfirm = false,
  } = {}): Promise<any> {
    return new Promise((res) => {
      if (passConfirm) {
        res(null);
      } else {
        this.utilityService.confirmationService.confirm({
          header: this.t(title),
          message: this.t(message),
          accept: () => res(null),
          acceptLabel: 'form.btn.yes',
        });
      }
    });
  }

  public initStepItems(items: string[] = []): void {
    const result = [];
    if (items.length > 0) {
      for (let i = 0, l = items.length; i < l; i++) {
        result.push({
          label: this.t(items[i]),
          command: () => (this.activeIndex = i),
        });
      }

      this.stepItems = result;
    }
  }

  public getCountryList() {
    this.utilityService.comboService.getCountryList().subscribe(res => this.countryList = [{ label: this.t('select'), value: null }, ...res]);
  }

  public getCityList(countryId:any){
    this.utilityService.comboService.getCityList(countryId).subscribe(res => this.cityList = [{ label: this.t('select'), value: null }, ...res]);
  }

  public getTownList(cityId:any){
    this.utilityService.comboService.getTownList(cityId).subscribe(res => this.townList = [{ label: this.t('select'), value: null }, ...res]);
  }
}
