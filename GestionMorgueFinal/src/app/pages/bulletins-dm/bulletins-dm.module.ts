import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BulletinsDMRoutingModule } from './bulletins-dm-routing.module';
import { BulletinsComponent } from './bulletins/bulletins.component';
import { DecedesComponent } from './decedes/decedes.component';
import { MedcinsComponent } from './medcins/medcins.component';
import {BulletinsDMComponent} from './bulletins-dm.component';
import { CauseDecesComponent } from './cause-deces/cause-deces.component';
import {
  NbAutocompleteModule,
  NbButtonModule, NbCalendarModule,
  NbCardModule,
  NbCheckboxModule, NbDatepickerModule, NbDialogModule,
  NbInputModule,
  NbSelectModule,
  NbTabsetModule,
} from '@nebular/theme';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ComponentsModule} from '../../@components/components.module';
import {NgxSelectModule} from 'ngx-select-ex';


@NgModule({
  declarations: [BulletinsDMComponent,
    BulletinsComponent, DecedesComponent, MedcinsComponent, CauseDecesComponent,
  ],
  imports: [
    CommonModule,
    BulletinsDMRoutingModule,
    NbCardModule,
    NbSelectModule,
    FormsModule,
    NbTabsetModule,
    Ng2SmartTableModule,
    NbCheckboxModule,
    NbInputModule,
    NbButtonModule,
    ReactiveFormsModule,
    ComponentsModule,
    NbAutocompleteModule,
    NgxSelectModule,
    NbCalendarModule,
    NbDatepickerModule,
  ],
  exports: [
    DecedesComponent,
  ],
})
export class BulletinsDMModule { }
