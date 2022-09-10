import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EMAIL_PATTERN} from '../../@auth/components';
import {UsersService} from '../../@core/backend/common/services/users.service';
import {DialogEmitterService} from '../users-list/services/dialog-emitter.service';
import {NB_AUTH_OPTIONS, NbAuthResult, NbAuthService} from '@nebular/auth';
import {Router} from '@angular/router';
import {getDeepFromObject} from '../../@auth/helpers';
import {ToastrService} from '../../@core/backend/common/services/toastr.service';

@Component({
  selector: 'ngx-show-dialog',
  templateUrl: './show-dialog.component.html',
  styleUrls: ['./show-dialog.component.scss'],
})
export class ShowDialogComponent implements OnInit {
  @Input() isCurrentUser: boolean;
  @Input() data;
  @Input() title: string;
  @Input() showInfo: boolean;
  @Input() editForm: boolean;
  @Input() list: { key: string; value: any; textarea?; language? }[];
  strategy: string = this.getConfigValue('forms.logout.strategy');
  editUserForm: FormGroup;
  ADMIN = 'ADMIN';
  USER = 'USER';
  user: any = {};


  constructor(protected ref: NbDialogRef<ShowDialogComponent>,
              private fb: FormBuilder,
              private userService: UsersService,
              private dialogEmitterService: DialogEmitterService,
              protected service: NbAuthService,
              protected router: Router,
              private toastService: ToastrService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
  ) {}
  ngOnInit() {
    this.editUserForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      role: ['', [Validators.required]],
    });
    this.editUserForm.setValue({
      lastName: this.list[1].value,
      firstName: this.list[2].value,
      email: this.list[3].value,
      role: this.list[4].value,
    });
  }
  getControl(name: string): AbstractControl {
    return this.editUserForm.get(name);
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
  logout(strategy: string): void {
    localStorage.clear();
    this.service.logout(strategy).subscribe((result: NbAuthResult) => {
      const redirect = '/auth/login';
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, 0);
      }
    });
  }
  onEdit() {
    this.user = this.editUserForm.value;
    this.user.id = this.list[0].value;
    this.userService.update(this.user).subscribe((user) => {
      this.dialogEmitterService.emit(user);
      this.ref.close(user);
      this.toastService.toastOfEdit('success');
      this.isCurrentUser ? this.logout(this.strategy) : null;
    });
  }
}
