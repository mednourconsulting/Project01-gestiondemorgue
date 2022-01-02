import {Component, OnInit} from '@angular/core';
import {CertificatMedicoLegalService} from '../../../@core/backend/common/services/CertificatMedicoLegal.service';
import {CertificatMedicoLegal} from '../../../@core/backend/common/model/CertificatMedicoLegal';
import {UsersService} from '../../../@core/backend/common/services/users.service';
import {DecedesService} from '../../../@core/backend/common/services/Decedes.service';
import {MedecinsService} from '../../../@core/backend/common/services/Medecins.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {Decedes} from '../../../@core/backend/common/model/Decedes';
import {Medecins} from '../../../@core/backend/common/model/Medecins';
import {ToastrService} from '../../../@core/backend/common/services/toastr.service';
import {LogoBase64Service} from '../../../@core/backend/common/services/logo-base64.service';
import {DataMedicoLegalService} from './dataMedicoLegal.service';
import {PdfMedicoLegalService} from './pdfMedicoLegal.service';
import {User} from '../../../@core/interfaces/common/users';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'ngx-medicolegal',
  templateUrl: './medicolegal.component.html',
  styleUrls: ['./medicolegal.component.scss'],
  providers: [ CertificatMedicoLegalService,
    UsersService,
    DataMedicoLegalService,
    DecedesService, MedecinsService, PdfMedicoLegalService],
})
export class MedicolegalComponent implements OnInit {
  source: Array<CertificatMedicoLegal>;
  Medicolegal: CertificatMedicoLegal = new CertificatMedicoLegal();
  DecedeHumain: Decedes;
  MedecinHumain: Medecins;
  isAdmin: boolean;
  defunt: number;
  id: null;
  filterMedecin = [];
  filterDecede = [];
  listDecede = [];
  listMedcin = [];
  constructor(private service: CertificatMedicoLegalService,
              private userservice: UsersService,
              private serviceDecede: DecedesService,
              private serviceMeddcin: MedecinsService,
              private logoBase64: LogoBase64Service,
              private toastService: ToastrService,
              private pdfMedicoLegalService: PdfMedicoLegalService,
              private  dataMedicoLegalService: DataMedicoLegalService,
              ) {}

  // get all the data from the data base of MedicoLegal
  public getAll () {
    this.service.getAll().subscribe(data => {
      this.source = data;
    });
  }
  // get user and virefy if is the admin

  public getUser () {
    this.userservice.getCurrentUser().subscribe(data => {
      this.isAdmin = data.role.includes('ADMIN');
    });
  }
  // declaration de form cotrole

  public getDecede () {
    this.serviceDecede.getAll().subscribe( dataa => {
      this.listDecede.push({text: 'Ajouter un Décédé....' , id: 0, obj : null});
      dataa.forEach (  obj => { this.listDecede.push({text: obj.nom + ' ' + obj.prenom , id: obj.id, obj: obj});
        this.listDecede.push(obj.nom + ' ' + obj.prenom);
        this.filterDecede.push({
          id: obj.id,
          value: obj.nom + ' ' + obj.prenom,
          title: obj.nom + ' ' +  obj.prenom,
        });
      });
      this.dataMedicoLegalService.settings.columns.defunt.filter.config.list = this.filterDecede;
      this.dataMedicoLegalService.settings = Object.assign({}, this.dataMedicoLegalService.settings);
    });
  }

  public getMedecin() {
    this.listMedcin.push({text: 'Ajouter un Médecin....' , id: 0, obj : null});
    this.serviceMeddcin.getAll().subscribe( data1 => {
      data1.forEach (  obj => { this.listMedcin.push({text: obj.nom + ' ' + obj.prenom , id: obj.id});
        this.filterMedecin.push({
          id: obj.id,
          value: obj.nom + ' ' + obj.prenom,
          title: obj.nom + ' ' +  obj.prenom,
        }); });

      this.dataMedicoLegalService.settings.columns.medecin.filter.config.list = this.filterMedecin;
      this.dataMedicoLegalService.settings = Object.assign({}, this.dataMedicoLegalService.settings);
    });
  }

