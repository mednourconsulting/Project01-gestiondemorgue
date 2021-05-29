import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {StatistiquesComponent} from './statistiques.component';
import {NouveauxNesComponent} from './nouveaux-nes/nouveaux-nes.component';
import {DecesEnfantsComponent} from './deces-enfants/deces-enfants.component';
import {NatureDecesComponent} from './nature-deces/nature-deces.component';
import {SexeDecesComponent} from './sexe-deces/sexe-deces.component';
import {RegionComponent} from './region/region.component';
import {SelonCauseComponent} from './selon-cause/selon-cause.component';


const routes: Routes = [{
  path: '',
  component: StatistiquesComponent,
  children: [
    {
      path: 'NouveauxNes',
      component: NouveauxNesComponent,
    },
    {
      path: 'DecesEnfants',
      component: DecesEnfantsComponent,
    },
    {
      path: 'NatureDeces',
      component: NatureDecesComponent,
    },
    {
      path: 'seloncausesDeces',
      component: SelonCauseComponent,
    },
    {
      path: 'sexeDeces',
      component: SexeDecesComponent,
    },
    {
      path: 'region',
      component: RegionComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatistiquesRoutingModule { }
