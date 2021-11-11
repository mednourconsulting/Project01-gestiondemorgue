/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import {NgModule, OnInit} from '@angular/core';
import {ChartsModule} from 'angular-bootstrap-md';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,
  NbUserModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbSpinnerModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';
import { FormsModule } from '@angular/forms';

import { AuthModule } from '../../@auth/auth.module';
import {StatistiquesModule} from '../statistiques/statistiques.module';
import {BulletinsDMModule} from '../bulletins-dm/bulletins-dm.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';

@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    NbSpinnerModule,
    NgxEchartsModule,
    AuthModule,
    StatistiquesModule,
    BulletinsDMModule,
    Ng2SmartTableModule,
    ChartsModule,
  ],

})
export class DashboardModule {}
