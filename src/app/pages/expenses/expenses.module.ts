import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskModule } from 'src/app/shared/ngx-mask';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReservationMasterService } from '../reservations/services/reservation-master.service';
import { ExpensesDetailComponent } from './components/expenses-detail/expenses-detail.component';
import { ExpensesMasterComponent } from './components/expenses-master/expenses-master.component';
import { ExpensesDetailService, ExpensesMasterService } from './services/expenses-master.service';


const routes: Routes = [
  { path: '', redirectTo: 'expenses', pathMatch: 'full' },
  {
    path: 'expenses',
    component: ExpensesMasterComponent,
  },
  {
    path: 'expenses/:masterId/detail',
    component: ExpensesDetailComponent,
  },
];

@NgModule({
  declarations: [ExpensesMasterComponent, ExpensesDetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrimengModule,
    TranslateModule,
    NgxMaskModule.forRoot(),
    SharedModule,
  ],
  providers: [
    ExpensesMasterService,
    ExpensesDetailService,
    ReservationMasterService
  ],
})
export class ExpensesModule {}
