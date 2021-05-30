import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatistiquesRoutingModule } from './statistiques-routing.module';
import { StatistiquesComponent } from '../statistiques/statistiques.component';
import { NouveauxNesComponent } from './nouveaux-nes/nouveaux-nes.component';
import { DecesEnfantsComponent } from './deces-enfants/deces-enfants.component';
import { NatureDecesComponent } from './nature-deces/nature-deces.component';
import { SexeDecesComponent } from './sexe-deces/sexe-deces.component';
import { RegionComponent } from './region/region.component';
import { SelonCauseComponent } from './selon-cause/selon-cause.component';
import {NbCardModule} from '@nebular/theme';
import {FormsModule} from '@angular/forms';
import {NgxEchartsCoreModule} from 'ngx-echarts/core';
import { MychartsComponent } from './nouveaux-nes/mycharts.component';
import { NaturechartComponent } from './nature-deces/naturechart.component';
import { CausechartComponent } from './selon-cause/causechart.component';
import { SexechartComponent } from './sexe-deces/sexechart.component';
import { EnchatschartComponent } from './deces-enfants/enchatschart.component';
import { RegionchartComponent } from './region/regionchart.component';
import {BadgeModule, ChartsModule, IconsModule} from 'angular-bootstrap-md';
import {ChartModule} from 'angular2-chartjs';



@NgModule({
    declarations: [StatistiquesComponent,
        NouveauxNesComponent,
        DecesEnfantsComponent,
        NatureDecesComponent,
        MychartsComponent,
      SexeDecesComponent, RegionComponent, SelonCauseComponent,
      MychartsComponent, NaturechartComponent, CausechartComponent,
      SexechartComponent, EnchatschartComponent, RegionchartComponent],
    imports: [
        CommonModule,
        StatistiquesRoutingModule,
        NbCardModule,
        FormsModule,
        ChartsModule,
        NgxEchartsCoreModule,
        BadgeModule,
        IconsModule,
        ChartModule,
    ],
    exports: [
        EnchatschartComponent,
        NaturechartComponent,
        MychartsComponent,
        RegionchartComponent,
        CausechartComponent,
        SexechartComponent,
        SexeDecesComponent,
        SelonCauseComponent,
        NatureDecesComponent,
        DecesEnfantsComponent,
    ],
})
export class StatistiquesModule { }
