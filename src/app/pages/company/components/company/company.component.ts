import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/base-component';
import { LabelValue } from 'src/app/shared/models/label-value';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
})
export class CompanyComponent extends BaseComponent implements OnInit {
  constructor(
    private companyService: CompanyService,
    utilityService: UtilityService
  ) {
    super(companyService, utilityService);
    this.searchForm = this.builder.group({
      address: [null],
      legalNo: [null],
      nameTitle: [null],
      taxOffice: [null],
    });

    this.form = this.builder.group({
      address: [null, Validators.required],
      legalNo: [null, [Validators.required, Validators.minLength(10)]],
      nameTitle: [null, Validators.required],
      taxOffice: [null, Validators.required],
      countryId:[null,Validators.required],
      cityId:[null,Validators.required],
      townId:[null,Validators.required]
    });

    this.getCountryList();

  }

  ngOnInit(): void {
    this.hideloader();
    this.columns = [
      { field: 'id', header: this.t('id'), default: true },
      { field: 'address', header: this.t('address'), default: true },
      { field: 'legalNo', header: this.t('legalNo'), default: true },
      { field: 'nameTitle', header: this.t('nameTitle'), default: true },
      { field: 'countryName', header: this.t('country'), default: true },
      { field: 'cityName', header: this.t('city'), default: true },
      { field: 'townName', header: this.t('town'), default: true },

      { field: 'taxOffice', header: this.t('taxOffice'), default: true },
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
}
