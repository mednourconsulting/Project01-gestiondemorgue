import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Bulletins} from '../../../@core/backend/common/model/Bulletins';
import {BulletinsService} from '../../../@core/backend/common/services/Bulletins.service';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
import {MedecinsService} from '../../../@core/backend/common/services/Medecins.service';
import {SmartTableData} from '../../../@core/interfaces/common/smart-table';
import {UsersService} from '../../../@core/backend/common/services/users.service';
import {Medecins} from '../../../@core/backend/common/model/Medecins';
import {Decedes} from '../../../@core/backend/common/model/Decedes';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {formatDate} from '@angular/common';
import { DatePipe } from '@angular/common';
import {Validators, AbstractControl, FormBuilder, FormGroup, FormControl} from '@angular/forms';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import {CauseService} from '../../../@core/backend/common/services/Cause.service';
import {ToastrService} from '../../../@core/backend/common/services/toastr.service';
import {Router} from '@angular/router';
import {LogoBase64Service} from '../../../@core/backend/common/services/logo-base64.service';
import {Observable, of} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'ngx-bulletins',
  templateUrl: './bulletins.component.html',
  styleUrls: ['./bulletins.component.scss'],
  providers: [BulletinsService, DecedesService, MedecinsService, UsersService, CauseService],
})

