import {Injectable} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';


@Injectable()
export class DataService {

  reactiveForm: FormGroup;
  frPattern = '[a-zA-Zéàçèêûù()\'0-9 ]*';
  // smart table setting
  settings = {
    add: {
      addButtonContent: '<i class="nb-layout-default"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      infoconferm: true,
      mode: 'inline',
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
      centerMedicoLegal: {
        title: 'Centre médico-Légal',
        type: 'string',
      },
      dateDeclaration: {
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

  constructor(private datePipe: DatePipe, private fb: FormBuilder, private router: Router) {
  }

  public passToMedecin() {
    this.router.navigateByUrl('/pages/bulletins-dm/medcins');
  }
  public passToDecede() {
    this.router.navigateByUrl('/pages/bulletins-dm/decedes');
  }
  public formControle () {
    this.reactiveForm = this.fb.group({
      defunt: ['', [Validators.required]],
      centerMedicoLegal:  ['', [Validators.required, Validators.pattern(this.frPattern)]],
      dateDeclaration: ['', [Validators.required]],
      medecin: ['', [Validators.required]],
    });
  }
}
