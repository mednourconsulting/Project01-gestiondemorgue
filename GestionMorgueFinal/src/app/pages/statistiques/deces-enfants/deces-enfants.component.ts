import {Component, OnInit} from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {NbThemeService} from '@nebular/theme';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
@Component({
  selector: 'ngx-deces-enfants',
  templateUrl: './deces-enfants.component.html',
  styleUrls: ['./deces-enfants.component.scss'],
  providers: [DecedesService],
})
export class DecesEnfantsComponent implements OnInit {
  public List = [];
  public list = [];
  public h: number;
  public f: number;
  public i: number;
  public annee: string;
  public chartType: string = 'pie';
  public chartDatasets: Array<any> = [
    { data: [0, 0, 0], label: 'My First dataset' },
  ];
  public chartLabels: Array<any> = ['Garçon', 'Fille', 'Indéterminé'];
  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870'],
      borderWidth: 2,
    },
  ];
  public chartOptions: any = {
    responsive: true,
  };
  public currentDate = (new Date).getFullYear().toString();


  constructor(private theme: NbThemeService, private serviceDecede: DecedesService) {
  }


  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  getAgeParJour(DateNaiss , DateDeces ) {
    DateNaiss = new Date(DateNaiss);
    DateDeces = new Date(DateDeces);
    return ((DateDeces.getTime() - DateNaiss.getTime()) / 86400000).toFixed(0);
  }


  get(annee: string) {
    this.h = this.f = this.i = 0;
    this.currentDate = annee;
    this.list.forEach(obj => {
      if (obj.dateDeces.toString().includes(annee)) {
      const  age = this.getAgeParJour(obj.dateNaissance, obj.dateDeces);
          if (parseInt(age, 10 ) <= 30) {
          if (obj.sexe === 'Homme') {
            this.h = this.h + 1;
          }
          if (obj.sexe === 'Femme') {
            this.f = this.f + 1;
          }
          if (obj.sexe === 'Indéterminé') {
            this.i = this.i + 1;
          }

        }

      }
    });
    this.chartDatasets = [this.f, this.h, this.i];
  }

  ngOnInit(): void {
    this.serviceDecede.getAll().subscribe(data => {
      this.list = data;
      this.get(this.currentDate);
    });
  }
}
