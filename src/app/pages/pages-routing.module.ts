import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page/page.component';

const pageRoutes: Routes = [
  {
    path: 'page',
    component: PageComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'rooms',
        loadChildren: () =>
          import('./room/room.module').then((m) => m.RoomModule),
      },
    ],
  },
];

export const PagesRoutingModule = RouterModule.forChild(pageRoutes);
