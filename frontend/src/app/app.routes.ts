import { Routes } from '@angular/router';
import { adminGuard, authGuard, guestGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', canActivate: [guestGuard], loadComponent: () => import('./components/login/login.component').then((m) => m.LoginComponent) },
  { path: 'dashboard', canActivate: [authGuard], loadComponent: () => import('./components/logged-in/logged-in.component').then((m) => m.LoggedInComponent) },
  { path: 'admin/users', canActivate: [authGuard, adminGuard], loadComponent: () => import('./components/admin-users/admin-users.component').then((m) => m.AdminUsersComponent) },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: '**', redirectTo: 'dashboard' },
];
