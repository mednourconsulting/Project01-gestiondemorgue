import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConstationComponent} from '../documents-admin/constation/constation.component';
import {AttestationComponent} from '../documents-admin/attestation/attestation.component';
import {CertificatComponent} from './certificat.component';
import {TransfertCorpsComponent} from './transfert-corps/transfert-corps.component';
import {ApercuDuCorpComponent} from './apercu-du-corp/apercu-du-corp.component';
import {EnterrementComponent} from './enterrement/enterrement.component';


const routes: Routes = [{
  path: '',
  component: CertificatComponent,
  children: [
    {
      path: 'transfertCorps',
      component: TransfertCorpsComponent,
    },
    {
      path: 'ApercuDuCorp',
      component: ApercuDuCorpComponent,
    },
    {
      path: 'enterrement',
      component: EnterrementComponent,
    },
  ],
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CertificatRoutingModule { }
