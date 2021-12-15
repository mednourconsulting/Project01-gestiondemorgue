/*
 * Copyright (c) Akveo 2019. All Rights Reserved.
 * Licensed under the Single Application / Multi Application License.
 * See LICENSE_SINGLE_APP / LICENSE_MULTI_APP in the 'docs' folder for license information on type of purchased license.
 */

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Decedes} from '../../@core/backend/common/model/Decedes';
import {DecedesService} from '../../@core/backend/common/services/Decedes.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
  providers: [DecedesService],
})
export class DashboardComponent {
  sexeList = [{value: 'Femme', title: 'Femme'},
    {value: 'Homme', title: 'Homme'},
    {value: 'Indéterminé', title: 'Indéterminé'}];
  etatList = [{value: 'Célibataire', title: 'Célibataire'},
    {value: 'Marié', title: 'Marié'},
    {value: 'Divorcé', title: 'Divorcé'},
    {value: 'Veuf(ve)', title: 'Veuf(ve)'}];
  lieuDecesList = [{value: 'Domicile', title: 'Domicile'},
    {value: 'Hopital public', title: 'Hopital public'},
    {value: 'Clinique', title: 'Clinique'},
    {value: 'Voie public', title: 'Voie public'},
    {value: 'Lieu de travail', title: 'Lieu de travail'},
    {value: 'Autre', title: 'Autre'}];
  natureMortList = [{value: 'Mort naturelle', title: 'Mort naturelle'},
    {value: 'Mort non naturelle', title: 'Mort non naturelle'}];
  confirmationList = [{value: 'Oui', title: 'Oui'},
    {value: 'Non', title: 'Non'},
    {value: 'Inconnu', title: 'Inconnu'}];
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
      numRegister: {
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
            list: this.sexeList,
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
        filter: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: this.etatList,
          },
        },
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
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: this.lieuDecesList,
          },
        },
      },
      natureMort: {
        title: 'Nature de mort',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: this.natureMortList,
          },
        },
      },
      mortNe: {
        title: 'S\'agit-il d\'un mort né',
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          if ( cell === true ) {
            return 'oui';
          } else {
            return `non`;
          }

        },
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [
              { value: true, title: 'oui '},
              { value: false, title: 'non' },
            ],
          },
        },
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
        type: 'html',
        valuePrepareFunction: (cell, row) => {
          if ( cell === true ) {
            return 'oui';
          } else {
            return `non`;
          }

        },
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [
              { value: true, title: 'oui '},
              { value: false, title: 'non' },
            ],
          },
        },
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
  constructor(private service: DecedesService, private datePipe: DatePipe) {
    this.service.getAll().subscribe(data => {
      this.source = data;
    });
}
}
