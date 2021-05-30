import { Component, OnInit } from '@angular/core';
import {Medecins} from '../../../@core/backend/common/model/Medecins';
import {LocalDataSource} from 'ng2-smart-table';
import {Decedes} from '../../../@core/backend/common/model/Decedes';
import {MedecinsService} from '../../../@core/backend/common/services/Medecins.service';
import {UsersService} from '../../../@core/backend/common/services/users.service';
import {ToastrService} from '../../../@core/backend/common/services/toastr.service';

@Component({
  selector: 'ngx-medcins',
  templateUrl: './medcins.component.html',
  styleUrls: ['./medcins.component.scss'],
  providers: [MedecinsService],
})
export class MedcinsComponent implements OnInit {
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
              private toastService: ToastrService) { }

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
  }

  private reset() {
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
}
