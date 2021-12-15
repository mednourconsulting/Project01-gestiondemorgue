import { Component, OnInit } from '@angular/core';
import {Decedes} from '../../../@core/backend/common/model/Decedes';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
import {UsersService} from '../../../@core/backend/common/services/users.service';
import {CauseService} from '../../../@core/backend/common/services/Cause.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {DatePipe, formatDate} from '@angular/common';
import {ToastrService} from '../../../@core/backend/common/services/toastr.service';
import {LogoBase64Service} from '../../../@core/backend/common/services/logo-base64.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'ngx-constation',
  templateUrl: './constation.component.html',
  styleUrls: ['./constation.component.scss'],
  providers: [ DecedesService, UsersService, CauseService],
})
export class ConstationComponent implements OnInit {
  today = new Date();
  jstoday = '';
  isAdmin: boolean;
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [
        {
          name: 'pdf',
          title: '<i class="fas fa-file-pdf"   data-toggle="tooltip" data-placement="top" title="Certificat" aria-hidden="true"></i>',
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
        title: 'Sexe',
        filter: {
          type: 'list',
          config: {
            selectText: 'Select',
            list: [
              {value: 'Femme', title: 'Femme'},
              {value: 'Homme', title: 'Homme'},
              {value: 'Indetermine', title: 'Indeterminé'},
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
        title: 'Date de décès',
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
        title: 'Nature de mort',
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
              private toastService: ToastrService) {
    this.jstoday = formatDate(this.today, 'dd-MM-yyyy', 'en-US', '+0530');
    this.service.getAll().subscribe(data => {
      this.source = data;
    });
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
  /*generatePdf(action = 'open') {
    const documentDefinition = this.getDocumentDefinition();
    switch (action) {
      case 'open': pdfMake.createPdf(documentDefinition).open(); break;
      case 'print': pdfMake.createPdf(documentDefinition).print(); break;
      case 'download': pdfMake.createPdf(documentDefinition).download(); break;
      default: pdfMake.createPdf(documentDefinition).open(); break;
    }

  }*/

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
          text: 'CERTIFICAT DE CONSTATATION DE DECES',
          fontSize: 20,
          alignment: 'center',
          margin: [0, 10, 0, 40],
          bold: true,
        },
        {
          text: 'Je soussigné le médecin chef de la registre d\'Hygiène' +
            ' et de controle sanitaire certifie avoir constater le décès de ',
          bold: true,
          margin: [0, 10, 0, 20],
        }, {
          columns: [
            {
              text: 'Nom : ' , style: 'style',
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
              text: 'Domicile : ' , style: 'style',
            },
            {
              text: list.adresse, style: 'style',
            },
          ],
        },
        {
          columns: [
            {
              text: 'Lieux de décès : ' ,  style: 'style',
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
          margin: [20, 30, 70, 5],
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
      case 'pdf':
          const documentDefinition = this.getDocumentDefinition(event.data);
          pdfMake.createPdf(documentDefinition).open();
          this.toastService.showToast('primary', 'Pdf ouvert', 'Le CERTIFICAT CONSTATATION DE DECES est ouvert dans un nouvel onglet');
        break;
    }
  }
}
