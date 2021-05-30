import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {NbThemeService} from '@nebular/theme';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
import {BulletinsService} from '../../../@core/backend/common/services/Bulletins.service';

@Component({
  selector: 'ngx-selon-cause',
  templateUrl: './selon-cause.component.html',
  styleUrls: ['./selon-cause.component.scss'],
  providers: [DecedesService],
})
export class SelonCauseComponent {
  public TA: number; A: number; M: number; T: number; F: number; L: number; C: number; O: number; ML: number;
  public chartType: string = 'bar';
  public chartDatasets: Array<any> = [ { data: [0, 0, 0, 0, 0, 0, 0, 0, 0], label: '' }];
  public annee: number;
  currentDate = (new Date).getFullYear().toString();
  public chartLabels: Array<any> =
    ['Accident', 'Homicide', 'Suicide', 'Noyade',
      'Brûlure', 'Intoxication', 'Traumatisme', 'Inconnu', 'Maladie' , 'Autres'];
  private List: any [] = [];
  private others: any;
  private ListCurrentDate: any[] = [];

  constructor(private theme: NbThemeService, private serviceD: DecedesService) {
    this.serviceD.getAll().subscribe(data1 => {
      data1.forEach(obj => {
        if (obj.dateDeces.toString().includes(this.currentDate)) {
          this.ListCurrentDate.push({dt: obj.dateDeces, cause: obj.causeMort});
        }
      });
      this.condestions (this.ListCurrentDate);
      this.chartDatasets = [this.TA, this.M, this.T, this.F, this.L, this.A, this.C, this.O, this.ML , this.others];
    });
  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  get(annee: any) {
    this.ListCurrentDate = [];
    this.currentDate = annee;
    this.serviceD.getAll().subscribe(data1 => {
      data1.forEach(obj => {
        if (obj.dateDeces.toString().includes(annee)) {
          this.ListCurrentDate.push({dt: obj.dateDeces, cause: obj.causeMort});
        }
      });
      console.log(this.ListCurrentDate);
    this.condestions (this.ListCurrentDate);
      this.chartDatasets = [this.TA, this.M, this.T, this.F, this.L, this.A, this.C, this.O, this.ML , this.others];
    });
    }


  // we separate the cause nature and cause non natural list is a list of json with two atrubite date and cause
  chartColors: any;
  chartOptions: any;
  condestions (list: any[]) {
    console.log(list);
    this.TA = 0;
    this.A = 0;
    this.M = 0;
    this.T = 0;
    this.F = 0;
    this.L = 0;
    this.C = 0;
    this.ML = 0;
    this.ML = 0;
    this.O = 0;
    this.others = 0;
    list.forEach( data => {
      if ( data.cause === 'accident') {
        this.TA = this.TA + 1;
      } else {
        if ( data.cause === 'homicide') {
          this.M = this.M + 1;
        } else {
          if ( data.cause === 'suicide') {
            this.T = this.T + 1;
          } else {
            if ( data.cause === 'noyade') {
              this.F = this.F + 1;
            } else {
              if ( data.cause === 'brûlure') {
                this.L = this.L + 1;
              } else {
                if ( data.cause === 'intoxication') {
                  this.A = this.A + 1;
                } else {
                  if ( data.cause === 'traumatisme') {
                    this.C = this.C + 1;
                  } else {
                    if ( data.cause === 'Inconnu') {
                      this.O = this.O + 1;
                    } else {
                      if (data.cause === 'Maladie') {
                        this.ML = this.ML + 1;
                      } else {
                        this.others = this.others + 1;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });
    }
}
