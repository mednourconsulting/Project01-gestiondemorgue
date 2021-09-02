
import { Component, OnInit } from '@angular/core';
import {Decedes} from '../../../@core/backend/common/model/Decedes';
import {UsersService} from '../../../@core/backend/common/services/users.service';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
import {CauseService} from '../../../@core/backend/common/services/Cause.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {DatePipe, formatDate} from '@angular/common';
import {ToastrService} from '../../../@core/backend/common/services/toastr.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LogoBase64Service} from "../../../@core/backend/common/services/logo-base64.service";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'ngx-decedes',
  templateUrl: './decedes.component.html',
  styleUrls: ['./decedes.component.scss'],
  providers: [ DecedesService, UsersService, CauseService],
})
export class DecedesComponent implements OnInit {
  isAdmin: boolean;
  public id = null;
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
  CauseMort = ['accident', 'homicide', 'suicide', 'Inconnu',
    'noyade', 'brûlure', 'intoxication', 'traumatisme', 'Maladie'];
  causes = [];
  lieuList = [{value: 'Domicile', title: 'Domicile'},
    {value: 'Ecole/administration publique', title: 'Ecole/administration publique'},
    {value: 'Lieu de sport', title: 'Lieu de sport'},
    {value: 'Voie public', title: 'Voie public'},
    {value: 'Zone de commerce/service', title: 'Zone de commerce/service'},
    {value: 'Etablissement collectif', title: 'Etablissement collectif'},
    {value: 'Local industriel/chantier', title: 'Local industriel/chantier'},
    {value: 'Local industriel/chantier', title: 'Local industriel/chantier'},
    {value: 'Exploitation agricole', title: 'Exploitation agricole'},
    {value: 'Autre', title: 'Autre'},
    {value: 'Inconnu', title: 'Inconnu'}];
  decesFemmeList = [{value: 'Au cours de la grossesse', title: 'Au cours de la grossesse'},
    {value: 'Dans un délai de 42 jours après la terminaison de la grossesse',
      title: 'Dans un délai de 42 jours après la terminaison de la grossesse'},
    {value: 'Plus de 42 jours mais moind d\'un an après la terminaison de la grossesse',
      title: 'Plus de 42 jours mais moind d\'un an après la terminaison de la grossesse'}];
  provinceList = [{value: 'Tanger-Assilah', title: 'Tanger-Assilah'},
                  {value: 'M\'diq-Fnideq', title: 'M\'diq-Fnideq'},
                  {value: 'Tétouan', title: 'Tétouan'},
                  {value: 'Fahs-Anjra', title: 'Fahs-Anjra'},
                  {value: 'Larache', title: 'Larache'},
                  {value: 'Al Hoceïma', title: 'Al Hoceïma'},
                  {value: 'Chefchaouen', title: 'Chefchaouen'},
                  {value: 'Ouezzane', title: 'Ouezzane'}];
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="fa fa-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
      mode: 'inline',
    },
    delete: {
      deleteButtonContent: '<i class="fa fa-trash"></i>',
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
      id: {
        title: 'numéro de registre',
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
        type: 'string',
      },
      nationalite: {
        title: 'Nationalité ',
        type: 'string',
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
        title: 'Date décès',
        valuePrepareFunction: (data) => {
          const row: Date = new Date(data);
          return this.datePipe.transform(row, 'dd-MM-yyyy');
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
            selectText: 'Select',
            list: this.lieuDecesList,
          },
        },
      },
      natureMort: {
        title: 'Nature de mort',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select',
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
        type: 'html',
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
  decede: Decedes = new Decedes();
  source: Array<Decedes>;
  frPattern = '[a-zA-Zéàçèêûùï/()\'0-9 ]*';
  arPattern = '[\u0621-\u064A0-9 ]*';
  adressFrPattern = '[a-zA-Z0-9éàçèêûùï/()\'°, ]*';
  adressArPattern = '[\u0621-\u064A0-9°, ]*';
  heurePattern = '[0-9PAMpam:]*';
  private reactiveForm: FormGroup;
  private causesList = [];
  constructor(private service: DecedesService,
              private userservice: UsersService,
              private serviceCause: CauseService,
              private logoBase64: LogoBase64Service,
              private datePipe: DatePipe,
              private toastService: ToastrService,
              private fb: FormBuilder) {
  }
  init() {
    this.service.getAll().subscribe(data => {
    this.source = data;
    });
    this.reactiveForm = this.fb.group({
      nom: ['', [Validators.required, Validators.pattern(this.frPattern)]],
      prenom: ['', [Validators.required, Validators.pattern(this.frPattern)]],
      sexe: ['', [Validators.required]],
      dateDeces: ['', [Validators.required]],
      dateNaissance: ['', [Validators.required]],
      mortNe: [''],
      lieuNaiss: ['', [Validators.required, Validators.pattern(this.frPattern)]],
      nationalite: ['', [Validators.required, Validators.pattern(this.frPattern)]],
      cin: ['', [Validators.required, Validators.pattern(this.frPattern)]],
      adresse: ['', [Validators.required, Validators.pattern(this.adressFrPattern)]],
      etat: ['', [Validators.required]],
      fils: ['', [Validators.required, Validators.pattern(this.frPattern)]],
      heure: ['', [Validators.required, Validators.pattern(this.heurePattern)]],
      lieuxDeces: ['', [Validators.required]],
      provinceD: [''],
      prefectureD: ['', Validators.pattern(this.frPattern)],
      communeD: ['', Validators.pattern(this.frPattern)],
      natureMort: ['', [Validators.required]],
      causeMort: [''],
      causeInitial: [''],
      causeImmdiate: [''],
      profession: ['', [Validators.required]],
      obstacle: [''],
      autopsie: [''],
      operation: [''],
      resultatsAutopsie: [''],
      nomAR: ['', [Validators.required, Validators.pattern(this.arPattern)]],
      prenomAR: ['', [Validators.required, Validators.pattern(this.arPattern)]],
      lieuDecesAR: ['', [Validators.pattern(this.arPattern)]],
      nationaliteAR: ['', [Validators.pattern(this.arPattern)]],
      filsAR: ['', [Validators.required, Validators.pattern(this.arPattern)]],
      adresseAR: ['', [Validators.required, Validators.pattern(this.adressArPattern)]],
      ageMere: ['', Validators.pattern(this.frPattern)],
      ageGestationnel: ['', Validators.pattern(this.frPattern)],
      grossesseMultiple: [''],
      poidsNaissance: ['', Validators.pattern(this.frPattern)],
      decesGrossesse: [''],
      decesFemme: [''],
      contribueGros: [''],
      maladie: ['', Validators.pattern(this.frPattern)],
      dateServ: [''],
      lieuServ: [''],
      circonServ: [''],
      dateOperation: [''],
      motifOperation: ['', Validators.pattern(this.frPattern)],
      numRegister: [''],
    });
  }
  ngOnInit() {
    this.userservice.getCurrentUser().subscribe(data => {
      this.isAdmin = data.role.includes('ADMIN');
    });
    this.init();
    this.serviceCause.getAll().subscribe( data => {
      data.forEach ( obj => {
        this.causes.push({description: obj.description , id: obj.id}); });
    });
    this.service.getAll().subscribe(data => {
      this.source = data;
    });
    console.warn(this.causesList);
  }
  save() {
        this.service.create(this.decede).subscribe(data => {
         this.source.push(data);
         this.source = this.source.map(e => e);
          this.toastService.toastOfSave('success');
    });
  }
  private reset() {
    this.decede = new Decedes();
  }
  private checkIfNullOrUndefind(attribute) {
    if (attribute === null || attribute === undefined  ) {
      return ' ';
    } else {
      return attribute;
    }
  }
  onEditConfirm(event) {
    if (this.isAdmin) {
      this.service.getAll().subscribe(data => {
        event.confirm.resolve(event.newData);
        this.service.update(event.newData).subscribe(obj => {
          this.source.map(e => e);
          this.toastService.toastOfEdit('success');
        });
      });
    } else {
      this.toastService.toastOfEdit('warning');

    }
  }
  generatePdf(action = 'open') {
    const documentDefinition = this.getDocumentDefinition(this.decede);
    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;
      default: pdfMake.createPdf(documentDefinition).open(); break;
    }

  }
  ConvertDate(date) {
    if (date !== undefined)
      return formatDate(date, 'yyyy-MM-dd', 'en-US', '+1');
  }
  getTexte(value) {
    if (value === true)
      return 'Oui';
    else return 'Non';
  }
  getAgeParJour(DateNaiss , DateDeces ): number {
    DateNaiss = new Date(DateNaiss);
    DateDeces = new Date(DateDeces);
    return ((DateDeces.getTime() - DateNaiss.getTime()) / 86400000);
  }
  getAgeParAnnee(DateNaiss , DateDeces ): number {
    DateNaiss = new Date(DateNaiss);
    DateDeces = new Date(DateDeces);
    return ((DateDeces.getTime() - DateNaiss.getTime()) / 31536000000);
  }
  private getDocumentDefinition(list) {
    return {
      pageSize: 'A4',
      pageMargins: [10, 10, 10, 10],
      content: [
        {
          table: {
            widths: ['30%', '30%' , '40%'],
            height: 'auto',
            body: [
              [
                {
                  text: 'ROYAUME DU MAROC',
                  fontSize: 12,
                  alignment: 'left',
                  bold: true,
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
                  text: 'Région :  \n Préfecture /Province : \n Préfecture d\'arrondissements : \n Commune/ Arrondissement : ',
                  fontSize: 9,
                  alignment: 'left',
                  border: [false, true, true, false],
                },
              ],
              [
                {
                  colSpan: 3,
                  text: 'CERTIFICAT DE DECES ',
                  fontSize: 20,
                  alignment: 'center',
                  margin: [0, 0, 0, 10],
                  bold: true,
                  border: [true, false, true, false],
                },
                '',
              ],
            ],
          },
        },
        {
          table: {
            widths: ['75%', '25%'],
            height: 'auto',
            body: [
              [
                {
                  border: [true, false, true, true],
                  fontSize: 11,
                  lineHeight: 1.3,
                  // margin: [0, 10, 0, 10],
                  text: 'Décès survenu le:  ' + this.checkIfNullOrUndefind(this.ConvertDate(list.dateDeces)) + '  à '
                    + this.checkIfNullOrUndefind(list.heure) +
                    ' \tS\'agit-il d\'un mort-né ?  ' + this.checkIfNullOrUndefind(this.getTexte(list.mortNe)) +
                    '\n'
                    + 'lieu décès  :  ' + this.checkIfNullOrUndefind(list.lieuxDeces) + '\n'
                    + 'Nom:  ' + this.checkIfNullOrUndefind(list.nom) + '\t\t\t Prénom: ' +
                    list.prenom + '\t\t\t CIN: ' + this.checkIfNullOrUndefind(list.cin) + '\n'
                    + 'Sexe:  ' + this.checkIfNullOrUndefind(list.sexe) + '\t\t Nationalité: ' +
                    this.checkIfNullOrUndefind(list.nationalite)
                    + '\nDate de naissance:  ' + this.checkIfNullOrUndefind(this.ConvertDate(list.dateNaissance)) +
                    '\t\t Lieu de naissance: ' + this.checkIfNullOrUndefind(list.lieuNaiss)
                    + '\nAdresse du domicile habituel :  ' + this.checkIfNullOrUndefind(list.adresse)
                    + '\nY\'a-t-il un obstacle médico-légal?  ' +
                    this.checkIfNullOrUndefind(this.getTexte(list.obstacle))
                    + '\n N° de l\'acte au registre des décès :  ' + this.checkIfNullOrUndefind(list.id),
                },
                {
                  border: [true, false, true, true],
                  fontSize: 10,
                  text: '\n Signuature et cachet \n\n\n\n\n\n Constatation faite : \n A: \n le:',
                },
              ],
            ],
          },
        },
        {
          text: 'Partie à détacher et destinée au bureau d\'état civil \n -----------------------------------------------------------------------------------------------------------------------------------------------------',
          bold: true,
          alignment: 'center',
          fontSize: 10,
        },
        {
          table: {
            widths: ['25%' , '75%'],
            body: [
              [
                { text: 'Partie destinée au Ministère de la santé',
                  alignment: 'center',
                  border: [true, true, true, false],
                  fontSize: 14,
                  colSpan: 2,
                  bold: true,
                },
                '',
              ],
              [
                {
                  text: 'N° de l\'acte au registre des décès : ' + this.checkIfNullOrUndefind(list.id) ,
                  border: [true, false, true, false],
                  fontSize: 10,
                  colSpan: 2,
                },
                '',
              ],
              [
                {
                  text: 'Identification',
                  fontSize: 10,
                  colSpan: 2,
                  bold: true,
                  alignment: 'center',
                  style: 'souligne',
                },
                '',
              ],
              [
                {text: 'Lieu de survenue du décès:',
                  border: [true, true, false, false],
                  fontSize: 12,
                  margin: [0, 5, 0, 0]},
                {border: [false, true, true, false],
                  margin: [0, 5, 0, 0],
                  fontSize: 10,
                  // margin: [0, 10, 0, 10],
                  ul: [
                    'Préfecture /Province: ' + list.provinceD,
                    'Préfecture d\'arrondissements: ' + list.prefectureD,
                    'Commune/ Arrondissement: ' + list.communeD,
                  ],
                },
              ],
              [
                // { text: 'N° de l\'acte au registre des décès : ' + this.decede.id },
                {text: 'Domicile habituel:',
                  border: [true, false, false, false],
                  fontSize: 12,
                  // margin: [0, 10, 0, 10]
                },
                {border: [false, false, true, false],
                  fontSize: 10,
                  // margin: [0, 10, 0, 10],
                  ul: [
                    'Préfecture /Province: ' + list.provinceD,
                    'Préfecture d\'arrondissements: ' + list.prefectureD,
                    'Commune/ Arrondissement: ' + list.communeD,
                  ],
                },
              ],
              [{text: 'Milieu de résidence:' , border: [true, false, false, false],
                fontSize: 12,
                // margin: [0, 10, 0, 10]
              },
                {text: list.lieuxDeces , border: [false, false, true, false],
                  fontSize: 12,
                }],
            ],
          },
        },
        {
          table: {
            widths: '*',
            body: [
              [
                {
                  text: 'Renseignements',
                  fontSize: 10,
                  bold: true,
                  alignment: 'center',
                  style: 'souligne',
                },
              ],
              [
                {
                  border: [true, true, true, false],
                  margin: [0, 5, 0, 0],
                  text: 'S\'agit-il d\'un mort-né?  ' + this.checkIfNullOrUndefind(this.getTexte(list.mortNe) ) +
                    '\t \t Lieu de décès : ' + this.checkIfNullOrUndefind(list.lieuxDeces)
                    + '\n Sexe : ' + this.checkIfNullOrUndefind(list.sexe) + ' \t\t\t Date de décès : '
                    + this.checkIfNullOrUndefind(this.ConvertDate(list.dateDeces))  + '\t\t\t Nationalité : ' +
                    list.nationalite + '\nEtat matrimonial : ' + this.checkIfNullOrUndefind(list.etat) +
                    '\t\t\t\tDate de naissance : ' + this.ConvertDate(list.dateNaissance),
                },
              ],
            ],
          },
        },
        {
          table: {
            widths: ['30%' , '50%' , '20%'],
            body: [
              [
                {
                  text: 'Cause du décès',
                  fontSize: 10,
                  colSpan: 3,
                  bold: true,
                  alignment: 'center',
                  style: 'souligne',
                },
                '',
                '',
              ],
              [
                {
                  border: [true, true, false, false],
                  text: 'PARTIE I',
                  colSpan: 2,
                  bold: true,
                  style: 'souligne',
                },
                '',
                {
                  text: 'Intervalle entre le début du processus morbide et le décès',
                  fontSize: 9,
                  border: [true, true, true, false],
                },
              ],
              [
                {
                  text: 'Indiquer dans leur ordre de survenue la chaine des évènements causaux (le cas échéant)',
                  border: [true, false, false, false],
                  fontSize: 10,
                },
                {
                  text: 'a)  ...................................................................... \n due à ',
                  border: [false, false, false, false],
                },
                {
                  text: '',
                  rowSpan: 4,
                  border: [true, false, true, true],
                },
              ],
              [
                {
                  text: 'Inscrire la cause initiale du décès sur la dernière ligne renseignée.',
                  fontSize: 10,
                  border: [true, false, false, false],
                },
                {
                  text: 'b)  ...................................................................... \n due à  ',
                  border: [false, false, false, false],
                },
                '',
              ],
              [
                {
                  text: 'Indiquer la maladie ou l\'état morbide ayant directement provoqué le décès sur la ligne a',
                  fontSize: 10,
                  rowSpan: 2,
                  border: [true, false, false, true],
                },
                {
                  text: 'c)  ...................................................................... \n due à  ',
                  border: [false, false, false, false],
                },
                '',
              ],
              [
                '',
                {
                  text: '\n d)  ...................................................................... \n ',
                  border: [false, false, false, true],
                },
                '',
              ],
              [
                {
                  border: [true, false, true, false],
                  text: 'PARTIE II ', style: 'souligne',
                  bold: true,
                  colSpan: 3,
                },
                '',
                '',
              ],
              [
                {
                  border: [true, false, true, true],
                  text: ' Autre états morbides ayant significativement contribué au décès. \n ............................................................................................................................................................................................................................................................................................................................................................................................. \n',
                  fontSize: 11,
                  colSpan: 3,

                },
                '',
                '',
              ],
            ],
          },
          pageBreak: 'after',
        },
        {
          text: '',
          margin: [0, 300, 0, 10],
        },
        {
          table: {
            widths: ['50%' , '50%'],
            body: [
              [
                {
                  border: [true, true, true, false],
                  text: 'Informations complémentaires',
                  fontSize: 10,
                  colSpan: 2,
                  bold: true,
                  alignment: 'center',
                  style: 'souligne',
                },
                '',
              ],
              [
                {
                  border: [true, true, true, false],
                  text: 'Circonstances du décès : \t' + this.checkIfNullOrUndefind(list.causeMort) ,
                  fontSize: 10,
                  colSpan: 2,
                  bold: true,
                },
                '',
              ],
              [
        {
                  text: 'En cas de cause externe :',
                  fontSize: 12,
                  decoration: 'underline',
                  bold: true,
                  border: [true, true, true, false],
                },
                {
                  text: 'Autopsie :',
                  decoration: 'underline',
                  bold: true,
                  fontSize: 12,
                  border: [true, true, true, false],
                },
              ],
              [
                {
                  border: [true, false, true, true],
                  text: 'Date de survenue : ' + this.checkIfNullOrUndefind(this.ConvertDate(list.dateServ)) +
                    '\n\n Lieu de survenue : ' + this.checkIfNullOrUndefind(list.lieuServ) + '\n\n Circonstances de survenue : ' +
                    this.checkIfNullOrUndefind(list.circonServ) ,
                  rowSpan: 3,
                  fontSize: 12,
                },
                {
                  border: [true, false, true, true],
                  lineHeight: 1.3,
                  text: 'Une autopsie a-t-elle été demandé ? ' + this.checkIfNullOrUndefind(list.autopsie) +
                    '\n Si oui les résultats ont-ils été utilisés dans certification ? ' +
                    this.checkIfNullOrUndefind(list.resultatsAutopsie) ,
                  fontSize: 12,
                },
              ],
              [
                '',
                {
                  text: 'Intervention chirurgicale récente: ',
                  fontSize: 12,
                  decoration: 'underline',
                  bold: true,
                  border: [false, true, true, false],
                },
              ],
              [
                '',
                {
                  lineHeight: 1.3,
                  text: 'Intervention chirurgicale récente: \n Une operation a-t-elle ' +
                    'été effectuées lors des 4 dernières semaines ? ' + this.checkIfNullOrUndefind(list.operation)  +
                    '\n Si oui, Date de l\'opération: ' +
                    this.checkIfNullOrUndefind(this.ConvertDate(list.dateOperation)) +
                    ' \n motif de l\'operation:  ' + this.checkIfNullOrUndefind(list.motifOperation) ,
                  fontSize: 12,
                  border: [false, false, true, false],
                },
              ],
              [
                {
                  text: 'Décès d\'une femme de 12-54 ans:',
                  fontSize: 12,
                  decoration: 'underline',
                  bold: true,
                  border: [true, true, true, false],
                },
                {
                  text: 'Décès périnatal :',
                  decoration: 'underline',
                  bold: true,
                  fontSize: 12,
                  border: [true, true, true, false],
                },
              ],
              [
                {
                  lineHeight: 1.3,
                  text: 'Le décès est-il survenu pendant une grosesse ou moins d\'un an après sa terminaison ?' +
                    this.checkIfNullOrUndefind(list.decesGrossesse)
                   +
                    '\nSi oui, le décès de la femme est-il survenu : ' + this.checkIfNullOrUndefind(list.decesFemme)  +
                    '\nLa grossesse a-t-elle contribué au decès ? ' + this.checkIfNullOrUndefind(list.contribueGros),
                  fontSize: 12,
                  border: [true, false, true, true],
                },
                {
                  fontSize: 12,
                  border: [true, false, true, true],
                  lineHeight: 1.3,
                  text: '-Grossesse multiple ? ' + this.checkIfNullOrUndefind(list.grossesseMultiple)  + '\n' +
                    '-Age gestationnel: ' + this.checkIfNullOrUndefind(list.ageGestationnel)  + '\n' +
                    '-Poids à la naissance (en grammes): ' + this.checkIfNullOrUndefind(list.poidsNaissance) + '\n' +
                    '-Age de la mère en années: ' + this.checkIfNullOrUndefind(list.ageMere) + '\n' +
                    '-Maladie ou affection maternelle ayant affecté le fœtus ou le nouveau-né: ' +
                    this.checkIfNullOrUndefind(list.maladie) },
              ],
              [
                {
                  border: [true, true, false, false],
                  text: 'Constatation faite par: ',
                  fontSize: 12,
                  decoration: 'underline',
                  bold: true,
                },
                {
                  border: [false, true, true, false],
                  text: 'Signature et cachet ',
                  fontSize: 12,
                  decoration: 'underline',
                  alignment: 'right',
                  bold: true,
                },
              ],
              [
                {
                  border: [true, false, false, true],
                  text: '\n\n\n ',

                },
                {
                  border: [false, false, true, true],
                  text: 'Nom de l\'établissement: \n' +
                    'Service: \n' +
                    'Numero de téléphone: ',
                  fontSize: 12,
                  lineHeight: 1.3,
                },
              ],
            ],
          },
        },
      ],
      styles: {
        border: [true, true, true, true],
        style: {
          fontSize: 14,

        },
        souligne: {
          decoration: 'underline',
        },
        header: {
          fontSize: 12,
          alignment: 'left',
        },
      },
    };
  }
  onCustomConfirm(event) {
    switch ( event.action) {
      case 'pdfFrancais':
        const documentDefinition = this.getDocumentDefinition(event.data);
        pdfMake.createPdf(documentDefinition).open();
        this.toastService.showToast('success', 'PDf ouvert',
          'Le certificat de deces est ouvert dans un nouvel onglet ');
        break;
      case 'edit':
        if (this.isAdmin) {
          this.reactiveForm.setValue({
            nom: event.data.nom,
            prenom: event.data.prenom,
            sexe: event.data.sexe,
            dateDeces: this.ConvertDate(event.data.dateDeces) as any as Date,
            dateNaissance: this.ConvertDate(event.data.dateNaissance) as any as Date,
            mortNe: event.data.mortNe,
            lieuNaiss: event.data.lieuNaiss,
            nationalite: event.data.nationalite,
            cin: event.data.cin,
            adresse: event.data.adresse,
            etat: event.data.etat,
            fils: event.data.fils,
            heure: event.data.heure,
            lieuxDeces: event.data.lieuxDeces,
            provinceD: event.data.provinceD,
            prefectureD: event.data.prefectureD,
            communeD: event.data.communeD,
            natureMort: event.data.natureMort,
            causeMort: event.data.causeMort,
            causeInitial: event.data.causeInitial,
            causeImmdiate: event.data.causeImmdiate,
            profession: event.data.profession,
            obstacle: event.data.obstacle,
            autopsie: event.data.autopsie,
            operation: event.data.operation,
            resultatsAutopsie: event.data.resultatsAutopsie,
            nomAR: event.data.nomAR,
            prenomAR: event.data.prenomAR,
            lieuDecesAR: event.data.lieuDecesAR,
            nationaliteAR: event.data.nationaliteAR,
            filsAR: event.data.filsAR,
            adresseAR: event.data.adresseAR,
            ageMere: event.data.ageMere,
            ageGestationnel: event.data.ageGestationnel,
            grossesseMultiple: event.data.grossesseMultiple,
            poidsNaissance: event.data.poidsNaissance,
            decesGrossesse: event.data.decesGrossesse,
            decesFemme: event.data.decesFemme,
            contribueGros: event.data.contribueGros,
            maladie: event.data.maladie,
            dateServ: event.data.dateServ,
            lieuServ: event.data.lieuServ,
            circonServ: event.data.circonServ,
            dateOperation: this.ConvertDate(event.data.dateOperation) as any as Date,
            motifOperation: event.data.motifOperation,
            numRegister: event.data.numRegister,
          });
          this.id = event.data.id;
        } else {
          this.toastService.toastOfEdit('warning');
        }
        break;
      case 'delete':
        if (this.isAdmin) {
          if (window.confirm('Vous êtes sûr de vouloir supprimer ?')) {
            // event.confirm.resolve(event.data);
            this.service.delete(event.data.id).subscribe(data => {
              if (data !== null) {
                this.source = this.source.filter(item => item.id !== data.id);
                this.toastService.toastOfDelete('success');
              } else {

                this.toastService.showToast('danger', 'Suppression inachevée',
                  'Vous ne pouvez pas supprimer cet décède, puisque il a des certificats');
              }
            });
          }
        } else {
          this.toastService.toastOfDelete('warning');

        }
        break;
    }
  }
  getControl(name: string): AbstractControl {
    return this.reactiveForm.get(name);
  }
  createDecedeFromForm(): Decedes {
    const formValues = this.reactiveForm.value;
    const decede = new Decedes();
      decede.id = this.id;
      decede.nom = formValues.nom;
      decede.prenom = formValues.prenom;
      decede.sexe = formValues.sexe;
      decede.dateDeces = formValues.dateDeces;
      decede.dateNaissance = formValues.dateNaissance;
      decede.mortNe = formValues.mortNe;
      decede.lieuNaiss = formValues.lieuNaiss;
      decede.nationalite = formValues.nationalite;
      decede.cin = formValues.cin;
      decede.adresse = formValues.adresse;
      decede.etat = formValues.etat;
      decede.fils = formValues.fils;
      decede.heure = formValues.heure;
      decede.lieuxDeces = formValues.lieuxDeces;
      decede.provinceD = formValues.provinceD;
      decede.prefectureD = formValues.prefectureD;
      decede.communeD = formValues.communeD;
      decede.natureMort = formValues.natureMort;
      decede.causeMort = formValues.causeMort ;
      decede.causeInitial = formValues.causeInitial;
      decede.causeImmdiate = formValues.causeImmdiate ;
      decede.profession = formValues.profession;
      decede.obstacle = formValues.obstacle;
      decede.autopsie = formValues.autopsie ;
      decede.operation = formValues.operation;
      decede.resultatsAutopsie = formValues.resultatsAutopsie;
      decede.nomAR = formValues.nomAR;
      decede.prenomAR = formValues.prenomAR ;
      decede.lieuDecesAR = formValues.lieuDecesAR;
      decede.nationaliteAR = formValues.nationaliteAR;
      decede.filsAR = formValues.filsAR;
      decede.adresseAR = formValues.adresseAR;
      decede.ageMere = formValues.ageMere;
      decede.ageGestationnel = formValues.ageGestationnel;
      decede.grossesseMultiple = formValues.grossesseMultiple;
      decede.poidsNaissance = formValues.poidsNaissance;
      decede.decesGrossesse = formValues.decesGrossesse;
      decede.decesFemme = formValues.decesFemme;
      decede.contribueGros = formValues.contribueGros;
      decede.maladie = formValues.maladie ;
      decede.dateServ = formValues.dateServ;
      decede.lieuServ = formValues.lieuServ ;
      decede.circonServ = formValues.circonServ ;
      decede.dateOperation = formValues.dateOperation;
      decede.motifOperation = formValues.motifOperation ;
      decede.numRegister = formValues.numRegister;
    return decede;
  }
  doSave(decede) {
    if ( this.id == null) {
      this.service.create(decede).subscribe(obj => {
        // decede.numRegister = 'DC00' + decede.id;
        this.source.push(obj);
        this.source = this.source.map(e => e);
      });
      this.toastService.toastOfSave('success');
      this.reactiveForm.reset();
    } else {
      if (this.isAdmin) {
      this.service.update(decede).subscribe(data1 => {
        this.source = this.source.map(e => e);
        this.init();
        this.reactiveForm.reset();
      });
      this.toastService.toastOfEdit('success');
    } else {
      this.toastService.toastOfEdit('warning');
    }
  }
  }
  onSubmit() {
    if (this.reactiveForm.valid) {
      const decede: Decedes = this.createDecedeFromForm();
      console.warn('decede: ', decede);
      console.warn('formValues : ', this.reactiveForm.value);
      this.doSave(decede);
      this.id = null ;
    } else {
      this.toastService.toastOfSave('validate');
    }
  }
}
