import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificatRoutingModule } from './certificat-routing.module';
import { CertificatComponent } from './certificat.component';
import { TransfertCorpsComponent } from './transfert-corps/transfert-corps.component';
import { ApercuDuCorpComponent } from './apercu-du-corp/apercu-du-corp.component';
import { EnterrementComponent } from './enterrement/enterrement.component';
import {NbButtonModule, NbCardModule, NbCheckboxModule, NbInputModule, NbSelectModule} from '@nebular/theme';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ComponentsModule} from "../../@components/components.module";

@NgModule({
  declarations: [CertificatComponent,
    TransfertCorpsComponent, ApercuDuCorpComponent, EnterrementComponent],
  imports: [
    CommonModule,
    CertificatRoutingModule,
    NbCardModule,
    FormsModule,
    Ng2SmartTableModule,
    NbSelectModule,
    NbInputModule,
    NbCheckboxModule,
    NbButtonModule,
    ReactiveFormsModule,
    ComponentsModule,
  ],
})
export class CertificatModule { }
