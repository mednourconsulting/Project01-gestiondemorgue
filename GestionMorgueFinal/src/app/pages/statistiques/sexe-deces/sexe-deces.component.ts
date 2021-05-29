import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'ngx-sexe-deces',
  templateUrl: './sexe-deces.component.html',
  styleUrls: ['./sexe-deces.component.scss'],
  providers: [DecedesService],
})
export class SexeDecesComponent implements OnInit {
  List = [];
  list = [];
  data = [];
  f: number;
  i: number;
  h: number;
  dash: string;
  annee: string;
  isDataFound: boolean = false;
  currentDate = (new Date).getFullYear().toString();
  constructor (private service: DecedesService, private datePipe: DatePipe) {
}
  public chartType: string = 'pie';

  public chartDatasets: Array<any> = [
    { data: [0, 0, 0], label: 'My First dataset' },
  ];

  public chartLabels: Array<any> = ['Femme', 'Homme', 'Indéterminé'];

  public chartColors: Array<any> = [
    {
      backgroundColor: ['#82CDE0', '#E08282', '#82E0AA'],
      hoverBackgroundColor: ['#82CDE0', '#E08282', '#82E0AA'],
      borderWidth: 2,
    },
  ];

  public chartOptions: any = {
    responsive: true,
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  /*get () {
    this.service.getAll().subscribe(data1 => {
      data1.forEach(obj => {
        this.List.push(obj.sexe, obj.dateDeces);
      });
      this.h = 0;
      this.f = 0;
      this.i = 0;
      for (let j = 0; j < this.List.length; j = j + 1) {
        if ((this.List[j] === 'Femme') && (this.List[j + 1].includes(this.annee))) {
          this.f = this.f + 1;
        }
        if ((this.List[j] === 'Homme') && (this.List[j + 1].includes(this.annee))) {
          this.h = this.h + 1;
        }
        if ((this.List[j] === 'indéterminé') && (this.List[j + 1].includes(this.annee))) {
          this.i = this.i + 1;
        }
      }
      this.chartDatasets = [  { data: [this.f, this.h, this.i], label: 'My First dataset' } ];
      console.log(this.f);
    });
  }*/
  get(annee: string) {
    this.h = this.f = this.i = 0;
    this.data = [];

    this.service.getAll().subscribe( data => {
      this.list = data;

    });
    this.list.forEach(obj => {
      if (obj.dateDeces.toString().includes(annee)) {
        // this.data.map(e => obj.dateDeces.toString().includes(annee));
       // console.log(this.data);
       // console.log(this.data.length);
       // this.isDataFound = true;
        if (obj.sexe === 'Homme') {
          this.h = this.h + 1;
        }
        if (obj.sexe === 'Femme') {
          this.f = this.f + 1;
        }
        if (obj.sexe === 'Indéterminé') {
          this.i = this.i + 1;
        }
        this.chartDatasets = [this.f, this.h, this.i];
      }
    });
    /*this.list.forEach (  obj => { this.List.push(obj.sexe),
      this.List1.push(obj.dateNaissance),
      this.List2.push(obj.dateDeces);
    });

    for (let j = 0; j < this.List.length; j++) {
      if ((this.getAgeParJour(this.List1[j], this.List2[j]) < '30') &&
        (this.List[j] === 'Femme')) {this.f = this.f + 1 ; }
      if ((this.List[j] === 'Homme') &&
        (this.getAgeParJour(this.List1[j], this.List2[j]) < '30')) {this.h = this.h + 1 ; }
      if ((this.List[j] === 'indéterminé') &&
        (this.getAgeParJour(this.List1[j], this.List2[j]) < '30')) {this.i = this.i + 1 ; }
      console.log(this.h);
    }*/

    /* console.log(this.list);
    this.list.forEach(obj => {
      if (obj.sexe === 'Homme') {
        this.h = this.h + 1;
      }
      if (obj.sexe === 'Femme') {
        this.h = this.f + 1;
      }
      if (obj.sexe === 'Indetermine') {
        this.h = this.i + 1;
      }
    });
    this.chartDatasets = [this.f, this.h, this.i];*/
  }

  ngOnInit(): void {
    this.service.getAll().subscribe(data => {
      this.list = data;
      this.get(this.currentDate);
    });
  }
}
