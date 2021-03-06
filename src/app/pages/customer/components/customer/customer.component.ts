import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/base-component';
import { LabelValue } from 'src/app/shared/models/label-value';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent extends BaseComponent implements OnInit {
  isCompanyDialogVisible = false;
  companyList: LabelValue<string, string>[] = [];
  companyId: string;
  constructor(
    private customerService: CustomerService,
    utilityService: UtilityService
  ) {
    super(customerService, utilityService);
    this.searchForm = this.builder.group({
      companyName: [null],
      lastname: [null],
      legalId: [null],
      name: [null],
      phone: [null],
    });

    this.form = this.builder.group({
      lastname: [null, Validators.required],
      legalId: [null, [Validators.required, Validators.minLength(11)]],
      name: [null, Validators.required],
      phone: [null, [Validators.required, Validators.minLength(10)]],
      valid: [null],
    });

    this.utilityService.comboService.getCompanyList().subscribe((data) => {
      console.log(data);
      this.companyList = [
        {
          label: this.t('select'),
          value: null,
        },
        ...data,
      ];
    });
  }

  ngOnInit(): void {
    this.hideloader();
    this.columns = [
      { field: 'id', header: this.t('id'), default: false },
      { field: 'name', header: this.t('name'), default: true },
      { field: 'lastname', header: this.t('lastname'), default: true },
      { field: 'companyName', header: this.t('companyName'), default: true },
      { field: 'legalId', header: this.t('legalId'), default: true },
      { field: 'phone', header: this.t('phone'), default: true },
      {
        field: 'creDate',
        header: this.t('creDate'),
        default: true,
        isDate: true,
        dateFormat: this.dateFormat,
      },
      {
        field: 'updDate',
        header: this.t('updDate'),
        default: true,
        isDate: true,
        dateFormat: this.dateFormat,
      },
    ];

    this.init();
  }

  public assignCompanyDialog(rowData: any) {
    this.dialogTitle = this.t('assign-company');
    this.selectedItem = rowData;
    this.companyId = this.selectedItem.companyId;
    this.isCompanyDialogVisible = true;
    console.log(this.selectedItem);
  }

  public assignCompany() {
    this.customerService
      .assignCompany(this.selectedItem.id.toString(), this.companyId.toString())
      .subscribe(
        () => this.updateHandler,
        () => {},
        () => {
          this.isCompanyDialogVisible = false;
          this.getPageData();
        }
      );
  }
}
