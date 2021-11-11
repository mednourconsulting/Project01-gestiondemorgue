import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';

@Component({
  selector: 'ngx-nouveaux-nes',
  templateUrl: './nouveaux-nes.component.html',
  styleUrls: ['./nouveaux-nes.component.scss'],
  providers: [DecedesService],
})
export class NouveauxNesComponent implements AfterViewInit, OnDestroy {
  constructor(private theme: NbThemeService, private serviceD: DecedesService) {
  }
  public chartType: string = 'line';

  public chartDatasets: Array<any> = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Mort naturelle' },
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Mort non naturelle' },
  ];

  public chartLabels: Array<any> = ['January', 'February',
    'March', 'April', 'May', 'June', 'July', '8', '9', '10', '11', '12'];

  public chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    },
  ];

  public chartOptions: any = {
    responsive: true,
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  List = [];
  List1 = [];
  m1: number; m3: number; m4: number; m5: number; m9: number; m10: number;
  m2: number; m6: number; m7: number; m8: number; m11: number; m12: number;
  mm1: number; mm3: number; mm4: number; mm5: number; mm9: number; mm10: number;
  mm2: number; mm6: number; mm7: number; mm8: number; mm11: number; mm12: number;
  annee: number;
  MN: number; MNN: number;
  get() {
    this.serviceD.getAll().subscribe( data1 => {
      data1.forEach (  obj => { this.List.push(obj.natureMort), this.List1.push(obj.dateNaissance);
      });
      this.MNN = 0; this.MN = 0;
      for (let j = 0; j < this.List.length; j++) {
        if (this.List[j] === 'Mort naturelle') {
          this.m2 = 0;
          this.m1 = 0;
          this.m3 = 0;
          this.m4 = 0;
          this.m5 = 0;
          this.m6 = 0;
          this.m7 = 0;
          this.m8 = 0;
          this.m9 = 0;
          this.m10 = 0;
          this.m11 = 0;
          this.m12 = 0;

          for (let i = 0; i < this.List1.length; i++) {
            if (this.List1[i].includes('2020-01')) {
              this.m1 = this.m1 + 1;
            }
            if (this.List1[i].includes('2020-02')) {
              this.m2 = this.m2 + 1;
            }
            if (this.List1[i].includes('2020-03')) {
              this.m3 = this.m3 + 1;
            }
            if (this.List1[i].includes('2020-04')) {
              this.m4 = this.m4 + 1;
            }
            if (this.List1[i].includes('2020-05')) {
              this.m5 = this.m5 + 1;
            }
            if (this.List1[i].includes('2020-06')) {
              this.m6 = this.m6 + 1;
            }
            if (this.List1[i].includes('2020-07')) {
              this.m7 = this.m7 + 1;
            }
            if (this.List1[i].includes('2020-08')) {
              this.m8 = this.m8 + 1;
            }
            if (this.List1[i].includes('2020-09')) {
              this.m9 = this.m9 + 1;
            }
            if (this.List1[i].includes('2020-10')) {
              this.m10 = this.m10 + 1;
            }
            if (this.List1[i].includes('2020-11')) {
              this.m11 = this.m11 + 1;
            }
            if (this.List1[i].includes('2020-12')) {
              this.m12 = this.m12 + 1;
            }
          }
        }
        if (this.List[j] === 'Mort non naturelle') {
          this.mm2 = 0;
          this.mm1 = 0;
          this.mm3 = 0;
          this.mm4 = 0;
          this.mm5 = 0;
          this.mm6 = 0;
          this.mm7 = 0;
          this.mm8 = 0;
          this.mm9 = 0;
          this.mm10 = 0;
          this.mm11 = 0;
          this.mm12 = 0;

          for (let i = 0; i < this.List1.length; i++) {
            if (this.List1[i].includes('2020-01')) {
              this.mm1 = this.mm1 + 1;
            }
            if (this.List1[i].includes('2020-02')) {
              this.mm2 = this.mm2 + 1;
            }
            if (this.List1[i].includes('2020-03')) {
              this.mm3 = this.mm3 + 1;
            }
            if (this.List1[i].includes('2020-04')) {
              this.mm4 = this.mm4 + 1;
            }
            if (this.List1[i].includes('2020-05')) {
              this.mm5 = this.mm5 + 1;
            }
            if (this.List1[i].includes('2020-06')) {
              this.mm6 = this.mm6 + 1;
            }
            if (this.List1[i].includes('2020-07')) {
              this.mm7 = this.mm7 + 1;
            }
            if (this.List1[i].includes('2020-08')) {
              this.mm8 = this.mm8 + 1;
            }
            if (this.List1[i].includes('2020-09')) {
              this.mm9 = this.mm9 + 1;
            }
            if (this.List1[i].includes('2020-10')) {
              this.mm10 = this.mm10 + 1;
            }
            if (this.List1[i].includes('2020-11')) {
              this.mm11 = this.mm11 + 1;
            }
            if (this.List1[i].includes('2020-12')) {
              this.mm12 = this.mm12 + 1;
            }
          }
        }
      }
      this.chartDatasets = [
        { data: [this.m1, this.m2, this.m3, this.m4, this.m5, this.m6, this.m7, this.m8, this.m9, this.m10, this.m11, this.m12], label: 'Mort naturelle' },
        { data: [this.mm1, this.mm2, this.mm3, this.mm4, this.mm5, this.mm6, this.mm7, this.mm8, this.mm9, this.mm10, this.mm11, this.mm12], label: 'Mort non naturelle' },
      ];
    });
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }
}
