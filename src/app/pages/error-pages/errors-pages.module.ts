import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';
import { ErrorPageComponent } from './error-page/error-page.component';

const routes: Routes = [
  {
    path: 'error/400',
    component: ErrorPageComponent,
    data: { code: 400, message: 'error.error-400' },
  },
  {
    path: 'error/401',
    component: ErrorPageComponent,
    data: { code: 401, message: 'error.error-401' },
  },
  {
    path: 'error/403',
    component: ErrorPageComponent,
    data: { code: 403, message: 'error.error-403' },
  },
  {
    path: 'error/404',
    component: ErrorPageComponent,
    data: { code: 404, message: 'error.error-404' },
  },
  {
    path: 'error/500',
    component: ErrorPageComponent,
    data: { code: 'Server Error', message: 'error.error-500' },
  },
];
@NgModule({
  declarations: [ErrorPageComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    PrimengModule,
    TranslateModule,
  ],
  exports: [ErrorPageComponent],
})
export class ErrorPagesModule {}
