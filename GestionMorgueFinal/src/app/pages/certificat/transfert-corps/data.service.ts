import {Injectable} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';


@Injectable()
export class DataService {
  cercueil = ['En zinc et bois', 'En bois'];
  cercueilList = [{value: 'En zinc et bois', title: 'En zinc et bois'}, {value: 'En bois', title: 'En bois'}];
  destinationCorps = ['Tanger', 'Rabat'];
  destinationCorpsList = [{value: 'Tanger', title: 'Tanger'}, {value: 'Rabat', title: 'Rabat'}];
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="fas fa-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
      mode: 'inline',
    },
    delete: {
      deleteButtonContent: '<i class="fas fa-trash"></i>',
      confirmDelete: true,

    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'pdfFrancais',
          title: '<i class="fas fa-file-pdf"></i>',
        },
        {
          name: 'pdfArabe',
          title: '<i class="far fa-file-pdf"></i>',
        },
        {
          name: 'delete',
          title: '<i class="fas fa-trash"></i>',
        },
        {
          name: 'edit',
          title: '<i class="fas fa-edit"></i>',
        },
      ],
    },
    columns: {
      defunt: {
        title: 'Défunt',
        type: 'html',
        valuePrepareFunction: (data) => {
          return data.nom + ' ' + data.prenom;
        },
        filterFunction(decede?: any, search?: string): boolean {
          let match = true;
          Object.keys(decede).map(u => decede.nom + ' ' + decede.prenom).filter(it => {
            match = it.includes(search);
          });

          if (match || search === '') {
            return true;
          } else {
            return false;
          }
        },
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [],
          },
        },
        compareFunction: (direction: any, a: any, b: any) => {
          const first = typeof a.nom === 'string' ? a.nom.toLowerCase() : a.nom;
          const second = typeof b.nom === 'string' ?  b.nom.toLowerCase() : b.nom;

          if (first < second) {
            return -1 * direction;
          }
          if (first > second) {
            return direction;
          }
          return 0;
        },
      },
      medecins: {
        title: 'Médecin',
        type: 'html',
        valuePrepareFunction: (data) => {
          return data.nom + ' ' + data.prenom;
        },
        filterFunction(medecins?: any, search?: string): boolean {
          let match = true;
          Object.keys(medecins).map(u => medecins.nom + ' ' + medecins.prenom).filter(it => {
            match = it.includes(search);
          });

          if (match || search === '') {
            return true;
          } else {
            return false;
          }
        },
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: [],
          },
        },
        compareFunction: (direction: any, a: any, b: any) => {
          const first = typeof a.nom === 'string' ? a.nom.toLowerCase() : a.nom;
          const second = typeof b.nom === 'string' ?  b.nom.toLowerCase() : b.nom;

          if (first < second) {
            return -1 * direction;
          }
          if (first > second) {
            return direction;
          }
          return 0;
        },
      },
      declarant: {
        title: 'Déclarant',
        type: 'string',
      },
      cin: {
        title: 'CIN',
        type: 'string',
      },
      declaration: {
        title: 'Date de déclaration',
        valuePrepareFunction: (data) => {
          const raw: Date = new Date(data);
          return this.datePipe.transform(raw, 'dd-MM-yyyy');
        },
      },
      destination: {
        title: 'Destination',
        type: 'html',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: this.destinationCorpsList,
          },
        },
      },
      cercueilType: {
        title: 'Type de cercueil',
        type: 'html',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: this.cercueilList,
          },
        },
      },
      tel: {
        title: 'Télèphone',
        type: 'string',
      },
      mortuaire: {
        title: 'Fourgon mortuaire',
        type: 'string',
      },
      inhumationSociete: {
        title: 'Société d\'inhumation',
        type: 'string',
      },
      remarque: {
        title: 'Remarques',
        type: 'string',
      },
    },
  };
  reactiveForm: FormGroup;
  frPattern = '[a-zA-Zéàçèêûù()\'0-9 ]*';
  numberPattern = '[0-9]*';

  constructor(private datePipe: DatePipe, private fb: FormBuilder, private router: Router ) {
  }

  public formControl() {
    this.reactiveForm = this.fb.group({
      medecins: ['', [Validators.required]],
      cercueilType: ['', [Validators.required]],
      declaration: ['', [Validators.required]],
      remarque: ['', [Validators.pattern(this.frPattern)]],
      defunt: ['', [Validators.required]],
      declarant: ['', [Validators.required, Validators.pattern(this.frPattern)]],
      tel: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
      destination: ['', [Validators.required]],
      mortuaire: ['', [Validators.required, Validators.pattern(this.frPattern)]],
      inhumationSociete: ['', [Validators.required, Validators.pattern(this.frPattern)]],
      cin: ['', [Validators.required, Validators.pattern(this.frPattern)]],
    });
  }

  public passToMedecin() {
    this.router.navigateByUrl('/pages/bulletins-dm/medcins');
  }
  public passToDecede() {
    this.router.navigateByUrl('/pages/bulletins-dm/decedes');
  }
}
