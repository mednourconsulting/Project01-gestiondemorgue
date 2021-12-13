import {Component, OnInit} from '@angular/core';
import {CertificatTransfertCorps} from '../../../@core/backend/common/model/CertificatTransfertCorps';
import {CertificatTransfertCorpsService} from '../../../@core/backend/common/services/CertificatTransfertCorps.service';
import {UsersService} from '../../../@core/backend/common/services/users.service';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
import {MedecinsService} from '../../../@core/backend/common/services/Medecins.service';
import {Medecins} from '../../../@core/backend/common/model/Medecins';
import {Decedes} from '../../../@core/backend/common/model/Decedes';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {DatePipe, formatDate} from '@angular/common';
import jsPDF from 'jspdf';
import {base64Str} from '../base64';
import {ToastrService} from '../../../@core/backend/common/services/toastr.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LogoBase64Service} from '../../../@core/backend/common/services/logo-base64.service';
import {DomSanitizer} from "@angular/platform-browser";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'ngx-transfert-corps',
  templateUrl: './transfert-corps.component.html',
  styleUrls: ['./transfert-corps.component.scss'],
  providers: [CertificatTransfertCorpsService, UsersService, DecedesService, MedecinsService],
})
export class TransfertCorpsComponent implements OnInit {
  cercueil = ['En zinc et bois', 'En bois'];
  cercueilList = [{value: 'En zinc et bois', title: 'En zinc et bois'}, {value: 'En bois', title: 'En bois'}];
  destinationCorpsList = [{value: 'Tanger', title: 'Tanger'}, {value: 'Rabat', title: 'Rabat'}];
  trnsfrCorps: CertificatTransfertCorps = new CertificatTransfertCorps();
  NomDecede = [];
  isAdmin: boolean;
  reactiveForm: FormGroup;
  frPattern = '[a-zA-Zéàçèêûù()\'0-9 ]*';
  numberPattern = '[0-9]*';
  id = null;
  private filterMedecin = [];
  private filterDecede = [];
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
          title: this.sanitizer.bypassSecurityTrustHtml('<i class="fas fa-file-pdf"  data-toggle="tooltip" data-placement="top" title="Certificat" aria-hidden="true"></i>'),
        },
        {
          name: 'pdfArabe',
          title: this.sanitizer.bypassSecurityTrustHtml('<i class="far fa-file-pdf"  data-toggle="tooltip" data-placement="top" title="الشهادة" aria-hidden="true"></i>'),
        },
        {
          name: 'delete',
          title: this.sanitizer.bypassSecurityTrustHtml('<i class="fas fa-trash" data-toggle="tooltip" data-placement="top" title="Supprimer" aria-hidden="true"></i>'),
        },
        {
          name: 'edit',
          title: this.sanitizer.bypassSecurityTrustHtml('<i class="fas fa-edit"data-toggle="tooltip" data-placement="top" title="Modifier" aria-hidden="true"></i>'),
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
  source: Array<CertificatTransfertCorps>;
  defauntID: number;
  MedcinID: number;
  NomMedcin = [];
  today = new Date();
  jstoday = '';
  DecedeHumain: Decedes;
  MedecinHumain: Medecins;
  dd = '';
  dn = '';
  m: string;
  i = 0;
  constructor(private service: CertificatTransfertCorpsService,
              private serviceM: MedecinsService,
              private userservice: UsersService,
              private serviceDecede: DecedesService,
              private logoBase64: LogoBase64Service,
              private datePipe: DatePipe,
              private toastService: ToastrService,
              private fb: FormBuilder,
              private sanitizer: DomSanitizer,
  ) {
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy', 'en-US', '+1');
  }

  init() {
    this.service.getAll().subscribe(data => {
      this.source = data;
    });
    this.serviceDecede.getAll().subscribe(dataa => {
      dataa.forEach(obj => {
        this.NomDecede.push({nom: obj.nom, prenom: obj.prenom, id: obj.id});
        this.filterDecede.push({
          id: obj.id,
          value: obj.nom + ' ' + obj.prenom,
          title: obj.nom + ' ' +  obj.prenom,
        });
      });
    });
    this.serviceM.getAll().subscribe(data1 => {
      data1.forEach(obj => {
        this.NomMedcin.push({nom: obj.nom , prenom: obj.prenom, id: obj.id});
        this.filterMedecin.push({
          id: obj.id,
          value: obj.nom + ' ' + obj.prenom,
          title: obj.nom + ' ' +  obj.prenom,
        });
      });
      this.settings.columns.medecins.filter.config.list = this.filterMedecin;
      this.settings.columns.defunt.filter.config.list = this.filterDecede;
      this.settings = Object.assign({}, this.settings);
      });
  }

  ngOnInit() {
    this.userservice.getCurrentUser().subscribe(data => {
      this.isAdmin = data.role.includes('ADMIN');
    });
    this.init();
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
  generatePdf(action) {
    this.actualise();
    switch (action) {
      case 'francais':
        setTimeout(() => {
          const documentDefinition = this.getDocumentDefinition();
          pdfMake.createPdf(documentDefinition).open();
          this.toastService.showToast('primary', 'Pdf ouvert', 'Le CERTIFICAT DE TRANSFERT DU CORPS est ouvert dans un nouvel onglet');

        }, 500);
        break;
      case 'arabe':
        setTimeout(() => {
          this.pdf();
        }, 500);
        break;
    }
  }

  private getDocumentDefinition1(list) {

    // sessionStorage.setItem('resume', JSON.stringify());
    return {
      content: [
        {
          alignment: 'center',
          width: 70,
          height: 70,
          margin: [0, -10, 0, 10],
          image: this.logoBase64.getLogoBase64(),
        },
        {
           text: 'ROYAUME DU MAROC \n MINISTERE DE L\'INTERIEUR \n WILAYA DE LA REGION TANGER-TETOUAN-ELHOUCIMA' +
            ' \n COMMUNE DE TANGER \n DIVISION D\'HYGIENE ET PROTECTION DE L\'ENVIRONNEMENT \n CENTRE MEDICO-LEGAL',
          style: 'header',
        },
        {
          text: 'CERTIFICAT DU TRANSFERT DU CORPS',
          fontSize: 20,
          alignment: 'center',
          margin: [0, 10, 0, 40],
          bold: true,
        },
        {
          columns: [
            {
              text: 'Médecin : ', style: 'style',
            },
            {
              text: list.medecins.nom + ' ' + list.medecins.prenom, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Défunt : ', style: 'style',
            },
            {
              text: list.defunt.nom + ' ' + list.defunt.prenom, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Déclarant : ', style: 'style',
            },
            {
              text: list.declarant, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Date de déclaration : ', style: 'style',
            },
            {
              text: formatDate(list.declaration, 'dd-MM-yyyy', 'en-US', '+1'), style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'CIN du déclarant : ', style: 'style',
            },
            {
              text: list.cin, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'N° de téléphone  : ', style: 'style',
            },
            {
              text: list.tel, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Le corps sera transporté en cercueil  : ', style: 'style',
            },
            {
              text: list.cercueilType, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Destination du corps  : ', style: 'style',
            },
            {
              text: list.destination, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Fourgon mortuaire Mle  : ', style: 'style',
            },
            {
              text: list.mortuaire, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Société ou l\'administration chargé de l\'inhumation ou du transfert: ', style: 'style',
            },
            {
              text: '\n' + list.inhumationSociete, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Remarques : ', style: 'style',
            },
            {
              text: list.remarque, style: 'style',
            },
          ],
        },
        {
          text: 'Fait à Tanger le :' + this.jstoday,
          alignment: 'right',
          fontSize: 12,
          margin: [20, 30, 50, 5],
        },
      ],
      styles: {
        style: {
          fontSize: 14,
          margin: [0, 10, 0, 10],
        },
        header: {
          fontSize: 12,
          alignment: 'center',
        },
      },
    };
  }

  private getDocumentDefinition() {

    // sessionStorage.setItem('resume', JSON.stringify());
    return {
      content: [
        {
          alignment: 'center',
          width: 70,
          height: 70,
          margin: [0, -10, 0, 10],
          image: this.logoBase64.getLogoBase64(),
        },
        {
           text: 'ROYAUME DU MAROC \n MINISTERE DE L\'INTERIEUR \n WILAYA DE LA REGION TANGER-TETOUAN-ELHOUCIMA' +
            ' \n COMMUNE DE TANGER \n DIVISION D\'HYGIENE ET PROTECTION DE L\'ENVIRONNEMENT \n CENTRE MEDICO-LEGAL',
          style: 'header',
        },
        {
          text: 'CERTIFICAT DU TRANSFERT DU CORPS',
          fontSize: 20,
          alignment: 'center',
          margin: [0, 10, 0, 40],
          bold: true,
        },
        {
          columns: [
            {
              text: 'Médecin : ', style: 'style',
            },
            {
              text: this.MedecinHumain.nom + ' ' + this.MedecinHumain.prenom, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Défunt : ', style: 'style',
            },
            {
              text: this.DecedeHumain.nom + ' ' + this.DecedeHumain.prenom, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Déclarant : ', style: 'style',
            },
            {
              text: this.trnsfrCorps.declarant, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Date de déclaration : ', style: 'style',
            },
            {
              text: this.trnsfrCorps.declaration, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'CIN du déclarant : ', style: 'style',
            },
            {
              text: this.trnsfrCorps.cin, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'N° de téléphone  : ', style: 'style',
            },
            {
              text: this.trnsfrCorps.tel, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Le corps sera transporté en cercueil  : ', style: 'style',
            },
            {
              text: this.trnsfrCorps.cercueilType, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Destination du corps  : ', style: 'style',
            },
            {
              text: this.trnsfrCorps.destination, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Fourgon mortuaire Mle  : ', style: 'style',
            },
            {
              text: this.trnsfrCorps.mortuaire, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'La société ou l\'administration chargé       de l\'inhumation ou du transfert: ', style: 'style',
            },
            {
              text: '\n' + this.trnsfrCorps.inhumationSociete, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Remarques : ', style: 'style',
            },
            {
              text: this.trnsfrCorps.remarque, style: 'style',
            },
          ],
        },
        {
          text: 'Fait à Tanger le :' + this.jstoday,
          alignment: 'right',
          fontSize: 12,
          margin: [20, 30, 50, 5],
        },
      ],
      styles: {
        style: {
          fontSize: 14,
          margin: [0, 10, 0, 10],
        },
        header: {
          fontSize: 12,
          alignment: 'center',
        },
      },
    };
  }
  pdfArabe(list) {
    const doc = new jsPDF({
      compress: false,
      orientation: 'p',
      unit: 'px',
      format: 'a4',
    });
    const data = this.logoBase64.getLogoBase64();

    doc.addFileToVFS('unicodeMS.ttf', base64Str);
    doc.addFont('unicodeMS.ttf', 'unicodeMS', 'normal');
    /*doc.setTextColor(255, 0, 0);
    doc.setFillColor(135, 124, 45, 0);*/
    doc.setFont('unicodeMS');
    doc.addImage(data, 'PNG', 195, 0, 55, 55);
    doc.text('المملكة المغربية' + '\n' + 'وزارة الداخلية' + '\n' + 'ولاية جهة طنجة تطوان الحسيمة' + '\n' + 'جماعة طنجة'
      + '\n' + 'قسم حفظ الصحة و المحافظة على البيئة' +
      '\n' + 'مصلحة الطب الشرعي و حفظ الجثث و المقابر'
      + '\n' + 'مركز الطب الشرعي', 225, 70, { align: 'center' });
    doc.text('رخصة الدفن', 230, 177, {align: 'center'});
    doc.text(' يرخص في يوم', 400, 200, {align: 'right'});
    doc.text(' ' + formatDate(list.declaration, 'dd-MM-yyyy', 'en-US', '+1'), 200, 200, {align: 'right'});
    doc.text('  بدفن جثة المرحوم', 400, 230, {align: 'right'});
    doc.text(' ' + list.defunt.nomAR + ' ' + list.defunt.prenomAR, 200, 230, {align: 'right'});
    doc.text('  المتوفي بتاريخ', 400, 260, {align: 'right'});
    doc.text(' ' + formatDate(list.defunt.dateDeces, 'dd-MM-yyyy', 'en-US', '+1'), 200, 260, {align: 'right'});
    doc.text('  المزداد في', 400, 290, {align: 'right'});
    doc.text(' ' + formatDate(list.defunt.dateNaissance, 'dd-MM-yyyy', 'en-US', '+1'), 200, 290, {align: 'right'});
    doc.text('  الجنس', 400, 320, {align: 'right'});
    doc.text(' ' + this.getSexe(list.defunt.sexe), 200, 320, {align: 'right'});
    doc.text(' ملاحظة )1( : لا تقبل الجثة بالمقبرة إلا بتقديم رخصة الدفن', 350, 340, {align: 'right'});
    doc.text(' طنجة في' + this.jstoday, 150, 400, {align: 'right'});
    doc.text('إمضاء ', 100, 420);
    // doc.save('رخصة الدفن.pdf');
    doc.save('رخصة دفن المرحوم ' + list.defunt.nomAR + ' ' + list.defunt.prenomAR + '.pdf');
  }
  pdf() {
    this.actualise();
    const doc = new jsPDF({
      compress: false,
      orientation: 'p',
      unit: 'px',
      format: 'a4',
    });
    const data = this.logoBase64.getLogoBase64();

    doc.addFileToVFS('unicodeMS.ttf', base64Str);
    doc.addFont('unicodeMS.ttf', 'unicodeMS', 'normal');
    /*doc.setTextColor(255, 0, 0);
    doc.setFillColor(135, 124, 45, 0);*/
    doc.setFont('unicodeMS');
    doc.addImage(data, 'PNG', 200, 10, 50, 50);
    doc.text('المملكة المغربية' + '\n' + 'وزارة الداخلية' + '\n' + 'ولاية جهة طنجة تطوان الحسيمة' + '\n' + 'جماعة طنجة'
      + '\n' + 'قسم حفظ الصحة و المحافظة على البيئة' +
      '\n' + 'مصلحة الطب الشرعي و حفظ الجثث و المقابر'
      + '\n' + 'مركز الطب الشرعي', 225, 70, { align: 'center' });
    doc.text('رخصة الدفن', 210, 170, {align: 'center'});
    doc.text(' يرخص في يوم', 400, 200, {align: 'right'});
    doc.text(' ' + this.trnsfrCorps.declaration, 200, 200, {align: 'right'});
    doc.text('  بدفن جثة المرحوم', 400, 230, {align: 'right'});
    doc.text(' ' + this.DecedeHumain.nomAR + ' ' + this.DecedeHumain.prenomAR, 200, 230,
      {align: 'right'});
    doc.text('  المتوفي بتاريخ', 400, 260, {align: 'right'});
    doc.text(' ' + this.dd, 200, 260, {align: 'right'});
    doc.text('  المزداد في', 400, 290, {align: 'right'});
    doc.text(' ' + this.dn, 200, 290, {align: 'right'});
    doc.text('  الجنس', 400, 320, {align: 'right'});
    doc.text(' ' + this.m, 200, 320, {align: 'right'});
    doc.text(' ملاحظة )1( : لا تقبل الجثة بالمقبرة إلا بتقديم رخصة الدفن', 350, 340, {align: 'right'});
    doc.text(' طنجة في' + this.jstoday, 150, 400, {align: 'right'});
    doc.text('إمضاء ', 100, 420);
    // doc.save('رخصة الدفن.pdf');
    doc.save('رخصة دفن المرحوم ' + this.DecedeHumain.nomAR + ' ' + this.DecedeHumain.prenomAR + '.pdf');
  }
  actualise() {
    this.serviceDecede.getById(this.defauntID).subscribe(obj => {
      this.DecedeHumain = obj;
      this.dd = formatDate(obj.dateDeces, 'dd-MM-yyyy', 'en-US', '+1');
      this.dn = formatDate(obj.dateNaissance, 'dd-MM-yyyy', 'en-US', '+1');
      if (this.DecedeHumain.sexe === 'Femme') {
        this.m = 'أنثى';
      }
      if (this.DecedeHumain.sexe === 'Homme') {
        this.m = 'ذكر';
      }
      if (this.DecedeHumain.sexe === 'Indetermini') {
        this.m = 'غير محدد';
      }
    });
    this.serviceM.getById(this.MedcinID).subscribe(obj => {
      this.MedecinHumain = obj;
    });
  }
  getSexe(sexe) {
    if (sexe === 'Femme') {
      return 'أنثى';
    }
    if (sexe === 'Homme') {
      return 'ذكر';
    }
    if (sexe === 'Indeterminé') {
      return 'غير محدد';
    }
  }
  ConvertDate(date) {
    if (date !== undefined)
      return formatDate(date, 'yyyy-MM-dd', 'en-US', '+1');
  }
  onCustomConfirm(event) {
    switch (event.action) {
      case 'pdfFrancais':
        const documentDefinition = this.getDocumentDefinition1(event.data);
        pdfMake.createPdf(documentDefinition).open();
        this.toastService.showToast('primary', 'Pdf ouvert', 'Le CERTIFICAT TRANSFERT DE CORPS est ouvert dans un nouvel onglet');
        break;
      case 'pdfArabe':
        this.pdfArabe(event.data);
        this.toastService.showToast('primary', 'Téléchargement du Pdf ', 'Si vous n\'annuler pas le téléchargement du' +
          ' CERTIFICAT \'رخصة الدفن\' va bientôt être téléchargé');
        break;
      case 'delete':
        if (this.isAdmin) {
          if (window.confirm('Etes-vous sûr de vouloir supprimer?')) {
            this.service.delete(event.data.id).subscribe(data => {
              this.source = this.source.filter(item => item.id !== data.id);
            });
            this.toastService.toastOfDelete('success');

          }
        } else {
          // window.alert('Vous n\'avez pas des droits de suppression');
          this.toastService.toastOfDelete('warning');
        }
        break;
      case 'edit' :
        if (this.isAdmin) {
          this.reactiveForm.setValue({
            medecins: event.data.medecins.id,
            defunt: event.data.defunt.id,
            cercueilType: event.data.cercueilType,
            declaration: this.ConvertDate(event.data.declaration) as any as Date,
            remarque: event.data.remarque,
            declarant: event.data.declarant,
            tel: event.data.tel,
            destination: event.data.destination,
            mortuaire: event.data.mortuaire,
            inhumationSociete: event.data.inhumationSociete,
            cin: event.data.cin,
          });
          this.id = event.data.id;
        } else {
          this.toastService.toastOfEdit('warning');
        }
        break;
    }
  }

  createCertificatFromForm(): CertificatTransfertCorps {
    const formValues = this.reactiveForm.value;
    const certificat = new CertificatTransfertCorps();
    certificat.id = this.id;
    certificat.medecins = formValues.medecins;
    certificat.declarant = formValues.declarant;
    certificat.cin = formValues.cin;
    certificat.declaration = formValues.declaration;
    certificat.defunt = formValues.defunt;
    certificat.cercueilType = formValues.cercueilType;
    certificat.destination = formValues.destination;
    certificat.inhumationSociete = formValues.inhumationSociete;
    certificat.mortuaire = formValues.mortuaire;
    certificat.remarque = formValues.remarque;
    certificat.tel = formValues.tel;
    return certificat;
  }
  getControl(name: string): AbstractControl {
    return this.reactiveForm.get(name);
  }
  onSubmit() {
    if (this.reactiveForm.valid) {
      const certificat: CertificatTransfertCorps = this.createCertificatFromForm();
      this.doSave(certificat);
      this.id = null;
    } else {
      this.toastService.toastOfSave('validate');
    }
  }
  doSave(certificat) {
    if (this.id == null) {
      this.serviceM.getById(certificat.medecins).subscribe(obj1 => {
        certificat.medecins = obj1;
        this.serviceDecede.getById(certificat.defunt).subscribe(objj => {
          certificat.defunt = objj;
          this.service.create(certificat).subscribe(obj => {
            this.source.push(obj);
            this.source = this.source.map(e => e);
          });
        });
      });
      this.toastService.toastOfSave('success');
      this.reactiveForm.reset();
    } else {
      if (this.isAdmin) {
        this.serviceM.getById(certificat.medecins).subscribe(obj1 => {
          certificat.medecins = obj1;
          this.serviceDecede.getById(certificat.defunt).subscribe(objj => {
            certificat.defunt = objj;
            this.service.update(certificat).subscribe(obj => {
              this.source = this.source.map(e => e);
              this.init();
            });
          });
        });
        this.toastService.toastOfEdit('success');
        this.reactiveForm.reset();
      } else {
        this.toastService.toastOfEdit('warning');
      }
    }
  }
}