  ngOnInit() {
    this.getAll();
    this.getUser();
    this.dataMedicoLegalService.formControl();
    this.getDecede();
    this.getMedecin();

  }

  onEdit (data: any) {
    if (this.isAdmin) {
      this.id = data.id;
      this.dataMedicoLegalService.reactiveForm.setValue({
         medecin: data.medecin.id,
        declarant: data.declarant,
        address: data.address,
        cin:  data.cin,
        declaration: this.dataMedicoLegalService.ConvertDate(data.declaration) as any as Date,
        defunt: data.defunt.id,
      });
    } else {
      this.toastService.toastOfEdit('warning');
    }
  }

  onPdfFrancais(data) {
    const documentDefinition = this.pdfMedicoLegalService.getDocumentDefinition1(data);
    pdfMake.createPdf(documentDefinition).open();
    this.toastService.showToast('success', 'PDf ouvert',
      'Le  CERTIFICAT MEDICAL est ouvert dans un nouvel onglet ');
  }

  onPfdArabe (data) {
    const pdf = this.pdfMedicoLegalService.pdff(data);
    pdfMake.createPdf(pdf).open();
    this.toastService.showToast('primary', 'Téléchargement du Pdf ', 'Si vous n\'annuler pas le téléchargement du' +
      ' CERTIFICAT \'شهادة طبية  \' va bientôt être téléchargé');
  }

  onDelete (event) {
    if (this.isAdmin) {
      if (window.confirm('Etes-vous sûr de vouloir supprimer?')) {
        this.service.delete(event.id).subscribe(data => {
          this.source = this.source.filter(item => item.id !== data.id);
        });
        this.toastService.toastOfDelete('success');
      }
    } else {
      this.toastService.toastOfDelete('warning');
    }
  }

  onCustomConfirm(event) {
    switch ( event.action) {
      case 'edit':
        this.onEdit(event.data);
        break;
      case 'pdfFrancais':
        this.onPdfFrancais(event.data);
        break;
      case 'pdfArabe':
        this.onPfdArabe(event.data);
        break;
      case 'delete':
        this.onDelete(event.data);
        break;
    }
  }

  createCertificatFromForm(): CertificatMedicoLegal {
    const formValues = this.dataMedicoLegalService.reactiveForm.value;
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

  onSubmit() {
    if (this.dataMedicoLegalService.reactiveForm.valid) {
      const certificat: CertificatMedicoLegal = this.createCertificatFromForm();
      console.warn('certificat: ', certificat);
      console.warn('formValues : ', this.dataMedicoLegalService.reactiveForm.value);
      this.doSave(certificat);
      this.id = null ;
    } else {
      this.toastService.toastOfSave('validate');
    }
  }

  doSave(certificat) {
    if (this.id == null) {
         certificat.medecin = this.MedecinHumain;
          certificat.defunt = this.DecedeHumain;
          this.service.create(certificat).subscribe(obj => {
            this.source.push(obj);
            this.source = this.source.map(e => e);
          });
      this.toastService.toastOfSave('success');
      this.dataMedicoLegalService.reactiveForm.reset();
    } else {
      if (this.isAdmin) {
        certificat.medecin = this.MedecinHumain;
        certificat.defunt = this.DecedeHumain;
            this.service.update(certificat).subscribe(data1 => {
              this.source = this.source.map(e => e);
              this.dataMedicoLegalService.reactiveForm.reset();
        });
        this.toastService.toastOfEdit('success');
      } else {
        this.toastService.toastOfEdit('warning');
      }
    }
  }

  reset() {
    this.dataMedicoLegalService.reactiveForm.reset();
    this.Medicolegal = new CertificatMedicoLegal();
  }
}
