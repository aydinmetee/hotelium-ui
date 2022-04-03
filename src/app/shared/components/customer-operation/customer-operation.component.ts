import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { CustomerService } from 'src/app/pages/customer/services/customer.service';
import { BaseComponent } from '../../base-component';
import { UtilityService } from '../../services/utility.service';

@Component({
  selector: 'app-customer-operation',
  templateUrl: './customer-operation.component.html',
  styleUrls: ['./customer-operation.component.scss'],
})
export class CustomerOperationComponent
  extends BaseComponent
  implements OnInit
{
  @Output() public created: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private customerService: CustomerService,
    utilityService: UtilityService
  ) {
    super(customerService, utilityService);

    this.form = this.builder.group({
      lastname: [null, Validators.required],
      legalId: [null, [Validators.required, Validators.minLength(11)]],
      name: [null, Validators.required],
      phone: [null, [Validators.required, Validators.minLength(10)]],
      valid: [null],
    });
  }

  ngOnInit(): void {}

  public create() {
    if (this.isInValid()) {
      return;
    }
    this.showLoader();
    const model = Object.assign({}, this.form.value);
    this.customerService
      .createObject(model)
      .subscribe(this.createHandler((result) => this.created.emit(result)));
  }
}
