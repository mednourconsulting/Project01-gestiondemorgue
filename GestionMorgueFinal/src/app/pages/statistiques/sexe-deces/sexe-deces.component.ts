import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
import {DatePipe} from '@angular/common';
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
  hero: any;
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  get(annee: any) {
    this.h = this.f = this.i = 0;
    this.data = [];

    this.service.getAll().subscribe( data => {
      this.list = data;

    });
    this.currentDate = annee
    this.list.forEach(obj => {
      if (obj.dateDeces.toString().includes(annee)) {
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
    });
    this.chartDatasets = [this.f, this.h, this.i];
  }

  ngOnInit(): void {
    this.service.getAll().subscribe(data => {
      this.list = data;
      this.get(this.currentDate);
    });
    new FormGroup({
      name: new FormControl(this.annee, [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }
}
