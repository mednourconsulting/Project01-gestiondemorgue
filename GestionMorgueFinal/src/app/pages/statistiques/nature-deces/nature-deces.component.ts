import {Component, OnInit} from '@angular/core';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
import {NbThemeService} from '@nebular/theme';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-nature-deces',
  templateUrl: './nature-deces.component.html',
  styleUrls: ['./nature-deces.component.scss'],
  providers: [DecedesService],
})
export class NatureDecesComponent implements OnInit {
  list = [];
  list1 = [];
  m1: number; m3: number; m4: number; m5: number; m9: number; m10: number;
  m2: number; m6: number; m7: number; m8: number; m11: number; m12: number;
  mm1: number; mm3: number; mm4: number; mm5: number; mm9: number; mm10: number;
  mm2: number; mm6: number; mm7: number; mm8: number; mm11: number; mm12: number;
  annee: string;
  MN: number; MNN: number;
  public chartType: string = 'line';
  public currentDate = (new Date).getFullYear().toString();
  reactiveForm: FormGroup;
  message: string = '';
  messageAnnee: string = '';
  private statistics = [] ;

  initialData () {
    this.MNN = 0;
    this.MN = 0;
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
  }

 public chartDatasets: Array<any> = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Mort naturelle' },
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: 'Mort non naturelle' },
  ];
  public chartLabels: Array<any> = ['Janvier',
    'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

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



  constructor(private theme: NbThemeService,
              private serviceD: DecedesService,
              private fb: FormBuilder) {
  }



  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

    get(annee: string) {
    this.messageAnnee = '';
    this.message = '';
    this.statistics = [];
    this.initialData();
    this.list.forEach (  obj => {
      if (obj.dateDeces.substring(0, 4) === annee) {
        this.statistics.push(obj);
        if (obj.natureMort === 'Mort naturelle') {
        if (obj.dateDeces.toString().includes(annee + '-01')) {
        this.m1++;

      }
      if (obj.dateDeces.toString().includes(annee + '-02')) {
        this.m2 = this.m2 + 1;
      }
      if (obj.dateDeces.toString().includes(annee + '-03')) {
        this.m3 = this.m3 + 1;
      }
      if (obj.dateDeces.toString().includes(annee + '-04')) {
        this.m4 = this.m4 + 1 ;
      }
      if (obj.dateDeces.toString().includes(annee + '-05')) {
        this.m5 = this.m5 + 1;
      }
      if (obj.dateDeces.toString().includes(annee + '-06')) {
        this.m6 = this.m6 + 1;
      }
      if (obj.dateDeces.toString().includes(annee + '-07')) {
        this.m7 = this.m7 + 1;
      }
      if (obj.dateDeces.toString().includes(annee + '-08')) {
        this.m8 = this.m8 + 1;
      }
      if (obj.dateDeces.toString().includes(annee + '-09')) {
        this.m9 = this.m9 + 1;
      }
      if (obj.dateDeces.toString().includes(annee + '-10')) {
        this.m10 = this.m10 + 1;
      }
      if (obj.dateDeces.toString().includes(annee + '-11')) {
        this.m11 = this.m11 + 1;
      }
      if (obj.dateDeces.toString().includes(annee + '-12')) {
        this.m12 = this.m12 + 1;
      }
      }
        if (obj.natureMort === 'Mort non naturelle') {
        if (obj.dateDeces.toString().includes(annee + '-01')) {
          this.mm1 = this.mm1 + 1;
        }
        if (obj.dateDeces.toString().includes(annee + '-02')) {
          this.mm2 = this.mm2 + 1;
        }
        if (obj.dateDeces.toString().includes(annee + '-03')) {
          this.mm3 = this.mm3 + 1;
        }
        if (obj.dateDeces.toString().includes(annee +  '-04')) {
          this.mm4 = this.mm4 + 1;
        }
        if (obj.dateDeces.toString().includes(annee + '-05')) {
          this.mm5 = this.mm5 + 1;
        }
        if (obj.dateDeces.toString().includes(annee + '-06')) {
          this.mm6 = this.mm6 + 1;
        }
        if (obj.dateDeces.toString().includes(annee + '-07')) {
          this.mm7 = this.mm7 + 1;
        }
        if (obj.dateDeces.toString().includes(annee + '-08')) {
          this.mm8 = this.mm8 + 1;
        }
        if (obj.dateDeces.toString().includes(annee + '-09')) {
          this.mm9 = this.mm9 + 1;
        }
        if (obj.dateDeces.toString().includes(annee + '-10')) {
          this.mm10 = this.mm10 + 1;
        }
        if (obj.dateDeces.toString().includes(annee + '-11')) {
          this.mm11 = this.mm11 + 1;
        }
        if (obj.dateDeces.toString().includes(annee + '-12')) {
          this.mm12 = this.mm12 + 1;
        }
      }
      }
  });
      if (this.statistics.length === 0) {
        this.message = 'Il n\'y a pas de statistiques pour cette année' ;
      } else {
        this.message = 'Les statistiques selon la nature du décès pour l\'année ' ;
        this.messageAnnee = annee;
      }
      this.chartDatasets = [
        { data: [this.m1, this.m2, this.m3, this.m4, this.m5, this.m6,
            this.m7, this.m8, this.m9, this.m10, this.m11, this.m12], label: 'Mort naturelle' },
        { data: [this.mm1, this.mm2, this.mm3, this.mm4, this.mm5, this.mm6,
            this.mm7, this.mm8, this.mm9, this.mm10, this.mm11, this.mm12], label: 'Mort non naturelle' },
      ];
  }

  ngOnInit(): void {
    this.serviceD.getAll().subscribe( data => {
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
