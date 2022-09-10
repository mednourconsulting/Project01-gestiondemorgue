import {Component, OnInit} from '@angular/core';
import {User} from '../../@core/interfaces/common/users';
import {UsersService} from '../../@core/backend/common/services/users.service';
import {DomSanitizer} from '@angular/platform-browser';
import {ToastrService} from '../../@core/backend/common/services/toastr.service';
import {NbDialogService} from '@nebular/theme';
import {ShowDialogComponent} from '../show-dialog/show-dialog.component';
import {DialogEmitterService} from './services/dialog-emitter.service';

@Component({
  selector: 'ngx-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  currentUser: User;
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
      lastName: {
        title: 'Nom',
        type: 'string',
      },
      firstName: {
        title: 'Prénom',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      role: {
        title: 'Role',
        type: 'list',
      },
    },
  };
  source: Array<User>;
  private isAdmin: boolean;
  constructor(private userService: UsersService,
              private sanitizer: DomSanitizer,
              private toastService: ToastrService,
              private dialogService: NbDialogService,
              private dialogEmitterService: DialogEmitterService,
              ) { }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe(data => {
      this.currentUser = data;
      this.isAdmin = data.role.includes('ADMIN');
    });
    this.findAll();
    this.dialogEmitterService.subject().subscribe(
      (user: User) => {
      //  console.warn('source', this.source);
      this.source = this.source.map(u => {
        if (u.id === user.id) {
          return user;
        }
        return u;
      });
      },
      );
  }
  findAll() {
  this.userService.findAll().subscribe((u: User[]) => {
    this.source = u;
  });
}
  open(data) {
    const roles = [];
    data.role.forEach(e => {roles.push(e) ; });
    this.dialogService.open(ShowDialogComponent, {
      context: {
        title: 'Modifier l\'utilisateur '
          + data.lastName + ' ' + data.firstName,
        list: [
          {key: 'id', value: data.id},
          {key: 'nom', value: data.lastName},
          {key: 'prenom', value: data.firstName},
          {key: 'email', value: data.email},
          {key: 'roles', value: roles},
        ],
        editForm: true,
        isCurrentUser: (this.currentUser.email === data.email),
      },
    });

  }
  onCustomConfirm(event) {
    switch ( event.action) {
      case 'edit':
        if (this.isAdmin) {
        this.open(event.data);
        } else {
          this.toastService.showToast('warning', 'Action inachevée',
            'Vous ne disposer pas des droits pour effectuer cet action !!');
        }
        break;
      case 'delete':
        if (this.isAdmin) {
          if (window.confirm('Vous êtes sûr de vouloir supprimer ?')) {
            if (!(this.currentUser.email === event.data.email)) {
              this.userService.delete(event.data.id).subscribe(data => {
                if (data === true) {
                  this.source = this.source.filter(item => item.id !== event.data.id);
                  this.toastService.toastOfDelete('success');
                } else {
                  this.toastService.showToast('danger', 'Suppression inachevée',
                    'Essayer plus tard !');
                }
              });
            } else {
              this.toastService.showToast('danger', 'Suppression inachevée',
                'Vous ne pouvez pas supprimer votre compte!');
            }
          }
        } else {
          this.toastService.showToast('warning', 'Action inachevée',
            'Vous ne disposer pas des droits pour effectuer cet action !!');
        }

        break;
    }
  }
}
