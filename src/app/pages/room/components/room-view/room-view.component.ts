import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/base-component';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { getPeriodDates } from 'src/app/shared/utility';
import { RoomService } from '../../services/room.service';

@Component({
  selector: 'app-room-view',
  templateUrl: './room-view.component.html',
  styleUrls: ['./room-view.component.scss'],
})
export class RoomViewComponent extends BaseComponent implements OnInit {
  public dateList = [];
  public availableData = [
    {
      roomCode: '101',
      available: [
        'CLEAN',
        'RESERVED',
        'CLEAN',
        'CLEAN',
        'RESERVED',
        'CLEAN',
        'CLEAN',
      ],
    },
    {
      roomCode: '102',
      available: [
        'RESERVED',
        'CLEAN',
        'CLEAN',
        'RESERVED',
        'CLEAN',
        'CLEAN',
        'RESERVED',
      ],
    },
    {
      roomCode: '103',
      available: [
        'RESERVED',
        'RESERVED',
        'RESERVED',
        'RESERVED',
        'CLEAN',
        'CLEAN',
        'CLEAN',
      ],
    },
    {
      roomCode: '104',
      available: [
        'CLEAN',
        'CLEAN',
        'CLEAN',
        'RESERVED',
        'CLEAN',
        'RESERVED',
        'RESERVED',
      ],
    },
  ];
  constructor(
    private roomService: RoomService,
    utilityService: UtilityService
  ) {
    super(roomService, utilityService);
  }

  ngOnInit(): void {
    this.hideloader();
    this.init();
    this.columnCreator();
  }

  public columnCreator(period: 'WEEKLY' | 'MONTHLY' = 'WEEKLY'): void {
    this.dateList = [
      this.t('roomCode'),
      ...getPeriodDates(new Date(), period == 'WEEKLY' ? 7 : 30),
    ];
  }
}
