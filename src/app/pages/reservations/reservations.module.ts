import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskModule } from 'src/app/shared/ngx-mask';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountTransactionService } from '../account-transaction/services/account-transaction.service';
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
    NgxMaskModule.forRoot(),
    SharedModule,
  ],
  providers: [
    ReservationMasterService,
    ReservationDetailService,
    AccountTransactionService,
  ],
})
export class ReservationsModule {}
