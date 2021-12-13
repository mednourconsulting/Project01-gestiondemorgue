import {Component, OnInit} from '@angular/core';
import {CertificatTransfertCorps} from '../../../@core/backend/common/model/CertificatTransfertCorps';
import {CertificatTransfertCorpsService} from '../../../@core/backend/common/services/CertificatTransfertCorps.service';
import {UsersService} from '../../../@core/backend/common/services/users.service';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
import {MedecinsService} from '../../../@core/backend/common/services/Medecins.service';
import pdfMake from 'pdfmake/build/pdfmake';
import {formatDate} from '@angular/common';
import {ToastrService} from '../../../@core/backend/common/services/toastr.service';
import {AbstractControl} from '@angular/forms';
import {DataService} from './data.service';
import {PdfService} from './pdf.service';

@Component({
  selector: 'ngx-transfert-corps',
  templateUrl: './transfert-corps.component.html',
  styleUrls: ['./transfert-corps.component.scss'],
  providers: [CertificatTransfertCorpsService,
    UsersService,
    DecedesService,
    MedecinsService,
    PdfService,
    DataService],
})
export class TransfertCorpsComponent implements OnInit {
  listDecede = [];
  listMedecin = [];
  isAdmin: boolean;
  id = null;
  private filterMedecin = [];
  private filterDecede = [];
  source: Array<CertificatTransfertCorps>;
  MedecinHumain: null;
  DecedeHumain: any;
  constructor(private service: CertificatTransfertCorpsService,
              private serviceM: MedecinsService,
              private userservice: UsersService,
              private serviceDecede: DecedesService,
              private dataService: DataService,
              private pdfService: PdfService,
              private toastService: ToastrService) {
  }

  public getAll() {
    this.service.getAll().subscribe(data => {
      this.source = data;
    });
  }

  public getAllDecede() {
    this.serviceDecede.getAll().subscribe(dataa => {
      dataa.forEach(obj => {
        this.listDecede.push({text: obj.nom + ' ' +  obj.prenom, id: obj.id , obj: obj});
        this.filterDecede.push({
          id: obj.id,
          value: obj.nom + ' ' + obj.prenom,
          title: obj.nom + ' ' +  obj.prenom,
        });
        this.dataService.settings.columns.defunt.filter.config.list = this.filterDecede;
        this.dataService.settings = Object.assign({}, this.dataService.settings);
      });
    });
  }

  public getAllMedecin() {
    this.serviceM.getAll().subscribe(data1 => {
      data1.forEach(obj => {
        this.listMedecin.push({text: obj.nom + ' ' + obj.prenom, id: obj.id , obj: obj});
        this.filterMedecin.push({
          id: obj.id,
          value: obj.nom + ' ' + obj.prenom,
          title: obj.nom + ' ' + obj.prenom,
        });
        this.dataService.settings.columns.medecins.filter.config.list = this.filterMedecin;
        this.dataService.settings = Object.assign({}, this.dataService.settings);
      });
    });
  }

  public getUser() {
    this.userservice.getCurrentUser().subscribe(data => {
      this.isAdmin = data.role.includes('ADMIN');
    });
  }

  public addToSelect() {
    this.listMedecin.push({text: 'Ajouter un Médecin....' , id: 0, obj : null});
    this.listDecede.push({text: 'Ajouter un Décédé....' , id: 0, obj : null});
  }

  ngOnInit() {
    this.getAll();
    this.addToSelect();
    this.getAllMedecin();
    this.getAllDecede();
    this.getUser();
    this.addToSelect();
    this.dataService.formControl();
  }

  ConvertDate(date) {
    if (date !== undefined)
      return formatDate(date, 'yyyy-MM-dd', 'en-US', '+1');
  }

  public pdfFrancais(data) {
    const documentDefinition = this.pdfService.getDocumentFrancais(data);
    pdfMake.createPdf(documentDefinition).open();
    this.toastService.showToast('primary', 'Pdf ouvert', 'Le CERTIFICAT TRANSFERT DE CORPS est ouvert dans un nouvel onglet');

  }

  public pdfArabic (event) {
    this.pdfService.pdfDocumentArabe(event);
    this.toastService.showToast('primary', 'Téléchargement du Pdf ', 'Si vous n\'annuler pas le téléchargement du' +
      ' CERTIFICAT \'رخصة الدفن\' va bientôt être téléchargé');
  }

  public delete (event) {
    if (this.isAdmin) {
      if (window.confirm('Etes-vous sûr de vouloir supprimer?')) {
        this.service.delete(event.id).subscribe(data => {
          this.source = this.source.filter(item => item.id !== data.id);
        });
        this.toastService.toastOfDelete('success');

      }
    } else {
      // window.alert('Vous n\'avez pas des droits de suppression');
      this.toastService.toastOfDelete('warning');
    }
  }

  public edit (event) {
    if (this.isAdmin) {
      this.dataService.reactiveForm.setValue({
        medecins: event.medecins.id,
        defunt: event.defunt.id,
        cercueilType: event.cercueilType,
        declaration: this.ConvertDate(event.declaration) as any as Date,
        remarque: event.remarque,
        declarant: event.declarant,
        tel: event.tel,
        destination:  event.destination ,
        mortuaire: event.mortuaire,
        inhumationSociete: event.inhumationSociete,
        cin: event.cin,
      });
      console.warn(this.dataService.reactiveForm);
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
        this.delete(event.data);
        break;
      case 'edit' :
        this.edit(event.data);
        break;
    }
  }

  public createCertificatFromForm(): CertificatTransfertCorps {
    const formValues = this.dataService.reactiveForm.value;
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

  public getControl(name: string): AbstractControl {
    return this.dataService.reactiveForm.get(name);
  }

  public onSubmit() {
    if (this.dataService.reactiveForm.valid) {
      const certificat: CertificatTransfertCorps = this.createCertificatFromForm();
      this.doSave(certificat);
      this.id = null;
    } else {
      this.toastService.toastOfSave('validate');
    }
  }

  public create (certificat) {
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
    this.dataService.reactiveForm.reset();
  }

  public update(certificat) {
    this.serviceM.getById(certificat.medecins).subscribe(obj1 => {
      certificat.medecins = obj1;
      this.serviceDecede.getById(certificat.defunt).subscribe(objj => {
        certificat.defunt = objj;
        this.service.update(certificat).subscribe(obj => {
          this.source = this.source.map(e => e);
        });
      });
    });
    this.toastService.toastOfEdit('success');
    this.dataService.reactiveForm.reset();
  }

  public doSave(certificat) {
    if (this.id == null) {
        this.create(certificat);
    } else {
      if (this.isAdmin) {
          this.update(certificat);
      } else {
        this.toastService.toastOfEdit('warning');
      }
    }
  }

  // ngx-select
  // Select and remove function Medecin
  public doSelectM (value: any) {
    if (value === 0) {
      this.dataService.passToMedecin();
    } else {
      let medecin;
      medecin = this.listMedecin.find( x => x.id === value).obj;
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
      decede = this.listDecede.find( x => x.id === value).obj;
      if (!(decede === undefined)) {
        this.DecedeHumain = decede;
      }
    }

  }
  public doRemoveD  (value: any) {
    this.DecedeHumain = null;
  }
}
