import {Injectable} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable()
export class DataBulletinsService {
  typeBulletinList = [{value: 'Bulletin de décès', title: 'Bulletin de décès'},
    {value: 'Bulletin de mortinatalité', title: 'Bulletin de mortinatalité'}];
  milieuList = [{value: 'Urbain', title: 'Urbain'},
    {value: 'Rural', title: 'Rural'},
    {value: 'Inconnu', title: 'Inconnu'}];
  lieuList = [{value: 'Tanger', title: 'Tanger'},
    {value: 'Asila', title: 'Asila'},
    {value: 'Tetouan', title: 'Tetouan'}];
  provinceList = [{value: 'Tanger-Assilah', title: 'Tanger-Assilah'},
    {value: 'M\'diq-Fnideq', title: 'M\'diq-Fnideq'},
    {value: 'Tétouan', title: 'Tétouan'},
    {value: 'Fahs-Anjra', title: 'Fahs-Anjra'},
    {value: 'Larache', title: 'Larache'},
    {value: 'Al Hoceïma', title: 'Al Hoceïma'},
    {value: 'Chefchaouen', title: 'Chefchaouen'},
    {value: 'Ouezzane', title: 'Ouezzane'},
  ];
  cimetiereList = [{value: 'Cimetière Almojahidine', title: 'Cimetière Almojahidine'},
    {value: 'Cimetière Sidi Omar', title: 'Cimetière Sidi Omar'}];
  diagnostiqueList = [{value: 'Mort naturelle', title: 'Mort naturelle'},
    {value: 'Mort non naturelle', title: 'Mort non naturelle'}];
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
      deleteButtonContent: '<i class="fa fa-trash"></i></i>',
      confirmDelete: true,

    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'left',
      custom: [
        {
          name: 'bulletin',
          title: this.sanitizer.bypassSecurityTrustHtml('<i class="fas fa-file-pdf" data-toggle="tooltip" data-placement="top" title="Le bulletin" aria-hidden="true"></i>'),
        },
        {
          name: 'delete',
          title: this.sanitizer.bypassSecurityTrustHtml('<i class="fa fa-trash" data-toggle="tooltip" data-placement="top" title="Supprimer" aria-hidden="true"></i>'),
        },
        {
          name: 'edit',
          title: this.sanitizer.bypassSecurityTrustHtml('<i class="fas fa-edit" data-toggle="tooltip" data-placement="top" title="Modifier" aria-hidden="true"></i>'),
        },
        {
          name: 'info',
          title: this.sanitizer.bypassSecurityTrustHtml('<i class="fas fa-info" data-toggle="tooltip" data-placement="top" title="Détail" aria-hidden="true"></i>'),
        },
      ],
    },
    columns: {
      typeBulletin: {
        title: 'Type de Bulletin',
        type: 'html',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: this.typeBulletinList,
          },
        },
      },
      declaration: {
        title: 'Date de déclaration',
        valuePrepareFunction: (data) => {
          const raw: Date = new Date(data);
          return this.datePipe.transform(raw, 'dd-MM-yyyy');
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
          const second = typeof b.nom === 'string' ? b.nom.toLowerCase() : b.nom;

          if (first < second) {
            return -1 * direction;
          }
          if (first > second) {
            return direction;
          }
          return 0;
        },
      },
      decede: {
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
          const second = typeof b.nom === 'string' ? b.nom.toLowerCase() : b.nom;

          if (first < second) {
            return -1 * direction;
          }
          if (first > second) {
            return direction;
          }
          return 0;
        },
      },
      province: {
        title: 'Province ou préfecture',
        type: 'html',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: this.provinceList,
          },
        },
      },
      cercle: {
        title: 'Cercle',
        type: 'number',
      },
      centre: {
        title: 'Municipalité/Centre/Commune',
        type: 'number',
      },
      diagnostique: {
        title: 'Diagnostique Attestation',
        type: 'html',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: this.diagnostiqueList,
          },
        },
      },
      residece: {
        title: 'Milieu de résidence',
        type: 'html',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: this.milieuList,
          },
        },
      },
      lieuEntrement: {
        title: 'Lieu Enterrement',
        type: 'html',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: this.lieuList,
          },
        },
      },
      cimetiere: {
        title: 'Cimetière',
        type: 'html',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select...',
            list: this.cimetiereList,
          },
        },
      },
      numTombe: {
        title: 'Numéro de tombe',
        type: 'number',
      },
      compostage: {
        title: 'N° Compostage',
        type: 'number',
      },
    },
  };
  frPattern = '[a-zA-Zéàçèêûù()\'0-9 ]*';


  reactiveForm: FormGroup = this.fb.group({
    typeBulletin: ['', Validators.required],
    declaration: ['', Validators.required],
    cercle: ['', [Validators.required, Validators.pattern(this.frPattern)]],
    diagnostique: ['', Validators.required],
    lieuEntrement: ['', Validators.required],
    province: ['', Validators.required],
    residece: ['', Validators.required],
    cimetiere: ['', Validators.required],
    numTombe: ['', [Validators.required]],
    compostage: ['', Validators.pattern(this.frPattern)],
    medecin: ['', [Validators.required]],
    decede: ['', Validators.required],
    centre: ['', [Validators.required, Validators.pattern(this.frPattern)]],
  });


  constructor(private datePipe: DatePipe , private fb: FormBuilder , private router: Router,
              private sanitizer: DomSanitizer) {
  }

  public passToMedecin() {
    this.router.navigateByUrl('/pages/bulletins-dm/medcins');
  }
  public passToDecede() {
    this.router.navigateByUrl('/pages/bulletins-dm/decedes');
  }
}
