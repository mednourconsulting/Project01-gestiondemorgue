/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import { NgModule } from '@angular/core';
import {NgxSelectModule} from 'ngx-select-ex';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import {
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule,
  NbDialogModule, NbInputModule,
  NbMenuModule,
  NbSelectModule,
} from '@nebular/theme';
import { AuthModule } from '../@auth/auth.module';
import {ReactiveFormsModule} from '@angular/forms';
import { ShowDialogComponent } from './show-dialog/show-dialog.component';
import {ComponentsModule} from '../@components/components.module';
import {DialogEmitterService} from './users-list/services/dialog-emitter.service';


const PAGES_COMPONENTS = [
  PagesComponent,
  ShowDialogComponent,
];
const ENTRY_COMPONENTS = [
  ShowDialogComponent,

];
@NgModule({
  imports: [
    NgxSelectModule,
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    AuthModule.forRoot(),
    ReactiveFormsModule,
    NbDialogModule.forChild(),
    NbCardModule,
    NbButtonModule,
    NbAutocompleteModule,
    NbSelectModule,
    NbInputModule,
    ComponentsModule,
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS ,
  ],
  exports: [ ShowDialogComponent ],
  providers: [
    ShowDialogComponent,
    DialogEmitterService,
  ],
})
export class PagesModule {
}
