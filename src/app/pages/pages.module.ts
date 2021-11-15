import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';
import { SharedModule } from '../shared/shared.module';
import { LoginModule } from './login/login.module';
import { PageComponent } from './page/page.component';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [PageComponent],
  imports: [
    RouterModule,
    LoginModule,
    PrimengModule,
    SharedModule,
    PagesRoutingModule,
  ],
  providers: [],
})
export class PagesModule {}
