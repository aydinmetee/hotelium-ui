import { RouterModule, Routes } from '@angular/router';

const loginRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
export const LoginRoutingModule = RouterModule.forChild(loginRoutes);
