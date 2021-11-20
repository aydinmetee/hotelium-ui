import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PrimengModule } from 'src/app/shared/primeng/primeng.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RoomComponent } from './components/room/room.component';
import { RoomService } from './services/room.service';

const routes: Routes = [
  { path: '', redirectTo: 'room', pathMatch: 'full' },
  {
    path: 'room',
    component: RoomComponent,
  },
];

@NgModule({
  declarations: [RoomComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PrimengModule,
    TranslateModule,
    SharedModule,
  ],
  providers: [RoomService],
})
export class RoomModule {}