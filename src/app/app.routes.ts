import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'new',
    loadComponent: () => import('./pages/new/new.page').then( m => m.NewPage)
  },
  {
    path: 'edit/:productId',
    loadComponent: () => import('./pages/edit/edit.page').then( m => m.EditPage)
  },
];
