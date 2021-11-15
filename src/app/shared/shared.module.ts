import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SisColValueComponent } from './components/sis-col-value/sis-col-value.component';
import { PrimengModule } from './primeng/primeng.module';
import { HeaderComponent } from './theme/header/header.component';
import { MenuRenderComponent } from './theme/menu/menu-render/menu-render.component';
import { MenuComponent } from './theme/menu/menu.component';

@NgModule({
  imports: [TranslateModule, CommonModule, FormsModule, PrimengModule],
  declarations: [
    HeaderComponent,
    MenuComponent,
    MenuRenderComponent,
    SisColValueComponent,
  ],
  exports: [HeaderComponent, MenuComponent, SisColValueComponent],
})
export class SharedModule {}

export { ProgressButtonService } from './services/progress-button.service';
