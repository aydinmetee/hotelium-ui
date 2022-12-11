import { RouterModule, Routes } from '@angular/router';

const registerRoutes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' },
];
export const RegisterRoutingModule = RouterModule.forChild(registerRoutes);
