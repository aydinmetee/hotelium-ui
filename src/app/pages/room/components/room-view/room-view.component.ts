import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ReservationMasterService } from 'src/app/pages/reservations/services/reservation-master.service';
import { BaseComponent } from 'src/app/shared/base-component';
import { TranslateKey } from 'src/app/shared/models/translate-key.enum';
import { ComboService } from 'src/app/shared/services/combo.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { getPeriodDates, onlyDateModifier } from 'src/app/shared/utility';
import { RoomService } from '../../services/room.service';

export interface DateIndex {
  selectedDate: Date;
  index: number;
}
@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.scss'],
})
export class RoomViewComponent extends BaseComponent implements OnInit {
  public dateList = [];
  public dateIndexList = [];
  public availableData = [];
  constructor(
    private roomService: RoomService,
    private reservationMasterService: ReservationMasterService,
    utilityService: UtilityService,
    private comboService: ComboService
  ) {
    super(roomService, utilityService);

    this.searchForm = this.builder.group({
      capacity: [null],
      code: [null],
      status: [null],
    });

    this.form = this.builder.group({
      code: [null, [Validators.required]],
      capacity: [null, [Validators.required, Validators.min(1)]],
    });

    this.statusList = [
      { label: this.t('select'), value: null },
      { label: this.t('clean'), value: 'CLEAN' },
      { label: this.t('dirty'), value: 'DIRTY' },
      { label: this.t('filled'), value: 'FILLED' },
      { label: this.t('reserved'), value: 'RESERVED' },
    ];
  }

  ngOnInit(): void {
    this.hideloader();
    this.columns = [
      { field: 'id', header: this.t('id'), default: true },
      { field: 'code', header: this.t('code'), default: true },
      { field: 'capacity', header: this.t('capacity'), default: true },
      {
        field: 'status',
        header: this.t('status'),
        default: true,
        translateKey: TranslateKey.room,
      },
    ];
    this.initTableData();

    this.sortFieldDef = 'code';
    this.sortOrder = 'ASC';
    this.init();
  }

  public initTableData() {
    this.availableData = [];
    this.columnCreator();

    this.comboService.getRoomsList().subscribe((result) => {
      this.reservationMasterService
        .getWeeklyReservations()
        .subscribe((reservations) => {
          this.tableDataPrepare(result, reservations);
        });
    });
  }

  public columnCreator(period: 'WEEKLY' | 'MONTHLY' = 'WEEKLY'): void {
    const dates = getPeriodDates(new Date(), period == 'WEEKLY' ? 7 : 30);
    this.dateList = [this.t('roomCode'), ...dates];
    this.prepareDateIndex(dates);
  }

  public defaultTablePrepare(rooms: any[]) {
    rooms.forEach((room) => {
      const element = {
        roomCode: room.label,
        available: [
          'AVAILABLE',
          'AVAILABLE',
          'AVAILABLE',
          'AVAILABLE',
          'AVAILABLE',
          'AVAILABLE',
          'AVAILABLE',
        ],
      };
      this.availableData.push(element);
    });
  }
  public tableDataPrepare(rooms: any[], reservations: any[]) {
    this.defaultTablePrepare(rooms);
    reservations.forEach((res) => {
      const modifierIndex = this.availableData.findIndex(
        (x) => x.roomCode == res.roomCode
      );
      const reservationDateIndex = this.dateIndexList.find(
        (x) => x.selectedDate == onlyDateModifier(new Date(res.reservationDate))
      );
      console.log(this.availableData[modifierIndex].available);
      this.availableData[modifierIndex].available[reservationDateIndex.index] =
        'RESERVED';
    });
  }

  public prepareDateIndex(dateList: any[]) {
    for (let index = 0; index < dateList.length; index++) {
      const element: DateIndex = {
        selectedDate: dateList[index],
        index: index,
      };
      this.dateIndexList.push(element);
    }
  }

  public markAsClean(rowData: any) {
    this.showLoader();
    this.roomService.markAsClean(rowData.id).subscribe(this.updateHandler());
  }

  public create() {
    if (this.isInValid()) {
      return;
    }
    this.showLoader();
    const model = Object.assign({}, this.form.value);
    this.roomService.createObject(model).subscribe(
      this.createHandler(() => {
        this.initTableData();
      })
    );
  }
}
