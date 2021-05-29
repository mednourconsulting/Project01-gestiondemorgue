import { Component, OnInit } from '@angular/core';
import { Cause} from '../../../@core/backend/common/model/Cause';
import {LocalDataSource} from 'ng2-smart-table';
import {CauseService} from '../../../@core/backend/common/services/Cause.service';
import {UsersService} from '../../../@core/backend/common/services/users.service';
import {ToastrService} from '../../../@core/backend/common/services/toastr.service';

@Component({
  selector: 'ngx-cause-deces',
  templateUrl: './cause-deces.component.html',
  styleUrls: ['./cause-deces.component.scss'],
  providers: [ CauseService, UsersService],
})
export class CauseDecesComponent implements OnInit {
  Cause: Cause = new Cause();
  source: Array<Cause>;
  lise: number;
  isAdmin: boolean;
  data: any;
  ngOnInit() {
    this.userservice.getCurrentUser().subscribe(data => {
      this.isAdmin = data.role.includes('ADMIN');
    });
    this.init();
  }
  init() {
    this.service.getAll().subscribe(data => {
      this.source = data;
    });
  }
  initID() {
    this.service.getID().subscribe(data => {
      this.lise = data;
    });
  }
  constructor(private service: CauseService, private userservice: UsersService,
              private toastService: ToastrService) { }
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
      code: {
        title: 'Code',
        type: 'string',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      descriptionAR: {
        title: 'الوصف',
        type: 'string',
      },
    },
  };
  private reset() {
    this.Cause = new Cause();
  }
  save() {
    this.service.getAll().subscribe(data => {
        this.service.create(this.Cause).subscribe(obj => {
          this.init();
        });
        this.reset();
        this.init();
       // window.alert('Les données ont été ajoutées avec succès à la base de données');
        this.toastService.toastOfSave('success');
    });
  }
  onEditConfirm(event) {
    if (this.isAdmin) {
      this.service.getAll().subscribe(data => {
        event.confirm.resolve(event.newData);
        this.service.update(event.newData).subscribe(obj => {
        });
        this.init();
       // window.alert('Les données ont été modifiées avec succès');
        this.toastService.toastOfEdit('success');
      });
    } else {
      // window.alert('vous n\'avez pas des droits de modification');
      this.toastService.toastOfEdit('warning');
    }
  }
  onDeleteConfirm(event) {
    if (this.isAdmin) {
      if (window.confirm('Vous êtes sûr de vouloir supprimer ?')) {
        event.confirm.resolve(event.data);
        this.toastService.toastOfDelete('success');
        this.service.delete(event.data.id).subscribe(data => {
          this.init();
        });
      } else {
        event.confirm.reject(event.data);
      }
    } else {
    //  window.alert('Vous n\'avez pas des droits de suppression');
      this.toastService.toastOfDelete('warning');

    }
  }

  cancel() {
    this.reset();
  }
}
