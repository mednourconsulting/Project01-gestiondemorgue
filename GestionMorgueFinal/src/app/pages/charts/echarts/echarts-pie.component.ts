import {AfterViewInit, Component, Input, OnDestroy} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
@Component({
  selector: 'ngx-echarts-pie',
  providers: [DecedesService],
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class EchartsPieComponent implements AfterViewInit, OnDestroy {
  //  @Input('h') h: number;
  options: any = {};
  themeSubscription: any;
  List = [];
h: number;

  constructor(private serviceDecede: DecedesService, private theme: NbThemeService) {
  }

  sear() {
    for (let j = 0; j < this.List.length; j++) {
      console.log(this.List[j]);
      switch (this.List[j]) {
        case 'homme': {
          this.h++;
          break;
        }
      }
    }
    console.log(this.h);
  }

    ngAfterViewInit() {
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
            data: ['Homme', 'Femme', 'Indetermini'],
            textStyle: {
              color: echarts.textColor,
            },
          },
          series: [
            {
              name: 'Countries',
              type: 'pie',
              radius: '80%',
              center: ['50%', '50%'],
              data: [
                {value: this.List.length, name: 'Homme'},
                {value: 3, name: 'Femme'},
                {value: 2, name: 'Indetermini'},
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
    }

    ngOnDestroy()
  :
    void {
      this.themeSubscription.unsubscribe();
  }
  }
