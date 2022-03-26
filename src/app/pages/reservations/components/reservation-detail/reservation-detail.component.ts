import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/shared/base-component';
import { LabelValue } from 'src/app/shared/models/label-value';
import { ComboService } from 'src/app/shared/services/combo.service';
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
  customerList: LabelValue<string, string>[] = [];
  draweeList: LabelValue<string, string>[] = [];
  bookingForm: FormGroup;
  paymentForm: FormGroup;
  paymentDialog: boolean = false;
  bookingDialog: boolean = false;
  public sourceList: LabelValue<string, string>[] = [];

  constructor(
    private reservationDetailService: ReservationDetailService,
    private reservationMasterService: ReservationMasterService,
    private activatedRoute: ActivatedRoute,
    private comboService: ComboService,
    utilityService: UtilityService
  ) {
    super(reservationDetailService, utilityService);
    this.reservationDetailService.reservationMasterId = '';
    console.log(this.minDate);

    this.searchForm = this.builder.group({
      roomCode: [null],
      description: [null],
      checkInDate: [null],
      checkOutDate: [null],
      status: [null],
      reservationDate: [null],
      dailyAmount: [null],
      duration: [null],
    });

    this.form = this.builder.group({
      customerId: [null, Validators.required],
      reservationMasterId: [null, Validators.required],
    });

    this.bookingForm = this.builder.group({
      masterId: [null, Validators.required],
      checkInDate: [new Date(), Validators.required],
    });

    this.paymentForm = this.builder.group({
      masterId: [null, Validators.required],
      amount: [null, [Validators.required, Validators.min(1)]],
      source: [null, Validators.required],
      draweeId: [null, Validators.required],
      drawee: [null],
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
    this.calendarInit();
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
      { field: 'customerLegalId', header: this.t('legalId'), default: true },
      { field: 'customerPhone', header: this.t('phone'), default: true },
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
            checkInDate: result.checkInDate
              ? new Date(result.checkInDate)
              : null,
            checkOutDate: result.checkOutDate
              ? new Date(result.checkOutDate)
              : null,
            reservationDate: new Date(result.reservationDate),
            status: result.status,
            duration: result.duration,
            dailyAmount: result.dailyAmount,
          });
          this.searchForm.disable();
          this.comboService.getDrawees(result.id).subscribe((result) => {
            this.draweeList = result;
          });
        });
    });
  }

  initBookingDialog() {
    this.bookingDialog = true;
  }

  initPaymentDialog() {
    this.paymentDialog = true;
  }

  public markAsBooking() {
    this.bookingForm.get('masterId').setValue(this.reservationMaster.id);

    if (this.bookingForm.invalid) {
      return;
    }
    this.showLoader();
    const model = Object.assign({}, this.bookingForm.value);
    this.reservationDetailService.markAsBooking(model).subscribe(() => {
      this.updateActions();
    });
  }

  public markAsCompleted() {
    this.showLoader();
    this.reservationDetailService.markAsCompleted().subscribe(() => {
      this.updateActions();
    });
  }

  public updateActions() {
    this.showUpdateMessage();
    this.initDetail();
    this.getPageData();
    this.bookingDialog = false;
    this.paymentDialog = false;
    this.hideDialog();
  }

  public onHideEvent() {
    this.bookingForm.reset();
  }

  public getPayment() {
    this.paymentForm.get('masterId').setValue(this.reservationMaster.id);
    const drawee = this.draweeList.find(
      (x) => x.value === this.paymentForm.get('draweeId').value
    ).additionalData;
    this.paymentForm.get('drawee').setValue(drawee);
    console.log(drawee);

    if (this.paymentForm.invalid) {
      return;
    }
    this.showLoader();
    const model = Object.assign({}, this.paymentForm.value);
    this.reservationMasterService.getPayment(model).subscribe(() => {
      this.updateActions();
    });
  }
}
