import {Component, Input, OnChanges, OnInit, TemplateRef, ViewChild} from '@angular/core';
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
import {CauseService} from '../../../@core/backend/common/services/Cause.service';
import {ToastrService} from '../../../@core/backend/common/services/toastr.service';
import {Router} from '@angular/router';
import {LogoBase64Service} from '../../../@core/backend/common/services/logo-base64.service';

import {DataBulletinsService} from './dataBulletins.service';

import {Observable, of} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {NbDialogRef, NbDialogService} from '@nebular/theme';
import {ShowDialogComponent} from '../../show-dialog/show-dialog.component';
import {DomSanitizer} from '@angular/platform-browser';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'ngx-bulletins',
  templateUrl: './bulletins.component.html',
  styleUrls: ['./bulletins.component.scss'],
  providers: [BulletinsService, DecedesService,
    MedecinsService, UsersService, CauseService,
    ShowDialogComponent, DataBulletinsService],
})

export class BulletinsComponent implements OnInit, OnChanges {
  public medecinDetails = false;
  public id = null;
  public filterMedecin = [];
  public filterDecede = [];
  public Bulletins: Bulletins = new Bulletins();
  public data: any;
  public source: Array<Bulletins>;
  public numRgtr: number = null;
  public isAdmin: boolean = false;
  public DecedeHumain = new Decedes();
  public MedecinHumain: Medecins = new Medecins();
  // list pour ngx-select
  public listDecede = [];
  public listMedcin = [];
  public jstoday = '';
  public c: string;
  public i = 0;
  constructor(private service: BulletinsService,
              private serviceD: DecedesService,
              private serviceM: MedecinsService,
              private serviceS: SmartTableData,
              private userservice: UsersService,
              private logoBase64: LogoBase64Service,
              private serviceC: CauseService,
              private dialogService: NbDialogService,
              private sanitizer: DomSanitizer,
              public  dataBulletins: DataBulletinsService,
              private toastService: ToastrService) {}
  ngOnChanges(changes: import('@angular/core').SimpleChanges): void {
    throw new Error('Method not implemented.');
  }
  // get all bulletins data
  public getAll() {
    this.service.getAll().subscribe(data => {
      this.source = data;
    });
  }
  // get all Decede data
  public getAllD() {
    this.serviceD.getAll().subscribe(data => {
      this.listDecede.push({text: 'Ajouter un Décédé....' , id: 0, obj : null});
      data.forEach(obj => {
        this.listDecede.push({text: obj.nom + ' ' + obj.prenom, id: obj.id, obj : obj});
        this.filterDecede.push({
          id: obj.id,
          value: obj.nom + ' ' + obj.prenom,
          title: obj.nom + ' ' + obj.prenom,
        });
        this.settingD();
      });
    });
  }
  // get all medecin data
  public getAllM() {
    this.serviceM.getAll().subscribe(dataa => {
      this.listMedcin.push({text: 'Ajouter un Médecin....' , id: 0, obj : null});
      dataa.forEach(obj => {
        this.listMedcin.push({text: obj.nom + ' ' + obj.prenom, id: obj.id , obj : obj});
        this.filterMedecin.push({
          id: obj.id,
          value: obj.nom + ' ' + obj.prenom,
          title: obj.nom + ' ' + obj.prenom,
        });
      });
      this.settingM();

    });
  }
  // filter setting medecin
  public settingM() {
    this.dataBulletins.settings.columns.medecin.filter.config.list = this.filterMedecin;
    this.dataBulletins.settings = Object.assign({}, this.dataBulletins.settings);
  }
  // filter setting medecin
  public settingD() {
    this.dataBulletins.settings.columns.decede.filter.config.list = this.filterDecede;
    this.dataBulletins.settings = Object.assign({}, this.dataBulletins.settings);
  }
  // get user and verify is admin or not
  public getUser() {
    this.userservice.getCurrentUser().subscribe(data => {
      this.isAdmin = data.role.includes('ADMIN');
    });
  }

  ngOnInit() {
    this.getAll();
    this.getUser();
    this.getAllD();
    this.getAllM();
  }



  createBulletinFromForm(): Bulletins {
    const formValues = this.dataBulletins.reactiveForm.value;
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
    return this.dataBulletins.reactiveForm.get(name);
  }

  passingMedecinDecedeToTheFormControle () {
    if (this.DecedeHumain != null) {
      this.dataBulletins.reactiveForm.controls['decede'].setValue(this.DecedeHumain);
    }
    if (this.MedecinHumain != null) {
      this.dataBulletins.reactiveForm.controls['medecin'].setValue(this.MedecinHumain);
    }
  }

