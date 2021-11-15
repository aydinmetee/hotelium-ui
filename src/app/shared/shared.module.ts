import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PrimengModule } from './primeng/primeng.module';

@NgModule({
  imports: [TranslateModule, CommonModule, FormsModule, PrimengModule],
  declarations: [],
  exports: [],
})
export class SharedModule {}

export { ProgressButtonService } from './services/progress-button.service';
