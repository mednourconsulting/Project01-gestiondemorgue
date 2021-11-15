import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {NbThemeService} from '@nebular/theme';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-selon-cause',
  templateUrl: './selon-cause.component.html',
  styleUrls: ['./selon-cause.component.scss'],
  providers: [DecedesService],
})
export class SelonCauseComponent implements OnInit {
  public TA: number; A: number; M: number; T: number; F: number; L: number; C: number; O: number; ML: number;
  public chartType: string = 'bar';
  public chartDatasets: Array<any> = [ { data: [0, 0, 0, 0, 0, 0, 0, 0, 0], label: '' }];
  public annee: number;
  currentDate = (new Date).getFullYear().toString();
  public chartLabels: Array<any> =
    ['Accident', 'Homicide', 'Suicide', 'Noyade',
      'Brûlure', 'Intoxication', 'Traumatisme', 'Inconnu', 'Maladie' , 'Autres'];
  private others: any;
  private List: any[] = [];
  message: string = '';
  messageAnnee: string = '';
  private reactiveForm: FormGroup;


  constructor(private theme: NbThemeService,
              private serviceD: DecedesService,
              private fb: FormBuilder) {}
  ngOnInit() {
    this.serviceD.getAll().subscribe(data => {
      this.get(this.currentDate);
    });
    this.reactiveForm = this.fb.group({
      annee: ['', [
        Validators.min(1900),
        Validators.max(2099),
        Validators.required]],
    });
  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  get(annee: any) {
    this.messageAnnee = '';
    this.message = '';
    this.initialise();
    this.List = [];
    this.serviceD.getAll().subscribe(data1 => {
      data1.forEach(obj => {
        if (obj.dateDeces.toString().substring(0, 4) === annee) {
          this.message = 'Les statistiques selon la cause de décès pour l\'année';
          this.messageAnnee = annee;
          this.List.push({dt: obj.dateDeces, cause: obj.causeMort});
        }
      });
    this.condestions (this.List);
      this.chartDatasets = [this.TA, this.M, this.T, this.F, this.L, this.A, this.C, this.O, this.ML , this.others];
    });
    if (this.List.length === 0) {
      this.message = 'Il n\'y a pas de statistiques pour cette année' ;
    } else {
      this.message = 'Les statistiques selon la cause de décès pour l\'année';
      this.messageAnnee = annee;
    }
    }


  // we separate the cause nature and cause non natural list is a list of json with two atrubite date and cause
  chartColors: any;
  chartOptions: any;
  condestions (list: any[]) {
    this.initialise();
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
                    if ( data.cause === 'Inconnu' || data.cause === '') {
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
  initialise() {
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
