/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import {Component, OnDestroy, OnInit} from '@angular/core';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData, SolarEnergyStatistics } from '../../@core/interfaces/iot/solar';
import { Device, DevicesData } from '../../@core/interfaces/iot/devices';
import {Decedes} from '../../@core/backend/common/model/Decedes';
import {DecedesService} from '../../@core/backend/common/services/Decedes.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
  providers: [DecedesService],
})
export class DashboardComponent implements OnDestroy {
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i></div>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
      mode: 'inline',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,

    },
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      id: {
        title: 'Numéro de registre',
        type: 'number',
        editable: false,
      },
      nom: {
        title: 'Nom',
        type: 'string',
      },
      prenom: {
        title: 'Prénom',
        type: 'string',
      },
      sexe: {
        title: 'sexe',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              {value: 'Femme', title: 'Femme'},
              {value: 'Homme', title: 'Homme'},
              {value: 'Indéterminé', title: 'Indéterminé'},
            ],
          },
        },
      },
      cin: {
        title: 'CIN',
        type: 'string',
      },
      dateNaissance: {
        title: 'Date de naissance',
        valuePrepareFunction: (data) => {
          const raw: Date = new Date(data);
          return this.datePipe.transform(raw, 'dd-MM-yyyy');
        },
      },
      lieuNaiss: {
        title: 'Lieu de naissance',
        type: 'string',
      },
      fils: {
        title: 'Fille ou fils de ',
        type: 'String',
      },
      nationalite: {
        title: 'Nationalité ',
        type: 'String',
      },
      adresse: {
        title: 'Adresse',
        type: 'String',
      },
      etat: {
        title: 'Etat Matrimonial',
        type: 'String',
      },
      profession: {
        title: 'Profession',
        type: 'String',
      },
      dateDeces: {
        title: 'Date de décès',
        valuePrepareFunction: (data) => {
          const raw: Date = new Date(data);
          return this.datePipe.transform(raw, 'dd-MM-yyyy');
        },
      },
      heure: {
        title: 'Heure de décès',
        type: 'string',
      },
      lieuxDeces: {
        title: 'Lieu de décès',
        type: 'String',
      },
      natureMort: {
        title: 'Nature de mort',
        type: 'String',
      },
      mortNe: {
        title: 'S\'agit-il d\'un mort né',
        type: 'boolean',
      },
      causeMort: {
        title: 'Cause de mort',
        type: 'String',
      },
      causeInitial: {
        title: 'Cause initiale',
        type: 'String',
      },
      causeImmdiate: {
        title: 'Cause immédiate',
        type: 'String',
      },
      obstacle: {
        title: 'Obstacle medicolégal',
        type: 'boolean',
      },
      nomAR: {
        title: 'النسب',
        type: 'string',
      },
      prenomAR: {
        title: 'الإسم',
        type: 'string',
      },
      lieuDecesAR: {
        title: 'مكان الوفاة',
        type: 'string',
      },
      nationaliteAR: {
        title: 'الجنسية',
        type: 'string',
      },
      filsAR: {
        title: 'إبن أو بنت',
        type: 'string',
      },
      adresseAR: {
        title: 'العنوان',
        type: 'string',
      },
    },
  };
  source: Array<Decedes>;

  init() {
    this.service.getAll().subscribe(data => {
      this.source = data;
    });
  }

  private alive = true;

  solarValue: SolarEnergyStatistics;

  devices: Device[];

  constructor(private devicesService: DevicesData, private service: DecedesService, private datePipe: DatePipe,
              private solarService: SolarData) {
    this.service.getAll().subscribe(data => {
      this.source = data;
    });
    this.devicesService.list()
      .pipe(takeWhile(() => this.alive))
      .subscribe(data => {
        this.devices = data.filter(x => x.settings);
      });


    this.solarService.getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.solarValue = data;
      });
  }

  changeDeviceStatus(device: Device, isOn: boolean) {
    device.isOn = isOn;
    this.devicesService.edit(device)
      .pipe(takeWhile(() => this.alive))
      .subscribe();
  }

  ngOnDestroy() {
    this.alive = false;
  }


  public chartType: string = 'pie';

  public chartDatasets: Array<any> = [
    { data: [0, 0, 0], label: 'My First dataset' },
  ];

  public chartLabels: Array<any> = ['Femme', 'Homme', 'Indéterminé'];

  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 2,
    },
  ];

  public chartOptions: any = {
    responsive: true,
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  List = [];
  f: number;
  i: number;
  h: number;
  dash: string;
  get () {
    this.service.getAll().subscribe(data1 => {
      data1.forEach(obj => {
        this.List.push(obj.sexe);
      });
      this.h = 0;
      this.f = 0;
      this.i = 0;
      for (let j = 0; j < this.List.length; j++) {
        if (this.List[j] === 'Femme') {
          this.f = this.f + 1;
        }
        if (this.List[j] === 'Homme') {
          this.h = this.h + 1;
        }
        if (this.List[j] === 'indéterminé') {
          this.i = this.i + 1;
        }
      }
      this.chartDatasets = [  { data: [this.f, this.h, this.i], label: 'My First dataset' } ];
    });
  }
}

