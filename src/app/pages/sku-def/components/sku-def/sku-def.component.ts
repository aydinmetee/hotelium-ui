import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/base-component';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { SkuDefService } from '../../services/sku-def.service';

@Component({
  selector: 'app-sku-def',
  templateUrl: './sku-def.component.html',
  styleUrls: ['./sku-def.component.scss'],
})
export class SkuDefComponent extends BaseComponent implements OnInit {
  constructor(
    private skuDefService: SkuDefService,
    utilityService: UtilityService
  ) {
    super(skuDefService, utilityService);
    this.searchForm = this.builder.group({
      name: [null],
      code: [null],
      unitPrice: [null],
      stock: [null],
    });

    this.form = this.builder.group({
      name: [null, Validators.required],
      code: [null, Validators.required],
      unitPrice: [1, Validators.required],
      stock: [0, Validators.required]
    });

  }

  ngOnInit(): void {
    this.hideloader();
    this.columns = [
      { field: 'id', header: this.t('id'), default: true },
      { field: 'name', header: this.t('name'), default: true },
      { field: 'code', header: this.t('code'), default: true },
      { field: 'unitPrice', header: this.t('unitPrice'),isNumber:true,numberFormat:this.decimalFormat, default: true },
      { field: 'stock', header: this.t('stock'),isNumber:true,numberFormat:this.integerFormat, default: true },
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
