import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsAdminRoutingModule } from './documents-admin-routing.module';
import { MedicolegalComponent } from './medicolegal/medicolegal.component';
import { ConstationComponent } from './constation/constation.component';
import { AttestationComponent } from './attestation/attestation.component';
import {DocumentsAdminComponent} from './documents-admin.component';
import {
    NbAutocompleteModule,
    NbButtonModule,
    NbCardModule,
    NbCheckboxModule,
    NbInputModule,
    NbSelectModule
} from '@nebular/theme';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {BulletinsDMModule} from '../bulletins-dm/bulletins-dm.module';
import {ComponentsModule} from "../../@components/components.module";


@NgModule({
  declarations: [DocumentsAdminComponent, MedicolegalComponent, ConstationComponent, AttestationComponent],
    imports: [
        CommonModule,
        DocumentsAdminRoutingModule,
        NbCardModule,
        NbSelectModule,
        FormsModule,
        Ng2SmartTableModule,
        BulletinsDMModule,
        NbCheckboxModule,
        NbInputModule,
        NbButtonModule,
        ReactiveFormsModule,
        ComponentsModule,
        NbAutocompleteModule,
    ],
})
export class DocumentsAdminModule { }
