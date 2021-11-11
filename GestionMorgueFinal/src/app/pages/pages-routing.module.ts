
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
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
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
