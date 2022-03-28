import {Component, OnInit} from '@angular/core';
import {ApercuCorps} from '../../../@core/backend/common/model/ApercuCorps';
import {ApercuCorpsService} from '../../../@core/backend/common/services/ApercuCorps.service';
import {UsersService} from '../../../@core/backend/common/services/users.service';
import {MedecinsService} from '../../../@core/backend/common/services/Medecins.service';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
import pdfMake from 'pdfmake/build/pdfmake';
import {formatDate} from '@angular/common';

import {Decedes} from '../../../@core/backend/common/model/Decedes';
import {Medecins} from '../../../@core/backend/common/model/Medecins';
import {ToastrService} from '../../../@core/backend/common/services/toastr.service';
import {AbstractControl} from '@angular/forms';

import {DataService} from './data.service';
import {PdfService} from './pdf.service';

import {User} from '../../../@core/interfaces/common/users';



// pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'ngx-apercu-du-corp',
  templateUrl: './apercu-du-corp.component.html',
  styleUrls: ['./apercu-du-corp.component.scss'],
  providers: [ApercuCorpsService,
    UsersService,
    MedecinsService,
    DataService,
    PdfService,
    DecedesService],
})
export class ApercuDuCorpComponent implements OnInit {
  isAdmin: boolean;
  listMedcin = [];
  listDeced = [];
  DecedeHumain: Decedes;
  MedecinHumain: Medecins;
  source: Array<ApercuCorps>;
  id = null;
  private filterMedecin = [];
  private filterDecede = [];
  constructor(private service: ApercuCorpsService,
              private userservice: UsersService,
              private serviceMedcin: MedecinsService,
              private serviceDecede: DecedesService,
              private pdfService: PdfService,
              private toastService: ToastrService,
              private dataService: DataService) {}
  public  getAll() {
    this.service.getAll().subscribe(data => {
      this.source = data;
    });
  }

  public getAllDecede () {
    this.serviceDecede.getAll().subscribe(dataa => {
      console.warn('decedes', dataa);
      dataa.forEach(obj => {
        this.listDeced.push({text: obj.nom + ' ' + obj.prenom, id: obj.id , obj : obj });
        this.filterDecede.push({
          id: obj.id,
          value: obj.nom + ' ' + obj.prenom,
          title: obj.nom + ' ' +  obj.prenom,
        });
      });
      this.dataService.settings.columns.defunt.filter.config.list = this.filterDecede;
      this.dataService.settings = Object.assign({}, this.dataService.settings);
    });
  }

  public getAllMedecin () {
    this.serviceMedcin.getAll().subscribe(data => {
      data.forEach(obj => {
        this.listMedcin.push({text: obj.nom + ' ' + obj.prenom, id: obj.id});
        this.filterMedecin.push({
          id: obj.id,
          value: obj.nom + ' ' + obj.prenom,
          title: obj.nom + ' ' +  obj.prenom,
        });
      });
      this.dataService.settings.columns.medecin.filter.config.list = this.filterMedecin;
      this.dataService.settings = Object.assign({}, this.dataService.settings);
    });
  }

  public getUser() {
    this.userservice.getCurrentUser().subscribe(data => {
      this.isAdmin = data.role.includes('ADMIN');
    });
  }

  ngOnInit() {
    this.getAll();
    this.getAllMedecin();
    this.getAllDecede();
    this.getUser();
    this.dataService.formControle();
  }

  public ConvertDate(date) {
    if (date !== undefined && date !== null ) {
      return formatDate(date, 'yyyy-MM-dd', 'en-US', '+1');
    } else {
      return null;
    }
  }

  public pdfFrancais (data) {
    const documentDefinition = this.pdfService.getDocumentpdfFrancais(data);
    pdfMake.createPdf(documentDefinition).open();
    this.toastService.showToast('primary', 'Pdf ouvert', 'Le CERTIFICAT APERCU DU CORPS est ouvert dans un nouvel onglet');

  }

  public pdfArabic (data) {
    this.pdfService.getDocumentpdfArabic(data);
    this.toastService.showToast('primary', 'Téléchargement du Pdf ', 'Si vous n\'annuler pas le téléchargement du' +
      ' CERTIFICAT \'معاينة الجثة\' va bientôt être téléchargé');
  }

  public onDelete (event) {
    if (this.isAdmin) {
      if (window.confirm('Vous êtes sûr de vouloir supprimer ?')) {
        this.service.delete(event.id).subscribe(data => {
          this.source = this.source.filter(item => item.id !== data.id);
        });
        this.toastService.toastOfDelete('success');
      }
    } else {
      //  window.alert('Vous n\'avez pas des droits de suppression');
      this.toastService.toastOfDelete('warning');

    }
  }

  public onEdit (event) {
    if (this.isAdmin) {
      this.dataService.reactiveForm.setValue({
        dateDeclaration: this.ConvertDate(event.dateDeclaration) as any as Date,
        medecin: event.medecin.id,
        defunt: event.defunt.id,
        centerMedicoLegal: event.centerMedicoLegal,
      });
      this.id = event.id;
    } else {
      this.toastService.toastOfEdit('warning');
    }
  }

  public onCustomConfirm(event) {
    switch (event.action) {
      case 'pdfFrancais':
        this.pdfFrancais(event.data);
      break;
      case 'pdfArabe':
         this.pdfArabic(event.data);
      break;
      case 'delete':
        this.onDelete(event.data);
        break;
      case 'edit':
        this.onEdit(event.data);
        break;
    }
  }

  createCertificatFromForm(): ApercuCorps {
    const formValues = this.dataService.reactiveForm.value;
    const certificat = new ApercuCorps();
    certificat.id = this.id;
    certificat.medecin = formValues.medecin;
    certificat.defunt = formValues.defunt;
    certificat.centerMedicoLegal = formValues.centerMedicoLegal;
    certificat.dateDeclaration = formValues.dateDeclaration;
    return certificat;
  }

  getControl(name: string): AbstractControl {
    return this.dataService.reactiveForm.get(name);
  }

  onSubmit() {
    if (this.dataService.reactiveForm.valid) {
      const certificat: ApercuCorps = this.createCertificatFromForm();
      this.doSave(certificat);
      this.id = null ;
    } else {
      this.toastService.toastOfSave('validate');
    }
  }

  public create(certificat) {
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
    this.dataService.reactiveForm.reset();
  }

  public update(certificat) {
    if (this.isAdmin) {
      this.serviceMedcin.getById(certificat.medecin).subscribe(obj => {
        certificat.medecin = obj;
        this.serviceDecede.getById(certificat.defunt).subscribe(objj => {
          certificat.defunt = objj;
          this.service.update(certificat).subscribe(data1 => {
            this.getAll();
            this.dataService.reactiveForm.reset();
            this.toastService.toastOfEdit('success');
          }, error => {
            this.toastService.toastOfEdit('danger');
          });
        }, error => {
          this.toastService.toastOfEdit('danger');
        }); }, error => {
        this.toastService.toastOfEdit('danger');
      });
    } else {
      this.toastService.toastOfEdit('warning');
    }
  }

  doSave(certificat) {
    if (this.id == null) {
        this.create(certificat);
    } else {
        this.update(certificat);
    }
  }


  // ngx-select
  // Select and remove function Medecin
  public doSelectM (value: any) {
    if (value === 0) {
      this.dataService.passToMedecin();
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
      this.dataService.passToDecede();
    } else {
      let decede;
      if (typeof value === 'string') {
        decede = this.listDeced.find( x => x.text === value).obj;
      } else {
        decede = this.listDeced.find( x => x.id === value).obj;
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



