import { Component, OnInit} from '@angular/core';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
import {DatePipe} from '@angular/common';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

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
  message: string = '';
  messageAnnee: string = '';
   reactiveForm: FormGroup;
   statistics = [];
  constructor (private service: DecedesService,
               private datePipe: DatePipe,
               private fb: FormBuilder) {
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
    this.messageAnnee = '';
    this.message = '';
    this.statistics = [];
    this.service.getAll().subscribe( data => {
      this.list = data;

    });
    this.list.forEach(obj => {
      if (obj.dateDeces.substring(0, 4) === annee) {
        this.statistics.push(obj);
        this.message = 'Les statistiques selon le sexe du décédé pour l\'année';
        this.messageAnnee = annee;
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

    if (this.statistics.length === 0) {
      this.message = 'Il n\'y a pas de statistiques pour cette année' ;
    }
    this.chartDatasets = [this.f, this.h, this.i];
  }

  ngOnInit(): void {
    this.service.getAll().subscribe(data => {
      this.list = data;
      this.get(this.currentDate);
    });
    this.reactiveForm = this.fb.group({
      annee: ['', [
        Validators.min(1900),
        Validators.max(2099),
        Validators.required]],
    });
  }

  getControl(name: string): AbstractControl {
    return this.reactiveForm.get(name);
  }

  OnSubmit() {
    const annee = this.reactiveForm.value.annee;
    if (this.reactiveForm.valid) {
      if (annee !== null) {
        this.get(annee.toString());
      }
    }
  }
}