  onSubmit() {
    this.passingMedecinDecedeToTheFormControle();
    if (this.dataBulletins.reactiveForm.valid) {
      const bulletin: Bulletins = this.createBulletinFromForm();
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
      this.dataBulletins.reactiveForm.reset();
    } else {
      if (this.isAdmin) {

        bulletin.medecin = this.MedecinHumain;
        bulletin.decede = this.DecedeHumain;
            this.service.update(bulletin).subscribe(data1 => {
              this.source = this.source.map(e => e);
            });
        this.medecinDetails = false;
        this.dataBulletins.reactiveForm.reset();
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
                  text: 'N° de l\'acte au registre des décès ' +
                    this.checkIfNullOrUndefind(this.DecedeHumain.numRegister) +
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
                  text: 'N° de l\'acte au registre  ' + this.checkIfNullOrUndefind(this.DecedeHumain.numRegister),
                  border: [true, false, false, false],
                },
                {
                  text: 'N° de compostage:' + this.checkIfNullOrUndefind(this.Bulletins.compostage),
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
                    'Province ou Prefecture: ' + this.checkIfNullOrUndefind(this.Bulletins.province),
                    'Cercle: ' + this.checkIfNullOrUndefind(this.Bulletins.cercle),
                    'Municipalité /Centre/ Commune: ' + this.checkIfNullOrUndefind(this.Bulletins.centre),
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
                    'Province ou Prefecture: ' + this.checkIfNullOrUndefind(this.DecedeHumain.provinceD),
                    'Cercle: ' + this.checkIfNullOrUndefind(this.DecedeHumain.prefectureD),
                    'Municipalité /Centre/ Commune: ' + this.checkIfNullOrUndefind(this.DecedeHumain.communeD),
                  ],
                },
              ],
              [
                {
                  text: 'Milieu de résidnce:',
                  border: [true, false, false, true],
                },
                {
                  text: this.checkIfNullOrUndefind(this.Bulletins.residece),
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
                  text: this.checkIfNullOrUndefind(this.Bulletins.typeBulletin),
                },
              ],
              [
                {
                  border: [true, false, false, false],
                  text: 'Date de décès :',
                },
                {
                  border: [false, false, true, false],
                  text: this.checkIfNullOrUndefind(this.jstoday),
                },
              ],
              [
                {
                  border: [true, false, false, false],
                  text: 'Lieu où décès est survenu:',
                },
                {
                  border: [false, false, true, false],
                  text: this.checkIfNullOrUndefind(this.DecedeHumain.lieuxDeces),
                },
              ],
              [
                {
                  border: [true, false, false, false],
                  text: 'Sexe :',
                },
                {
                  border: [false, false, true, false],
                  text: this.checkIfNullOrUndefind(this.DecedeHumain.sexe),
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
                  text: this.checkIfNullOrUndefind(this.DecedeHumain.nationalite),
                },
              ],
              [
                {
                  border: [true, false, false, false],
                  text: 'Etat matrimonial :',
                },
                {
                  border: [false, false, true, false],
                  text: this.checkIfNullOrUndefind(this.DecedeHumain.etat),
                },
              ], [
                {
                  border: [true, false, false, true],
                  text: 'Profession :',
                },
                {
                  border: [false, false, true, true],
                  text: this.checkIfNullOrUndefind(this.DecedeHumain.profession),
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
                    'Cause initiale: ' + this.checkIfNullOrUndefind(this.DecedeHumain.causeInitial),
                    'Cause immédiate: ' + this.checkIfNullOrUndefind(this.DecedeHumain.causeImmdiate),
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
                    'Cause: ' + this.checkIfNullOrUndefind(this.DecedeHumain.causeMort),
                  ],
                },
              ],
              [
                {
                  border: [true, false, true, true],
                  colSpan: 2,
                  text: 'Constatation faite par ' +
                    this.checkIfNullOrUndefind(this.MedecinHumain.nom) + ' ' +
                    this.checkIfNullOrUndefind(this.MedecinHumain.prenom),
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


  public onEdit (event) {
    this.dataBulletins.reactiveForm.setValue({
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
    this.id = event.data.id;
  }
  open(data) {
    this.dialogService.open(ShowDialogComponent, {
      context: {
        title: 'Informations sur le ' + data.typeBulletin + ' du décédé '
          + data.decede.nom + ' ' + data.decede.prenom,
        list : [
          {key: 'type de Bulletin', value : data.typeBulletin},
          {key: 'Date de déclaration', value : this.ConvertDate(data.declaration) as any as Date},
          {key: 'Médecin', value : data.medecin.nom + ' ' + data.medecin.prenom},
          {key: 'Décédé', value : data.decede.nom + ' ' + data.decede.prenom},
          {key: 'Province ou préfécture', value : data.province},
          {key: 'Cercle', value : data.cercle},
          {key: 'Centre', value : data.centre},
          {key: 'diagnostique attestation', value : data.diagnostique},
          {key: 'milieu de résidence', value : data.residece},
          {key: 'Lieu d\'enterrement', value : data.lieuEntrement},
          {key: 'Cimetière', value : data.cimetiere},
          {key: 'Numéro de tombe ', value : data.numTombe},
          {key: 'N° Compostage', value : data.compostage},
        ],
        showInfo : true,
      },
    });
  }

  onCustomConfirm(event) {
    switch (event.action) {
      case 'info':
       this.open(event.data);
        break;
      case 'edit':
        if (this.isAdmin) {
            this.onEdit(event);
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
    if (date !== undefined && date !== null ) {
      return formatDate(date, 'yyyy-MM-dd', 'en-US', '+1');
    } else {
      return null;
    }
  }

  show() {
    if (this.medecinDetails === true ) {
      this.medecinDetails = false;
    } else {
      this.medecinDetails = true;
    }

  }



  // ngx-select
  // Select and remove function Medecin
  public doSelectM (value: any) {
    if (value === 0) {
      this.dataBulletins.passToMedecin();
    } else {
      let medecin;
      if (typeof value === 'string') {
        medecin = this.listMedcin.find( x => x.text === value).obj;
      } else {
        medecin = this.listMedcin.find( x => x.id === value).obj;
      }
      if (!(medecin === undefined)) {
        this.MedecinHumain = medecin;
      }
    }

  }
  public doRemoveM  (value: any) {
    this.MedecinHumain = null;
  }
  // Select and remove function Decede
  public doSelectD (value: any) {
    if (value === 0) {
      this.dataBulletins.passToDecede();
    } else {
      let decede;
      if (typeof value === 'string') {
        decede = this.listDecede.find( x => x.text === value).obj;
      } else {
        decede = this.listDecede.find( x => x.id === value).obj;
      }
      if (!(decede === undefined)) {
        this.DecedeHumain = decede;
      }
    }

    }
  public doRemoveD  (value: any) {
    this.DecedeHumain = null;
    }
}
