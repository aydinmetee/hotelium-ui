import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/shared/base-component';
import { TranslateKey } from 'src/app/shared/models/translate-key.enum';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss'],
})
export class RoomComponent extends BaseComponent implements OnInit {
  constructor(
    private roomService: RoomService,
    utilityService: UtilityService
  ) {
    super(roomService, utilityService);
    console.log('room initiliaze');

    this.searchForm = this.builder.group({
      capacity: [null],
      code: [null],
      status: [null],
    });

    this.form = this.builder.group({
      code: [null, [Validators.required]],
      capacity: [null, [Validators.required]],
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
    this.sortFieldDef = 'code';
    this.sortOrder = 'ASC';
    this.init();
  }

  public markAsClean(rowData: any) {
    this.roomService
      .markAsClean(rowData.id)
      .subscribe(() => this.updateHandler);
  }
}
