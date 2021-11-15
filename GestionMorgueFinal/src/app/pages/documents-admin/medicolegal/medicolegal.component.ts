import { Component, OnInit } from '@angular/core';
import {CertificatMedicoLegalService} from '../../../@core/backend/common/services/CertificatMedicoLegal.service';
import {CertificatMedicoLegal} from '../../../@core/backend/common/model/CertificatMedicoLegal';
import {UsersService} from '../../../@core/backend/common/services/users.service';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
import {MedecinsService} from '../../../@core/backend/common/services/Medecins.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {DatePipe, formatDate} from '@angular/common';
import jsPDF from 'jspdf';
import { base64Str } from '../../certificat/base64.js';
import {Decedes} from '../../../@core/backend/common/model/Decedes';
import {Medecins} from '../../../@core/backend/common/model/Medecins';
import {Router} from '@angular/router';
import {ToastrService} from '../../../@core/backend/common/services/toastr.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LogoBase64Service} from '../../../@core/backend/common/services/logo-base64.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'ngx-medicolegal',
  templateUrl: './medicolegal.component.html',
  styleUrls: ['./medicolegal.component.scss'],
  providers: [ CertificatMedicoLegalService, UsersService, DecedesService, MedecinsService],
})
export class MedicolegalComponent implements OnInit {
  reactiveForm: FormGroup;
  frPattern = '[a-zA-Zéàçèêûù()\'0-9 ]*';
  adressFrPattern = '[a-zA-Z0-9éàçèêûù()\'°, ]*';
  Medicolegal: CertificatMedicoLegal = new CertificatMedicoLegal();
  NomMedecin = [];
  NomDecede = [];
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
          const r: Date = new Date(data);
          return this.datePipe.transform(r, 'dd-MM-yyyy');
        },
      },
    },
  };
  source: Array<CertificatMedicoLegal>;
  today = new Date();
  jstoday = '';
  defunt: number;
  MedNom: number;
  id: null;
  private filterMedecin = [];
  private filterDecede = [];
  constructor(private service: CertificatMedicoLegalService,
              private userservice: UsersService,
              private router: Router,
              private serviceDecede: DecedesService,
              private serviceMeddcin: MedecinsService,
              private logoBase64: LogoBase64Service,
              private datePipe: DatePipe,
              private toastService: ToastrService,
              private fb: FormBuilder) {}
  init() {
    this.service.getAll().subscribe(data => {
      this.source = data;
    });
  }
  ngOnInit() {
    this.userservice.getCurrentUser().subscribe(data => {
      this.isAdmin = data.role.includes('ADMIN');
    });
    this.init();
    this.reactiveForm = this.fb.group({
      medecin: ['', [ Validators.required ]],
      declarant: ['', [ Validators.required, Validators.pattern(this.frPattern) ]],
      address: ['', [ Validators.required, Validators.pattern(this.adressFrPattern) ]],
      cin:  ['', [ Validators.pattern(this.frPattern)]],
      declaration: [''],
      defunt: ['', [ Validators.required ]],
    });
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy', 'en-Us', '+1');
    this.serviceDecede.getAll().subscribe( dataa => {
      dataa.forEach (  obj => { this.NomDecede.push({nom: obj.nom + ' ' , prenom: obj.prenom , id: obj.id});
      this.filterDecede.push({
        id: obj.id,
        value: obj.nom + ' ' + obj.prenom,
        title: obj.nom + ' ' +  obj.prenom,
      });
      });
    });
    this.serviceMeddcin.getAll().subscribe( data1 => {
      data1.forEach (  obj => { this.NomMedecin.push({nom: obj.nom + ' ' , prenom: obj.prenom , id: obj.id});
        this.filterMedecin.push({
          id: obj.id,
          value: obj.nom + ' ' + obj.prenom,
          title: obj.nom + ' ' +  obj.prenom,
        }); });
      this.settings.columns.medecin.filter.config.list = this.filterMedecin;
      this.settings.columns.defunt.filter.config.list = this.filterDecede;
      this.settings = Object.assign({}, this.settings);
    });
  }
  i = 0;
  DecedeHumain: Decedes;
  MedecinHumain: Medecins;
  dd = '';
  e: string;
  isAdmin: boolean;
  generatePdf(action) {
    this.actualise();
    switch (action) {
      case 'Francais':
        setTimeout(() => {
          const documentDefinition = this.getDocumentDefinition();
          pdfMake.createPdf(documentDefinition).open();
        }, 500);
        break;
      case 'arabe':
        setTimeout(() => { this.pdf(); }, 500);
        break;
    }
  }
  getDocumentDefinition1(list) {
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
          text: 'CERTIFICAT MEDICAL',
          fontSize: 20,
          alignment: 'center',
          margin: [0, 30, 0, 40],
          bold: true,
        },
        {
          columns: [
            {
              text: 'Je soussigné Docteur  : ' , style: 'style',
            },
            {
              text: list.medecin.nom + ' ' + list.medecin.prenom , style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Demeurant à  : ' , style: 'style',
            },
            {
              text: list.address, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Certifie que le corps du  : ', style: 'style',
            },
            {
              text: list.defunt.nom + ' ' + list.defunt.prenom, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Décédé le  : ', style: 'style',
            },
            {
              text: formatDate(list.declaration, 'dd-MM-yyyy', 'en-US', '+0530'), style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'De : ', style: 'style',
            },
            {
              text: list.defunt.natureMort, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Pourra être transporté sans danger pour la salubrité publique, le corps étant placé dans une bière hermetique, suivant les réglements et prescriptions en vigeur' ,  style: 'style',
            },
          ],
        },
        {
          text: 'Fait à Tanger le :' + this.jstoday,
          alignment: 'right',
          fontSize: 12,
          margin: [20, 30, 70, 5],
        },
        {
          text: 'Signature:',
          alignment: 'right',
          fontSize: 12,
          margin: [25, 15, 70, 5],
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
  getDocumentDefinition() {
    // sessionStorage.setItem('resume', JSON.stringify());
    return {
      content: [
        {
          alignment: 'center',
          width: 70,
          height: 70,
          margin: [0, -10, 0, 0],
          image: this.logoBase64.getLogoBase64(),
        },
        {
          text: 'ROYAUME DU MAROC \n MINISTERE DE L\'INTERIEUR \n WILAYA DE LA REGION TANGER-TETOUAN-ELHOUCIMA' +
            ' \n COMMUNE DE TANGER \n DIVISION D\'HYGIENE ET PROTECTION DE L\'ENVIRONNEMENT \n CENTRE MEDICO-LEGAL',
          style: 'header',
        },
        {
          text: 'CERTIFICAT MEDICAL',
          fontSize: 20,
          alignment: 'center',
          margin: [0, 30, 0, 40],
          bold: true,
        },
        {
          columns: [
            {
              text: 'Je soussigné Docteur  : ' , style: 'style',
            },
            {
              text: this.MedecinHumain.nom + ' ' + this.MedecinHumain.prenom, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Demeurant à  : ' , style: 'style',
            },
            {
              text: this.Medicolegal.address, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Certifie que le corps du  : ', style: 'style',
            },
            {
              text: this.DecedeHumain.nom + ' ' + this.DecedeHumain.prenom , style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Décédé le  : ', style: 'style',
            },
            {
              text: this.dd, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'De : ', style: 'style',
            },
            {
              text: this.DecedeHumain.natureMort, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Pourra être transporter sans danger pour la salubrité publique, le corps étant placé dans une bière hermetique, suivant les réglements et prescriptions en vigeur' ,  style: 'style',
            },
          ],
        },
        {
          text: 'Fait à Tanger le :' + this.jstoday,
          alignment: 'right',
          fontSize: 12,
          margin: [20, 30, 70, 5],
        },
        {
          text: 'Signature:',
          alignment: 'right',
          fontSize: 12,
          margin: [25, 15, 70, 5],
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
  actualise() {
      this.serviceDecede.getById(this.defunt).subscribe(obj => {
        this.DecedeHumain = obj;
        this.dd = formatDate(obj.dateDeces, 'dd-MM-yyyy', 'en-US', '+0530');
        if (this.DecedeHumain.natureMort === 'Mort non naturelle') {
          this.e = 'وفاة غير طبيعية';
        }
        if (this.DecedeHumain.natureMort === 'Mort naturelle') {
          this.e = 'وفاة طبيعية';
        }
      });
      this.serviceMeddcin.getById(this.MedNom).subscribe(obj1 => {
        this.MedecinHumain = obj1;
      });
  }
  getNatureMort(mot) {
    if (mot === 'Mort non naturelle') {
      return 'وفاة غير طبيعية';
    }
    if (mot === 'Mort naturelle') {
      return 'وفاة طبيعية';
    }
  }
  pdff(list) {
    const doc = new jsPDF({
      compress: false,
      orientation: 'p',
      unit: 'px',
      format: 'a4',
      /*margins: {
        top: 40,
        bottom: 60,
        left: 40,
        width: 522,
      },*/
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
    doc.text('شهادة طبية', 230, 177, { align: 'center'});
    doc.text( ' انا الواضع إسمه عقد تاريخه الدكتور' , 400, 200, { align: 'right' });
    doc.text(' '  + list.medecin.nomAR + ' ' + list.medecin.prenomAR, 200, 200, { align: 'right' });
    doc.text('الساكن ب' , 400, 230, { align: 'right' });
    doc.text(' ' + list.defunt.adresseAR, 200, 230, { align: 'right' });
    doc.text(' اشهد ان جثة المرحوم', 400, 260, { align: 'right' });
    doc.text(' ' + list.defunt.nomAR + ' ' + list.defunt.prenomAR, 200, 260, { align: 'right' });
    doc.text(' الذي توفي بتاريخ', 400, 290, { align: 'right' });
    doc.text(' '  + formatDate(list.defunt.dateDeces, 'dd-MM-yyyy', 'en-Us', '+1'), 200, 290, { align: 'right' });
    doc.text('  إثر وفاة' ,  400, 320, { align: 'right' });
    doc.text(''  + this.getNatureMort(list.defunt.natureMort),  200, 320, { align: 'right' });
    doc.text('بعد وضع جثة المرحوم في صندوق من الزنك وآخر من الخشب حسب القوانين\n الجاري بها  العمل، يمكن نقلها بدون ان يكون في ذلك خطر على الصحة العمومية' , 400, 360, { align: 'right' });
    doc.text( ' طنجة في' + this.jstoday, 150, 400, { align: 'right' });
    doc.text('إمضاء ', 100, 420);
    doc.save('شهادة طبية' + '.pdf');
  }
  pdf() {
    const doc = new jsPDF( {
      compress: false,
      orientation: 'p',
      unit: 'px',
      format: 'a4',

    });
   /* const doc = new jsPDF({
      compress: false,
      orientation: 'p',
      unit: 'px',
      format: 'a4',
      margins: {
        top: 40,
        bottom: 60,
        left: 40,
        width: 522,
      },
    });*/
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
    doc.text('شهادة طبية', 210, 170, { align: 'center' });
    doc.text( ' انا الواضع إسمه عقد تاريخه الدكتور' , 400, 200, { align: 'right' });
    doc.text(' '  + this.MedecinHumain.nomAR + ' ' + this.MedecinHumain.prenomAR, 200, 200, { align: 'right' });
    doc.text('الساكن ب' , 400, 230, { align: 'right' });
    doc.text(' ' + this.DecedeHumain.adresseAR, 200, 230, { align: 'right' });
    doc.text(' اشهد ان جثة المرحوم', 400, 260, { align: 'right' });
    doc.text(' ' + this.DecedeHumain.nomAR + ' ' + this.DecedeHumain.prenomAR, 200, 260, { align: 'right' });
    doc.text(' الذي توفي بتاريخ', 400, 290, { align: 'right' });
    doc.text(' '  + this.dd, 200, 290, { align: 'right' });
    doc.text('  إثر وفاة' ,  400, 320, { align: 'right' });
    doc.text(''  + this.e,  200, 320, { align: 'right' });
    doc.text('بعد وضع جثة المرحوم في صندوق من الزنك وآخر من الخشب حسب القوانين\n الجاري بها  العمل، يمكن نقلها بدون ان يكون في ذلك خطر على الصحة العمومية' , 400, 360, { align: 'right' });
    doc.text( ' طنجة في' + this.jstoday, 150, 400, { align: 'right' });
    doc.text('إمضاء ', 100, 420);
    doc.save('شهادة طبية' + '.pdf');
  }
  onEdit (data: any) {
    if (this.isAdmin) {
      this.id = data.id;
      this.reactiveForm.setValue({
        medecin: data.medecin.id,
        declarant: data.declarant,
        address: data.address,
        cin:  data.cin,
        declaration: this.ConvertDate(data.declaration) as any as Date,
        defunt: data.defunt.id,
      });
    } else {
      this.toastService.toastOfEdit('warning');
    }
  }
  onCustomConfirm(event) {
    switch ( event.action) {
      case 'edit':
           this.onEdit(event.data);
        break;
      case 'pdfFrancais':
        const documentDefinition = this.getDocumentDefinition1(event.data);
        pdfMake.createPdf(documentDefinition).open();
        this.toastService.showToast('success', 'PDf ouvert',
          'Le  CERTIFICAT MEDICAL est ouvert dans un nouvel onglet ');
        break;
      case 'pdfArabe':
        this.pdff(event.data);
        this.toastService.showToast('primary', 'Téléchargement du Pdf ', 'Si vous n\'annuler pas le téléchargement du' +
          ' CERTIFICAT \'شهادة طبية  \' va bientôt être téléchargé');
        break;
      case 'delete':
        if (this.isAdmin) {
          if (window.confirm('Etes-vous sûr de vouloir supprimer?')) {
          // event.confirm.resolve(event.data);
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
  passToMedecin() {
    this.router.navigateByUrl('/pages/bulletins-dm/medcins');
  }
  passToDecede() {
    this.router.navigateByUrl('/pages/bulletins-dm/decedes');
  }
  createCertificatFromForm(): CertificatMedicoLegal {
    const formValues = this.reactiveForm.value;
    const certificat = new CertificatMedicoLegal();
    certificat.id = this.id;
    certificat.medecin = formValues.medecin;
    certificat.declarant = formValues.declarant;
    certificat.address = formValues.address;
    certificat.cin = formValues.cin;
    certificat.declaration = formValues.declaration;
    certificat.defunt = formValues.defunt;
    return certificat;
  }
  getControl(name: string): AbstractControl {
    return this.reactiveForm.get(name);
  }
  ConvertDate(date) {
    if (date !== undefined)
      return formatDate(date, 'yyyy-MM-dd', 'en-US', '+1');
  }
  onSubmit() {
    if (this.reactiveForm.valid) {
      const certificat: CertificatMedicoLegal = this.createCertificatFromForm();
      this.doSave(certificat);
      this.id = null ;
    } else {
      this.toastService.toastOfSave('validate');
    }
  }
  doSave(certificat) {
    if (this.id == null) {
      this.serviceMeddcin.getById(certificat.medecin).subscribe(medecin => {
        certificat.medecin = medecin;
        this.serviceDecede.getById(certificat.defunt).subscribe(defunt => {
          certificat.defunt = defunt;
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
        this.serviceMeddcin.getById(certificat.medecin).subscribe(medecin => {
          certificat.medecin = medecin;
          this.serviceDecede.getById(certificat.defunt).subscribe(defunt => {
            certificat.defunt = defunt;
            this.service.update(certificat).subscribe(data1 => {
              this.source = this.source.map(e => e);
              this.init();
              this.reactiveForm.reset();
            });
          });
        });
        this.toastService.toastOfEdit('success');
      } else {
        this.toastService.toastOfEdit('warning');
      }
    }
  }
  reset() {
    this.reactiveForm.reset();
    this.Medicolegal = new CertificatMedicoLegal();
  }
}
