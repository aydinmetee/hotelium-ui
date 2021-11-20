import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from 'src/app/shared/base-component';
import { LabelValue } from 'src/app/shared/models/label-value';
import { TranslateKey } from 'src/app/shared/models/translate-key.enum';
import { UtilityService } from 'src/app/shared/services/utility.service';
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
  roomsList: LabelValue<string, number>[] = [];
  statusList: LabelValue<string, string>[] = [];
  constructor(
    private reservationMasterService: ReservationMasterService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    utilityService: UtilityService
  ) {
    super(reservationMasterService, utilityService);
    this.searchForm = this.builder.group({
      description: [null],
      roomId: [null],
      status: [null],
    });

    this.form = this.builder.group({
      roomId: [null, Validators.required],
      description: [null, Validators.required],
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
  }

  ngOnInit(): void {
    this.hideloader();
    this.columns = [
      { field: 'id', header: this.t('id'), default: true },
      { field: 'roomCode', header: this.t('roomCode'), default: true },
      { field: 'description', header: this.t('description'), default: true },
      {
        field: 'status',
        header: this.t('status'),
        default: true,
        translateKey: TranslateKey.reservationStatus,
      },
    ];

    this.init();
  }

  navToDetail(id?: string): void {
    if (id) {
      this.router.navigate([id, 'detail'], { relativeTo: this.activatedRoute });
    }
  }
}
