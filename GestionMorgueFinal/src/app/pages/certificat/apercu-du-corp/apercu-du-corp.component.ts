import {Component, OnInit} from '@angular/core';
import {ApercuCorps} from '../../../@core/backend/common/model/ApercuCorps';
import {ApercuCorpsService} from '../../../@core/backend/common/services/ApercuCorps.service';
import {UsersService} from '../../../@core/backend/common/services/users.service';
import {MedecinsService} from '../../../@core/backend/common/services/Medecins.service';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
import pdfMake from 'pdfmake/build/pdfmake';
import jsPDF from 'jspdf';
import {DatePipe, formatDate} from '@angular/common';
import {base64Str} from '../base64';
import {Decedes} from '../../../@core/backend/common/model/Decedes';
import {Medecins} from '../../../@core/backend/common/model/Medecins';
import {ToastrService} from '../../../@core/backend/common/services/toastr.service';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LogoBase64Service} from '../../../@core/backend/common/services/logo-base64.service';
import {DomSanitizer} from "@angular/platform-browser";


// pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'ngx-apercu-du-corp',
  templateUrl: './apercu-du-corp.component.html',
  styleUrls: ['./apercu-du-corp.component.scss'],
  providers: [ApercuCorpsService, UsersService, MedecinsService, DecedesService],
})
export class ApercuDuCorpComponent implements OnInit {
  ApercuCorps: ApercuCorps = new ApercuCorps();
  isAdmin: boolean;
  NomMedcin = [];
  NomDeced = [];
  DecedeHumain: Decedes;
  source: Array<ApercuCorps>;
  MedecinID: number;
  defauntID: number;
  today = new Date();
  jstoday = '';
  frPattern = '[a-zA-Zéàçèêûù()\'0-9 ]*';
  reactiveForm: FormGroup;
  e: string;
  MedecinHumain: Medecins;
  id = null;
  private filterMedecin = [];
  private filterDecede = [];
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
          title: this.sanitizer.bypassSecurityTrustHtml('<i class="fas fa-edit" data-toggle="tooltip" data-placement="top" title="Modifier" aria-hidden="true"></i>'),
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
          const raw: Date = new Date(data);
          return this.datePipe.transform(raw, 'dd-MM-yyyy');
        },
      },
    },
  };
  constructor(private service: ApercuCorpsService,
              private userservice: UsersService,
              private serviceMedcin: MedecinsService,
              private serviceDecede: DecedesService,
              private logoBase64: LogoBase64Service,
              private datePipe: DatePipe,
              private toastService: ToastrService,
              private fb: FormBuilder,
              private sanitizer: DomSanitizer,
  ) {}

  init() {
    this.service.getAll().subscribe(data => {
      this.source = data;
    });
  }

  ngOnInit() {
    this.userservice.getCurrentUser().subscribe(data => {
      this.isAdmin = data.role.includes('ADMIN');
    });
    this.serviceDecede.getAll().subscribe(dataa => {
      dataa.forEach(obj => {
        this.NomDeced.push({nom: obj.nom, prenom: obj.prenom, id: obj.id});
        this.filterDecede.push({
          id: obj.id,
          value: obj.nom + ' ' + obj.prenom,
          title: obj.nom + ' ' +  obj.prenom,
        });
      });
    });
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy', 'en-US', '+0530');
    this.serviceMedcin.getAll().subscribe(data => {
      data.forEach(obj => {
        this.NomMedcin.push({nom: obj.nom + ' ', prenom: obj.prenom, id: obj.id});
        this.filterMedecin.push({
          id: obj.id,
          value: obj.nom + ' ' + obj.prenom,
          title: obj.nom + ' ' +  obj.prenom,
        });
      });
      this.settings.columns.defunt.filter.config.list = this.filterDecede;
      this.settings.columns.medecin.filter.config.list = this.filterMedecin;
      this.settings = Object.assign({}, this.settings);
    });
    this.init();
    this.reactiveForm = this.fb.group({
      defunt: ['', [Validators.required]],
      centerMedicoLegal:  ['', [Validators.required, Validators.pattern(this.frPattern)]],
      dateDeclaration: ['', [Validators.required]],
      medecin: ['', [Validators.required]],
    });
  }
  pdf() {
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
    doc.text('معاينة الجثة', 230, 177, {
      align: 'center',
    });
    doc.text(' عاين الطبيب او المساعد الصحي', 400, 220, {align: 'right'});
    doc.text(' ' + this.MedecinHumain.nomAR + ' ' + this.MedecinHumain.prenomAR, 200, 220,
      {align: 'right'});
    doc.text(' التابع للمركز الطبي الشرعي', 400, 250, {align: 'right'});
    doc.text(' ' + this.ApercuCorps.centerMedicoLegal, 200, 250, {align: 'right'});
    doc.text('  جثة المرحوم', 400, 280, {align: 'right'});
    doc.text(' ' + this.DecedeHumain.nomAR + ' ' + this.DecedeHumain.prenomAR, 200, 280,
      {align: 'right'});
    doc.text('  المزداد', 400, 310, {align: 'right'});
    doc.text(' ' + formatDate(this.DecedeHumain.dateNaissance, 'dd-MM-yyyy', 'en-US', '+0530'),
      200, 310, {align: 'right'});
    doc.text('  إثر وفاة', 400, 340, {align: 'right'});
    doc.text(' ' + this.e, 200, 340, {align: 'right'});
    doc.text('   يوم', 400, 370, {align: 'right'});
    doc.text(' ' + formatDate(this.DecedeHumain.dateDeces, 'dd-MM-yyyy', 'en-US', '+0530'),
      200, 370, {align: 'right'});
    doc.text('وعليه فيمكن تحرير أمر الدفن', 350, 400, {align: 'right'});
    doc.text(' طنجة في' + this.jstoday, 150, 430, {align: 'right'});
    doc.text('إمضاء ', 100, 450);
    // doc.save('pdf.pdf');
    doc.save('معاينة جثة المرحوم ' + this.DecedeHumain.nomAR + ' ' + this.DecedeHumain.prenomAR + '.pdf');
  }

  pdff(list) {
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
    doc.text('معاينة الجثة', 230, 177, {align: 'center'});
    doc.text(' عاين الطبيب او المساعد الصحي', 400, 220, {align: 'right'});
    doc.text(' ' + list.medecin.nomAR + ' ' + list.medecin.prenomAR, 200, 220, {align: 'right'});
    doc.text(' التابع للمركز الطبي الشرعي', 400, 250, {align: 'right'});
    doc.text(' ' + list.centerMedicoLegal, 200, 250, {align: 'right'});
    doc.text('  جثة المرحوم', 400, 280, {align: 'right'});
    doc.text(' ' + list.defunt.nomAR + ' ' + list.defunt.prenomAR, 200, 280, {align: 'right'});
    doc.text('  المزداد', 400, 310, {align: 'right'});
    doc.text(' ' + formatDate(list.defunt.dateNaissance,
      'dd-MM-yyyy', 'en-US', '+0530'), 200, 310, {align: 'right'});
    doc.text('  إثر وفاة', 400, 340, {align: 'right'});
    doc.text(' ' + this.getNature(list.defunt.natureMort), 200, 340, {align: 'right'});
    doc.text('   يوم', 400, 370, {align: 'right'});
    doc.text(' ' + formatDate(list.defunt.dateDeces, 'dd-MM-yyyy', 'en-US', '+0530'), 200, 370, {
      align: 'right',
    });
    doc.text('وعليه فيمكن تحرير أمر الدفن', 350, 400, {align: 'right'});
    doc.text(' طنجة في' + this.jstoday, 150, 430, {align: 'right'});
    doc.text('إمضاء ', 100, 450);
    doc.save('pdfمعاينة الجثة.pdf');
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
          text: 'CERTIFICAT APERCU DU CORPS',
          fontSize: 20,
          alignment: 'center',
          margin: [0, 30, 0, 60],
          bold: true,
        },
        {
          columns: [
            {
              text: 'Défunt  : ', style: 'style',
            },
            {
              text: this.DecedeHumain.nom + ' ' + this.DecedeHumain.prenom, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Médecin/ Assistant de santé  : ', style: 'style',
            },
            {
              text: this.MedecinHumain.nom + ' ' + this.MedecinHumain.prenom, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Centre médico-légal : ', style: 'style',
            },
            {
              text: this.ApercuCorps.centerMedicoLegal, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Date déclaration : ', style: 'style',
            },
            {
              text: formatDate(this.ApercuCorps.dateDeclaration, 'dd-MM-yyyy', 'en-US', '+0530'), style: 'style',
            },
          ],
        },
        {
          text: 'Fait à Tanger le :' + this.jstoday,
          alignment: 'right',
          fontSize: 12,
          margin: [20, 40, 20, 5],
        },
      ],
      styles: {
        style: {
          fontSize: 14,
          margin: [0, 20, 0, 10],
        },
        header: {
          fontSize: 12,
          alignment: 'center',
        },
      },
    };
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
          text: 'CERTIFICAT APERCU DU CORPS',
          fontSize: 20,
          alignment: 'center',
          margin: [0, 30, 0, 60],
          bold: true,
        },
        {
          columns: [
            {
              text: 'Défunt  : ', style: 'style',
            },
            {
              text: list.defunt.nom + ' ' + list.defunt.prenom, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Médecin/ Assistant de santé  : ', style: 'style',
            },
            {
              text: list.medecin.nom + ' ' + list.medecin.prenom, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Centre médico-légal : ', style: 'style',
            },
            {
              text: list.centerMedicoLegal, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Date déclaration : ', style: 'style',
            },
            {
              text: formatDate(list.dateDeclaration, 'dd-MM-yyyy', 'en-US', '+0530'), style: 'style',
            },
          ],
        },
        {
          text: 'Fait à Tanger le :' + this.jstoday,
          alignment: 'right',
          fontSize: 12,
          margin: [20, 40, 20, 5],
        },
      ],
      styles: {
        style: {
          fontSize: 14,
          margin: [0, 20, 0, 10],
        },
        header: {
          fontSize: 12,
          alignment: 'center',
        },
      },
    };
  }
  getNature(Mot) {
    if (Mot === 'Mort non naturelle') {
      return 'وفاة غير طبيعية';
    }
    if (Mot === 'Mort naturelle') {
      return 'وفاة طبيعية';
    }
  }
  actualise() {
    this.serviceDecede.getById(this.defauntID).subscribe(obj => {
      this.DecedeHumain = obj;
      if (this.DecedeHumain.natureMort === 'Mort non naturelle') {
        this.e = 'وفاة غير طبيعية';
      }
      if (this.DecedeHumain.natureMort === 'Mort naturelle') {
        this.e = 'وفاة طبيعية';
      }
    });
    this.serviceMedcin.getById(this.MedecinID).subscribe(obj1 => {
      this.MedecinHumain = obj1;
    });
    return this.DecedeHumain;
  }

  generatePdf(action) {
    this.actualise();
    switch (action) {
      case 'francais':
        setTimeout(() => {
          const documentDefinition = this.getDocumentDefinition();
          pdfMake.createPdf(documentDefinition).open();
        }, 500);
        break;
      case 'arabe':
        setTimeout(() => {
          this.pdf();
        }, 500);
        break;
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
        this.toastService.showToast('primary', 'Pdf ouvert', 'Le CERTIFICAT APERCU DU CORPS est ouvert dans un nouvel onglet');
        break;
      case 'pdfArabe':
        this.pdff(event.data);
        this.toastService.showToast('primary', 'Téléchargement du Pdf ', 'Si vous n\'annuler pas le téléchargement du' +
          ' CERTIFICAT \'معاينة الجثة\' va bientôt être téléchargé');
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
        //  window.alert('Vous n\'avez pas des droits de suppression');
          this.toastService.toastOfDelete('warning');

        }
        break;
      case 'edit':
        if (this.isAdmin) {
          this.reactiveForm.setValue({
            dateDeclaration: this.ConvertDate(event.data.dateDeclaration) as any as Date,
            medecin: event.data.medecin.id,
            defunt: event.data.defunt.id,
            centerMedicoLegal: event.data.centerMedicoLegal,
          });
          this.id = event.data.id;
        } else {
          this.toastService.toastOfEdit('warning');
        }
        break;
    }
  }
  createCertificatFromForm(): ApercuCorps {
    const formValues = this.reactiveForm.value;
    const certificat = new ApercuCorps();
    certificat.id = this.id;
    certificat.medecin = formValues.medecin;
    certificat.defunt = formValues.defunt;
    certificat.centerMedicoLegal = formValues.centerMedicoLegal;
    certificat.dateDeclaration = formValues.dateDeclaration;
    return certificat;
  }
  getControl(name: string): AbstractControl {
    return this.reactiveForm.get(name);
  }
  onSubmit() {
    if (this.reactiveForm.valid) {
      const certificat: ApercuCorps = this.createCertificatFromForm();
      this.doSave(certificat);
      this.id = null ;
    } else {
      this.toastService.toastOfSave('validate');
    }
  }
  doSave(certificat) {
    if (this.id == null) {
      this.serviceMedcin.getById(certificat.medecin).subscribe(obj1 => {
        certificat.medecin = obj1;
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
        this.serviceMedcin.getById(certificat.medecin).subscribe(obj => {
          certificat.medecin = obj;
          this.serviceDecede.getById(certificat.defunt).subscribe(objj => {
            certificat.defunt = objj;
            this.service.update(certificat).subscribe(data1 => {
              this.source = this.source.map(e => e);
              this.init();
            });
            this.reactiveForm.reset();
            this.toastService.toastOfEdit('success');
          }); });
      } else {
        this.toastService.toastOfEdit('warning');
      }
    }
  }
}



