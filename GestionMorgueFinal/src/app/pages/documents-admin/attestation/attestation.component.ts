import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
import {UsersService} from '../../../@core/backend/common/services/users.service';
import {CauseService} from '../../../@core/backend/common/services/Cause.service';
import {Decedes} from '../../../@core/backend/common/model/Decedes';
import {DatePipe, formatDate} from '@angular/common';
import {ToastrService} from '../../../@core/backend/common/services/toastr.service';
import {LogoBase64Service} from '../../../@core/backend/common/services/logo-base64.service';
import {DomSanitizer} from '@angular/platform-browser';
import {User} from '../../../@core/interfaces/common/users';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'ngx-attestation',
  templateUrl: './attestation.component.html',
  styleUrls: ['./attestation.component.scss'],
  providers: [ DecedesService, UsersService, CauseService],
})
export class AttestationComponent implements OnInit {
  today = new Date();
  jstoday = '';
  isAdmin: boolean;
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: null,
      custom: [
        {
          name: 'ppddff',
          title: this.sanitizer.bypassSecurityTrustHtml('<i class="fas fa-file-pdf"   data-toggle="tooltip" data-placement="top" title="Attestation" aria-hidden="true"></i>'),
        },
      ],
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i></div>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
      mode: 'inline',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,

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
            list: [
              {value: 'Femme', title: 'Femme'},
              {value: 'Homme', title: 'Homme'},
              {value: 'Indéterminé', title: 'Indéterminé'},
            ],
          },
        },
      },
      dateNaissance: {
        title: 'Date de naissance',
        valuePrepareFunction: (data) => {
          const raw: Date = new Date(data);
          return this.datePipe.transform(raw, 'dd-MM-yyyy');
        },
      },
      nationalite: {
        title: 'Nationalité ',
        type: 'String',
      },
      adresse: {
        title: 'Adresse',
        type: 'String',
      },
      dateDeces: {
        title: 'date décès',
        valuePrepareFunction: (data) => {
          const raw: Date = new Date(data);
          return this.datePipe.transform(raw, 'dd-MM-yyyy');
        },
      },
      lieuxDeces: {
        title: 'Lieu de décès',
        type: 'String',
      },
      natureMort: {
        title: 'nature de mort',
        type: 'String',
      },
    },
  };
  source: Array<Decedes>;
  constructor(private service: DecedesService,
              private userservice: UsersService,
              private serviceCause: CauseService,
              private logoBase64: LogoBase64Service,
              private datePipe: DatePipe,
              private toastService: ToastrService,
              private sanitizer: DomSanitizer) {
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy', 'en-US', '+0530');
  }
  init() {
    this.service.getAll().subscribe(data => {
      this.source = data;
    });
  }
  decede: Decedes = new Decedes();
  ngOnInit() {
    this.userservice.getCurrentUser().subscribe(data => {
      this.isAdmin = data.role.includes('ADMIN');
    });
    this.init();
  }

  private reset() {
    this.decede = new Decedes();
  }
  onCustomConfirm(event) {
    switch ( event.action) {
      case 'ppddff':
          const documentDefinition = this.getDocumentDefinition(event.data);
          pdfMake.createPdf(documentDefinition).open();
          this.toastService.showToast('primary', 'Pdf ouvert', 'Le CERTIFICAT ATTESTATION DE DECES est ouvert dans un nouvel onglet');
        break;
    }
  }

  private getDocumentDefinition(list) {

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
          text: 'ATTESTATION DE DECES',
          fontSize: 20,
          alignment: 'center',
          margin: [0, 10, 0, 40],
          bold: true,
        },
        {
          text: ' Le Médecin chef de la registre d\'Hygiène et de controle sanitaire, soussigné, ' +
            'certifie que selon les inscription du registre du bureau de décès',
          bold: true,
          margin: [0, 10, 0, 20],
        }, {
          columns: [
            {
              text: 'Nom : ', style: 'style',
            },
            {
              text: list.nom + ' ' + list.prenom, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Nationalité : ', style: 'style',
            },
            {
              text: list.nationalite, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Date de naissance : ', style: 'style',
            },
            {
              text: formatDate(list.dateNaissance, 'dd-MM-yyyy', 'en-US', '+0530'), style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Sexe : ', style: 'style',
            },
            {
              text: list.sexe, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Domicile : ', style: 'style',
            },
            {
              text: list.adresse, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Lieux de décès : ', style: 'style',
            },
            {
              text: list.lieuxDeces, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'à Cause de : ', style: 'style',
            },
            {
              text: list.natureMort, style: 'style',
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
}

