import {Injectable} from '@angular/core';
import {DatePipe, formatDate} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Injectable()
export class DataMedicoLegalService {
  frPattern = '[a-zA-Zéàçèêûù()\'0-9 ]*';
  adressFrPattern = '[a-zA-Z0-9éàçèêûù()\'°, ]*';
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
      deleteButtonContent: '<i class="nb-trash"></i>',
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
      medecin: {
        title: 'Médecin',
        type: 'html',
        valuePrepareFunction: (data) => {
          return data.nom + ' ' + data.prenom;
        },
        filterFunction(medecin?: any, search?: string): boolean {
          let match = true;
          Object.keys(medecin).map(u => medecin.nom + ' ' + medecin.prenom).filter(it => {
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
      defunt: {
        title: 'Décédé',
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
      declarant: {
        title: 'Déclarant',
        type: 'string',
      },
      address: {
        title: 'Adresse',
        type: 'string',
      },
      cin: {
        title: 'CIN',
        type: 'string',
      },
      declaration: {
        title: 'Date de déclaration',
        valuePrepareFunction: (data) => {
          if (data != null) {
          const r: Date = new Date(data);
          return this.datePipe.transform(r, 'dd-MM-yyyy');
          } else return ' ';
        },
      },
    },
  };
  reactiveForm: FormGroup;


  constructor(private datePipe: DatePipe, private fb: FormBuilder, private router: Router) {
  }

  public ConvertDate(date) {
    if (date !== undefined && date !== null ) {
      return formatDate(date, 'yyyy-MM-dd', 'en-US', '+1');
    } else {
      return null;
    }
  }
  public formControl () {
    this.reactiveForm = this.fb.group({
      medecin: ['', [ Validators.required ]],
      declarant: ['', [ Validators.required, Validators.pattern(this.frPattern) ]],
      address: ['', [ Validators.required, Validators.pattern(this.adressFrPattern) ]],
      cin:  ['', [ Validators.pattern(this.frPattern)]],
      declaration: [''],
      defunt: ['', [ Validators.required ]],
    });
  }
  getControl(name: string) {
    return this.reactiveForm.get(name);
  }

  public passToMedecin() {
    this.router.navigateByUrl('/pages/bulletins-dm/medcins');
  }
  public passToDecede() {
    this.router.navigateByUrl('/pages/bulletins-dm/decedes');
  }
}
