import { Component, OnInit } from '@angular/core';
import {CertificatEnterrement} from '../../../@core/backend/common/model/CertificatEnterrement';
import {CertificatEnterrementService} from '../../../@core/backend/common/services/CertificatEnterrement.service';
import {UsersService} from '../../../@core/backend/common/services/users.service';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
import {MedecinsService} from '../../../@core/backend/common/services/Medecins.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {DatePipe, formatDate} from '@angular/common';
import {ToastrService} from '../../../@core/backend/common/services/toastr.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LogoBase64Service} from '../../../@core/backend/common/services/logo-base64.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'ngx-enterrement',
  templateUrl: './enterrement.component.html',
  styleUrls: ['./enterrement.component.scss'],
  providers: [CertificatEnterrementService, UsersService, DecedesService, MedecinsService],
})
export class EnterrementComponent implements OnInit {
  today = new Date();
  jstoday = '';
  Enterrement: CertificatEnterrement = new CertificatEnterrement();
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
        type: 'Decedes',
      },
      ville: {
        title: 'Ville',
        type: 'string',
      },
      declaration: {
        title: 'Date de déclaration',
        valuePrepareFunction: (data) => {
          const raw: Date = new Date(data);
          return this.datePipe.transform(raw, 'dd-MM-yyyy');
        },
      },
    },
  };
  source: Array<CertificatEnterrement>;
  NomDecede = [];
  isAdmin: boolean;
  date: Date;
  reactiveForm: FormGroup;
  frPattern = '[a-zA-Zéàçèêûù()\'0-9 ]*';
  id = null;
  constructor(private service: CertificatEnterrementService,
              private userservice: UsersService,
              private serviceDecede: DecedesService,
              private serviceM: MedecinsService,
              private logoBase64: LogoBase64Service,
              private datePipe: DatePipe,
              private toastService: ToastrService,
              private fb: FormBuilder) {
    this.serviceDecede.getAll().subscribe( dataa => {
      dataa.forEach  (  obj => { this.NomDecede.push({nom: obj.nom, prenom: obj.prenom, id: obj.id}); });
    });
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy', 'en-US', '+0530');
  }

  init() {
    this.service.getAll().subscribe(data => {
      this.source = data;
    });
  }
  ngOnInit() {
    this.userservice.getCurrentUser().subscribe(data => {
      this.date = new Date();
      this.isAdmin = data.role.includes('ADMIN');
    });
    this.init();
    this.reactiveForm = this.fb.group({
      defunt: ['', [Validators.required]],
      ville: ['', [Validators.required, Validators.pattern(this.frPattern)]],
      declaration: ['', [ Validators.required]],
    });
  }

  save() {
    this.service.create(this.Enterrement).subscribe(data => {
      this.source.push(data);
      this.source = this.source.map(item => item);
    });
    this.toastService.toastOfSave('success');
  }
  onEditConfirm(event) {
    if (this.isAdmin) {
      this.service.getAll().subscribe(data => {
        event.confirm.resolve(event.newData);
        this.service.update(event.newData);
        this.toastService.toastOfEdit('success');

      });
    } else {
      this.toastService.toastOfEdit('warning');

    }
  }
  generatePdf(action = 'open') {
    const documentDefinition = this.getDocumentDefinition1(this.Enterrement);
    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      default: pdfMake.createPdf(documentDefinition).open(); break;
    }

  }

  private getDocumentDefinition() {
    return {
      content: [
        {
          alignment: 'center',
          width: 50,
          height: 50,
          image: this.logoBase64.getLogoBase64(),
        },
        {
            text: 'ROYAUME DU MAROC \n MINISTERE DE L\'INTERIEUR \n WILAYA DE LA REGION TANGER-TETOUAN-ELHOUCIMA' +
            ' \n COMMUNE DE TANGER \n DIVISION D\'HYGIENE ET PROTECTION DE L\'ENVIRONNEMENT \n CENTRE MEDICO-LEGAL',
          style: 'header',
        },
        {
          text: 'CERTIFICAT ENTRREMENT',
          fontSize: 20,
          alignment: 'center',
          margin: [0, 10, 0, 40],
          bold: true,
        },
        {
          columns: [
            {
              text: 'Défunt  : ' , style: 'style',
            },
            {
              text: this.Enterrement.defunt, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Ville : ' , style: 'style',
            },
            {
              text: this.Enterrement.ville, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Date declaration  : ' , style: 'style',
            },
            {
              text: this.Enterrement.declaration, style: 'style',
            },
          ],
        },
        {
          text: 'Fait à Tanger le :' + this.jstoday,
          alignment: 'right',
          fontSize: 12,
          margin: [20, 10, 70, 5],
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
  private getDocumentDefinition1(list) {
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
          text: 'CERTIFICAT D\'ENTERREMENT',
          fontSize: 20,
          alignment: 'center',
          margin: [0, 10, 0, 40],
          bold: true,
        },
        {
          columns: [
            {
              text: 'Défunt  : ' , style: 'style',
            },
            {
              text: list.defunt, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Ville : ' , style: 'style',
            },
            {
              text: list.ville, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Date de déclaration  : ' , style: 'style',
            },
            {
              text: formatDate(list.declaration, 'dd-MM-yyyy', 'en-US', '+1'), style: 'style',
            },
          ],
        },
        {
          text: 'Fait à Tanger le :' + this.jstoday,
          alignment: 'right',
          fontSize: 12,
          margin: [20, 10, 70, 5],
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
  onCustomConfirm(event) {
    switch ( event.action) {
      case 'pdfFrancais':
        const documentDefinition = this.getDocumentDefinition1(event.data);
        pdfMake.createPdf(documentDefinition).open();
        this.toastService.showToast('primary', 'Pdf ouvert', 'Le CERTIFICAT D\'ENTEREMMENT est ouvert dans un nouvel onglet');

        break;
      case 'delete':
        if (this.isAdmin) {
          if (window.confirm('Vous êtes sûr de vouloir supprimer ?')) {
            this.service.delete(event.data.id).subscribe(data => {
              this.source = this.source.filter(e => e.id !== data.id);
            });
            this.toastService.toastOfDelete('success');
          }
        } else {
          this.toastService.toastOfDelete('warning');

        }
        break;
        case 'edit':
          if (this.isAdmin) {
            this.reactiveForm.setValue({
              defunt: event.data.defunt,
              ville: event.data.ville,
              declaration: this.ConvertDate(event.data.declaration) as any as Date,

            });
            this.id = event.data.id;
          } else {
            this.toastService.toastOfEdit('warning');
          }
        break;
    }
  }
  ConvertDate(date) {
    if (date !== undefined)
      return formatDate(date, 'yyyy-MM-dd', 'en-US', '+1');
  }
  createCertificatFromForm(): CertificatEnterrement {
    const formValues = this.reactiveForm.value;
    const certificat = new CertificatEnterrement();
    certificat.id = this.id;
    certificat.ville = formValues.ville;
    certificat.declaration = formValues.declaration;
    certificat.defunt = formValues.defunt;
    return certificat;
  }
  getControl(name: string): AbstractControl {
    return this.reactiveForm.get(name);
  }
  onSubmit() {
    if (this.reactiveForm.valid) {
      const certificat: CertificatEnterrement = this.createCertificatFromForm();
      this.doSave(certificat);
      this.id = null;
    } else {
      this.toastService.toastOfSave('validate');
    }
  }
  doSave(certificat) {
    if ( this.id == null) {
        this.service.create(certificat).subscribe(obj => {
          this.source.push(obj);
          this.source = this.source.map(e => e);
        });
      this.toastService.toastOfSave('success');
      this.reactiveForm.reset();
    } else {
      if (this.isAdmin) {
        this.service.update(certificat).subscribe(obj => {
          this.source = this.source.map(e => e);
          this.init();
        });
        this.toastService.toastOfEdit('success');
        this.reactiveForm.reset();
      }
    }
  }
}
