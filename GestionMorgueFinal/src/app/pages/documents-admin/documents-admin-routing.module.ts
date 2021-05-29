import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BulletinsDMComponent} from '../bulletins-dm/bulletins-dm.component';
import {MedicolegalComponent} from './medicolegal/medicolegal.component';
import {ConstationComponent} from './constation/constation.component';
import {AttestationComponent} from './attestation/attestation.component';
import {DocumentsAdminComponent} from './documents-admin.component';


const routes: Routes = [{
  path: '',
  component: DocumentsAdminComponent,
  children: [
    {
      path: 'medicolegal',
      component: MedicolegalComponent,
    },
    {
      path: 'constation',
      component: ConstationComponent,
    },
    {
      path: 'attestation',
      component: AttestationComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentsAdminRoutingModule { }
