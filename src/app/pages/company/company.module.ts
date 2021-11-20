import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CompanyComponent } from './components/customer/company.component';
import { CompanyService } from './services/company.service';

const routes: Routes = [
  { path: '', redirectTo: 'company', pathMatch: 'full' },
  {
    path: 'company',
    component: CompanyComponent,
  },
];

@NgModule({
  declarations: [CompanyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrimengModule,
    TranslateModule,
    SharedModule,
  ],
  providers: [CompanyService],
})
export class CompanyModule {}
