import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskModule } from 'src/app/shared/ngx-mask';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SkuDefComponent } from './components/sku-def/sku-def.component';
import { SkuDefService } from './services/sku-def.service';

const routes: Routes = [
  { path: '', redirectTo: 'sku-def', pathMatch: 'full' },
  {
    path: 'sku-def',
    component: SkuDefComponent,
  },
];

@NgModule({
  declarations: [SkuDefComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrimengModule,
    NgxMaskModule.forRoot(),
    TranslateModule,
    SharedModule,
  ],
  providers: [SkuDefService],
})
export class SkuDefModule {}