export class BulletinsComponent implements OnInit, OnChanges {
  public medecinDetails = false;
  public id = null;
  private filterMedecin = [];
  private filterDecede = [];

  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    throw new Error('Method not implemented.');
  }

  compostage: string;
  medcinid: number = null;
  constation: string;
  Bulletins: Bulletins = new Bulletins();
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
  data: any;
  ListNum = [];
  private sourceD: Decedes;
  frPattern = '[a-zA-Zéàçèêûù()\'0-9 ]*';
  source: Array<Bulletins>;
  numRgtr: number = null;
  isAdmin: boolean = false;
  DecedeHumain: Decedes = null;
  NomDecede = [];
  listDecede = [];
  listMedcin = [];
  NomDMedcin = [];
  jstoday = '';
  MedecinHumain: Medecins = null;
  c: string;
  i = 0;
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
          title: '<i class="fas fa-file-pdf"></i>',
        },
        {
          name: 'delete',
          title: '<i class="fa fa-trash"></i>',
        },
        {
          name: 'edit',
          title: '<i class="fas fa-edit"></i>',
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
  filteredListDecede$: Observable<string[]>;
  filteredListMedcin$: Observable<string[]>;
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
  @ViewChild('autoMedcin', {static: false})
  public input;
  @ViewChild('autoDecede', {static: false})
  public input1;
  constructor(private service: BulletinsService,
              private serviceD: DecedesService,
              private serviceM: MedecinsService,
              private serviceS: SmartTableData,
              private userservice: UsersService,
              private logoBase64: LogoBase64Service,
              private serviceC: CauseService,
              private datePipe: DatePipe,
              private router: Router,
              private toastService: ToastrService,
              private fb: FormBuilder) {
  }

  init() {
    this.service.getAll().subscribe(data => {
      this.source = data;
    });
  }

  ngOnInit() {
    this.userservice.getCurrentUser().subscribe(data => {
      this.isAdmin = data.role.includes('ADMIN');
    });
    this.serviceD.getAll().subscribe(data => {
      data.forEach(obj => {
        this.NomDecede.push({nom: obj.nom + ' ' + obj.prenom, id: obj.id});
        this.listDecede.push(obj.nom + ' ' + obj.prenom);
        this.filterDecede.push({
          id: obj.id,
          value: obj.nom + ' ' + obj.prenom,
          title: obj.nom + ' ' + obj.prenom,
        });
        this.filteredListDecede$ = of(this.listDecede);
      });
    });
    this.serviceM.getAll().subscribe(dataa => {
      dataa.forEach(obj => {
        this.NomDMedcin.push({nom: obj.nom + ' ' + obj.prenom, id: obj.id});
        this.listMedcin.push(obj.nom + ' ' + obj.prenom);
        this.filterMedecin.push({
          id: obj.id,
          value: obj.nom + ' ' + obj.prenom,
          title: obj.nom + ' ' + obj.prenom,
        });
        this.filteredListMedcin$ = of(this.listMedcin);
      });
      this.settings.columns.medecin.filter.config.list = this.filterMedecin;
      this.settings.columns.decede.filter.config.list = this.filterDecede;
      this.settings = Object.assign({}, this.settings);
    });

    this.MedecinHumain = new Medecins();
    this.DecedeHumain = new Decedes();
    this.init();
  }



  createBulletinFromForm(): Bulletins {
    const formValues = this.reactiveForm.value;
    const bulletin = new Bulletins();
    bulletin.id = this.id;
    bulletin.typeBulletin = formValues.typeBulletin;
    bulletin.declaration = formValues.declaration;
    bulletin.cercle = formValues.cercle;
    bulletin.diagnostique = formValues.diagnostique;
    bulletin.lieuEntrement = formValues.lieuEntrement;
    bulletin.province = formValues.province;
    bulletin.residece = formValues.residece;
    bulletin.cimetiere = formValues.cimetiere;
    bulletin.numTombe = formValues.numTombe;
    bulletin.compostage = formValues.compostage;
    bulletin.medecin = formValues.medecin;
    bulletin.decede = formValues.decede;
    bulletin.centre = formValues.centre;
    return bulletin;
  }

  getControl(name: string): AbstractControl {
    return this.reactiveForm.get(name);
  }

  onSubmit() {
    if (this.reactiveForm.valid) {
      const bulletin: Bulletins = this.createBulletinFromForm();
      console.warn('bulletin: ', bulletin);
      console.warn('formValues : ', this.reactiveForm.value);
      this.doSave(bulletin);
      this.id = null;
    } else {
      this.toastService.toastOfSave('validate');
    }
  }

  doSave(bulletin) {
    if (this.id == null) {
        bulletin.medecin = this.MedecinHumain;
        bulletin.decede = this.DecedeHumain;
          this.service.create(bulletin).subscribe(data => {
            this.source.push(data);
            this.source = this.source.map(e => e);
          });
      this.toastService.toastOfSave('success');
      this.reactiveForm.reset();
    } else {
      if (this.isAdmin) {

        bulletin.medecin = this.MedecinHumain;
        bulletin.decede = this.DecedeHumain;
            this.service.update(bulletin).subscribe(data1 => {
              this.source = this.source.map(e => e);
              this.init();
            });
        this.medecinDetails = false;
        this.reactiveForm.reset();
        this.toastService.toastOfEdit('success');
      } else {
        this.toastService.toastOfEdit('warning');
      }
    }

  }

  generatePdf(action = 'open') {
    const documentDefinition = this.getDocumentDefinition();
    switch (action) {
      case 'open':
        pdfMake.createPdf(documentDefinition).open();
        break;
    }
  }

  getAgeParAnnee(DateNaiss, DateDeces) {
    DateNaiss = new Date(DateNaiss);
    DateDeces = new Date(DateDeces);
    return ((DateDeces.getTime() - DateNaiss.getTime()) / 31536000000).toFixed(0);
  }

  calculateAge(dateNaiss, dateDeces) {
    const second = 1;
    const minute = 60 * second;
    const hour = 60 * minute;
    const day = 60 * hour;
    const year = 365 * day;
    dateNaiss = new Date(dateNaiss).getTime();
    dateDeces = new Date(dateDeces).getTime();
    const counter = (dateDeces - dateNaiss) / 1000;
    const years = Math.floor(counter / year);
    const restOfYears = counter % year;
    const days = Math.floor(restOfYears / day);
    const restOfDays = restOfYears % day;
    const hours = Math.floor(restOfDays / hour);
    return (years + ' ans ' + days + ' jours ' + hours + ' heurs ');
  }

  getDocumentDefinition() {
    // sessionStorage.setItem('resume', JSON.stringify());
    return {
      pageSize: 'A4',
      pageMargins: [10, 10, 10, 10],
      content: [
        {
          table: {
            widths: ['30%', '30%', '40%'],
            height: 'auto',
            body: [
              [
                {
                  text: 'ROYAUME DU MAROC \n MINISTERE DE L\'INTERIEUR',
                  fontSize: 10,
                  alignment: 'center',
                  border: [true, true, false, false],
                },
                {
                  border: [false, true, false, false],
                  alignment: 'center',
                  width: 50,
                  height: 50,
                  image: this.logoBase64.getLogoBase64(),
                },
                {
                  text: 'Province/ préfecture : ' +
                    this.checkIfNullOrUndefind(this.Bulletins.province) +
                    '\n Cercle ' + this.checkIfNullOrUndefind(this.Bulletins.cercle) +
                    '\n Municipalité /centre/commune : ' + this.checkIfNullOrUndefind(this.Bulletins.centre),
                  fontSize: 10,
                  alignment: 'left',
                  border: [false, true, true, false],
                },
              ],
              [
                {
                  colSpan: 3,
                  text: 'BULLETIN DE DECES ET DE MORTINATALITE',
                  fontSize: 20,
                  alignment: 'center',
                  // margin: [0, 10, 0, 20],
                  bold: true,
                  border: [true, false, true, false],
                },
                '',
              ],
              [
                {
                  colSpan: 3,
                  border: [true, false, true, false],
                  fontSize: 12,
                  text: 'Décès survenu le:  ' +
                    this.checkIfNullOrUndefind(formatDate(this.DecedeHumain.dateDeces,
                      'dd-MM-yyyy', 'en-US', '+0530')) +
                    '\t à l\'heure  ' + this.checkIfNullOrUndefind(this.DecedeHumain.heure)
                    + '\t à  ' + this.checkIfNullOrUndefind(this.DecedeHumain.lieuxDeces)
                    + '  \n' + 'Nom et prénom de décédé:  '
                    + this.checkIfNullOrUndefind(this.DecedeHumain.nom) + ' '
                    + this.checkIfNullOrUndefind(this.DecedeHumain.prenom) +
                    '\t\t ' + 'Sexe:   ' + this.checkIfNullOrUndefind(this.DecedeHumain.sexe)
                    + ' \n Nationalite: ' + this.checkIfNullOrUndefind(this.DecedeHumain.nationalite)
                    + '\t \t Domicile  ' + this.checkIfNullOrUndefind(this.DecedeHumain.adresse)
                    + '\n age:  ' +
                    this.checkIfNullOrUndefind(this.calculateAge(this.DecedeHumain.dateNaissance,
                      this.DecedeHumain.dateDeces)) + '  \n ',
                },
                '',
              ],
              [
                {
                  colSpan: 3,
                  border: [true, false, true, false],
                  fontSize: 9,
                  text: 'Le Docteur en médecine soussigné \n nom signature \n\n',
                  alignment: 'center',
                },
              ],
              [
                {
                  text: 'N° de l\'acte au registre des décès ' + this.numRgtr +
                    '\n de l\'hopital/ DMH/Commune ',
                  colSpan: 3,
                  fontSize: 12,
                  border: [true, false, true, true],
                },
                '',
              ],
            ],
          },
        },
        {
          table: {
            widths: ['30%', '70%'],
            body: [
              [
                {
                  colSpan: 2,
                  text: 'PARTIE ANONYME \n',
                  alignment: 'center',
                  fontSize: 14,
                  border: [true, true, true, false],
                },
                '',
              ],
              [
                {
                  colSpan: 2,
                  text: 'DESTINEE AU MINISTERE DE LA SANTE PUBLIQUE SERVICE DES ETUDES \n ' +
                    'ET DE L\'INFORMATION SANTAIRE',
                  alignment: 'center',
                  fontSize: 10,
                  bold: true,
                  border: [true, false, true, true],
                },
                '',
              ],
              [
                {
                  colSpan: 2,
                  text: 'I- IDENTIFICATION',
                  decoration: 'underline',
                  bold: true,
                  border: [true, false, true, false],
                },
                '',
              ],
              [
                {
                  text: 'N° de l\'acte au registre  ' + this.numRgtr,
                  border: [true, false, false, false],
                },
                {
                  text: 'N° de compostage:' + this.Bulletins.compostage,
                  border: [false, false, true, false],
                },
              ],
              [
                {
                  text: 'Lieu de déclaration:',
                  border: [true, false, false, false],
                },
                {
                  border: [false, false, true, false],
                  fontSize: 12,
                  // margin: [0, 10, 0, 10],
                  ul: [
                    'Province ou Prefecture: ' + this.Bulletins.province,
                    'Cercle: ' + this.Bulletins.cercle,
                    'Municipalité /Centre/ Commune: ' + this.Bulletins.centre,
                  ],
                },
              ],
              [
                {
                  border: [true, false, false, false],
                  text: 'Domicile habituel:',
                },
                {
                  border: [false, false, true, false],
                  fontSize: 12,
                  // margin: [0, 10, 0, 10],
                  ul: [
                    'Province ou Prefecture: ' + this.DecedeHumain.provinceD,
                    'Cercle: ' + this.DecedeHumain.prefectureD,
                    'Municipalité /Centre/ Commune: ' + this.DecedeHumain.communeD,
                  ],
                },
              ],
              [
                {
                  text: 'Milieu de résidnce:',
                  border: [true, false, false, true],
                },
                {
                  text: this.Bulletins.residece,
                  border: [false, false, true, true],
                },

              ],
              [
                {
                  colSpan: 2,
                  text: 'II- CARACTERISTIQUES \n\n',
                  decoration: 'underline',
                  bold: true,
                  border: [true, false, true, false],
                },
                '',
              ],
              [
                {
                  border: [true, false, false, false],
                  text: 'Type de bulletin :',
                },
                {
                  border: [false, false, true, false],
                  text: this.Bulletins.typeBulletin,
                },
              ],
              [
                {
                  border: [true, false, false, false],
                  text: 'Date de décès :',
                },
                {
                  border: [false, false, true, false],
                  text: this.jstoday,
                },
              ],
              [
                {
                  border: [true, false, false, false],
                  text: 'Lieu où décès est survenu:',
                },
                {
                  border: [false, false, true, false],
                  text: this.DecedeHumain.lieuxDeces,
                },
              ],
              [
                {
                  border: [true, false, false, false],
                  text: 'Sexe :',
                },
                {
                  border: [false, false, true, false],
                  text: this.DecedeHumain.sexe,
                },
              ],
              [
                {
                  border: [true, false, false, false],
                  text: 'Age :',
                },
                {
                  border: [false, false, true, false],
                  text: this.calculateAge(this.DecedeHumain.dateNaissance, this.DecedeHumain.dateDeces),
                },
              ],
              [
                {
                  border: [true, false, false, false],
                  text: 'Nationalité :',
                },
                {
                  border: [false, false, true, false],
                  text: this.DecedeHumain.nationalite,
                },
              ],
              [
                {
                  border: [true, false, false, false],
                  text: 'Etat matrimonial :',
                },
                {
                  border: [false, false, true, false],
                  text: this.DecedeHumain.etat,
                },
              ], [
                {
                  border: [true, false, false, true],
                  text: 'Profession :',
                },
                {
                  border: [false, false, true, true],
                  text: this.DecedeHumain.profession,
                },
              ],
            ],
          },
        },
        {
          table: {
            widths: '*',
            body: [
              [
                {
                  colSpan: 2,
                  text: 'III- RENSEIGNEMENTS SUR LA CAUSE DU DECES OU DE MORTINATALITE',
                  border: [true, true, true, false],
                  decoration: 'underline',
                  bold: true,
                },
                '',
              ],
              [
                {
                  text: 'Mort naturelle',
                  border: [true, false, false, false],
                },
                {
                  border: [false, false, true, false],
                  ul: [
                    'Cause initiale: ' + this.DecedeHumain.causeInitial,
                    'Cause immédiate: ' + this.DecedeHumain.causeImmdiate,
                    '',
                  ],
                },
              ],
              [
                {
                  border: [true, false, false, false],
                  text: 'Mort non naturelle \n',
                },
                {
                  border: [false, false, true, false],
                  ul: [
                    'Cause: ' + this.DecedeHumain.causeMort,
                  ],
                },
              ],
              [
                {
                  border: [true, false, true, true],
                  colSpan: 2,
                  text: 'Constatation faite par ' + this.MedecinHumain.nom + ' ' + this.MedecinHumain.prenom,
                },
                '',
              ],
            ],
          },
        },
      ],
      styles: {
        name: {
          fontSize: 16,
          bold: true,
        },
      },
    };
  }

  checkIfNullOrUndefind(attribute) {
    if (attribute === null || attribute === undefined) {
      return ' ';
    } else {
      return attribute;
    }
  }

  genererBulletin(obj) {
    // sessionStorage.setItem('resume', JSON.stringify());
    return {
      pageSize: 'A4',
      pageMargins: [10, 10, 10, 10],
      content: [
        {
          table: {
            widths: ['30%', '30%', '40%'],
            body: [
              [
                {
                  text: 'ROYAUME DU MAROC \n MINISTERE DE L\'INTERIEUR',
                  fontSize: 10,
                  alignment: 'center',
                  border: [true, true, false, false],
                },
                {
                  border: [false, true, false, false],
                  alignment: 'center',
                  width: 50,
                  height: 50,
                  image: this.logoBase64.getLogoBase64(),
                },
                {
                  text: 'Province/ préfecture : ' + this.checkIfNullOrUndefind(obj.province)
                    + '\n Cercle : ' + this.checkIfNullOrUndefind(obj.cercle) +
                    '\n Municipalité /centre/commune : ' + this.checkIfNullOrUndefind(obj.centre),
                  fontSize: 10,
                  alignment: 'left',
                  border: [false, true, true, false],
                },
              ],
              [
                {
                  colSpan: 3,
                  text: 'BULLETIN DE DECES ET DE MORTINATALITE',
                  fontSize: 20,
                  alignment: 'center',
                  margin: [0, 10, 0, 20],
                  bold: true,
                  border: [true, false, true, false],
                },
              ],
              [
                {
                  colSpan: 3,
                  border: [true, false, true, false],
                  fontSize: 12,
                  text: 'Décès survenu le:  ' +
                    this.checkIfNullOrUndefind(formatDate(obj.decede.dateDeces, 'dd-MM-yyyy', 'en-US', '+0530')) +
                    '\t à l\'heure  ' + this.checkIfNullOrUndefind(obj.decede.heure) + '\t à  ' +
                    this.checkIfNullOrUndefind(obj.decede.lieuxDeces) + '  \n' + 'Nom et prénom de décédé:  ' +
                    this.checkIfNullOrUndefind(obj.decede.nom) + ' ' + this.checkIfNullOrUndefind(obj.decede.prenom) +
                    '\t\t Sexe:   ' + this.checkIfNullOrUndefind(obj.decede.sexe) +
                    ' \n Nationalite : ' + this.checkIfNullOrUndefind(obj.decede.nationalite)
                    + '\t\t Domicile : ' + this.checkIfNullOrUndefind(obj.decede.adress) + '\n age:  ' +
                    this.checkIfNullOrUndefind(this.calculateAge(obj.decede.dateNaissance, obj.decede.dateDeces)),
                },
              ],
              [
                {
                  colSpan: 3,
                  border: [true, false, true, false],
                  fontSize: 9,
                  text: 'Le Docteur en médecine soussigné \n nom signature \n\n',
                  alignment: 'center',
                  margin: [300, 10, 0, 0],
                },
              ],
              [
                {
                  text: '- N° de l\'acte au registre des décès ' + this.checkIfNullOrUndefind(obj.decede.numRegister) +
                    '\n - de l\'hopital/ DMH/Commune ',
                  colSpan: 3,
                  fontSize: 12,
                  border: [true, false, true, true],
                },
                '',
              ],
            ],
          },
        },
        {
          text: 'Partie à détacher et destinée à l\'etat civil où le deces ou la mortinatalité est survenue \n -----------------------------------------------------------------------------------' +
            '----------------------------------------------------------------------------------------',
          alignment: 'center',
          fontSize: 10,
        },
        {
          table: {
            widths: ['30%', '70%'],
            body: [
              [
                {
                  colSpan: 2,
                  text: 'PARTIE ANONYME \n',
                  alignment: 'center',
                  fontSize: 14,
                  border: [true, true, true, false],
                },
                '',
              ],
              [
                {
                  colSpan: 2,
                  text: 'DESTINEE AU MINISTERE DE LA SANTE PUBLIQUE SERVICE DES ETUDES \n ' +
                    'ET DE L\'INFORMATION SANTAIRE',
                  alignment: 'center',
                  fontSize: 10,
                  bold: true,
                  border: [true, false, true, true],
                },
                '',
              ],
              [
                {
                  colSpan: 2,
                  text: 'I- IDENTIFICATION',
                  decoration: 'underline',
                  bold: true,
                  border: [true, false, true, false],
                },
                '',
              ],
              [
                {
                  text: 'N° de l\'acte au registre  ' + this.checkIfNullOrUndefind(obj.decede.numRegister),
                  border: [true, false, false, false],
                },
                {
                  text: 'N° de compostage:' + this.checkIfNullOrUndefind(obj.compostage),
                  border: [false, false, true, false],
                },
              ],
              [
                {
                  text: 'Lieu de déclaration:',
                  border: [true, false, false, false],
                },
                {
                  border: [false, false, true, false],
                  fontSize: 12,
                  // margin: [0, 10, 0, 10],
                  ul: [
                    'Province ou Prefecture: ' + this.checkIfNullOrUndefind(obj.province),
                    'Cercle: ' + this.checkIfNullOrUndefind(obj.cercle),
                    'Municipalité /Centre/ Commune: ' + this.checkIfNullOrUndefind(obj.centre),
                  ],
                },
              ],
              [
                {
                  border: [true, false, false, false],
                  text: 'Domicile habituel:',
                },
                {
                  border: [false, false, true, false],
                  fontSize: 12,
                  // margin: [0, 10, 0, 10],
                  ul: [
                    'Province ou Prefecture: ' + this.checkIfNullOrUndefind(obj.decede.provinceD),
                    'Cercle: ' + this.checkIfNullOrUndefind(obj.decede.prefectureD),
                    'Municipalité /Centre/ Commune: ' + this.checkIfNullOrUndefind(obj.decede.communeD),
                  ],
                },
              ],
              [
                {
                  text: 'Milieu de résidnce:',
                  border: [true, false, false, true],
                },
                {
                  text: this.checkIfNullOrUndefind(obj.residece),
                  border: [false, false, true, true],
                },

              ],
              [
                {
                  colSpan: 2,
                  text: 'II- CARACTERISTIQUES \n\n',
                  decoration: 'underline',
                  bold: true,
                  border: [true, false, true, false],
                },
                '',
              ],
              [
                {
                  border: [true, false, false, false],
                  text: 'Type de bulletin :',
                },
                {
                  border: [false, false, true, false],
                  text: this.checkIfNullOrUndefind(obj.typeBulletin),
                },
              ],
              [
                {
                  border: [true, false, false, false],
                  text: 'Date de décès :',
                },
                {
                  border: [false, false, true, false],
                  text: this.checkIfNullOrUndefind(formatDate(obj.decede.dateDeces, 'dd-MM-yyyy', 'en-US', '+0530')),
                },
              ],
              [
                {
                  border: [true, false, false, false],
                  text: 'Lieu où décès est survenu:',
                },
                {
                  border: [false, false, true, false],
                  text: this.checkIfNullOrUndefind(obj.decede.lieuxDeces),
                },
              ],
              [
                {
                  border: [true, false, false, false],
                  text: 'Sexe :',
                },
                {
                  border: [false, false, true, false],
                  text: this.checkIfNullOrUndefind(obj.decede.sexe),
                },
              ],
              [
                {
                  border: [true, false, false, false],
                  text: 'Age :',
                },
                {
                  border: [false, false, true, false],
                  text: this.checkIfNullOrUndefind(this.calculateAge(obj.decede.dateNaissance, obj.decede.dateDeces)),
                },
              ],
              [
                {
                  border: [true, false, false, false],
                  text: 'Nationalité :',
                },
                {
                  border: [false, false, true, false],
                  text: this.checkIfNullOrUndefind(obj.decede.nationalite),
                },
              ],
              [
                {
                  border: [true, false, false, false],
                  text: 'Etat matrimonial :',
                },
                {
                  border: [false, false, true, false],
                  text: this.checkIfNullOrUndefind(obj.decede.etat),
                },
              ], [
                {
                  border: [true, false, false, true],
                  text: 'Profession :',
                },
                {
                  border: [false, false, true, true],
                  text: this.checkIfNullOrUndefind(obj.decede.profession),
                },
              ],
            ],
          },
        },
        {
          table: {
            widths: '*',
            body: [
              [
                {
                  colSpan: 2,
                  text: 'III- RENSEIGNEMENTS SUR LA CAUSE DU DECES OU DE MORTINATALITE',
                  border: [true, true, true, false],
                  decoration: 'underline',
                  bold: true,
                },
                '',
              ],
              [
                {
                  text: 'Mort naturelle',
                  border: [true, false, false, false],
                },
                {
                  border: [false, false, true, false],
                  ul: [
                    'Cause initiale: ' + this.checkIfNullOrUndefind(obj.decede.causeInitial),
                    'Cause immédiate: ' + this.checkIfNullOrUndefind(obj.decede.causeImmdiate),
                    '',
                  ],
                },
              ],
              [
                {
                  border: [true, false, false, false],
                  text: 'Mort non naturelle \n',
                },
                {
                  border: [false, false, true, false],
                  ul: [
                    'Cause: ' + this.checkIfNullOrUndefind(obj.decede.causeMort),
                  ],
                },
              ],
              [
                {
                  border: [true, false, true, true],
                  colSpan: 2,
                  text: 'Constatation faite par ' + this.checkIfNullOrUndefind(obj.medecin.nom) +
                    ' ' + this.checkIfNullOrUndefind(obj.medecin.prenom),
                },
                '',
              ],
            ],
          },
        },
      ],
      styles: {
        name: {
          fontSize: 16,
          bold: true,
        },
      },
    };
  }

  passToMedecin() {
    this.router.navigateByUrl('/pages/bulletins-dm/medcins');
  }

  passToDecede() {
    this.router.navigateByUrl('/pages/bulletins-dm/decedes');
  }

  onCustomConfirm(event) {
    switch (event.action) {
      case 'edit':
        if (this.isAdmin) {
          this.reactiveForm.setValue({
            typeBulletin: event.data.typeBulletin,
            declaration: this.ConvertDate(event.data.declaration) as any as Date,
            cercle: event.data.cercle,
            diagnostique: event.data.diagnostique,
            lieuEntrement: event.data.lieuEntrement,
            province: event.data.province,
            residece: event.data.residece,
            cimetiere: event.data.cimetiere,
            numTombe: event.data.numTombe,
            compostage: event.data.compostage,
            medecin: event.data.medecin.id,
            decede: event.data.decede.id,
            centre: event.data.centre,
          });
          this.NomDecede.forEach(value => {
            if (value.id === event.data.decede.id) {
              this.reactiveForm.controls['decede'].setValue(value.nom);
            }
          });
          this.NomDMedcin.forEach(value => {
            if (value.id === event.data.medecin.id) {
              this.reactiveForm.controls['medecin'].setValue(value.nom);
            }
          });
          this.id = event.data.id;

        } else {
          this.toastService.toastOfEdit('warning');
        }
        break;
      case 'bulletin':

        const documentDefinition = this.genererBulletin(event.data);
        pdfMake.createPdf(documentDefinition).open();
        this.toastService.showToast('success', 'PDf ouvert',
          'Le BULLETIN DE DECES ET DE MORTINATALITE est ouvert dans un nouvel onglet ');

        break;
      case 'delete':
        if (this.isAdmin) {
          if (window.confirm('Vous êtes sûr de vouloir supprimer ?')) {
            this.service.delete(event.data.id).subscribe(data => {
              this.source = this.source.filter(item => item.id !== data.id);
            });
            this.toastService.toastOfDelete('success');
          }
        } else {
          this.toastService.toastOfDelete('warning');
        }
        break;
    }
  }

  ConvertDate(date) {
    if (date !== undefined)
      return formatDate(date, 'yyyy-MM-dd', 'en-US', '+1');
  }
  onChangeData(data) {

}
  onChange() {

    this.NomDecede.forEach(value => {
      if (value.nom === this.reactiveForm.get('decede').value) {
        this.serviceD.getById(value.id).subscribe(decede => {
          this.Bulletins.decede = decede;
          this.DecedeHumain = decede;
        });
      } else {

      }
    });
    this.NomDMedcin.forEach(value => {
      if (value.nom === this.reactiveForm.get('medecin').value) {
        this.serviceM.getById(value.id).subscribe(medecin => {
          this.Bulletins.medecin = medecin;
          this.MedecinHumain = medecin;
        });
      }
    });
  }

  filter(value: string , list: any[]): string[] {
    const filterValue = value.toLowerCase();
    return list.filter(optionValue => optionValue.toLowerCase().includes(filterValue));

  }

  getFilteredOptions(value: string, list: any[]): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filter(filterString , list)),
    );
  }

  onChangeMedcin() {
    this.filteredListMedcin$ = this.getFilteredOptions(this.reactiveForm.controls['medecin'].value, this.listMedcin);

  }

  onChangeDecede() {
    this.filteredListDecede$ = this.getFilteredOptions(this.reactiveForm.controls['decede'].value, this.listDecede);
  }

  onSelectionChangeMedcin($event) {
    this.filteredListMedcin$ = this.getFilteredOptions($event, this.listMedcin);
    this.onChange();
  }
  onSelectionChangeDecede($event) {
    this.filteredListDecede$ = this.getFilteredOptions($event, this.listDecede);
    this.onChange();
  }


  show() {
    if (this.medecinDetails === true ) {
      this.medecinDetails = false;
    } else {
      this.medecinDetails = true;
    }

  }
}
