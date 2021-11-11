import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
import {NbThemeService} from '@nebular/theme';

@Component({
  selector: 'ngx-regionchart',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
  providers: [DecedesService],
})
export class RegionchartComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  List = [];

  constructor(private theme: NbThemeService, private serviceD: DecedesService) {
  }
  TA: number; A: number; M: number; T: number; F: number; L: number; C: number; O: number;
  ngAfterViewInit() {
    this.serviceD.getAll().subscribe( data1 => {
      data1.forEach (  obj => { this.List.push(obj.provinceD);
      });
      this.TA = 0; this.A = 0; this.M = 0; this.T = 0; this.F = 0; this.L = 0; this.C = 0; this.O = 0;
      for (let j = 0; j < this.List.length; j++) {
        switch (this.List[j]) {
          case 'Tanger-Assilah':
            this.TA = this.TA + 1;
            break;
          case 'M\'diq-Fnideq':
            this.M = this.M + 1;
            break;
          case 'Tétouan':
            this.T = this.T + 1;
            break;
          case 'Fahs-Anjra':
            this.F = this.F + 1;
            break;
          case 'Larache':
            this.L = this.L + 1;
            break;
          case 'Al Hoceïma':
            this.A = this.A + 1;
            break;
          case 'Chefchaouen':
            this.C = this.C + 1;
            break;
          case 'Ouezzane':
            this.O = this.O + 1;
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
              data: ['Tanger-Assilah', 'M\'diq-Fnideq', 'Tétouan', 'Fahs-Anjra', 'Larache', 'Al Hoceïma', 'Chefchaouen', 'Ouezzane'],
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
              barWidth: '60%',
              data: [this.TA, this.M, this.T, this.F, this.L, this.A, this.C, this.O],
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
