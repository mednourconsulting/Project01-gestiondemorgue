
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import {AdminGuard} from '../@auth/admin.guard';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: '',
      redirectTo: '/pages/dashboard',
      pathMatch: 'full',
    },
    {
      path: '',
      loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    },
    {
      path: 'bulletins-dm',
      loadChildren: () => import('./bulletins-dm/bulletins-dm.module')
        .then(m => m.BulletinsDMModule),
    },
    {
      path: 'certificats',
      loadChildren: () => import('./certificat/certificat.module')
        .then(m => m.CertificatModule),
    },
    {
      path: 'documents-admin',
      loadChildren: () => import('./documents-admin/documents-admin.module')
        .then(m => m.DocumentsAdminModule),
    },
    {
      path: 'statistiques',
      loadChildren: () => import('./statistiques/statistiques.module')
        .then(m => m.StatistiquesModule),
    },
    {
      path: 'rapport',
      loadChildren: () => import('./rapport/rapport.module')
        .then(m => m.RapportModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      canActivate: [AdminGuard],
      path: 'users',
      loadChildren: () => import('./users-list/users-list.module').then(m => m.UsersListModule),
    },
    {
      path: '**',
      redirectTo: '/pages/miscellaneous/404',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
