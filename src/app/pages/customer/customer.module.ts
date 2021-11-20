import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerService } from './services/customer.service';

const routes: Routes = [
  { path: '', redirectTo: 'customer', pathMatch: 'full' },
  {
    path: 'customer',
    component: CustomerComponent,
  },
];

@NgModule({
  declarations: [CustomerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrimengModule,
    TranslateModule,
    SharedModule,
  ],
  providers: [CustomerService],
})
export class CustomerModule {}
