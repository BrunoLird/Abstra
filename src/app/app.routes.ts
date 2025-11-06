import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./modules/auth/pages/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./modules/auth/pages/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./modules/dashboard/pages/dashboard/dashboard').then(m => m.DashboardComponent),
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
