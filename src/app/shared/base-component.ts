import { ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TableColumns } from './models/table-columns';
import { SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { RestService } from './services/rest.service';
import { UtilityService } from './services/utility.service';

export class BaseComponent implements OnDestroy {
  public form: FormGroup;
  public searchForm: FormGroup;
  public dateFormat = 'dd/MM/yyyy HH:mm';
  public onlyDateFormat = 'dd/MM/yyyy';

  public selectedColumns: any;
  public columns: TableColumns<any> = [];
  public id = '';
  public invalidForm = false;

  public dialogType = true; // true => create , false = update
  public dialogTitle = '';
  public isDialogVisible = false;

  public data;
  public total = 0;
  public sortKey = 'creDate,DESC';
  public pageNumber = 0;
  public sortField: string;
  public sortFieldDef: string;
  public sortOrder: string;
  public pageSize = 10;
  public selectedItem = null;

  public statusList: SelectItem[] = [];

  public searchObject: any = {};
  protected formsCon: ElementRef;

  @ViewChild('pTable', { static: true }) public dt: Table;
  protected hideLoaderAfterInit = true;
  public rowsPerPage = [10, 25, 50, 100, 500];
  public builder: FormBuilder;

  constructor(
    protected componentService: RestService,
    protected utilityService: UtilityService
  ) {
    this.builder = utilityService.builder;
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
  }

  ngOnDestroy() {}

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
        res();
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
            `${this.sortField || 'creDate'},${this.sortOrder || 'DESC'}`,
            this.searchObject
          )
          .subscribe((res) => {
            this.total = res.totalElements;
            this.data = res.content;
            // if (this.hideLoaderAfterInit) {
            this.hideloader();
            // }
            resolve();
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
      error: (err) => {},
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
}
