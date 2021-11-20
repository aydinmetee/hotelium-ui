import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/shared/base-component';
import { LabelValue } from 'src/app/shared/models/label-value';
import { TranslateKey } from 'src/app/shared/models/translate-key.enum';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { ReservationMaster } from '../../models/reservation-master';
import {
  ReservationDetailService,
  ReservationMasterService,
} from '../../services/reservation-master.service';

@Component({
  selector: 'app-reservation-detail',
  templateUrl: './reservation-detail.component.html',
  styleUrls: ['./reservation-detail.component.scss'],
})
export class ReservationDetailComponent
  extends BaseComponent
  implements OnInit
{
  reservationMaster: ReservationMaster = new ReservationMaster();
  customerList: LabelValue<string, number>[] = [];
  bookingForm: FormGroup;
  bookingDialog: boolean = false;
  public sourceList: LabelValue<string, string>[] = [];

  constructor(
    private reservationDetailService: ReservationDetailService,
    private reservationMasterService: ReservationMasterService,
    private activatedRoute: ActivatedRoute,
    utilityService: UtilityService
  ) {
    super(reservationDetailService, utilityService);
    this.reservationDetailService.reservationMasterId = '';

    this.searchForm = this.builder.group({
      roomCode: [null],
      description: [null],
      checkInDate: [null],
      checkOutDate: [null],
      status: [null],
    });

    this.form = this.builder.group({
      customerId: [null, Validators.required],
      reservationMasterId: [null, Validators.required],
    });

    this.bookingForm = this.builder.group({
      amount: [null, Validators.required],
      masterId: [null, Validators.required],
      source: [null, Validators.required],
    });

    this.sourceList = [
      { label: this.t('select'), value: null },
      { label: this.t('debit'), value: 'DEBIT' },
      { label: this.t('cash'), value: 'CASH' },
      { label: this.t('bank'), value: 'BANK' },
    ];

    this.utilityService.comboService.getCustomersList().subscribe((data) => {
      this.customerList = [{ label: this.t('select'), value: null }, ...data];
    });
  }

  ngOnInit(): void {
    this.initDetail();
    this.hideloader();
    this.columns = [
      { field: 'id', header: this.t('id'), default: true },
      {
        field: 'customerFullName',
        header: this.t('customerFullName'),
        default: true,
      },
      { field: 'bookAmount', header: this.t('bookAmount'), default: true },
    ];

    this.init();
  }

  create() {
    this.form
      .get('reservationMasterId')
      .setValue(this.reservationDetailService.reservationMasterId);
    console.log(this.form.value);
    if (this.isInValid()) {
      return;
    }
    this.showLoader();
    const model = Object.assign({}, this.form.value);
    this.reservationDetailService
      .createObject(model)
      .subscribe(this.createHandler());
  }

  public initDetail() {
    this.activatedRoute.params.subscribe(({ masterId }) => {
      this.reservationDetailService.reservationMasterId = masterId;
      this.reservationMasterService
        .findObject(masterId)
        .subscribe((result: ReservationMaster) => {
          this.reservationMaster = result;
          this.searchForm.patchValue({
            roomCode: result.roomCode,
            description: result.description,
            checkInDate: result.checkInDate,
            checkOutDate: result.checkOutDate,
            status: result.status,
          });
        });
    });
  }

  initBookingDialog() {
    this.bookingDialog = true;
  }

  public markAsBooking() {
    console.log(this.bookingForm.value);
    this.bookingForm.get('masterId').setValue(this.reservationMaster.id);

    if (this.bookingForm.invalid) {
      return;
    }
    const model = Object.assign({}, this.bookingForm.value);
    console.log(model);
    this.reservationDetailService.markAsBooking(model).subscribe(() => {
      this.showUpdateMessage();
      this.initDetail();
      this.getPageData();
      this.bookingDialog = false;
    });
  }

  public markAsCompleted() {
    this.reservationDetailService.markAsCompleted().subscribe(() => {
      this.showUpdateMessage();
      this.initDetail();
      this.getPageData();
    });
  }
}
