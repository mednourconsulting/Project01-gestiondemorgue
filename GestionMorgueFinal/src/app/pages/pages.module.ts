/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { PagesMenu } from './pages-menu';
import { NbMenuModule } from '@nebular/theme';
import { AuthModule } from '../@auth/auth.module';
import { BulletinsDMComponent } from './bulletins-dm/bulletins-dm.component';
import { DecedesComponent } from './bulletins-dm/decedes/decedes.component';
import { DocumentsAdminComponent } from './documents-admin/documents-admin.component';
import {BulletinsDMModule} from './bulletins-dm/bulletins-dm.module';
import {DocumentsAdminModule} from './documents-admin/documents-admin.module';
import {CertificatModule} from './certificat/certificat.module';
import { Chart } from 'chart.js';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    BulletinsDMModule,
    DocumentsAdminModule,
    CertificatModule,
    NbMenuModule,
    MiscellaneousModule,
    AuthModule.forRoot(),
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  providers: [
    PagesMenu,
  ],
})
export class PagesModule {
}
