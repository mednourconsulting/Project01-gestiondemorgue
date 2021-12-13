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
import {NbButtonModule, NbCardModule, NbDialogModule, NbMenuModule} from '@nebular/theme';
import { AuthModule } from '../@auth/auth.module';
import {BulletinsDMModule} from './bulletins-dm/bulletins-dm.module';
import {DocumentsAdminModule} from './documents-admin/documents-admin.module';
import {CertificatModule} from './certificat/certificat.module';
import {ReactiveFormsModule} from '@angular/forms';
import { ShowDialogComponent } from './show-dialog/show-dialog.component';

const PAGES_COMPONENTS = [
  PagesComponent,
  ShowDialogComponent,
];
const ENTRY_COMPONENTS = [
  ShowDialogComponent,

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
    ReactiveFormsModule,
    NbDialogModule.forChild(),
    NbCardModule,
    NbButtonModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS ,
  ],
  exports: [ ShowDialogComponent ],
  providers: [
    PagesMenu,
    ShowDialogComponent,
  ],
})
export class PagesModule {
}
