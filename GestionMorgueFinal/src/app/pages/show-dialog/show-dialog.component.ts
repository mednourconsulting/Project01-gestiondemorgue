import {Component, Input, OnInit} from '@angular/core';
import {NbDialogRef} from '@nebular/theme';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EMAIL_PATTERN} from '../../@auth/components';
import {UsersService} from '../../@core/backend/common/services/users.service';

@Component({
  selector: 'ngx-show-dialog',
  templateUrl: './show-dialog.component.html',
  styleUrls: ['./show-dialog.component.scss'],
})
export class ShowDialogComponent implements OnInit {
  @Input() data;
  @Input() title: string;
  @Input() showInfo: boolean;
  @Input() editForm: boolean;
  @Input() list: { key: string; value: any; textarea?; language? }[];
  editUserForm: FormGroup;
  ADMIN = 2;
  USER = 1;
  user: any = {};


  constructor(protected ref: NbDialogRef<ShowDialogComponent>,
              private fb: FormBuilder,
              private userService: UsersService,
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
  onEdit() {
    this.user = this.editUserForm.value;
    this.user.id = this.list[0].value;
    this.userService.update(this.user).subscribe((e) => {
      console.warn('updated', e);
    });
  }
}
