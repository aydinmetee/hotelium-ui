import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountTransactionService } from 'src/app/pages/account-transaction/services/account-transaction.service';
import { BaseComponent } from 'src/app/shared/base-component';
import { CustomerOperationComponent } from 'src/app/shared/components/customer-operation/customer-operation.component';
import { DashTableComponent } from 'src/app/shared/components/dash-table/dash-table.component';
import { LabelValue } from 'src/app/shared/models/label-value';
import { TableColumns } from 'src/app/shared/models/table-columns';
import { TranslateKey } from 'src/app/shared/models/translate-key.enum';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { ReservationMaster } from '../../models/reservation-master';
import {
  ReservationDetailService,
  ReservationMasterService,
} from '../../services/reservation-master.service';

@Component({
  selector: 'app-reservation-master',
  templateUrl: './reservation-master.component.html',
  styleUrls: ['./reservation-master.component.scss'],
})
export class ReservationMasterComponent
  extends BaseComponent
  implements OnInit
{
  @ViewChild('customerOperation', { static: false })
  customerOperation: CustomerOperationComponent;
  @ViewChild(DashTableComponent, { static: true })
  dashTable: DashTableComponent;

  detailColumns: TableColumns<any> = [];
  reservationMaster: ReservationMaster = new ReservationMaster();
  roomsList: LabelValue<string, string>[] = [];
  customerList: LabelValue<string, string>[] = [];
  statusList: LabelValue<string, string>[] = [];
  public sourceList: LabelValue<string, string>[] = [];
  detailForm: FormGroup;
  isSourceDialogVisible = false;

  constructor(
    private reservationMasterService: ReservationMasterService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accountTransactionService: AccountTransactionService,
    public reservationDetailService: ReservationDetailService,
    utilityService: UtilityService
  ) {
    super(reservationMasterService, utilityService);
    this.searchForm = this.builder.group({
      description: [null],
      roomId: [null],
      status: [null],
      bookAmount: [null],
    });

    this.form = this.builder.group({
      roomId: [null, Validators.required],
      description: [null],
      reservationDate: [new Date(), Validators.required],
      duration: [1, [Validators.required, Validators.min(1)]],
      dailyAmount: [1, [Validators.required, Validators.min(1)]],
    });
    this.utilityService.comboService.getCustomersList().subscribe((data) => {
      this.customerList = [{ label: this.t('select'), value: null }, ...data];
    });
    (this.detailForm = this.builder.group({
      customerId: [null, Validators.required],
      reservationMasterId: [null, [Validators.required]],
    })),
      this.utilityService.comboService.getRoomsList().subscribe((data) => {
        this.roomsList = [{ label: this.t('select'), value: null }, ...data];
      });
    this.statusList = [
      { label: this.t('select'), value: null },
      { label: this.t('new'), value: 'NEW' },
      { label: this.t('booking'), value: 'BOOKING' },
      { label: this.t('completed'), value: 'COMPLETED' },
    ];

    this.sourceList = [
      { label: this.t('select'), value: null },
      { label: this.t('debit'), value: 'DEBIT' },
      { label: this.t('cash'), value: 'CASH' },
      { label: this.t('bank'), value: 'BANK' },
    ];

    this.detailColumns = [
      {
        field: 'customerFullName',
        header: this.t('customerFullName'),
        default: true,
      },
      {
        field: 'customerLegalId',
        header: this.t('legalId'),
        default: true,
      },
    ];
  }

  ngOnInit(): void {
    this.transtaionInit(() => {
      this.initStepItems(['reservation.general', 'reservation.customers']);
    });
    this.hideloader();
    this.columns = [
      { field: 'id', header: this.t('id'), default: true },
      { field: 'roomCode', header: this.t('roomCode'), default: true },
      { field: 'description', header: this.t('description'), default: true },
      {
        field: 'reservationDate',
        header: this.t('reservationDate'),
        default: true,
        isDate: true,
        dateFormat: this.onlyDateFormat,
      },
      { field: 'duration', header: this.t('duration'), default: true },
      { field: 'dailyAmount', header: this.t('dailyAmount'), default: true },
      {
        field: 'checkInDate',
        header: this.t('checkInDate'),
        default: true,
        isDate: true,
        dateFormat: this.onlyDateFormat,
      },
      {
        field: 'checkOutDate',
        header: this.t('checkOutDate'),
        default: true,
        isDate: true,
        dateFormat: this.onlyDateFormat,
      },
      {
        field: 'isPayed',
        header: this.t('isPayed'),
        default: true,
        translateKey: TranslateKey.yes_no,
      },
      {
        field: 'status',
        header: this.t('status'),
        default: true,
        translateKey: TranslateKey.reservationStatus,
      },
      {
        field: 'creDate',
        header: this.t('creDate'),
        default: true,
        isDate: true,
        dateFormat: this.onlyDateFormat,
      },
    ];

    this.init();
  }

  navToDetail(id?: string): void {
    if (id) {
      this.router.navigate([id, 'detail'], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate([this.reservationMaster.id, 'detail'], {
        relativeTo: this.activatedRoute,
      });
    }
  }
  public create() {
    this.showLoader();
    const model = Object.assign({}, this.form.value);
    this.reservationMasterService.createObject(model).subscribe(
      (result) => {
        this.showCreateMessage();
        this.hideloader();
        this.activeIndex += 1;
        this.reservationMaster = result;
        this.reservationDetailService.reservationMasterId =
          this.reservationMaster.id;
      },
      (err) => {},
      () => {
        this.refreshFunction();
      }
    );
  }

  refreshFunction() {
    this.dashTable.refreshData({
      reservationMasterId: this.reservationMaster.id,
    });
  }

  async markAsCancelled(rowData: any) {
    await this.confirm({
      message: 'confirmation.cancel-message.reservation-cancel',
    });
    this.showLoader();
    this.reservationMasterService
      .markAsCancelled(rowData.id)
      .subscribe(this.updateHandler());
  }

  public createDetailWithSelectedCustomer() {
    this.showLoader();
    const model = Object.assign({}, this.detailForm.value);
    model.reservationMasterId = this.reservationMaster.id;
    this.reservationDetailService.createObject(model).subscribe((result) => {
      this.showCreateMessage();
      this.refreshFunction();
      this.hideloader();
    });
  }

  public createDetail(event: any) {
    this.showLoader();
    const model = {
      customerId: event.id,
      reservationMasterId: this.reservationMaster.id,
    };
    this.reservationDetailService.createObject(model).subscribe((result) => {
      this.hideloader();
      this.customerOperation.form.reset();
      this.refreshFunction();
    });
  }
}
