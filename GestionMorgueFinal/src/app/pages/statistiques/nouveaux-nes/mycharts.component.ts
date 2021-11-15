import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
import {NbThemeService} from '@nebular/theme';

@Component({
  selector: 'ngx-mycharts',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
  providers: [DecedesService],
})
export class MychartsComponent  implements AfterViewInit, OnDestroy {
  List = [];
  List1 = [];
  mydate = new Date();
  m1: number; m3: number; m4: number; m5: number; m9: number; m10: number;
  m2: number; m6: number; m7: number; m8: number; m11: number; m12: number;
  options: any = {};
  themeSubscription: any;
  constructor(private serviceDecede: DecedesService, private theme: NbThemeService) {
  }
  ngAfterViewInit() {
    this.serviceDecede.getAll().subscribe( data1 => {
      data1.forEach (  obj => { this.List.push(obj.mortNe, obj.dateNaissance);
      });
      this.m2 = 0; this.m1 = 0; this.m3 = 0; this.m4 = 0; this.m5 = 0; this.m6 = 0;
      this.m7 = 0; this.m8 = 0; this.m9 = 0;
      this.m10 = 0; this.m11 = 0; this.m12 = 0;

      for (let j = 0; j < this.List.length; j = j + 1) {
        if (this.List[j] === true) {
          if (this.List[ j + 1 ].includes('2020-01')) {
            this.m1 = this.m1 + 1;
          }
          if (this.List[ j + 1 ].includes('2020-02')) {
            this.m2 = this.m2 + 1;
          }
          if (this.List[ j + 1 ].includes('2020-03')) {
            this.m3 = this.m3 + 1;
          }
          if (this.List[ j + 1 ].includes('2020-04')) {
            this.m4 = this.m4 + 1;
          }
          if (this.List[ j + 1 ].includes('2020-05')) {
            this.m5 = this.m5 + 1;
          }
          if (this.List[ j + 1 ].includes('2020-06')) {
            this.m6 = this.m6 + 1;
          }
          if (this.List[ j + 1 ].includes('2020-07')) {
            this.m7 = this.m7 + 1;
          }
          if (this.List[ j + 1 ].includes('2020-08')) {
            this.m8 = this.m8 + 1;
          }
          if (this.List[ j + 1 ].includes('2020-09')) {
            this.m9 = this.m9 + 1;
          } if (this.List[ j + 1 ].includes('2020-10')) {
            this.m10 = this.m10 + 1;
          }
          if (this.List[ j + 1 ].includes('2020-11')) {
            this.m11 = this.m11 + 1;
          } if (this.List[ j + 1 ].includes('2020-12')) {
            this.m12 = this.m12 + 1;
          }
        }
      }
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

        const colors: any = config.variables;
        const echarts: any = config.variables.echarts;

        this.options = {
          backgroundColor: echarts.bg,
          color: [colors.success, colors.info],
          tooltip: {
            trigger: 'none',
            axisPointer: {
              type: 'cross',
            },
          },
          legend: {
            data: ['2020'],
            textStyle: {
              color: echarts.textColor,
            },
          },
          grid: {
            top: 70,
            bottom: 50,
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true,
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: colors.info,
                },
              },
              axisLabel: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
              axisPointer: {
                label: {
                  formatter: params => {
                    return (
                      ' ' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                    );
                  },
                },
              },
              data: [
                '2020-1',
                '2020-2',
                '2020-3',
                '2020-4',
                '2020-5',
                '2020-6',
                '2020-7',
                '2020-8',
                '2020-9',
                '2020-10',
                '2020-11',
                '2020-12',
              ],
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
              name: this.mydate.getFullYear(),
              type: 'line',
              smooth: true,
              data: [this.m1, this.m2, this.m3, this.m4, this.m5, this.m6, this.m7,
                this.m8, this.m9, this.m10, this.m11, this.m12],
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
