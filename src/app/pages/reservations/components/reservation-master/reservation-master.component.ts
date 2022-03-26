import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountTransactionService } from 'src/app/pages/account-transaction/services/account-transaction.service';
import { BaseComponent } from 'src/app/shared/base-component';
import { LabelValue } from 'src/app/shared/models/label-value';
import { TranslateKey } from 'src/app/shared/models/translate-key.enum';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { ReservationMaster } from '../../models/reservation-master';
import { ReservationMasterService } from '../../services/reservation-master.service';

@Component({
  selector: 'app-reservation-master',
  templateUrl: './reservation-master.component.html',
  styleUrls: ['./reservation-master.component.scss'],
})
export class ReservationMasterComponent
  extends BaseComponent
  implements OnInit
{
  roomsList: LabelValue<string, string>[] = [];
  statusList: LabelValue<string, string>[] = [];
  public sourceList: LabelValue<string, string>[] = [];
  updateSourceForm: FormGroup;
  isSourceDialogVisible = false;
  constructor(
    private reservationMasterService: ReservationMasterService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private accountTransactionService: AccountTransactionService,
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

    this.updateSourceForm = this.builder.group({
      id: [null],
      source: [null, [Validators.required]],
      amount: [null, [Validators.required, Validators.min(1)]],
    });

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
  }

  ngOnInit(): void {
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
        dateFormat: this.dateFormat,
      },
      {
        field: 'checkOutDate',
        header: this.t('checkOutDate'),
        default: true,
        isDate: true,
        dateFormat: this.dateFormat,
      },
      {
        field: 'source',
        header: this.t('source'),
        default: true,
        translateKey: TranslateKey.source,
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
        dateFormat: this.dateFormat,
      },
    ];

    this.init();
  }

  navToDetail(id?: string): void {
    if (id) {
      this.router.navigate([id, 'detail'], { relativeTo: this.activatedRoute });
    }
  }

  initSourceUpdateDialog(rowData: ReservationMaster) {
    this.isSourceDialogVisible = true;
    this.updateSourceForm.patchValue({
      amount: rowData.bookAmount,
      source: rowData.source,
      id: rowData.accountTransactionId,
    });
    this.updateSourceForm.disable();
    this.updateSourceForm.get('source').enable();
  }

  public updateTransactionSource() {
    this.updateSourceForm.enable();
    const model = Object.assign({}, this.updateSourceForm.value);

    this.accountTransactionService.updateSource(model).subscribe(() => {
      this.showUpdateMessage();
      this.getPageData();
      this.isSourceDialogVisible = false;
    });
  }

  public create() {
    if (this.isInValid()) {
      return;
    }
    this.showLoader();
    const model = Object.assign({}, this.form.value);
    this.reservationMasterService.createObject(model).subscribe(
      this.createHandler((result) => {
        this.navToDetail(result.id);
      })
    );
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
}
