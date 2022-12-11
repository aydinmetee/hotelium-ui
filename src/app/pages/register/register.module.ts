import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CaptchaModule } from 'primeng/captcha';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register/register.component';
import { RegisterService } from './services/register.service';

const registerRoutes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(registerRoutes),
    PrimengModule,
    RegisterRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    SharedModule,
    CaptchaModule,
  ],
  declarations: [RegisterComponent],
  exports: [RegisterComponent],
  providers:[RegisterService]
})
export class RegisterModule {}
