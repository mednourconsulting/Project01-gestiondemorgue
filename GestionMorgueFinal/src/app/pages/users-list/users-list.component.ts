import { Component, OnInit } from '@angular/core';
import {User} from '../../@core/interfaces/common/users';
import {UsersService} from '../../@core/backend/common/services/users.service';
import {RolesRenderComponent} from './roles-render.component';
import {DomSanitizer} from '@angular/platform-browser';
import {ToastrService} from '../../@core/backend/common/services/toastr.service';

@Component({
  selector: 'ngx-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  settings = {
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
    actions: {
      custom: [
        {
          name: 'delete',
          title: this.sanitizer.bypassSecurityTrustHtml('<i  class="fas fa-trash" data-toggle="tooltip" data-placement="top" title="Supprimer" aria-hidden="true"></i>'),
        },
        {
          name: 'edit',
          title: this.sanitizer.bypassSecurityTrustHtml('<i  class="fas fa-edit"  data-toggle="tooltip" data-placement="top" title="Editer" aria-hidden="true"></i>'),
        },
      ],
      width: '20px',
      position: 'left',
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      firstName: {
        title: 'Nom',
        type: 'string',
      },
      lastName: {
        title: 'Prénom',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      role: {
        title: 'Role',
        type: 'custom',
        renderComponent: RolesRenderComponent,
      },
    },
  };
  source: Array<User>;
  private isAdmin: boolean;

  constructor(private userService: UsersService,
              private sanitizer: DomSanitizer,
              private toastService: ToastrService) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(data => {
      this.isAdmin = data.role.includes('ADMIN');
    });
    this.userService.findAll().subscribe(u => {
     this.source = u;
    });
  }
  onCustomConfirm(event) {
    switch ( event.action) {
      case 'edit':
        //  this.toastService.toastOfEdit('warning');
        console.warn('edited');

        break;
      case 'delete':
         if (window.confirm('Vous êtes sûr de vouloir supprimer ?')) {
           this.userService.delete(event.data.id).subscribe(data => {
             if (data !== null) {
               this.source = this.source.map(e => e);
               this.toastService.toastOfDelete('success');
             } else {
               this.toastService.showToast('danger', 'Suppression inachevée',
                 'Essayer plus tard !');
             }
           });
            }
          console.warn('deleted');
        break;
    }
  }
}
