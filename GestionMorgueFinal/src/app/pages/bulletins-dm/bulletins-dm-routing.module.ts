import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BulletinsDMComponent} from './bulletins-dm.component';
import {BulletinsComponent} from './bulletins/bulletins.component';
import {DecedesComponent} from './decedes/decedes.component';
import {MedcinsComponent} from './medcins/medcins.component';
import {CauseDecesComponent} from './cause-deces/cause-deces.component';



const routes: Routes = [{
  path: '',
  component: BulletinsDMComponent,
  children: [
    {
      path: 'Bulletins',
      component: BulletinsComponent,
    },
    {
      path: 'decedes',
      component: DecedesComponent,
    },
    {
      path: 'cause-deces',
      component: CauseDecesComponent,
    },
    {
      path: 'medcins',
      component: MedcinsComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]})
export class BulletinsDMRoutingModule { }
