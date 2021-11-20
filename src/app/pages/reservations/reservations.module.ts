import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReservationDetailComponent } from './components/reservation-detail/reservation-detail.component';
import { ReservationMasterComponent } from './components/reservation-master/reservation-master.component';
import {
  ReservationDetailService,
  ReservationMasterService,
} from './services/reservation-master.service';

const routes: Routes = [
  { path: '', redirectTo: 'reservation', pathMatch: 'full' },
  {
    path: 'reservation',
    component: ReservationMasterComponent,
  },
  {
    path: 'reservation/:masterId/detail',
    component: ReservationDetailComponent,
  },
];

@NgModule({
  declarations: [ReservationMasterComponent, ReservationDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrimengModule,
    TranslateModule,
    SharedModule,
  ],
  providers: [ReservationMasterService, ReservationDetailService],
})
export class ReservationsModule {}
