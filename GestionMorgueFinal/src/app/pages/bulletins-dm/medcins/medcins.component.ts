import { Component, OnInit } from '@angular/core';
import {Medecins} from '../../../@core/backend/common/model/Medecins';
import {LocalDataSource} from 'ng2-smart-table';
import {Decedes} from '../../../@core/backend/common/model/Decedes';
import {MedecinsService} from '../../../@core/backend/common/services/Medecins.service';
import {UsersService} from '../../../@core/backend/common/services/users.service';
import {ToastrService} from '../../../@core/backend/common/services/toastr.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'ngx-medcins',
  templateUrl: './medcins.component.html',
  styleUrls: ['./medcins.component.scss'],
  providers: [MedecinsService],
})
export class MedcinsComponent implements OnInit {
  reactiveForm: FormGroup;
  arPattern = '[\u0621-\u064A0-9 ]*';
  frPattern = '[a-zA-Z0-9 ]*';
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
      edit: true,
      delete: true,
    },
    columns: {
      nom: {
        title: 'Nom',
        type: 'string',
      },
      prenom: {
        title: 'Prénom',
        type: 'string',
      },
      adress: {
        title: 'Adresse',
        type: 'string',
      },
      nomAR: {
        title: 'النسب',
        type: 'string',
      },
      prenomAR: {
        title: 'الإسم',
        type: 'string',
      },
      adressAR: {
        title: 'العنوان',
        type: 'string',
      },
      cin: {
        title: 'CIN d\'encadrant',
        type: 'string',
      },
    },
  };
  // source: LocalDataSource = new LocalDataSource();
  medcin: Medecins = new Medecins();
  source: Array<Medecins>;
  data: any;
  isAdmin: boolean;
  constructor(private service: MedecinsService,
              private userservice: UsersService,
              private toastService: ToastrService,
              private fb: FormBuilder) { }

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
      nom: ['', [Validators.required, Validators.pattern(this.frPattern)]],
      prenom: ['', [Validators.required, Validators.pattern(this.frPattern)]],
      adress: ['', [Validators.required, Validators.pattern(this.frPattern)]],
      cin: ['', [Validators.required, Validators.pattern(this.frPattern)]],
      nomAR: ['', [Validators.required, Validators.pattern(this.arPattern)]],
      prenomAR: ['', [Validators.required, Validators.pattern(this.arPattern)]],
      adressAR: ['', [Validators.required, Validators.pattern(this.arPattern)]],
    });
  }

  reset() {
    this.medcin = new Medecins();
  }
  save() {
    this.service.getAll().subscribe(data => {
      this.service.create(this.medcin).subscribe(obj => {
        this.source.push(obj);
        this.source = this.source.map(e => e);
      });
      this.reset();
      this.toastService.toastOfSave('success');
    });
  }
  onEditConfirm(event) {
    if (this.isAdmin) {
      this.service.getAll().subscribe(data => {
        event.confirm.resolve(event.newData);
        this.service.update(event.newData).subscribe(obj => {
          this.source.map(e => e);
        });
        this.toastService.toastOfEdit('success');
      });
    } else {
      this.toastService.toastOfEdit('warning');
    }
  }
  onDeleteConfirm(event) {
    if (this.isAdmin) {
      if (window.confirm('Vous êtes sûr de vouloir supprimer ?')) {
        event.confirm.resolve(event.data);
        this.service.delete(event.data.id).subscribe(data => {
          this.source = this.source.filter(item => item.id !== data.id);
        });
        this.toastService.toastOfDelete('success');
      } else {
        event.confirm.reject(event.data);
      }
    } else {
      this.toastService.toastOfEdit('warning');

    }
  }

  createMedecinFromForm(): Medecins {
    const formValues = this.reactiveForm.value;
    const medecin = new Medecins();
    medecin.nom = formValues.nom;
    medecin.prenom = formValues.prenom;
    medecin.adress = formValues.adress;
    medecin.nomAR = formValues.nomAR;
    medecin.prenomAR = formValues.prenomAR;
    medecin.adressAR = formValues.adressAR;
    medecin.cin = formValues.cin;

    return medecin;
  }
  getControl(name: string): AbstractControl {
    return this.reactiveForm.get(name);
  }
  onSubmit() {
    if (this.reactiveForm.valid) {
      const medecin: Medecins = this.createMedecinFromForm();
      console.warn('cause: ', medecin);
      console.warn('formValues : ', this.reactiveForm.value);
      this.doSave(medecin);
    } else {
      this.toastService.toastOfSave('validate');
    }
  }
  doSave(medecin) {
        this.service.create(medecin).subscribe(obj => {
          this.source.push(obj);
          this.source = this.source.map(e => e);
        });
    this.toastService.toastOfSave('success');
    this.reactiveForm.reset();
  }
}
