import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FormRequiredComponent } from './components/form-required/form-required.component';
import { FormValidationSummaryComponent } from './components/form-validation-summary/form-validation-summary.component';
import { SisColValueComponent } from './components/sis-col-value/sis-col-value.component';
import { NgxMaskModule } from './ngx-mask';
import { CurrencyCodePipe } from './pipes/currency-code.pipe';
import { PrimengModule } from './primeng/primeng.module';
import { HeaderComponent } from './theme/header/header.component';
import { MenuRenderComponent } from './theme/menu/menu-render/menu-render.component';
import { MenuComponent } from './theme/menu/menu.component';

@NgModule({
  imports: [
    TranslateModule,
    CommonModule,
    FormsModule,
    PrimengModule,
    NgxMaskModule.forChild(),
  ],
  declarations: [
    HeaderComponent,
    MenuComponent,
    MenuRenderComponent,
    SisColValueComponent,
    CurrencyCodePipe,
    FormRequiredComponent,
    FormValidationSummaryComponent,
  ],
  exports: [
    HeaderComponent,
    MenuComponent,
    SisColValueComponent,
    CurrencyCodePipe,
    FormRequiredComponent,
    FormValidationSummaryComponent,
  ],
})
export class SharedModule {}

export { ProgressButtonService } from './services/progress-button.service';
