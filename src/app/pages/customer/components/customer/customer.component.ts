import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/base-component';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent extends BaseComponent implements OnInit {
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
      legalId: [null, Validators.required],
      name: [null, Validators.required],
      phone: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.hideloader();
    this.columns = [
      { field: 'id', header: this.t('id'), default: false },
      { field: 'companyName', header: this.t('companyName'), default: false },
      { field: 'name', header: this.t('name'), default: true },
      { field: 'lastname', header: this.t('lastname'), default: true },
      { field: 'legalId', header: this.t('legalId'), default: true },
      { field: 'phone', header: this.t('phone'), default: true },
    ];

    this.init();
  }
}
