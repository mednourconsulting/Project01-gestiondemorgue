import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';

@Component({
  selector: 'ngx-region',
  templateUrl: 'region.component.html',
  styleUrls: ['./region.component.scss'],
  providers: [DecedesService]
,
})
export class RegionComponent {
  annee: any;
  TA: number; A: number; M: number; T: number; F: number; L: number; C: number; O: number;
  constructor(private theme: NbThemeService, private serviceD: DecedesService) {
    this.serviceD.getAll().subscribe(data1 => {
      data1.forEach(obj => {
        this.List.push(obj.provinceD);
      });
      this.TA = 0;
      this.A = 0;
      this.M = 0;
      this.T = 0;
      this.F = 0;
      this.L = 0;
      this.C = 0;
      this.O = 0;
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
      this.chartDatasets = [this.TA, this.M, this.T, this.F, this.L, this.A, this.C, this.O];
    });
  }
  public chartType: string = 'bar';

  public chartDatasets: Array<any> = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0], label: 'Nombre de cas par région' },
  ];

  public chartLabels: Array<any> = ['Tanger-Assilah', 'M\'diq-Fnideq', 'Tétouan', 'Fahs-Anjra', 'Larache', 'Al Hoceïma', 'Chefchaouen', 'Ouezzane'];

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(186,75,97,0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(173, 79, 9, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
        'rgba(255, 159, 64, 0.6)',
        'rgba(223, 109, 20, 0.6)',
        'rgba(16, 52, 166, 0.6)',
      ],
      borderColor: [
        'rgba(96, 80, 220, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(173, 79, 9, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(223, 109, 20, 0.2)',
        'rgba(16, 52, 166, 0.2)',
      ],
      borderWidth: 2,
    },
  ];

  public chartOptions: any = {
    responsive: true,
  };
  List = [];
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  get() {
    this.serviceD.getAll().subscribe(data1 => {
      data1.forEach(obj => {
        this.List.push(obj.dateDeces, obj.provinceD);
      });
      this.TA = 0;
      this.A = 0;
      this.M = 0;
      this.T = 0;
      this.F = 0;
      this.L = 0;
      this.C = 0;
      this.O = 0;
      for (let j = 0; j < this.List.length; j = j + 1) {
        if (this.List[j].includes(this.annee)) {
          switch (this.List[j + 1]) {
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
      }
      this.chartDatasets = [this.TA, this.M, this.T, this.F, this.L, this.A, this.C, this.O];
    });
}
}

