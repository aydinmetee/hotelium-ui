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
      {
        path: 'customers',
        loadChildren: () =>
          import('./customer/customer.module').then((m) => m.CustomerModule),
      },
      {
        path: 'companys',
        loadChildren: () =>
          import('./company/company.module').then((m) => m.CompanyModule),
      },
      {
        path: 'account-transactions',
        loadChildren: () =>
          import('./account-transaction/account-transaction.module').then(
            (m) => m.AccountTransactionModule
          ),
      },
      {
        path: 'reservations',
        loadChildren: () =>
          import('./reservations/reservations.module').then(
            (m) => m.ReservationsModule
          ),
      },
      {
        path: 'sku-def',
        loadChildren: () =>
          import('./sku-def/sku-def.module').then(
            (m) => m.SkuDefModule
          ),
      },
      {
        path: 'expenses',
        loadChildren: () =>
          import('./expenses/expenses.module').then(
            (m) => m.ExpensesModule
          ),
      },
    ],
  },
];

export const PagesRoutingModule = RouterModule.forChild(pageRoutes);
