import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
import {NbThemeService} from '@nebular/theme';

@Component({
  providers: [DecedesService],
  selector: 'ngx-causechart',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class CausechartComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  List = [];

  constructor(private theme: NbThemeService, private serviceD: DecedesService) {
  }
  TA: number; A: number; M: number; T: number; F: number; L: number; C: number; O: number; ML: number;
  ngAfterViewInit() {
    this.serviceD.getAll().subscribe( data1 => {
      data1.forEach (  obj => { this.List.push(obj.causeMort);
      });
      this.TA = 0; this.A = 0; this.M = 0; this.T = 0; this.F = 0;
      this.L = 0; this.C = 0; this.ML = 0; this.ML = 0; this.O = 0;
      for (let j = 0; j < this.List.length; j++) {
        switch (this.List[j]) {
          case 'accident':
            this.TA = this.TA + 1;
            break;
          case 'homicide':
            this.M = this.M + 1;
            break;
          case 'suicide':
            this.T = this.T + 1;
            break;
          case 'noyade':
            this.F = this.F + 1;
            break;
          case 'brûlure':
            this.L = this.L + 1;
            break;
          case 'intoxication':
            this.A = this.A + 1;
            break;
          case 'traumatisme':
            this.C = this.C + 1;
            break;
          case 'Inconnu':
            this.O = this.O + 1;
            break;
          case 'Maladie':
            this.ML = this.ML + 1;
            break;
          default:
            break;
        }
      }

      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

        const colors: any = config.variables;
        const echarts: any = config.variables.echarts;

        this.options = {
          backgroundColor: echarts.bg,
          color: [colors.primaryLight],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              data: ['Accident', 'Homicide', 'Suicide', 'Noyade', 'Brûlure', 'Intoxication', 'Traumatisme', 'Inconnu', 'Maladie'],
              axisTick: {
                alignWithLabel: true,
              },
              axisLine: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
              axisLabel: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
              axisLine: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
              splitLine: {
                lineStyle: {
                  color: echarts.splitLineColor,
                },
              },
              axisLabel: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
          ],
          series: [
            {
              name: '',
              type: 'bar',
              barWidth: '40%',
              data: [this.TA, this.M, this.T, this.F, this.L, this.A, this.C, this.O, this.ML],
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
