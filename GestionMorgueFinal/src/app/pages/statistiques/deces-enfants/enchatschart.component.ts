import {AfterViewInit, Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
import {NbThemeService} from '@nebular/theme';

@Component({
  selector: 'ngx-enchatschart',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
  providers: [DecedesService],
})
export class EnchatschartComponent implements AfterViewInit, OnDestroy {

  List = [];
  List1 = [];
  List2 = [];
  h: number;
  f: number;
  i: number;
  options: any = {};
  themeSubscription: any;
  constructor(private theme: NbThemeService, private serviceDecede: DecedesService) {
  }
  getAgeParJour(DateNaiss , DateDeces ) {
    DateNaiss = new Date(DateNaiss);
    DateDeces = new Date(DateDeces);
    return ((DateDeces.getTime() - DateNaiss.getTime()) / 86400000).toFixed(0);
  }

  ngAfterViewInit(): void {
    this.serviceDecede.getAll().subscribe( data1 => {
      data1.forEach (  obj => { this.List.push(obj.sexe),
        this.List1.push(obj.dateNaissance), this.List2.push(obj.dateDeces);
      });
      this.h = 0;
      this.f = 0;
      this.i = 0;
      for (let j = 0; j < this.List.length; j++) {
        if ((this.getAgeParJour(this.List1[j], this.List2[j]) < '30') && (this.List[j] === 'Femme')) {this.f = this.f + 1 ; }
        if ((this.List[j] === 'Homme') && (this.getAgeParJour(this.List1[j], this.List2[j]) < '30')) {this.h = this.h + 1 ; }
        if ((this.List[j] === 'indéterminé') && (this.getAgeParJour(this.List1[j], this.List2[j]) < '30')) {this.i = this.i + 1 ; }
      }
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
        const colors = config.variables;
        const echarts: any = config.variables.echarts;

        this.options = {
          backgroundColor: echarts.bg,
          color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['Homme', 'Femme', 'Indéterminé'],
            textStyle: {
              color: echarts.textColor,
            },
          },
          series: [
            {
              name: '',
              type: 'pie',
              radius: '80%',
              center: ['50%', '50%'],
              data: [
                {value: this.h, name: 'Homme'},
                {value: this.f, name: 'Femme'},
                {value: this.i, name: 'Indéterminé'},
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: echarts.itemHoverShadowColor,
                },
              },
              label: {
                normal: {
                  textStyle: {
                    color: echarts.textColor,
                  },
                },
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: echarts.axisLineColor,
                  },
                },
              },
            },
          ],
        };
      });
    });
  }
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

}

