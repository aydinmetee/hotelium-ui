import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountTransactionComponent } from './components/account-transaction/account-transaction.component';
import { AccountTransactionService } from './services/account-transaction.service';

const routes: Routes = [
  { path: '', redirectTo: 'account-transactions', pathMatch: 'full' },
  {
    path: 'account-transactions',
    component: AccountTransactionComponent,
  },
];

@NgModule({
  declarations: [AccountTransactionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrimengModule,
    TranslateModule,
    SharedModule,
  ],
  providers: [AccountTransactionService],
})
export class AccountTransactionModule {}
