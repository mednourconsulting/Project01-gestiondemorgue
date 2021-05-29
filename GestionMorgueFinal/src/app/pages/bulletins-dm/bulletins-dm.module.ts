import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BulletinsDMRoutingModule } from './bulletins-dm-routing.module';
import { BulletinsComponent } from './bulletins/bulletins.component';
import { DecedesComponent } from './decedes/decedes.component';
import { MedcinsComponent } from './medcins/medcins.component';
import {BulletinsDMComponent} from './bulletins-dm.component';
import { CauseDecesComponent } from './cause-deces/cause-deces.component';
import {
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbInputModule,
  NbSelectModule,
  NbTabsetModule
} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import {Ng2SmartTableModule} from 'ng2-smart-table';


@NgModule({
  declarations: [BulletinsDMComponent,
    BulletinsComponent, DecedesComponent, MedcinsComponent, CauseDecesComponent],
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
  ],
  exports: [
    DecedesComponent,
  ],
})
export class BulletinsDMModule { }
